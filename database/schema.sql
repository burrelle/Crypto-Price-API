DROP TABLE IF EXISTS price;
DROP TABLE IF EXISTS pair;
DROP TABLE IF EXISTS asset;
DROP TABLE IF EXISTS exchange;
DROP TABLE IF EXISTS exchange_pair;

-- price entry on a specific exchange at a given time
CREATE TABLE price (
    price_id serial PRIMARY KEY,
    exchange_pair_id int,
    price float,
    vol24hr float,
    ts int
);

-- trading pair
CREATE TABLE pair (
    pair_id serial PRIMARY KEY,
    -- base currency symbol (i.e. 'USD')
    base int,
    -- quote currency symbol (i.e. 'ETH')
    quote int,
    UNIQUE(base, quote)
);

-- specific asset/coin
CREATE TABLE asset (
    asset_id serial PRIMARY KEY,
    asset_name text,
    asset_ticker text,
    asset_website text,
    asset_supply float
);

-- exchange
CREATE TABLE exchange (
    exchange_id serial PRIMARY KEY,
    exchange_name text
);


CREATE TABLE exchange_pair (
    exchange_pair_id serial PRIMARY KEY,
    exchange_id int REFERENCES exchange(exchange_id) ON DELETE CASCADE,
    pair_id int REFERENCES pair(pair_id) ON DELETE CASCADE,
    last_price int REFERENCES price(price_id) ON DELETE SET NULL,
    UNIQUE (exchange_id, pair_id)
);

ALTER TABLE price ADD CONSTRAINT price_exchchange_pair_fkey FOREIGN KEY (exchange_pair_id) REFERENCES exchange_pair(exchange_pair_id) ON DELETE CASCADE;
ALTER TABLE pair ADD CONSTRAINT pair_asset_fkey1 FOREIGN KEY (base) REFERENCES asset(asset_id) ON DELETE CASCADE;
ALTER TABLE pair ADD CONSTRAINT pair_asset_fkey2 FOREIGN KEY (quote) REFERENCES asset(asset_id) ON DELETE CASCADE;