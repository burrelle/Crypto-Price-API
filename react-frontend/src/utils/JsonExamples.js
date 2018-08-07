export default {
    getAllAssets: [{
        asset_id: "int",
        asset_ticker: "string",
        asset_website: "string",
        asset_supply: "string"
    }],
    getSingleAsset: {
        asset_id: "int",
        asset_ticker: "string",
        asset_website: "string",
        asset_supply: "string"
    },
    getAllExchanges: [{
        exchange_id: "int",
        exchange_name: "string",
        countries: "json",
        exchange_url: "string",
        pairs: "text[]"
    }],
    getSingleExchange: {
        exchange_id: "int",
        exchange_name: "string",
        countries: "json",
        exchange_url: "string",
        pairs: "text[]"
    },
    getAllPairs: [{
        pair_id: "int",
        base: "string",
        quote: "string",
        exchanges: "text[]"
    }],
    getAllPrices: [{
        exchange_pair_id: "integer",
        exchange_name: "string",
        base: "string",
        quote: "string",
        last_price: "JSON",
        active: "boolean",
        price_precision: "integer"
    }],
    getPriceHistory: [{
        price_id: "integer",
        exchange_pair_id: "integer",
        price: "float",
        bid: "float",
        ask: "float",
        basevolume: "float",
        quotevolume: "float",
        ts: "timestamp"
    }]
}