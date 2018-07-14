"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import ccxt - crypto trading library
const ccxt = require("ccxt");
const timer_1 = require("rxjs/observable/timer");
// basic database connection
/* pool.connect((err, client, done) => {
    if (err) {
        throw err;
    }
    client.query("SELECT * FROM users WHERE id = $1", [1], (err, res) => {
      done();

      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows[0]);
      }
    });
}); */
const exchange_string = ["binance", "bitfinex", "bittrex", "coinbase", "kraken"];
const exchanges = {};
for (const exchange of exchange_string) {
    exchanges[exchange] = new ccxt[exchange]();
}
timer_1.timer(5000, 10000).subscribe(res => {
    for (const exchange of exchange_string) {
        exchanges[exchange].loadMarkets().then(data => {
            console.log(data);
        });
    }
});
//# sourceMappingURL=update-process.js.map