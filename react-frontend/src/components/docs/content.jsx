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
            <div class="w-auto text-grey-darker items-center p-4">
              <span class="text-lg font-bold pb-4">
                  API URL
              </span>
              <p class="leading-tight">
                  The API can be accessed with the URL: ec2-52-89-90-170.us-west-2.compute.amazonaws.com/api/
              </p>
            </div>
            <div id="Assets">
              <Card
                verb="GET"
                endpoint="/assets"
                description="Get all of the available assets"
                json={JsonExamples.getAllAssets}
                liveLink = "http://ec2-52-89-90-170.us-west-2.compute.amazonaws.com/api/assets"
              />
              <Card
                verb="GET"
                endpoint="/assets/{assetTicker}"
                description="Get information about a specific asset"
                json={JsonExamples.getSingleAsset}
                additionalInfo = "Live link leads to asset Cardano with ticker 'ADA'."
                liveLink = "http://ec2-52-89-90-170.us-west-2.compute.amazonaws.com/api/assets/ADA"
              />
            </div>
            <div id="Exchanges">
              <Card
                verb="GET"
                endpoint="/exchanges"
                description="Get all of the available exchanges"
                json={JsonExamples.getAllExchanges}
                liveLink = "http://ec2-52-89-90-170.us-west-2.compute.amazonaws.com/api/exchanges"
              />
              <Card
                verb="GET"
                endpoint="/exchanges/{exchangeName}"
                description="Get information about a specific exchange"
                json={JsonExamples.getSingleExchange}
                additionalInfo = "Live link leads to asset the exchange 'AGGREGATE'"
                liveLink = "http://ec2-52-89-90-170.us-west-2.compute.amazonaws.com/api/exchanges/AGGREGATE"
              />
            </div>
            <div id="Pairs">
              <Card
                verb="GET"
                endpoint="/pairs"
                description="Get all of the available pairs"
                json={JsonExamples.getAllPairs}
                liveLink = "http://ec2-52-89-90-170.us-west-2.compute.amazonaws.com/api/pairs"
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
              liveLink = "http://ec2-52-89-90-170.us-west-2.compute.amazonaws.com/api/prices/all"
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
