import React from "react";
import Card from "./card.jsx";
import Sidebar from "./sidebar";
import JsonExamples from "../../utils/JsonExamples.js";

const Content = () => {
  const baseURL = "http://localhost:3333/api";
  return (
    <div className="h-full overflow-hidden flex pt-24">
      <Sidebar />
      <div className="h-screen w-full overflow-y-auto flex">
        <div id="right" className="h-full w-full flex flex-col">
          <div className="overflow-y-auto p-4 flex-1">
            <div className="w-auto text-grey-darker text-center p-4 mb-8">
              <span className="text-lg font-bold">API URL: {baseURL}</span>
            </div>
            <div id="Assets">
              <Card
                verb="GET"
                endpoint="/assets"
                description="Get all of the available assets"
                json={JsonExamples.getAllAssets}
                liveLink={baseURL + "/assets"}
              />
              <Card
                verb="GET"
                endpoint="/assets/{assetTicker}"
                description="Get information about a specific asset"
                json={JsonExamples.getSingleAsset}
                additionalInfo="Live link leads to asset Cardano with ticker 'ADA'."
                liveLink={baseURL + "/assets/ADA"}
              />
            </div>
            <div id="Exchanges">
              <Card
                verb="GET"
                endpoint="/exchanges"
                description="Get all of the available exchanges"
                json={JsonExamples.getAllExchanges}
                liveLink={baseURL + "/exchanges"}
              />
              <Card
                verb="GET"
                endpoint="/exchanges/{exchangeName}"
                description="Get information about a specific exchange"
                json={JsonExamples.getSingleExchange}
                additionalInfo="Live link leads to asset the exchange 'AGGREGATE'"
                liveLink={baseURL + "/exchanges/Aggregate"}
              />
            </div>
            <div id="Pairs">
              <Card
                verb="GET"
                endpoint="/pairs"
                description="Get all of the available pairs"
                json={JsonExamples.getAllPairs}
                liveLink={baseURL + "/pairs"}
              />
              <Card
                verb="GET"
                endpoint="/pair?base={}&quote={}"
                description="Get information on a specific pair"
                json={JsonExamples.getAllPairs}
                additionalInfo="Live link leads to pair information about ETH and BTC"
                liveLink={baseURL + "/pair?base=eth&quote=btc"}
              />
            </div>
            <div id="Price" />
            <Card
              verb="GET"
              endpoint="/prices/all"
              description="Get all of the available prices"
              json={JsonExamples.getAllPrices}
              liveLink={baseURL + "/prices/all"}
            />
            <Card
              verb="GET"
              endpoint="/prices?exchange={}&base={}&quote={}"
              description="Get price information about a specific exchange via base and quote"
              json={JsonExamples.getAllPrices}
              additionalInfo="Live link leads to information about the binance exchange pair QTUM and BTC"
              liveLink={
                baseURL + "/prices?exchange=binance&base=QTUM&quote=BTC"
              }
            />
            <div id="Price History" />
            <Card
              verb="GET"
              endpoint="/prices/history?exchange={}&base={}&price={}"
              description="Get all of the available price history"
              json={JsonExamples.getPriceHistory}
              additionalInfo="Live link leads to price history for the aggregate exchange pair ABY and BTC"
              liveLink={
                baseURL + "/prices/history?exchange=aggregate&base=aby&quote=btc"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
