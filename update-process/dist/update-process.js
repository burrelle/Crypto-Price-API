"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import ccxt - crypto trading library
const ccxt = require("ccxt");
const timer_1 = require("rxjs/observable/timer");
const db = require("./database");
const ticker_1 = require("./models/ticker");
const exchange_1 = require("./models/exchange");
const CHECK_EXCHANGE = false;
// exchanges to pull price data from
// currently requires ccxt exchange api to have "fetchTickers" method - coinbase
// doesn't have this method
const exchange_string = [
    "binance", "bitfinex", "bittrex", /*"coinbase",*/ "kraken"
];
// variable contains ccxt exchange objects
const exchanges = {};
// generate exchange objects
for (const exchange of exchange_string) {
    exchanges[exchange] = new ccxt[exchange]();
    if (CHECK_EXCHANGE) {
        console.log(exchange + " " + exchanges[exchange].has.fetchTickers);
    }
}
// time between data updates (in milliseconds)
const update_time = 120 * 1000;
const start_time = update_time - Date.now() % update_time;
var active = false;
// get price data every two minutes on the minute
timer_1.timer(/* start_time */ 0, update_time).subscribe(res => {
    // iterate over all exchanges and get associated markets
    if (active) {
        console.log("ts: " + Date.now() + " not fetching prices because previous operation ongoing");
    }
    else {
        console.log("ts: " + Date.now() + " fetching prices for: " + exchange_string);
        active = true;
        for (const exchange of exchange_string) {
            // load the markets for the given exchange
            exchanges[exchange].loadMarkets().then(data => {
                const assetPromises = [];
                const asset_set = new Set();
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
                Promise.all(assetPromises).then(res => {
                    // get all pairs that need to be checked
                    const pairPromises = [];
                    for (var exchange_pair in data) {
                        if (data.hasOwnProperty(exchange_pair)) {
                            pairPromises.push(db.checkPair(data[exchange_pair].base, data[exchange_pair].quote));
                        }
                    }
                    const eObj = new exchange_1.Exchange();
                    eObj.countries = exchanges[exchange].countries;
                    eObj.name = exchanges[exchange].name;
                    eObj.exchange_url = exchanges[exchange].urls.www;
                    // also verify exchange is included in database
                    const exchangePromise = db.checkExchange(eObj);
                    pairPromises.push(exchangePromise);
                    // check database includes all asset pairs, then check all exchange asset pairs
                    Promise.all(pairPromises).then(_ => {
                        // get all exchange pairs that need to be checked
                        const exchangePairPromises = [];
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
                                const pricePromises = [];
                                for (var ticker in tickers) {
                                    if (tickers.hasOwnProperty(ticker)) {
                                        const tObj = new ticker_1.Ticker();
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
                                }, err => {
                                    console.log(err);
                                });
                            });
                        }, err => {
                            console.log(err);
                        });
                    }, err => {
                        console.log(err);
                    });
                }, err => {
                    console.log(err);
                });
            }, err => {
                console.log(err);
            });
        }
    }
});
//# sourceMappingURL=update-process.js.map