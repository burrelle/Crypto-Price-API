DROP TABLE IF EXISTS price CASCADE;
DROP TABLE IF EXISTS pair CASCADE;
DROP TABLE IF EXISTS asset CASCADE;
DROP TABLE IF EXISTS exchange CASCADE;
DROP TABLE IF EXISTS exchange_pair CASCADE;

-- price entry on a specific exchange at a given time
CREATE TABLE price (
    price_id serial PRIMARY KEY,
    exchange_pair_id int NOT NULL,
    price float NOT NULL,
    bid float,
    ask float,
    baseVolume float,
    quoteVolume float,
    ts int NOT NULL
);

-- trading pair
CREATE TABLE pair (
    pair_id serial PRIMARY KEY,
    -- base currency - references asset_id
    base_id int NOT NULL,
    -- quote currency - references asset_id
    quote_id int NOT NULL,
    UNIQUE(base_id, quote_id)
);

-- specific asset/coin
CREATE TABLE asset (
    asset_id serial PRIMARY KEY,
    asset_name text UNIQUE,
    asset_ticker text UNIQUE NOT NULL,
    asset_website text,
    asset_supply float
);

-- exchange
CREATE TABLE exchange (
    exchange_id serial PRIMARY KEY,
    exchange_name text UNIQUE NOT NULL,
    countries text[],
    urls json,
    markets json,
    symbols json
);


CREATE TABLE exchange_pair (
    exchange_pair_id serial PRIMARY KEY,
    exchange_id int REFERENCES exchange(exchange_id) ON DELETE CASCADE NOT NULL,
    pair_id int REFERENCES pair(pair_id) ON DELETE CASCADE NOT NULL,
    last_price int REFERENCES price(price_id) ON DELETE SET NULL,
    active boolean,
    mkt_precision json,
    UNIQUE (exchange_id, pair_id)
);

ALTER TABLE price ADD CONSTRAINT price_exchchange_pair_fkey FOREIGN KEY (exchange_pair_id) REFERENCES exchange_pair(exchange_pair_id) ON DELETE CASCADE;
ALTER TABLE pair ADD CONSTRAINT pair_asset_fkey1 FOREIGN KEY (base_id) REFERENCES asset(asset_id) ON DELETE CASCADE;
ALTER TABLE pair ADD CONSTRAINT pair_asset_fkey2 FOREIGN KEY (quote_id) REFERENCES asset(asset_id) ON DELETE CASCADE;