  /* tslint:disable:no-string-literal */

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
import {
  MarketDetails
} from "./models/market_details";
import {
  asset_map
} from "./models/asset_map";

/********************************************************
 * Setup
 *******************************************************/

// time between data updates (in milliseconds)
const update_time: number = 300 * 1000;
// allows updates to start on even two minute intervals
const start_time: number = update_time - Date.now() % update_time;
// the time the update was started
var req_time: number = 0;
// whether a price update is in process
var active: boolean = false;
// exchanges to fetch prices for - MUST have ccxt fetchTickers method
const exchange_string: string[] = [
  "binance", "bitfinex", "bittrex", "coinbase", "kraken"
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
timer(0, update_time).subscribe(res => {

  // do not fetch new data if previous request is still pending
  if (active) {
    logger.logInfo("ts: " + req_time + " not fetching prices because previous operation ongoing");
  } else {
    // log fetch time
    req_time = Math.round(Date.now() / 1000);
    logger.logInfo("ts: " + req_time + " fetching prices for: " + exchange_string);
    active = true;
    var counter: number = 0;
    // make sure database structure includes all assets, pairs, exchanges,
    // exchange pair
    const marketPromises: Promise < any > [] = [];
    for (const exchange of exchange_string) {
      marketPromises.push(fetchMarkets(exchange));
    }
    Promise.all(marketPromises).then(res => {
      // map of reorganized market data
      const market_details: MarketDetails = processMarkets(res);
      const updatePromises: Promise < any > [] = [];
      for (const [index, exchange] of exchange_string.entries()) {
        updatePromises.push(updateStructure(exchange, res[index], market_details));
      }
      // fetch prices
      Promise.all(updatePromises).then(_ => {
        const aggregate: object = {};
        const pricePromises: Promise < any > [] = [];
        for (const exchange of exchange_string) {
          pricePromises.push(updatePrices(exchange, aggregate));
        }
        Promise.all(pricePromises).then(_ => {
          updateAggregate(aggregate, market_details).then(_ => {
            active = false;
          });
        });
      });
    });
  }
});

/********************************************************
 * Core update function
 *******************************************************/

async function updateStructure(exchange: string, markets: object, market_details: MarketDetails): Promise < any > {
  await fetchAssets(markets, exchange, market_details);
  await fetchExchangeAndFetchPairs(markets, exchange, market_details);
  await fetchExchangePairs(markets, exchange);
}

async function updatePrices(exchange: string, aggregate: object): Promise < any > {
  // updates database with new prices, and adds price information to aggregate object
  await fetchPrices(exchange, aggregate);
}

/********************************************************
 * Update database functions
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

function fetchAssets(markets: object, exchange: string, market_details: MarketDetails): Promise < any > {
  const assetPromises: Promise < any > [] = [];
  const asset_set: Set < string > = new Set();
  // iterate over each market for the exchange
  for (var exchange_pair in markets) {
    if (markets.hasOwnProperty(exchange_pair)) {
      // if base asset hasn't been checked, add it to check list
      if (!asset_set.has(markets[exchange_pair].base)) {
        // tslint:disable-next-line:max-line-length
        assetPromises.push(db.checkAsset(markets[exchange_pair].base, Array.from(market_details.asset_details[getTicker(markets[exchange_pair].base, exchange)]), exchange));
      }
      asset_set.add(markets[exchange_pair].base);
      // if quote asset hasn't been checked, add it to check list
      if (!asset_set.has(markets[exchange_pair].quote)) {
        // tslint:disable-next-line:max-line-length
        assetPromises.push(db.checkAsset(markets[exchange_pair].quote, Array.from(market_details.asset_details[getTicker(markets[exchange_pair].quote, exchange)]), exchange));
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
function fetchExchangeAndFetchPairs(markets: object, exchange: string, market_details: MarketDetails): Promise < any > {
  // get all pairs that need to be checked
  const pairPromises: Promise < any > [] = [];
  for (var exchange_pair in markets) {
    if (markets.hasOwnProperty(exchange_pair)) {
      if (exchange_pair.includes("/")) {
        // tslint:disable-next-line:max-line-length
        pairPromises.push(db.checkPair(markets[exchange_pair].base, markets[exchange_pair].quote, Array.from(market_details.pair_details[getSymbol(exchange_pair, exchange)]), exchange));
      }
    }
  }
  const eObj: Exchange = new Exchange();
  eObj.countries = exchanges[exchange].countries;
  eObj.name = exchanges[exchange].name;
  eObj.exchange_url = exchanges[exchange].urls.www;
  // also verify exchange is included in database
  // tslint:disable-next-line:max-line-length
  const exchangePromise: Promise < any > = db.checkExchange(eObj, Array.from(market_details.exchange_details[exchanges[exchange].name]));
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
      const precision:number = markets[exchange_pair].precision ? markets[exchange_pair].precision.price : null;
      // tslint:disable-next-line:max-line-length
      exchangePairPromises.push(db.checkExchangePair(markets[exchange_pair].base, markets[exchange_pair].quote, precision, markets[exchange_pair].active, exchanges[exchange].name));
    }
  }
  // check database includes all exchange pairs, then get
  // prices for all pairs
  return Promise.all(exchangePairPromises).then(_ => { /* do nothing */ }).catch(err => {
    logger.logError(exchange + " exchangePairPromises", err);
  });
}

