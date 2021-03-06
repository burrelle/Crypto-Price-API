export default {
    getAllAssets: [{
        asset_id: "integer",
        asset_name: "string",
        asset_ticker: "string",
        asset_website: "array",
        asset_circ_supply: "integer",
        asset_total_supply: "integer",
        exchanges: "array"
    }],
    getSingleAsset: {
        asset_id: "integer",
        asset_name: "string",
        asset_ticker: "string",
        asset_website: "array",
        asset_circ_supply: "integer",
        asset_total_supply: "integer",
        exchanges: "array"
    },
    getAllExchanges: [{
        exchange_id: "int",
        exchange_name: "string",
        countries: "array",
        pairs: "array",
        exchange_url: "string"
    }],
    getSingleExchange: {
        exchange_id: "int",
        exchange_name: "string",
        countries: "array",
        pairs: "array",
        exchange_url: "string"
    },
    getAllPairs: [{
        pair_id: "int",
        base: "string",
        quote: "string",
        exchanges: "array"
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