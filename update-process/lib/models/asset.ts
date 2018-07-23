export class Asset {
    ticker: string;
    name: string;
    img_url: string;
    website_url: string[];
    total_supply: number;
    circ_supply: number;
}

export const assets: object = {
    BTC: {
        ticker: "BTC",
        name: "Bitcoin",
        img_url: null,
        website_url: ["https://www.bitcoin.org"],
        circ_supply: null,
        total_supply: 21000000
    },
    ETH: {
        ticker: "ETH",
        name: "Ethereum",
        img_url: null,
        website_url: ["https://www.ethereum.org"],
        circ_supply: null,
        total_supply: 100860448.0
    },
    XRP: {
        ticker: "XRP",
        name: "Ripple",
        img_url: null,
        website_url: ["https://www.ripple.com"],
        circ_supply: null,
        total_supply: 100000000000
    },
    BCH: {
        ticker: "BCH",
        name: "Bitcoin Cash",
        img_url: null,
        website_url: ["https://www.bitcoincash.org"],
        circ_supply: null,
        total_supply: 21000000
    },
    EOS: {
        ticker: "EOS",
        name: "EOS",
        img_url: null,
        website_url: ["https://www.eos.io"],
        circ_supply: null,
        total_supply: 1000000000
    },
    XLM: {
        ticker: "XLM",
        name: "Stellar",
        img_url: null,
        website_url: ["https://www.stellar.org"],
        circ_supply: null,
        total_supply: 104125061584
    },
    LTC: {
        ticker: "LTC",
        name: "Litecoin",
        img_url: null,
        website_url: ["https://www.litecoin.com"],
        circ_supply: null,
        total_supply: 84000000
    },
    ADA: {
        ticker: "ADA",
        name: "Cardano",
        img_url: null,
        website_url: ["https://www.cardano.org"],
        circ_supply: null,
        total_supply: 31112483745
    },
    IOTA: {
        ticker: "IOTA",
        name: "IOTA",
        img_url: null,
        website_url: ["https://www.iota.org"],
        circ_supply: null,
        total_supply: 2779530283
    },
    USDT: {
        ticker: "USDT",
        name: "Tether",
        img_url: null,
        website_url: ["https://www.tether.io"],
        circ_supply: null,
        total_supply: 3080109502
    },
    TRX: {
        ticker: "TRX",
        name: "TRON",
        img_url: null,
        website_url: ["https://tron.network"],
        circ_supply: null,
        total_supply: 99000000000
    },
    NEO: {
        ticker: "NEO",
        name: "NEO",
        img_url: null,
        website_url: ["https://www.neo.org"],
        circ_supply: null,
        total_supply: 100000000
    },
    XMR: {
        ticker: "XMR",
        name: "Monero",
        img_url: null,
        website_url: ["https://www.monero.cc"],
        circ_supply: null,
        total_supply: null
    },
    DASH: {
        ticker: "DASH",
        name: "DASH",
        img_url: null,
        website_url: ["https://www.dash.org"],
        circ_supply: null,
        total_supply: 18900000
    },
    ETC: {
        ticker: "ETC",
        name: "Ethereum Classic",
        img_url: null,
        website_url: ["https://www.ethereumclassic.org"],
        circ_supply: null,
        total_supply: null
    },
    XEM: {
        ticker: "XEM",
        name: "NEM",
        img_url: null,
        website_url: ["https://www.nem.io"],
        circ_supply: null,
        total_supply: 8999999999
    },
    XTZ: {
        ticker: "XTZ",
        name: "Tezos",
        img_url: null,
        website_url: ["https://www.tezos.com"],
        circ_supply: null,
        total_supply: 763306930
    },
    BNB: {
        ticker: "BNB",
        name: "Binance",
        img_url: null,
        website_url: ["https://www.binance.com/"],
        circ_supply: null,
        total_supply: 192443301
    },
    OMG: {
        ticker: "OMG",
        name: "OmiseGO",
        img_url: null,
        website_url: ["https://omg.omise.co/"],
        circ_supply: null,
        total_supply: null
    },
    VEN: {
        ticker: "VEN",
        name: "VeChain",
        img_url: null,
        website_url: ["https://www.vechain.org/"],
        circ_supply: null,
        total_supply: 873378637
    },
    ZEC: {
        ticker: "ZEC",
        name: "ZCash",
        img_url: null,
        website_url: ["https://z.cash/"],
        circ_supply: null,
        total_supply: null
    },
    QTUM: {
        ticker: "QTUM",
        name: "QTUM",
        img_url: null,
        website_url: ["https://www.qtum.org/"],
        circ_supply: null,
        total_supply: 100664513
    },
    BCD: {
        ticker: "BCD",
        name: "Bitcoin Diamond",
        img_url: null,
        website_url: ["http://www.btcd.io/"],
        circ_supply: null,
        total_supply: 156756875
    },
    ZRX: {
        ticker: "ZRX",
        name: "0x",
        img_url: null,
        website_url: ["https://www.0xproject.com/"],
        circ_supply: null,
        total_supply: 1000000000
    },
    BCN: {
        ticker: "BCN",
        name: "Bytecoin",
        img_url: null,
        website_url: ["https://www.bytecoin.org/"],
        circ_supply: null,
        total_supply: 184470000000
    },
    DCR: {
        ticker: "DCR",
        name: "Decred",
        img_url: null,
        website_url: ["https://www.decred.org/"],
        circ_supply: null,
        total_supply: 21000000
    },
    ZIL: {
        ticker: "ZIL",
        name: "Zilliqa",
        img_url: null,
        website_url: ["https://www.zilliqa.com/"],
        circ_supply: null,
        total_supply: 12600000000
    },
    LSK: {
        ticker: "LSK",
        name: "Lisk",
        img_url: null,
        website_url: ["https://lisk.io/"],
        circ_supply: null,
        total_supply: 123512760
    },
    ICX: {
        ticker: "ICX",
        name: "ICON",
        img_url: null,
        website_url: ["https://www.icon.foundation/"],
        circ_supply: null,
        total_supply: 800460000
    },
    BTS: {
        ticker: "BTS",
        name: "BitShares",
        img_url: null,
        website_url: ["https://www.bitshares.org/"],
        circ_supply: null,
        total_supply: 3600570502
    },
    BTG: {
        ticker: "BTG",
        name: "Bitcoin Gold",
        img_url: null,
        website_url: ["https://www.bitcoingold.org/"],
        circ_supply: null,
        total_supply: 17237574
    },
    ONT: {
        ticker: "ONT",
        name: "Ontology",
        img_url: null,
        website_url: ["https://www.ont.io/"],
        circ_supply: null,
        total_supply: 1000000000
    },
    DGB: {
        ticker: "DBG",
        name: "DigiByte",
        img_url: null,
        website_url: ["https://www.digibyte.io/"],
        circ_supply: null,
        total_supply: 21000000000
    },
    AE: {
        ticker: "AE",
        name: "Aeternity",
        img_url: null,
        website_url: ["https://www.aeternity.com/"],
        circ_supply: null,
        total_supply: 273685830
    },
    MKR: {
        ticker: "MKR",
        name: "Maker",
        img_url: null,
        website_url: ["https://makerdao.com/"],
        circ_supply: null,
        total_supply: 1000000
    },
    DOGE: {
        ticker: "DOGE",
        name: "Dogecoin",
        img_url: null,
        website_url: ["https://www.dogecoin.com/"],
        circ_supply: null,
        total_supply: null
    },
    REP: {
        ticker: "REP",
        name: "Augur",
        img_url: null,
        website_url: ["https://www.augur.net/"],
        circ_supply: null,
        total_supply: null
    },
    STEEM: {
        ticker: "STEEM",
        name: "STEEM",
        img_url: null,
        website_url: ["https://www.steem.com/"],
        circ_supply: null,
        total_supply: 283004727
    },
    SC: {
        ticker: "SC",
        name: "Siacoin",
        img_url: null,
        website_url: ["https://www.sia.tech/"],
        circ_supply: null,
        total_supply: 35823750872
    },
    BTM: {
        ticker: "BTM",
        name: "Bytom",
        img_url: null,
        website_url: ["https://www.bytom.io/"],
        circ_supply: null,
        total_supply: 1407000000
    },
    XVG: {
        ticker: "XVG",
        name: "Verge",
        img_url: null,
        website_url: ["https://www.vergecurrency.com/"],
        circ_supply: null,
        total_supply: 16555000000
    },
    BAT: {
        ticker: "BAT",
        name: "Basic Attention Token",
        img_url: null,
        website_url: ["https://www.basicattentiontoken.org/"],
        circ_supply: null,
        total_supply: 1500000000
    },
    NANO: {
        ticker: "NANO",
        name: "NANO",
        img_url: null,
        website_url: ["https://www.nano.org/"],
        circ_supply: null,
        total_supply: 133248290
    },
    GNT: {
        ticker: "GNT",
        name: "Golem",
        img_url: null,
        website_url: ["https://golem.network/"],
        circ_supply: null,
        total_supply: 1000000000
    },
    WAVES: {
        ticker: "WAVES",
        name: "Waves",
        img_url: null,
        website_url: ["https://wavesplatform.com/"],
        circ_supply: null,
        total_supply: null
    },
    STRAT: {
        ticker: "STRAT",
        name: "Stratis",
        img_url: null,
        website_url: ["http://stratisplatform.com/"],
        circ_supply: null,
        total_supply: null
    },
    NPXS: {
        ticker: "NPXS",
        name: "Pundi X",
        img_url: null,
        website_url: ["https://www.pundix.com/"],
        circ_supply: null,
        total_supply: 280755195000
    },
    RHOC: {
        ticker: "RHOC",
        name: "RChain",
        img_url: null,
        website_url: ["https://www.rchain.coop/"],
        circ_supply: null,
        total_supply: 870663574
    },
    MITH: {
        ticker: "MITH",
        name: "Mithril",
        img_url: null,
        website_url: ["https://www.mith.io/"],
        circ_supply: null,
        total_supply: 1000000000
    },
    WTC: {
        ticker: "WTC",
        name: "Waltonchain",
        img_url: null,
        website_url: ["http://www.waltonchain.org/"],
        circ_supply: null,
        total_supply: 70000000
    },
    SNT: {
        ticker: "SNT",
        name: "Status",
        img_url: null,
        website_url: ["http://status.im/"],
        circ_supply: null,
        total_supply: 6804870174
    },
    KCS: {
        ticker: "KCS",
        name: "KuCoin Shares",
        img_url: null,
        website_url: ["https://www.kucoin.com/"],
        circ_supply: null,
        total_supply: 180730576
    },
    HSR: {
        ticker: "HSR",
        name: "Hshare",
        img_url: null,
        website_url: ["https://h.cash/"],
        circ_supply: null,
        total_supply: 84000000
    },
    PPT: {
        ticker: "PPT",
        name: "Poplous",
        img_url: null,
        website_url: ["http://www.populous.co/"],
        circ_supply: null,
        total_supply: 53252246
    },
    WAN: {
        ticker: "WAN",
        name: "Wanchain",
        img_url: null,
        website_url: ["https://www.wanchain.org/"],
        circ_supply: null,
        total_supply: 210000000
    },
    XIN: {
        ticker: "XIN",
        name: "Mixin",
        img_url: null,
        website_url: ["https://mixin.one/"],
        circ_supply: null,
        total_supply: 1000000
    },
    IOST: {
        ticker: "IOST",
        name: "IOST",
        img_url: null,
        website_url: ["http://www.iost.io/"],
        circ_supply: null,
        total_supply: 21000000000
    },
    MAID: {
        ticker: "MAID",
        name: "MaidSafeCoin",
        img_url: null,
        website_url: ["https://www.maidsafe.net/"],
        circ_supply: null,
        total_supply: null
    },
    GXS: {
        ticker: "GXS",
        name: "CXChain",
        img_url: null,
        website_url: ["https://gxs.gxb.io/"],
        circ_supply: null,
        total_supply: 100000000
    },
    DGD: {
        ticker: "DGD",
        name: "DigixDAO",
        img_url: null,
        website_url: ["https://digix.global/"],
        circ_supply: null,
        total_supply: null
    },
    ARDR: {
        ticker: "ARDR",
        name: "Ardor",
        img_url: null,
        website_url: ["https://www.ardorplatform.org/"],
        circ_supply: null,
        total_supply: 998999495
    },
    HT: {
        ticker: "HT",
        name: "Huobi Token",
        img_url: null,
        website_url: ["https://www.huobi.pro/"],
        circ_supply: null,
        total_supply: 500000000
    },
    AION: {
        ticker: "AION",
        name: "Aion",
        img_url: null,
        website_url: ["https://aion.network/"],
        circ_supply: null,
        total_supply: 465934587
    },
    ELF: {
        ticker: "ELF",
        name: "AELF",
        img_url: null,
        website_url: ["https://www.aelf.io/"],
        circ_supply: null,
        total_supply: 280000000
    },
    KMD: {
        ticker: "KMD",
        name: "Komodo",
        img_url: null,
        website_url: ["https://www.komodoplatform.com/"],
        circ_supply: null,
        total_supply: null
    },
    NAS: {
        ticker: "NAS",
        name: "Nebulas",
        img_url: null,
        website_url: ["https://www.nebulas.io/"],
        circ_supply: null,
        total_supply: 100000000
    },
    MOAC: {
        ticker: "MOAC",
        name: "MOAC",
        img_url: null,
        website_url: ["https://www.moac.io/"],
        circ_supply: null,
        total_supply: 56483386
    },
    LRC: {
        ticker: "LRC",
        name: "Loopring",
        img_url: null,
        website_url: ["https://www.loopring.org/"],
        circ_supply: null,
        total_supply: 1374956262
    },
    KIN: {
        ticker: "KIN",
        name: "Kin",
        img_url: null,
        website_url: ["https://www.kinecosystem.org/"],
        circ_supply: null,
        total_supply: 10000000000000
    },
    MANA: {
        ticker: "MANA",
        name: "Decentraland",
        img_url: null,
        website_url: ["https://www.decentraland.org/"],
        circ_supply: null,
        total_supply: 2644403343
    },
    BTCP: {
        ticker: "BTCP",
        name: "Bitcoin Private",
        img_url: null,
        website_url: ["https://www.btcprivate.org/"],
        circ_supply: null,
        total_supply: 21000000
    },
    ARK: {
        ticker: "ARK",
        name: "Ark",
        img_url: null,
        website_url: ["https://www.ark.io/"],
        circ_supply: null,
        total_supply: 135268950
    },
    MONA: {
        ticker: "MONA",
        name: "MonaCoin",
        img_url: null,
        website_url: ["https://www.monacoin.org/"],
        circ_supply: null,
        total_supply: 61042675
    },
    POWR: {
        ticker: "POWR",
        name: "Power Ledger",
        img_url: null,
        website_url: ["https://www.powerledger.io/"],
        circ_supply: null,
        total_supply: 1000000000
    },
    FUN: {
        ticker: "FUN",
        name: "FunFair",
        img_url: null,
        website_url: ["https://www.funfair.io/"],
        circ_supply: null,
        total_supply: 10999873621
    },
    KNC: {
        ticker: "KNC",
        name: "Kyber Network",
        img_url: null,
        website_url: ["https://kyber.network/"],
        circ_supply: null,
        total_supply: 215625349
    },
    DROP: {
        ticker: "DROP",
        name: "Dropil",
        img_url: null,
        website_url: ["https://www.dropil.com/"],
        circ_supply: null,
        total_supply: 30000000000
    },
    EMC: {
        ticker: "EMC",
        name: "Emercoin",
        img_url: null,
        website_url: ["https://www.emercoin.com/"],
        circ_supply: null,
        total_supply: null
    },
    MCO: {
        ticker: "MCO",
        name: "MCO",
        img_url: null,
        website_url: ["https://mco.crypto.com/"],
        circ_supply: null,
        total_supply: 31587682
    },
    CNX: {
        ticker: "CNX",
        name: "Cryptonex",
        img_url: null,
        website_url: ["https://www.cryptonex.org/"],
        circ_supply: null,
        total_supply: 106820966
    },
    RDD: {
        ticker: "RDD",
        name: "ReddCoin",
        img_url: null,
        website_url: ["https://www.reddcoin.com/"],
        circ_supply: null,
        total_supply: null
    },
    WAX: {
        ticker: "WAX",
        name: "WAX",
        img_url: null,
        website_url: ["https://www.wax.io/"],
        circ_supply: null,
        total_supply: 1850000000
    },
    DCN: {
        ticker: "DCN",
        name: "Dentacoin",
        img_url: null,
        website_url: ["http://www.dentacoin.com/"],
        circ_supply: null,
        total_supply: 1963173416170
    },
    LOOM: {
        ticker: "LOOM",
        name: "Loom Network",
        img_url: null,
        website_url: ["https://www.loomx.io/"],
        circ_supply: null,
        total_supply: 1000000000
    },
    BNT: {
        ticker: "BNT",
        name: "Bancor",
        img_url: null,
        website_url: ["https://bancor.network/"],
        circ_supply: null,
        total_supply: 75903338
    },
    PAY: {
        ticker: "PAY",
        name: "TenX",
        img_url: null,
        website_url: ["https://www.tenx.tech/"],
        circ_supply: null,
        total_supply: 205218256
    },
    ZEN: {
        ticker: "ZEN",
        name: "ZenCash",
        img_url: null,
        website_url: ["https://www.zencash.com/"],
        circ_supply: null,
        total_supply: 21000000
    },
    GAS: {
        ticker: "GAS",
        name: "Gas",
        img_url: null,
        website_url: ["https://www.neo.org/"],
        circ_supply: null,
        total_supply: 17190378
    },
    NULS: {
        ticker: "NULS",
        name: "Nuls",
        img_url: null,
        website_url: ["https://www.nuls.io/"],
        circ_supply: null,
        total_supply: null
    },
    PIVX: {
        ticker: "PIVX",
        name: "PIVX",
        img_url: null,
        website_url: ["https://www.pivx.org/"],
        circ_supply: null,
        total_supply: null
    },
    PAYX: {
        ticker: "PAYX",
        name: "Paypex",
        img_url: null,
        website_url: ["https://www.paypex.org/"],
        circ_supply: null,
        total_supply: 150000000
    },
    POLY: {
        ticker: "POLY",
        name: "Polymath",
        img_url: null,
        website_url: ["https://www.polymath.network/"],
        circ_supply: null,
        total_supply: 1000000000
    },
    NXT: {
        ticker: "NXT",
        name: "Nxt",
        img_url: null,
        website_url: ["https://www.nxt.org/"],
        circ_supply: null,
        total_supply: 1000000000
    },
    CMT: {
        ticker: "CMT",
        name: "CyberMiles",
        img_url: null,
        website_url: ["https://www.cybermiles.io/"],
        circ_supply: null,
        total_supply: 1000000000
    },
    VERI: {
        ticker: "VERI",
        name: "Veritaseum",
        img_url: null,
        website_url: ["https://veritas.veritaseum.com/"],
        circ_supply: null,
        total_supply: 100000000
    },
    SMART: {
        ticker: "SMART",
        name: "SmartCash",
        img_url: null,
        website_url: ["https://www.smartcash.cc/"],
        circ_supply: null,
        total_supply: 1654817331
    },
    ETP: {
        ticker: "ETP",
        name: "Metaverse ETP",
        img_url: null,
        website_url: ["https://www.mvs.org/"],
        circ_supply: null,
        total_supply: 55905056
    },
    ETHOS: {
        ticker: "ETHOS",
        name: "Ethos",
        img_url: null,
        website_url: ["https://www.ethos.io/"],
        circ_supply: null,
        total_supply: 222295208
    },
    ENG: {
        ticker: "ENG",
        name: "Enigma",
        img_url: null,
        website_url: ["https://www.enigma.co/"],
        circ_supply: null,
        total_supply: 150000000
    },
    QASH: {
        ticker: "QASH",
        name: "QASH",
        img_url: null,
        website_url: ["https://liquid.plus/"],
        circ_supply: null,
        total_supply: 1000000000
    }
};