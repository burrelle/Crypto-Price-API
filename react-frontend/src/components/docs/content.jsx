import React from "react";
import Card from "./card.jsx";
import Sidebar from "./sidebar";
import JsonExamples from "../../utils/JsonExamples.js";

const Content = () => {
  return (
    <div className="h-full overflow-hidden flex pt-24">
      <Sidebar />
      <div className="h-full w-full overflow-hidden flex">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
