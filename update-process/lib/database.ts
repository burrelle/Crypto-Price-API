import { Observable, from } from "rxjs";
// import RDS connection info for PostgreSQL client
import { pool } from "./connection";

export function checkAsset(ticker: string): Promise<any> {
  return pool.connect()
  .then(client => {
    client.query("INSERT INTO asset (asset_ticker) VALUES (\'" + ticker + "\') ON CONFLICT (asset_ticker) DO NOTHING")
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
    client.query("INSERT INTO pair (base_id, quote_id) SELECT (SELECT asset_id FROM asset WHERE asset_ticker = \'" + base + "\'), (SELECT asset_id FROM asset WHERE asset_ticker = \'" + quote + "\') ON CONFLICT (base_id, quote_id) DO NOTHING")
    .then(res => {
      client.release();
    }).catch(e => {
      client.release();
      console.log(e);
    });
  });
}

export function checkExchangePair(base: string, quote: string, exchange: string): Promise<any> {
  return pool.connect()
  .then(client => {
    // console.log(exchange);
    // tslint:disable-next-line:max-line-length
    client.query("INSERT INTO exchange_pair (exchange_id, pair_id) SELECT (SELECT exchange_id FROM exchange WHERE exchange_name = (\'" + exchange + "\')), (SELECT p.pair_id FROM pair p WHERE p.base_id = (SELECT asset_id FROM asset WHERE asset_ticker = (\'" + base + "\')) AND p.quote_id = (SELECT asset_id FROM asset WHERE asset_ticker = (\'" + quote + "\'))) ON CONFLICT (exchange_id, pair_id) DO NOTHING")
    .then(res => {
      client.release();
    }).catch(e => {
      client.release();
      console.log(e);
    });
  });
}

export function checkExchange(exchange: string): Promise<any> {
  return pool.connect()
  .then(client => {
    client.query(
      // tslint:disable-next-line:max-line-length
      "INSERT INTO exchange (exchange_name) VALUES (\'" + exchange + "\') ON CONFLICT (exchange_name) DO NOTHING"
    )
    .then(res => {
      client.release();
    }).catch(e => {
      client.release();
      console.log(e);
    });
  });
}