// if an asset has different tickers accross exchanges, map them to a single name
export const asset_map:object = {
    binance: {
        // asset Nano
        XRB: "NANO",
        // asset VeChain
        VEN: "VET"
    },
    bitfinex: {
        // asset VeChain
        VEN: "VET",
        // asset PolyMath
        POY: "POLY",
        // asset Everipedia
        IQX: "IQ",
        // asset Mithril
        MIT: "MITH",
        // asset NCASH
        NCA: "NCASH"
    },
    bittrex: {
        // asset NuBits
        NBT: "USNBT",
        // asset BitSwift
        SWIFT: "BITS"
    },
    kraken: {
        // asset Doge
        XDG: "DOGE"
    }
};