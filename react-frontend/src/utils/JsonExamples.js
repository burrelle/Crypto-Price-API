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
        exchange_url: "string"
    }],
    getSingleExchange: {
        exchange_id: "int",
        exchange_name: "string",
        countries: "json",
        exchange_url: "string"
    }
}
