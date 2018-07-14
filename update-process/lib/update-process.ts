// import ccxt - crypto trading library
import * as ccxt from "ccxt";
// import rxjs - async with observable streams
import { Observable } from "rxjs";
import { timer } from "rxjs/observable/timer";
// import PostgreSQL client
import { Client } from "pg";
import * as db from "./database";

const exchange_string: string[] = ["binance", "bitfinex", "bittrex", "coinbase", "kraken"];
const exchanges: object = {};
for (const exchange of exchange_string) {
    exchanges[exchange] = new ccxt[exchange] ();
}

timer(5000, 10000).subscribe(res => {
    for (const exchange of exchange_string) {
        exchanges[exchange].loadMarkets().then(data => {
            console.log(data);
        }, err => {
            console.log(err);
        });
    }
});