// fetch all price values at a given exchange
function fetchPrices(exchange: string, aggregate: object): Promise < any > {
  if (exchanges[exchange].has.fetchTickers) {
    return exchanges[exchange].fetchTickers().then(tickers => {
      const pricePromises: Promise < any > [] = [];
      for (var ticker in tickers) {
        if (tickers.hasOwnProperty(ticker) ) {
          if (exchanges[exchange].markets[tickers[ticker].symbol]) {
            const tObj: Ticker = new Ticker();
            tObj.ask = tickers[ticker].ask;
            tObj.base = tickers[ticker].symbol.split("/")[0];
            tObj.baseVolume = tickers[ticker].baseVolume;
            tObj.bid = tickers[ticker].bid;
            tObj.price = tickers[ticker].close;
            tObj.quote = tickers[ticker].symbol.split("/")[1];
            tObj.exchange = exchanges[exchange].name;
            // looks like quote volume is not supported for some
            // exchanges in ccxt?
            // tObj.quoteVolume = tickers[ticker].quoteVolume;
            tObj.ts = Date.now() / 1000;
            pricePromises.push(db.checkPrice(tObj));

            // update aggregate object with all prices
            if (aggregate[getSymbol(tickers[ticker].symbol, exchange)]) {
              aggregate[getSymbol(tickers[ticker].symbol, exchange)].push(tObj);
            } else {
              aggregate[getSymbol(tickers[ticker].symbol, exchange)] = [tObj];
            }
          }

        }
      }
      return Promise.all(pricePromises).then(res => {
        logger.logInfo("+" + (Math.round(Date.now() / 1000) - req_time) + "s " + exchange + " fetch complete");
      }).catch(err => {
        logger.logError(exchange + " pricePromises", err);
      });
    }).catch(e => {
      console.log(e);
      logger.logError(exchange + " fetchTickers", e);
    });
  } else if (exchanges[exchange].has.fetchTicker) {
    const fetchTickerPromises: Promise<any>[] = [];
    for (const symbol in exchanges[exchange].markets) {
      if (exchanges[exchange].markets.hasOwnProperty(symbol)) {
        fetchTickerPromises.push(exchanges[exchange].fetchTicker(symbol));
      }
    }
    return Promise.all(fetchTickerPromises).then(tickers => {
      const pricePromises: Promise < any > [] = [];
      for (var ticker in tickers) {
        if (tickers.hasOwnProperty(ticker)) {
          const tObj: Ticker = new Ticker();
          tObj.ask = tickers[ticker].ask;
          tObj.base = tickers[ticker].symbol.split("/")[0];
          tObj.baseVolume = tickers[ticker].baseVolume;
          tObj.bid = tickers[ticker].bid;
          tObj.price = tickers[ticker].last;
          tObj.quote = tickers[ticker].symbol.split("/")[1];
          tObj.exchange = exchanges[exchange].name;
          // looks like quote volume is not supported for some
          // exchanges in ccxt?
          // tObj.quoteVolume = tickers[ticker].quoteVolume;
          tObj.ts = Date.now() / 1000;
          pricePromises.push(db.checkPrice(tObj));
          
          // update aggregate object with all prices
          if (aggregate[getSymbol(tickers[ticker].symbol, exchange)]) {
            aggregate[getSymbol(tickers[ticker].symbol, exchange)].push(tObj);
          } else {
            aggregate[getSymbol(tickers[ticker].symbol, exchange)] = [tObj];
          }
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
  } else {
    logger.logInfo("+" + (Math.round(Date.now() / 1000) - req_time) + "s " + exchange + " prices cannot be fetched");
  }

}

// add aggregate prices to database
async function updateAggregate(aggregate: object, market_details: MarketDetails): Promise < any > {
  const agg_exchange: Exchange = new Exchange();
  agg_exchange.name = "Aggregate";

  // create aggregate exchange in database
  await db.checkExchangeSimple(agg_exchange, Array.from(market_details.exchange_details["Aggregate"]));

  const aggPairPromises: Promise < any > [] = [];

  // add aggregate exchange pairs
  for (let pair in aggregate) {
    if (aggregate.hasOwnProperty(pair)) {

      // tslint:disable-next-line:max-line-length
      aggPairPromises.push(db.checkExchangePairSimple(pair.split("/")[0], pair.split("/")[1], agg_exchange.name));
    }
  }

  await Promise.all(aggPairPromises);

  const aggPricePromises: Promise < any > [] = [];
  for (let pair in aggregate) {
    if (aggregate.hasOwnProperty(pair)) {
      var aggPrice: Ticker = new Ticker();
      aggPrice.baseVolume = 0;

      for (var price of aggregate[pair]) {
        aggPrice.baseVolume += price.baseVolume;
      }

      aggPrice.price = 0;
      aggPrice.ask = 0;
      aggPrice.base = pair.split("/")[0];
      aggPrice.bid = 0;
      aggPrice.exchange = agg_exchange.name;
      aggPrice.quote = pair.split("/")[1];
      aggPrice.ts = aggregate[pair][0].ts;

      // aggregate function is currently simple volume weighted average
      for (var price_ of aggregate[pair]) {
        aggPrice.price += price_.price * (price_.baseVolume / aggPrice.baseVolume);
        aggPrice.ask += price_.ask * (price_.baseVolume / aggPrice.baseVolume);
        aggPrice.bid += price_.bid * (price_.baseVolume / aggPrice.baseVolume);
      }

      aggPricePromises.push(db.checkPrice(aggPrice));
    }
  }

  await Promise.all(aggPricePromises);
  logger.logInfo("+" + (Math.round(Date.now() / 1000) - req_time) + "s aggregate fetch complete");
}

/********************************************************
 * Reorganize data functions
 *******************************************************/

function processMarkets(markets: object[]): MarketDetails {

  // create market detail objects
  const market_details: MarketDetails = new MarketDetails();

  market_details.exchange_details = {"Aggregate": new Set() };
  market_details.pair_details = {};
  market_details.asset_details = {};
  for (const [index, market] of markets.entries()) {
    market_details.exchange_details[exchanges[exchange_string[index]].name] = new Set();
    for (let exchange_pair in market) {
      if (market.hasOwnProperty(exchange_pair)) {
        if (exchange_pair.includes("/")) {
          // exchange_pair = ;
          market_details.exchange_details[exchanges[exchange_string[index]].name].add(getSymbol(exchange_pair, exchange_string[index]));
          market_details.exchange_details["Aggregate"].add(getSymbol(exchange_pair, exchange_string[index]));
          if (!market_details.pair_details[getSymbol(exchange_pair, exchange_string[index])]) {
            market_details.pair_details[getSymbol(exchange_pair, exchange_string[index])] = new Set();
            // probably don't want "aggregate" to show up in list of exchanges
            // market_details.pair_details[exchange_pair].add("aggregate");
          }
          market_details.pair_details[getSymbol(exchange_pair, exchange_string[index])].add(exchanges[exchange_string[index]].name);

          if (!market_details.asset_details[getTicker(market[exchange_pair].base, exchange_string[index])]) {
            market_details.asset_details[getTicker(market[exchange_pair].base, exchange_string[index])] = new Set();
          }
          if (!market_details.asset_details[getTicker(market[exchange_pair].quote, exchange_string[index])]) {
            market_details.asset_details[getTicker(market[exchange_pair].quote, exchange_string[index])] = new Set();
          }
          // tslint:disable-next-line:max-line-length
          market_details.asset_details[getTicker(market[exchange_pair].base, exchange_string[index])].add(exchanges[exchange_string[index]].name);
          // tslint:disable-next-line:max-line-length
          market_details.asset_details[getTicker(market[exchange_pair].quote, exchange_string[index])].add(exchanges[exchange_string[index]].name);
        }
      }
    }
  }

  return market_details;
}

// function maps different tickers for same asset to same ticker in database
function getSymbol(symbol: string, exchange: string): string {

  let base: string = symbol.split("/")[0];
  let quote: string = symbol.split("/")[1];

  if (asset_map[exchange] && asset_map[exchange].hasOwnProperty(base) && asset_map[exchange].hasOwnProperty(quote)) {
    return asset_map[exchange][base] + "/" + asset_map[exchange][quote];
  } else if (asset_map[exchange] && asset_map[exchange].hasOwnProperty(base)) {
    return asset_map[exchange][base] + "/" + quote;
  } else if (asset_map[exchange] && asset_map[exchange].hasOwnProperty(quote)) {
    return base + "/" + asset_map[exchange][quote];
  } else {
    return symbol;
  }
}

// function maps different tickers for same asset to same ticker in database
function getTicker(ticker: string, exchange: string): string {

  if (asset_map[exchange] && asset_map[exchange].hasOwnProperty(ticker)) {
    return asset_map[exchange][ticker];
  } else {
    return ticker;
  }
}