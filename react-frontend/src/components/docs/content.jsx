import React from "react";
import Card from "./card.jsx";
import Sidebar from "./sidebar";
import JsonExamples from "../../utils/JsonExamples.js";

const Content = () => {
  const baseURL = "http://ec2-52-89-90-170.us-west-2.compute.amazonaws.com/api"
  return (
    <div className="h-full overflow-hidden flex pt-24">
      <Sidebar />
      <div className="h-screen w-full overflow-y-auto flex">
        <div id="right" className="h-full w-full flex flex-col">
          <div className="overflow-y-auto p-4 flex-1">
            <div class="w-auto text-grey-darker text-center p-4 mb-8">
              <span class="text-lg font-bold">
                  API URL: {baseURL}
              </span>
            </div>
            <div id="Assets">
              <Card
                verb="GET"
                endpoint="/assets"
                description="Get all of the available assets"
                json={JsonExamples.getAllAssets}
                liveLink = { baseURL + '/assets' }
              />
              <Card
                verb="GET"
                endpoint="/assets/{assetTicker}"
                description="Get information about a specific asset"
                json={JsonExamples.getSingleAsset}
                additionalInfo = "Live link leads to asset Cardano with ticker 'ADA'."
                liveLink = { baseURL + '/assets/ADA'}
              />
            </div>
            <div id="Exchanges">
              <Card
                verb="GET"
                endpoint="/exchanges"
                description="Get all of the available exchanges"
                json={JsonExamples.getAllExchanges}
                liveLink = { baseURL + '/exchanges'}
              />
              <Card
                verb="GET"
                endpoint="/exchanges/{exchangeName}"
                description="Get information about a specific exchange"
                json={JsonExamples.getSingleExchange}
                additionalInfo = "Live link leads to asset the exchange 'AGGREGATE'"
                liveLink = { baseURL + '/exchanges/AGGREGATE'}
              />
            </div>
            <div id="Pairs">
              <Card
                verb="GET"
                endpoint="/pairs"
                description="Get all of the available pairs"
                json={JsonExamples.getAllPairs}
                liveLink = { baseURL + '/pairs'}
              />
              <Card
                verb="GET"
                endpoint="/pair?base={}&quote={}"
                description="Get all of the available pairs"
                json={JsonExamples.getAllPairs}
                additionalInfo= "This is a placeholder."
                liveLink = "#"
              />
            </div>
            <div id="Price" />
            <Card
              verb="GET"
              endpoint="/prices/all"
              description="Get all of the available prices"
              json={JsonExamples.getAllPrices}
              liveLink = { baseURL + '/prices/all' }
            />
            <Card
              verb="GET"
              endpoint="/prices?exchange={}&base={}&quote={}"
              description="Get the current exchange pair price"
              json={JsonExamples.getAllPrices}
              additionalInfo = "This is a placeholder."
              liveLink = "#"
            />
            <div id="Price History" />
            <Card
              verb="GET"
              endpoint="/prices/history?exchange={}&base={}&price={}"
              description="Get all of the available price history"
              json={JsonExamples.getPriceHistory}
              additionalInfo = "This is a placeholder."
              liveLink = "#"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
