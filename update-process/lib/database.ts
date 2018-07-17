import { Observable, from } from "rxjs";
// import RDS connection info for PostgreSQL client
import { pool } from "./connection";
import { Ticker } from "./models/ticker";
import { Exchange } from "./models/exchange";

export function checkAsset(ticker: string): Promise<any> {
  return pool.connect()
  .then(client => {
    return client.query("INSERT INTO assets (asset_ticker) VALUES ($1) ON CONFLICT (asset_ticker) DO NOTHING", [ticker])
    .then(res => {
      client.release();
    }).catch(e => {
      client.release();
      console.log(e);
    });
  });
}

export function checkPair(base: string, quote:string): Promise<any> {
  return pool.connect()
  .then(client => {
    // tslint:disable-next-line:max-line-length
    return client.query("INSERT INTO pairs (base_id, quote_id) SELECT (SELECT asset_id FROM assets WHERE asset_ticker = $1), (SELECT asset_id FROM assets WHERE asset_ticker = $2) ON CONFLICT (base_id, quote_id) DO NOTHING", [base, quote])
    .then(res => {
      client.release();
    }).catch(e => {
      client.release();
      console.log(e);
    });
  });
}

export function checkExchangePair(base: string, quote: string, precision:number, active: boolean, exchange: string): Promise<any> {
  return pool.connect()
  .then(client => {
    // console.log(exchange);
    // tslint:disable-next-line:max-line-length
    return client.query("INSERT INTO exchange_pairs (exchange_id, pair_id, price_precision, active) SELECT (SELECT exchange_id FROM exchanges WHERE exchange_name = $1), (SELECT p.pair_id FROM pairs p WHERE p.base_id = (SELECT asset_id FROM assets WHERE asset_ticker = $2) AND p.quote_id = (SELECT asset_id FROM assets WHERE asset_ticker = $3)), $4, $5 ON CONFLICT (exchange_id, pair_id) DO NOTHING", [exchange, base, quote, precision, active])
    .then(res => {
      client.release();
    }).catch(e => {
      client.release();
      console.log(e);
    });
  });
}

export function checkExchange(exchange: Exchange): Promise<any> {
  return pool.connect()
  .then(client => {
    return client.query(
      // tslint:disable-next-line:max-line-length
      "INSERT INTO exchanges (exchange_name, exchange_url) VALUES ($1, $2) ON CONFLICT (exchange_name) DO NOTHING",
      [exchange.name, exchange.exchange_url]
    )
    .then(res => {
      client.release();
    }).catch(e => {
      client.release();
      console.log(e);
    });
  });
}

export function checkPrice(priceObj: Ticker, exchange: string): Promise<any> {
  return pool.connect()
  .then(client => {
    return client.query(
      // tslint:disable-next-line:max-line-length
      "INSERT INTO prices (exchange_pair_id, price, bid, ask, baseVolume, ts) SELECT exchange_pair_id, $1, $2, $3, $4, $5 FROM exchange_pairs WHERE exchange_id = (SELECT exchange_id FROM exchanges WHERE exchange_name = ($6)) AND pair_id = (SELECT p.pair_id FROM pairs p WHERE p.base_id = (SELECT asset_id FROM assets WHERE asset_ticker = ($7)) AND p.quote_id = (SELECT asset_id FROM assets WHERE asset_ticker = ($8))) RETURNING price_id, exchange_pair_id", [priceObj.price, priceObj.bid, priceObj.ask, priceObj.baseVolume, Math.round(priceObj.ts), exchange, priceObj.base, priceObj.quote]
    )
    .then(res => {
      if (res.rows[0]) {
        // tslint:disable-next-line:max-line-length
        return client.query(
          "UPDATE exchange_pairs SET last_price = $1 WHERE exchange_pair_id = $2",
          [res.rows[0].price_id, res.rows[0].exchange_pair_id]
        ).then(res => {
          client.release();
        }).catch(err => {
          console.log(err);
        });
      } else {
        client.release();
      }
    }).catch(e => {
      client.release();
      console.log(e);
    });
  });
}