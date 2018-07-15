﻿DROP TABLE IF EXISTS prices CASCADE;
DROP TABLE IF EXISTS pairs CASCADE;
DROP TABLE IF EXISTS assets CASCADE;
DROP TABLE IF EXISTS exchanges CASCADE;
DROP TABLE IF EXISTS exchange_pairs CASCADE;

-- price entry on a specific exchange at a given time
CREATE TABLE prices (
    price_id serial PRIMARY KEY,
    exchange_pair_id int NOT NULL,
    price float NOT NULL,
    bid float,
    ask float,
    baseVolume float,
    quoteVolume float,
    ts int NOT NULL
);

-- a trading pair of assets
CREATE TABLE pairs (
    pair_id serial PRIMARY KEY,
    -- base currency - references asset_id
    base_id int NOT NULL,
    -- quote currency - references asset_id
    quote_id int NOT NULL,
    UNIQUE(base_id, quote_id)
);

-- a specific asset/coin
CREATE TABLE assets (
    asset_id serial PRIMARY KEY,
    asset_name text UNIQUE,
    asset_ticker text UNIQUE NOT NULL,
    asset_website text,
    asset_supply float
);

-- an exchange
CREATE TABLE exchanges (
    exchange_id serial PRIMARY KEY,
    exchange_name text UNIQUE NOT NULL,
    countries text[],
    exchange_url text
);

-- a pair trading on a specific exchange
CREATE TABLE exchange_pairs (
    exchange_pair_id serial PRIMARY KEY,
    exchange_id int REFERENCES exchanges(exchange_id) ON DELETE CASCADE NOT NULL,
    pair_id int REFERENCES pairs(pair_id) ON DELETE CASCADE NOT NULL,
    last_price int REFERENCES prices(price_id) ON DELETE SET NULL,
    active boolean DEFAULT TRUE,
    price_precision int,
    UNIQUE (exchange_id, pair_id)
);

ALTER TABLE prices ADD CONSTRAINT prices_exchange_pair_fkey FOREIGN KEY (exchange_pair_id) REFERENCES exchange_pairs(exchange_pair_id) ON DELETE CASCADE;
ALTER TABLE pairs ADD CONSTRAINT pairs_asset_fkey1 FOREIGN KEY (base_id) REFERENCES assets(asset_id) ON DELETE CASCADE;
ALTER TABLE pairs ADD CONSTRAINT pairs_asset_fkey2 FOREIGN KEY (quote_id) REFERENCES assets(asset_id) ON DELETE CASCADE;