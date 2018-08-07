import React from "react";
import Charts from "./charts";

const ChartList = () => {
  return (
    <div>
      <Charts exchange="binance" base="btc" quote="usdt" />
      <Charts exchange="bitfinex" base="btc" quote="usdt" />
      <Charts exchange="coinbase" base="btc" quote="usd" />
      <Charts exchange="kraken" base="bch" quote="eur" />
      <Charts exchange="aggregate" base="eth" quote="btc" />
      <Charts exchange="bittrex" base="eth" quote="usdt" />
    </div>
  );
};

export default ChartList;
