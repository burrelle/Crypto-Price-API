"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ccxt = require("ccxt");
const exchange_string = ["binance", "bitfinex", "bittrex", "coinbase", "kraken"];
const exchanges = {};
for (const exchange of exchange_string) {
    exchanges[exchange] = new ccxt[exchange]();
}
//# sourceMappingURL=update-process.js.map