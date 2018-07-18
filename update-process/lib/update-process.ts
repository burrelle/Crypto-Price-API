// import ccxt - crypto trading library
import * as ccxt from "ccxt";
// import rxjs - async with observable streams
import {
  Observable
} from "rxjs";
import {
  timer
} from "rxjs/observable/timer";
// import PostgreSQL client
import {
  Client
} from "pg";
import * as db from "./db/database";
import {
  Ticker
} from "./models/ticker";
import {
  Exchange
} from "./models/exchange";
import * as logger from "./logger/logger";

const CHECK_EXCHANGE: boolean = false;

// exchanges to pull price data from
// currently requires ccxt exchange api to have "fetchTickers" method - coinbase
// doesn't have this method
const exchange_string: string[] = [
  "binance", "bitfinex", "bittrex", /*"coinbase",*/ "kraken"
];
// variable contains ccxt exchange objects
const exchanges: object = {};
// generate exchange objects
for (const exchange of exchange_string) {
  exchanges[exchange] = new ccxt[exchange]();

  if (CHECK_EXCHANGE) {
    logger.logInfo(exchange + " " + exchanges[exchange].has.fetchTickers);
  }
}

// time between data updates (in milliseconds)
const update_time: number = 120 * 1000;
const start_time: number = update_time - Date.now() % update_time;

var active: boolean = false;

process.on("SIGINT", _ => {
  logger.logInfo("Shutting down db connection");
  db.shutdown().then(_ => {
    process.exit();
  });
});

var req_time: number = 0;
// get price data every two minutes on the minute
timer(0 /* use 0 here for testing if you want it to start immediately */ , update_time).subscribe(res => {

  // iterate over all exchanges and get associated markets
  if (active) {
    logger.logInfo("ts: " + req_time + " not fetching prices because previous operation ongoing");
  } else {
    req_time = Math.round(Date.now() / 1000);
    logger.logInfo("ts: " + req_time + " fetching prices for: " + exchange_string);
    active = true;
    for (const exchange of exchange_string) {
      // load the markets for the given exchange
      exchanges[exchange].loadMarkets().then(
        data => {
          const assetPromises: Promise < any > [] = [];
          const asset_set: Set < string > = new Set();
          // iterate over each market for the exchange
          for (var exchange_pair in data) {
            if (data.hasOwnProperty(exchange_pair)) {
              // if base asset hasn't been checked, add it to check list
              if (!asset_set.has(data[exchange_pair].base)) {
                assetPromises.push(db.checkAsset(data[exchange_pair].base));
              }
              asset_set.add(data[exchange_pair].base);
              // if quote asset hasn't been checked, add it to check list
              if (!asset_set.has(data[exchange_pair].quote)) {
                assetPromises.push(db.checkAsset(data[exchange_pair].quote));
              }
              asset_set.add(data[exchange_pair].quote);
            }
          }
          // check database includes all base assets, then check all asset pairs
          Promise.all(assetPromises).then(
            res => {
              // get all pairs that need to be checked
              const pairPromises: Promise < any > [] = [];
              for (var exchange_pair in data) {
                if (data.hasOwnProperty(exchange_pair)) {
                  pairPromises.push(db.checkPair(data[exchange_pair].base, data[exchange_pair].quote));
                }
              }
              const eObj: Exchange = new Exchange();
              eObj.countries = exchanges[exchange].countries;
              eObj.name = exchanges[exchange].name;
              eObj.exchange_url = exchanges[exchange].urls.www;
              // also verify exchange is included in database
              const exchangePromise: Promise < any > = db.checkExchange(eObj);
              pairPromises.push(exchangePromise);
              // check database includes all asset pairs, then check all exchange asset pairs
              Promise.all(pairPromises).then(_ => {
                // get all exchange pairs that need to be checked
                const exchangePairPromises: Promise < any > [] = [];
                for (var exchange_pair in data) {
                  if (data.hasOwnProperty(exchange_pair)) {
                    // tslint:disable-next-line:max-line-length
                    pairPromises.push(db.checkExchangePair(data[exchange_pair].base, data[exchange_pair].quote, data[exchange_pair].precision.price, data[exchange_pair].active, exchanges[exchange].name));
                  }
                }
                // check database includes all exchange pairs, then get
                // prices for all pairs
                Promise.all(exchangePairPromises).then(_ => {
                  exchanges[exchange].fetchTickers().then(tickers => {
                    const pricePromises: Promise < any > [] = [];
                    for (var ticker in tickers) {
                      if (tickers.hasOwnProperty(ticker)) {
                        const tObj: Ticker = new Ticker();
                        tObj.ask = tickers[ticker].ask;
                        tObj.base = tickers[ticker].symbol.split("/")[0];
                        tObj.baseVolume = tickers[ticker].baseVolume;
                        tObj.bid = tickers[ticker].bid;
                        tObj.price = tickers[ticker].close;
                        tObj.quote = tickers[ticker].symbol.split("/")[1];
                        // looks like quote volume is not supported for some
                        // exchanges in ccxt?
                        // tObj.quoteVolume = tickers[ticker].quoteVolume;
                        tObj.ts = Date.now() / 1000;
                        pricePromises.push(db.checkPrice(tObj, exchanges[exchange].name));
                      }
                    }
                    Promise.all(pricePromises).then(res => {
                      active = false;
                      logger.logInfo("+" + (Math.round(Date.now() / 1000) - req_time) + "s " + exchange + " fetch complete");
                    }, err => {
                      logger.logError(exchange + " pricePromises", err);
                    });
                  });
                }, err => {
                  logger.logError(exchange + " exchangePairPromises", err);
                });
              }, err => {
                logger.logError(exchange + " pairPromises/exchangePromise", err);
              });
            },
            err => {
              logger.logError(exchange + " assetPromises", err);
            }
          );
        },
        err => {
          logger.logError(exchange + " loadMarkets", err);
        }
      );
    }
  }
});