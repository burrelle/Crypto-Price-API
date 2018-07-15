// import ccxt - crypto trading library
import * as ccxt from "ccxt";
// import rxjs - async with observable streams
import { Observable } from "rxjs";
import { timer } from "rxjs/observable/timer";
// import PostgreSQL client
import { Client } from "pg";
import * as db from "./database";

// exchanges to pull price data from
const exchange_string: string[] = [
  /* "binance", "bitfinex","bittrex", */ "coinbase", "kraken"
];
// variable contains ccxt exchange objects
const exchanges: object = {};
// generate exchange objects
for (const exchange of exchange_string) {
  exchanges[exchange] = new ccxt[exchange]();
}

// time between data updates (in milliseconds)
const update_time: number = 10 * 1000;

timer(0, update_time).subscribe(res => {
  // iterate over all exchanges and get associated markets
  for (const exchange of exchange_string) {
    // load the markets for the given exchange
    exchanges[exchange].loadMarkets().then(
      data => {
        const assetPromises: Promise<any>[] = [];
        const asset_set: Set<string> = new Set();
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
            const pairPromises: Promise<any>[] = [];
                for (var exchange_pair in data) {
                    if (data.hasOwnProperty(exchange_pair)) {
                        pairPromises.push(db.checkPair(data[exchange_pair].base, data[exchange_pair].quote));
                    }
                }
                // also verify exchange is included in database
                const exchangePromise: Promise<any> = db.checkExchange(exchange);
                pairPromises.push(exchangePromise);
                // check database includes all asset pairs, then check all exchange asset pairs
                Promise.all(pairPromises).then(_ => {
                    // get all exchange pairs that need to be checked
                    const exchangePairPromises: Promise<any>[] = [];
                    for (var exchange_pair in data) {
                        if (data.hasOwnProperty(exchange_pair)) {
                            pairPromises.push(db.checkExchangePair(data[exchange_pair].base, data[exchange_pair].quote, exchange));
                        }
                    }
                    // check database includes all exchange pairs, then get
                    // prices for all pairs
                    Promise.all(exchangePairPromises).then(_ => {
                        // ADD PRICE DATA HERE
                        // get prices using fetchTicker/fetchTickers
                    }, err => {
                        console.log(err);
                    });
                }, err => {
                    console.log(err);
                });
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }
});
