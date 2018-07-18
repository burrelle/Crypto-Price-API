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

/********************************************************
 * Setup
 *******************************************************/

// time between data updates (in milliseconds)
const update_time: number = 120 * 1000;
// allows updates to start on even two minute intervals
const start_time: number = update_time - Date.now() % update_time;
// the time the update was started
var req_time: number = 0;
// whether a price update is in process
var active: boolean = false;
// exchanges to fetch prices for - MUST have ccxt fetchTickers method
const exchange_string: string[] = [
  "binance", "bitfinex", "bittrex", /*"coinbase",*/ "kraken"
];
// map of ccxt exchange objects
const exchanges: object = {};
// generate exchange objects
for (const exchange of exchange_string) {
  exchanges[exchange] = new ccxt[exchange]();
}

/********************************************************
 * Exit SIGINT Handling
 *******************************************************/

process.on("SIGINT", _ => {
  logger.logInfo("Shutting down db connection");
  db.shutdown().then(_ => {
    process.exit();
  });
});

/********************************************************
 * Main process
 *******************************************************/

// get price data every two minutes on the minute
timer(0 /* use 0 here for testing if you want it to start immediately */ , update_time).subscribe(res => {

  // do not fetch new data if previous request is still pending
  if (active) {
    logger.logInfo("ts: " + req_time + " not fetching prices because previous operation ongoing");
  } else {
    // log fetch time
    req_time = Math.round(Date.now() / 1000);
    logger.logInfo("ts: " + req_time + " fetching prices for: " + exchange_string);
    active = true;
    var counter: number = 0;
    // fetch price data
    for (const exchange of exchange_string) {
      update(exchange).then(_ => {
        counter++;
        if (counter === exchange_string.length) {
          active = false;
        }
      });
    }
  }
});

/********************************************************
 * Core update function
 *******************************************************/

async function update(exchange: string): Promise < any > {
  var markets: object = await fetchMarkets(exchange);
  await fetchAssets(markets, exchange);
  await fetchExchangeAndFetchPairs(markets, exchange);
  await fetchExchangePairs(markets, exchange);
  await fetchPrices(exchange);
}

/********************************************************
 * Fetch functions
 *******************************************************/

function fetchMarkets(exchange: string): Promise < any > {
  // load the markets for the given exchange
  return exchanges[exchange].loadMarkets().then(
    data => {
      return data;
    }).catch(err => {
    logger.logError(exchange + " loadMarkets", err);
  });
}

function fetchAssets(markets: object, exchange: string): Promise < any > {
  const assetPromises: Promise < any > [] = [];
  const asset_set: Set < string > = new Set();
  // iterate over each market for the exchange
  for (var exchange_pair in markets) {
    if (markets.hasOwnProperty(exchange_pair)) {
      // if base asset hasn't been checked, add it to check list
      if (!asset_set.has(markets[exchange_pair].base)) {
        assetPromises.push(db.checkAsset(markets[exchange_pair].base));
      }
      asset_set.add(markets[exchange_pair].base);
      // if quote asset hasn't been checked, add it to check list
      if (!asset_set.has(markets[exchange_pair].quote)) {
        assetPromises.push(db.checkAsset(markets[exchange_pair].quote));
      }
      asset_set.add(markets[exchange_pair].quote);
    }
  }
  // check database includes all base assets, then check all asset pairs
  return Promise.all(assetPromises).then(
    res => { /* do nothing */ }).catch(err => {
    logger.logError(exchange + " assetPromises", err);
  });
}

// fetches exchange info, pair info
function fetchExchangeAndFetchPairs(markets: object, exchange: string): Promise < any > {
  // get all pairs that need to be checked
  const pairPromises: Promise < any > [] = [];
  for (var exchange_pair in markets) {
    if (markets.hasOwnProperty(exchange_pair)) {
      pairPromises.push(db.checkPair(markets[exchange_pair].base, markets[exchange_pair].quote));
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
  return Promise.all(pairPromises).then(_ => { /* do nothing */ }).catch(err => {
    logger.logError(exchange + " pairPromises/exchangePromise", err);
  });
}

// fetch exchange pairs at a given exchange
function fetchExchangePairs(markets: object, exchange: string): Promise < any > {
  // get all exchange pairs that need to be checked
  const exchangePairPromises: Promise < any > [] = [];
  for (var exchange_pair in markets) {
    if (markets.hasOwnProperty(exchange_pair)) {
      // tslint:disable-next-line:max-line-length
      exchangePairPromises.push(db.checkExchangePair(markets[exchange_pair].base, markets[exchange_pair].quote, markets[exchange_pair].precision.price, markets[exchange_pair].active, exchanges[exchange].name));
    }
  }
  // check database includes all exchange pairs, then get
  // prices for all pairs
  return Promise.all(exchangePairPromises).then(_ => { /* do nothing */ }).catch(err => {
    logger.logError(exchange + " exchangePairPromises", err);
  });
}

// fetch all price values at a given exchange
function fetchPrices(exchange: string): Promise < any > {
  return exchanges[exchange].fetchTickers().then(tickers => {
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
    return Promise.all(pricePromises).then(res => {
      logger.logInfo("+" + (Math.round(Date.now() / 1000) - req_time) + "s " + exchange + " fetch complete");
    }).catch(err => {
      logger.logError(exchange + " pricePromises", err);
    });
  }).catch(e => {
    logger.logError(exchange + " fetchTickers", e);
  });
}