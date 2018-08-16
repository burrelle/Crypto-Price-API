"use strict";
/* tslint:disable:no-string-literal */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import ccxt - crypto trading library
const ccxt = require("ccxt");
const timer_1 = require("rxjs/observable/timer");
const db = require("./db/database");
const ticker_1 = require("./models/ticker");
const exchange_1 = require("./models/exchange");
const logger = require("./logger/logger");
const market_details_1 = require("./models/market_details");
const asset_map_1 = require("./models/asset_map");
/********************************************************
 * Setup
 *******************************************************/
// time between data updates (in milliseconds)
const update_time = 120 * 1000;
// allows updates to start on even two minute intervals
const start_time = update_time - Date.now() % update_time;
// the time the update was started
var req_time = 0;
// whether a price update is in process
var active = false;
// exchanges to fetch prices for - MUST have ccxt fetchTickers method
const exchange_string = [
    "binance", "bitfinex", "bittrex", "coinbase", "kraken"
];
// map of ccxt exchange objects
const exchanges = {};
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
timer_1.timer(0 /* use 0 here for testing if you want it to start immediately, else use start_time */, update_time).subscribe(res => {
    // do not fetch new data if previous request is still pending
    if (active) {
        logger.logInfo("ts: " + req_time + " not fetching prices because previous operation ongoing");
    }
    else {
        // log fetch time
        req_time = Math.round(Date.now() / 1000);
        logger.logInfo("ts: " + req_time + " fetching prices for: " + exchange_string);
        active = true;
        var counter = 0;
        // make sure database structure includes all assets, pairs, exchanges,
        // exchange pair
        const marketPromises = [];
        for (const exchange of exchange_string) {
            marketPromises.push(fetchMarkets(exchange));
        }
        Promise.all(marketPromises).then(res => {
            // map of reorganized market data
            const market_details = processMarkets(res);
            const updatePromises = [];
            for (const [index, exchange] of exchange_string.entries()) {
                updatePromises.push(updateStructure(exchange, res[index], market_details));
            }
            // fetch prices
            Promise.all(updatePromises).then(_ => {
                const aggregate = {};
                const pricePromises = [];
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
function updateStructure(exchange, markets, market_details) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetchAssets(markets, exchange, market_details);
        yield fetchExchangeAndFetchPairs(markets, exchange, market_details);
        yield fetchExchangePairs(markets, exchange);
    });
}
function updatePrices(exchange, aggregate) {
    return __awaiter(this, void 0, void 0, function* () {
        // updates database with new prices, and adds price information to aggregate object
        yield fetchPrices(exchange, aggregate);
    });
}
/********************************************************
 * Update database functions
 *******************************************************/
function fetchMarkets(exchange) {
    // load the markets for the given exchange
    return exchanges[exchange].loadMarkets().then(data => {
        return data;
    }).catch(err => {
        logger.logError(exchange + " loadMarkets", err);
    });
}
function fetchAssets(markets, exchange, market_details) {
    const assetPromises = [];
    const asset_set = new Set();
    // iterate over each market for the exchange
    for (var exchange_pair in markets) {
        if (markets.hasOwnProperty(exchange_pair)) {
            // if base asset hasn't been checked, add it to check list
            if (!asset_set.has(markets[exchange_pair].base)) {
                // tslint:disable-next-line:max-line-length
                assetPromises.push(db.checkAsset(markets[exchange_pair].base, Array.from(market_details.asset_details[markets[exchange_pair].base])));
            }
            asset_set.add(markets[exchange_pair].base);
            // if quote asset hasn't been checked, add it to check list
            if (!asset_set.has(markets[exchange_pair].quote)) {
                // tslint:disable-next-line:max-line-length
                assetPromises.push(db.checkAsset(markets[exchange_pair].quote, Array.from(market_details.asset_details[markets[exchange_pair].quote])));
            }
            asset_set.add(markets[exchange_pair].quote);
        }
    }
    // check database includes all base assets, then check all asset pairs
    return Promise.all(assetPromises).then(res => { }).catch(err => {
        logger.logError(exchange + " assetPromises", err);
    });
}
// fetches exchange info, pair info
function fetchExchangeAndFetchPairs(markets, exchange, market_details) {
    // get all pairs that need to be checked
    const pairPromises = [];
    for (var exchange_pair in markets) {
        if (markets.hasOwnProperty(exchange_pair)) {
            if (exchange_pair.includes("/")) {
                // tslint:disable-next-line:max-line-length
                pairPromises.push(db.checkPair(markets[exchange_pair].base, markets[exchange_pair].quote, Array.from(market_details.pair_details[exchange_pair])));
            }
        }
    }
    const eObj = new exchange_1.Exchange();
    eObj.countries = exchanges[exchange].countries;
    eObj.name = exchanges[exchange].name;
    eObj.exchange_url = exchanges[exchange].urls.www;
    // also verify exchange is included in database
    // tslint:disable-next-line:max-line-length
    const exchangePromise = db.checkExchange(eObj, Array.from(market_details.exchange_details[exchanges[exchange].name]));
    pairPromises.push(exchangePromise);
    // check database includes all asset pairs, then check all exchange asset pairs
    return Promise.all(pairPromises).then(_ => { }).catch(err => {
        logger.logError(exchange + " pairPromises/exchangePromise", err);
    });
}
// fetch exchange pairs at a given exchange
function fetchExchangePairs(markets, exchange) {
    // get all exchange pairs that need to be checked
    const exchangePairPromises = [];
    for (var exchange_pair in markets) {
        if (markets.hasOwnProperty(exchange_pair)) {
            // tslint:disable-next-line:max-line-length
            const precision = markets[exchange_pair].precision ? markets[exchange_pair].precision.price : null;
            // tslint:disable-next-line:max-line-length
            exchangePairPromises.push(db.checkExchangePair(markets[exchange_pair].base, markets[exchange_pair].quote, precision, markets[exchange_pair].active, exchanges[exchange].name));
        }
    }
    // check database includes all exchange pairs, then get
    // prices for all pairs
    return Promise.all(exchangePairPromises).then(_ => { }).catch(err => {
        logger.logError(exchange + " exchangePairPromises", err);
    });
}
// fetch all price values at a given exchange
function fetchPrices(exchange, aggregate) {
    if (exchanges[exchange].has.fetchTickers) {
        return exchanges[exchange].fetchTickers().then(tickers => {
            const pricePromises = [];
            for (var ticker in tickers) {
                // map wrong names
                if (tickers.hasOwnProperty(ticker)) {
                    let base = tickers[ticker].symbol.split("/")[0];
                    let quote = tickers[ticker].symbol.split("/")[1];
                    if (asset_map_1.asset_map[exchange] && asset_map_1.asset_map[exchange].hasOwnProperty(base)) {
                        let mapped_val = asset_map_1.asset_map[exchange][base];
                        let new_key = mapped_val + "/" + quote;
                        // tslint:disable-next-line:max-line-length
                        Object.defineProperty(tickers, new_key, Object.getOwnPropertyDescriptor(tickers, ticker));
                        delete tickers[ticker];
                        tickers[new_key].symbol = new_key;
                        ticker = new_key;
                    }
                    if (asset_map_1.asset_map[exchange] && asset_map_1.asset_map[exchange].hasOwnProperty(quote)) {
                        let mapped_val = asset_map_1.asset_map[exchange][quote];
                        let new_key = base + "/" + mapped_val;
                        // tslint:disable-next-line:max-line-length
                        Object.defineProperty(tickers, new_key, Object.getOwnPropertyDescriptor(tickers, ticker));
                        delete tickers[ticker];
                        tickers[new_key].symbol = new_key;
                        ticker = new_key;
                    }
                    if (exchanges[exchange].markets[tickers[ticker].symbol]) {
                        const tObj = new ticker_1.Ticker();
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
                        if (aggregate[tickers[ticker].symbol]) {
                            aggregate[tickers[ticker].symbol].push(tObj);
                        }
                        else {
                            aggregate[tickers[ticker].symbol] = [tObj];
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
    }
    else if (exchanges[exchange].has.fetchTicker) {
        const fetchTickerPromises = [];
        for (const symbol in exchanges[exchange].markets) {
            if (exchanges[exchange].markets.hasOwnProperty(symbol)) {
                fetchTickerPromises.push(exchanges[exchange].fetchTicker(symbol));
            }
        }
        return Promise.all(fetchTickerPromises).then(tickers => {
            const pricePromises = [];
            for (var ticker in tickers) {
                if (tickers.hasOwnProperty(ticker)) {
                    const tObj = new ticker_1.Ticker();
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
                    if (aggregate[tickers[ticker].symbol]) {
                        aggregate[tickers[ticker].symbol].push(tObj);
                    }
                    else {
                        aggregate[tickers[ticker].symbol] = [tObj];
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
    }
    else {
        logger.logInfo("+" + (Math.round(Date.now() / 1000) - req_time) + "s " + exchange + " prices cannot be fetched");
    }
}
// add aggregate prices to database
function updateAggregate(aggregate, market_details) {
    return __awaiter(this, void 0, void 0, function* () {
        const agg_exchange = new exchange_1.Exchange();
        agg_exchange.name = "Aggregate";
        // create aggregate exchange in database
        yield db.checkExchangeSimple(agg_exchange, Array.from(market_details.exchange_details["Aggregate"]));
        const aggPairPromises = [];
        // add aggregate exchange pairs
        for (let pair in aggregate) {
            if (aggregate.hasOwnProperty(pair)) {
                // tslint:disable-next-line:max-line-length
                aggPairPromises.push(db.checkExchangePairSimple(pair.split("/")[0], pair.split("/")[1], agg_exchange.name));
            }
        }
        yield Promise.all(aggPairPromises);
        const aggPricePromises = [];
        for (let pair in aggregate) {
            if (aggregate.hasOwnProperty(pair)) {
                var aggPrice = new ticker_1.Ticker();
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
        yield Promise.all(aggPricePromises);
        logger.logInfo("+" + (Math.round(Date.now() / 1000) - req_time) + "s aggregate fetch complete");
    });
}
/********************************************************
 * Reorganize data functions
 *******************************************************/
function processMarkets(markets) {
    // map different exchange asset tickers to universal ticker
    for (const [index, market] of markets.entries()) {
        for (const exchange_pair in market) {
            if (market.hasOwnProperty(exchange_pair)) {
                let base = exchange_pair.split("/")[0];
                let quote = exchange_pair.split("/")[1];
                if (asset_map_1.asset_map[exchange_string[index]] && asset_map_1.asset_map[exchange_string[index]].hasOwnProperty(base)) {
                    let mapped_val = asset_map_1.asset_map[exchange_string[index]][base];
                    let new_key = mapped_val + "/" + exchange_pair.split("/")[1];
                    // tslint:disable-next-line:max-line-length
                    Object.defineProperty(markets[index], new_key, Object.getOwnPropertyDescriptor(markets[index], exchange_pair));
                    delete markets[index][exchange_pair];
                    markets[index][new_key].symbol = new_key;
                    markets[index][new_key].base = mapped_val;
                }
                if (asset_map_1.asset_map[exchange_string[index]] && asset_map_1.asset_map[exchange_string[index]].hasOwnProperty(quote)) {
                    let mapped_val = asset_map_1.asset_map[exchange_string[index]][quote];
                    let new_key = exchange_pair.split("/")[0] + "/" + mapped_val;
                    // tslint:disable-next-line:max-line-length
                    Object.defineProperty(markets[index], new_key, Object.getOwnPropertyDescriptor(markets[index], exchange_pair));
                    delete markets[index][exchange_pair];
                    markets[index][new_key].symbol = new_key;
                    markets[index][new_key].quote = mapped_val;
                }
            }
        }
    }
    // create market detail objects
    const market_details = new market_details_1.MarketDetails();
    market_details.exchange_details = { "Aggregate": new Set() };
    market_details.pair_details = {};
    market_details.asset_details = {};
    for (const [index, market] of markets.entries()) {
        market_details.exchange_details[exchanges[exchange_string[index]].name] = new Set();
        for (const exchange_pair in market) {
            if (market.hasOwnProperty(exchange_pair)) {
                if (exchange_pair.includes("/")) {
                    market_details.exchange_details[exchanges[exchange_string[index]].name].add(exchange_pair);
                    market_details.exchange_details["Aggregate"].add(exchange_pair);
                    if (!market_details.pair_details[exchange_pair]) {
                        market_details.pair_details[exchange_pair] = new Set();
                        // probably don't want "aggregate" to show up in list of exchanges
                        // market_details.pair_details[exchange_pair].add("aggregate");
                    }
                    market_details.pair_details[exchange_pair].add(exchanges[exchange_string[index]].name);
                    if (!market_details.asset_details[market[exchange_pair].base]) {
                        market_details.asset_details[market[exchange_pair].base] = new Set();
                    }
                    if (!market_details.asset_details[market[exchange_pair].quote]) {
                        market_details.asset_details[market[exchange_pair].quote] = new Set();
                    }
                    market_details.asset_details[market[exchange_pair].base].add(exchanges[exchange_string[index]].name);
                    market_details.asset_details[market[exchange_pair].quote].add(exchanges[exchange_string[index]].name);
                }
            }
        }
    }
    return market_details;
}
//# sourceMappingURL=update-process.js.map