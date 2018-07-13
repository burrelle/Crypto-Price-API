import React from "react";
import Card from "./card.jsx";
import Sidebar from "./sidebar"
import JsonExamples from "../utils/JsonExamples.js";

const Content = () => {
  return (
    <div className="h-full overflow-hidden flex pt-24">
    <Sidebar />
    <div className="h-full w-full overflow-hidden flex">
      <div id="right" className="h-full w-full flex flex-col">
        <div className="overflow-y-auto p-4 flex-1">
          <Card
            verb="GET"
            endpoint="/coins"
            description="Get all of the available coins"
            json={JsonExamples.JsonExamples.getAllCoins}
          />
          <Card
            verb="GET"
            endpoint="/coins/{coinName}"
            description="Get information about a specific coin"
            json=""
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Content;
