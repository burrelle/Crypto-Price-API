import {
  Observable,
  from
} from "rxjs";
// import RDS connection info for PostgreSQL client
import { Pool } from "pg";
import {
  Ticker
} from "../models/ticker";
import {
  Exchange
} from "../models/exchange";
import * as logger from "../logger/logger";

require("dotenv").config();

export const pool: Pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432
});

export function checkAsset(ticker: string): Promise < any > {
  return pool.query("INSERT INTO assets (asset_ticker) VALUES ($1) ON CONFLICT (asset_ticker) DO NOTHING", [ticker])
    .catch(e => {
      logger.logError("checkAsset query", e);
    });
}

export function checkPair(base: string, quote: string): Promise < any > {
  // tslint:disable-next-line:max-line-length
  return pool.query("INSERT INTO pairs (base_id, quote_id) SELECT (SELECT asset_id FROM assets WHERE asset_ticker = $1), (SELECT asset_id FROM assets WHERE asset_ticker = $2) ON CONFLICT (base_id, quote_id) DO NOTHING", [base, quote])
    .catch(e => {
      logger.logError("checkPair query", e);
    });
}

export function checkExchangePair(base: string, quote: string, precision: number, active: boolean, exchange: string): Promise < any > {
  // tslint:disable-next-line:max-line-length
  return pool.query("INSERT INTO exchange_pairs (exchange_id, pair_id, price_precision, active) SELECT (SELECT exchange_id FROM exchanges WHERE exchange_name = $1), (SELECT p.pair_id FROM pairs p WHERE p.base_id = (SELECT asset_id FROM assets WHERE asset_ticker = $2) AND p.quote_id = (SELECT asset_id FROM assets WHERE asset_ticker = $3)), $4, $5 ON CONFLICT (exchange_id, pair_id) DO UPDATE SET price_precision = $4, active = $5", [exchange, base, quote, precision, active])
    .catch(e => {
      logger.logError("checkExchangePair query base: " + base + " quote: " + quote, e);
    });
}


export function checkExchangePairSimple(base: string, quote: string, exchange: string): Promise < any > {
  // tslint:disable-next-line:max-line-length
  return pool.query("INSERT INTO exchange_pairs (exchange_id, pair_id) SELECT (SELECT exchange_id FROM exchanges WHERE exchange_name = $1), (SELECT p.pair_id FROM pairs p WHERE p.base_id = (SELECT asset_id FROM assets WHERE asset_ticker = $2) AND p.quote_id = (SELECT asset_id FROM assets WHERE asset_ticker = $3)) ON CONFLICT (exchange_id, pair_id) DO NOTHING", [exchange, base, quote])
    .catch(e => {
      logger.logError("checkExchangePair query base: " + base + " quote: " + quote, e);
    });
}


export function checkExchange(exchange: Exchange): Promise < any > {
  return pool.query(
    // tslint:disable-next-line:max-line-length
    "INSERT INTO exchanges (exchange_name, countries, exchange_url) VALUES ($1, $2, $3) ON CONFLICT (exchange_name) DO UPDATE SET exchange_name = $1, countries = $2, exchange_url = $3", [exchange.name, exchange.countries, exchange.exchange_url]
  ).catch(e => {
    logger.logError("checkExchange query", e);
  });
}

export function checkExchangeSimple(exchange: Exchange): Promise < any > {
  return pool.query(
    // tslint:disable-next-line:max-line-length
    "INSERT INTO exchanges (exchange_name) VALUES ($1) ON CONFLICT (exchange_name) DO UPDATE SET exchange_name = $1", [exchange.name]
  ).catch(e => {
    logger.logError("checkExchange query", e);
  });
}

export function checkPrice(priceObj: Ticker, ): Promise < any > {
  return pool.connect()
    .then(client => {
      return client.query(
          // tslint:disable-next-line:max-line-length
          "INSERT INTO prices (exchange_pair_id, price, bid, ask, baseVolume, ts) SELECT exchange_pair_id, $1, $2, $3, $4, $5 FROM exchange_pairs WHERE exchange_id = (SELECT exchange_id FROM exchanges WHERE exchange_name = ($6)) AND pair_id = (SELECT p.pair_id FROM pairs p WHERE p.base_id = (SELECT asset_id FROM assets WHERE asset_ticker = ($7)) AND p.quote_id = (SELECT asset_id FROM assets WHERE asset_ticker = ($8))) RETURNING price_id, exchange_pair_id", [priceObj.price, priceObj.bid, priceObj.ask, priceObj.baseVolume, Math.round(priceObj.ts), priceObj.exchange, priceObj.base, priceObj.quote]
        )
        .then(res => {
          if (res.rows[0]) {
            // tslint:disable-next-line:max-line-length
            return client.query(
              "UPDATE exchange_pairs SET last_price = $1 WHERE exchange_pair_id = $2", [res.rows[0].price_id, res.rows[0].exchange_pair_id]
            ).then(_ => {
              client.release();
              return res.rows[0];
            }).catch(err => {
              logger.logError("checkPrice UPDATE query", err);
            });
          } else {
            client.release();
          }
        }).catch(e => {
          client.release();
          logger.logError("checkPrice INSERT query", e);
        });
    });
}

export function shutdown(): Promise < any > {
  return pool.end();
}