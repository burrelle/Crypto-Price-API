import React from "react";
import Card from "./card.jsx";
import Sidebar from "./sidebar";
import JsonExamples from "../../utils/JsonExamples.js";

const Content = () => {
  return (
    <div className="h-full overflow-hidden flex pt-24">
      <Sidebar />
      <div className="h-screen w-full overflow-y-auto flex">
        <div id="right" className="h-full w-full flex flex-col">
          <div className="overflow-y-auto p-4 flex-1">
            <div id="Assets">
              <Card
                verb="GET"
                endpoint="/assets"
                description="Get all of the available assets"
                json={JsonExamples.getAllAssets}
              />
              <Card
                verb="GET"
                endpoint="/assets/{assetsName}"
                description="Get information about a specific asset"
                json={JsonExamples.getSingleAsset}
              />
            </div>
            <div id="Exchanges">
              <Card
                verb="GET"
                endpoint="/exchanges"
                description="Get all of the available exchanges"
                json={JsonExamples.getAllExchanges}
              />
              <Card
                verb="GET"
                endpoint="/exchanges/{exchange}"
                description="Get information about a specific exchange"
                json={JsonExamples.getSingleExchange}
              />
            </div>
            <div id="Pairs">
              <Card
                verb="GET"
                endpoint="/pairs"
                description="Get all of the available pairs"
                json={JsonExamples.getAllPairs}
              />
            </div>
            <div id="Price" />
            <Card
              verb="GET"
              endpoint="/prices/all"
              description="Get all of the available prices"
              json={JsonExamples.getAllPrices}
            />
            <Card
              verb="GET"
              endpoint="/prices?exchange={}&base={}&quote={}"
              description="Get the current exchange pair price"
              json={JsonExamples.getAllPrices}
            />
            <div id="Price History" />
            <Card
              verb="GET"
              endpoint="/prices/history?exchange=&base=&price="
              description="Get all of the available price history"
              json={JsonExamples.getPriceHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
