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
import { assets } from "../models/asset";
import { MarketDetails } from "../models/market_details";
import {
  asset_map
} from "../models/asset_map";

require("dotenv").config();

export const pool: Pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432
});

export function checkAsset(ticker: string, asset_details: string[], exchange: string): Promise < any > {
  ticker = getTicker(ticker, exchange.toLowerCase());
  if (assets[ticker]) {
    // tslint:disable-next-line:max-line-length
    return pool.query("INSERT INTO assets (asset_ticker, asset_name, asset_website, asset_total_supply, exchanges) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (asset_ticker) DO UPDATE SET asset_name = $2, asset_website=$3, asset_total_supply=$4, exchanges=$5", [ticker, assets[ticker].name, assets[ticker].website_url, assets[ticker].total_supply, asset_details])
    .catch(e => {
      logger.logError("checkAsset query", e);
    });
  } else {
    // tslint:disable-next-line:max-line-length
    return pool.query("INSERT INTO assets (asset_ticker, exchanges) VALUES ($1, $2) ON CONFLICT (asset_ticker) DO UPDATE SET exchanges = $2", [ticker, asset_details])
    .catch(e => {
      logger.logError("checkAsset query", e);
    });
  }

}

export function checkPair(base: string, quote: string, pair_details: string[], exchange: string): Promise < any > {
  base = getTicker(base, exchange.toLowerCase());
  quote = getTicker(quote, exchange.toLowerCase());
  // tslint:disable-next-line:max-line-length
  return pool.query("INSERT INTO pairs (base_id, quote_id, exchanges, base, quote) SELECT (SELECT asset_id FROM assets WHERE asset_ticker = $1), (SELECT asset_id FROM assets WHERE asset_ticker = $2), $3, $1, $2 ON CONFLICT (base_id, quote_id) DO UPDATE SET exchanges = $3, base = $1, quote = $2", [base, quote, pair_details])
    .catch(e => {
      logger.logError("checkPair query", e);
    });
}

export function checkExchangePair(base: string, quote: string, precision: number, active: boolean, exchange: string): Promise < any > {
  base = getTicker(base, exchange.toLowerCase());
  quote = getTicker(quote, exchange.toLowerCase());
  // tslint:disable-next-line:max-line-length
  return pool.query("INSERT INTO exchange_pairs (exchange_id, pair_id, price_precision, active) SELECT (SELECT exchange_id FROM exchanges WHERE exchange_name = $1), (SELECT p.pair_id FROM pairs p WHERE p.base_id = (SELECT asset_id FROM assets WHERE asset_ticker = $2) AND p.quote_id = (SELECT asset_id FROM assets WHERE asset_ticker = $3)), $4, $5 ON CONFLICT (exchange_id, pair_id) DO UPDATE SET price_precision = $4, active = $5", [exchange, base, quote, precision, active])
    .catch(e => {
      logger.logError("checkExchangePair query base: " + base + " quote: " + quote, e);
    });
}


export function checkExchangePairSimple(base: string, quote: string, exchange: string): Promise < any > {
  base = getTicker(base, exchange.toLowerCase());
  quote = getTicker(quote, exchange.toLowerCase());
  // tslint:disable-next-line:max-line-length
  return pool.query("INSERT INTO exchange_pairs (exchange_id, pair_id) SELECT (SELECT exchange_id FROM exchanges WHERE exchange_name = $1), (SELECT p.pair_id FROM pairs p WHERE p.base_id = (SELECT asset_id FROM assets WHERE asset_ticker = $2) AND p.quote_id = (SELECT asset_id FROM assets WHERE asset_ticker = $3)) ON CONFLICT (exchange_id, pair_id) DO NOTHING", [exchange, base, quote])
    .catch(e => {
      logger.logError("checkExchangePair query base: " + base + " quote: " + quote, e);
    });
}


export function checkExchange(exchange: Exchange, exchange_details: string[]): Promise < any > {
  return pool.query(
    // tslint:disable-next-line:max-line-length
    "INSERT INTO exchanges (exchange_name, countries, exchange_url, pairs) VALUES ($1, $2, $3, $4) ON CONFLICT (exchange_name) DO UPDATE SET exchange_name = $1, countries = $2, exchange_url = $3, pairs = $4", [exchange.name, exchange.countries, exchange.exchange_url, exchange_details]
  ).catch(e => {
    logger.logError("checkExchange query", e);
  });
}

export function checkExchangeSimple(exchange: Exchange, exchange_details: string[]): Promise < any > {
  return pool.query(
    // tslint:disable-next-line:max-line-length
    "INSERT INTO exchanges (exchange_name, pairs) VALUES ($1, $2) ON CONFLICT (exchange_name) DO UPDATE SET exchange_name = $1, pairs = $2", [exchange.name, exchange_details]
  ).catch(e => {
    logger.logError("checkExchange query", e);
  });
}

export function checkPrice(priceObj: Ticker): Promise < any > {
  priceObj.base = getTicker(priceObj.base, priceObj.exchange.toLowerCase());
  priceObj.quote = getTicker(priceObj.quote, priceObj.exchange.toLowerCase());
  // tslint:disable-next-line:max-line-length
  const table_name: string = "prices." + priceObj.exchange.toLowerCase() + "_" +  priceObj.base.toLowerCase() + "_" + priceObj.quote.toLowerCase();
  return pool.connect()
    .then(client => {
      // tslint:disable-next-line:max-line-length
      return client.query("CREATE TABLE IF NOT EXISTS " + table_name + " (price_id bigserial PRIMARY KEY, exchange_pair_id int NOT NULL, price float NOT NULL, bid float, ask float, baseVolume float, quoteVolume float, ts int NOT NULL)").then(res => {
        return client.query(
          // tslint:disable-next-line:max-line-length
          "INSERT INTO " + table_name + " (exchange_pair_id, price, bid, ask, baseVolume, ts) SELECT exchange_pair_id, $1, $2, $3, $4, $5 FROM exchange_pairs WHERE exchange_id = (SELECT exchange_id FROM exchanges WHERE exchange_name = ($6)) AND pair_id = (SELECT p.pair_id FROM pairs p WHERE p.base_id = (SELECT asset_id FROM assets WHERE asset_ticker = ($7)) AND p.quote_id = (SELECT asset_id FROM assets WHERE asset_ticker = ($8))) RETURNING price_id, exchange_pair_id", [priceObj.price, priceObj.bid, priceObj.ask, priceObj.baseVolume, Math.round(priceObj.ts), priceObj.exchange, priceObj.base, priceObj.quote]
        )
        .then(res => {
          if (res.rows[0]) {
            // tslint:disable-next-line:max-line-length
            return client.query(
               // tslint:disable-next-line:max-line-length
               "UPDATE exchange_pairs SET last_price = $1 WHERE exchange_pair_id = $2", [priceObj, res.rows[0].exchange_pair_id]
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
      }).catch(e => {
        client.release();
        logger.logError("checkPrice CREATE query", e);
      });
    });
}

export function shutdown(): Promise < any > {
  return pool.end();
}

// function maps different tickers for same asset to same ticker in database
function getTicker(ticker: string, exchange: string): string {

  if (asset_map[exchange] && asset_map[exchange].hasOwnProperty(ticker)) {
    return asset_map[exchange][ticker];
  } else {
    return ticker;
  }
}