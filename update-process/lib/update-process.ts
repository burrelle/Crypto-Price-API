import * as ccxt from "ccxt";
import { Observable } from "rxjs";
import { timer } from "rxjs/observable/timer";

const exchange_string: string[] = ["binance", "bitfinex", "bittrex", "coinbase", "kraken"];
const exchanges: object = {};
for (const exchange of exchange_string) {
    exchanges[exchange] = new ccxt[exchange] ();
}

timer(5000, 10000).subscribe(res => {
    for (const exchange of exchange_string) {
        (async function (): Promise<any> {
            console.log(exchanges[exchange].id, await exchanges[exchange].loadMarkets());
        }) ();
    }
});