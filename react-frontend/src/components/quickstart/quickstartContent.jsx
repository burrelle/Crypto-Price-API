import React from "react";
import QuickstartCard from "./quickstartCard";
import QuickstartSidebar from "./quickstartSidebar";
import Python from "../../utils/PythonTutorial";
import Node from "../../utils/NodeTutorial";
import PHP from "../../utils/PhpTutorial";
import Ruby from "../../utils/RubyTutorial";
import Java from '../../utils/JavaTutorial';

const quickstartContent = () => {
  return (
    <div className="h-full overflow-hidden flex pt-24">
      <QuickstartSidebar />
      <div className="h-screen w-full overflow-y-auto flex">
        <div id="right" className="h-full w-full flex flex-col">
          <div className="overflow-y-auto p-4 flex-1">
            <div>
              <QuickstartCard language="Node" tutorial={<Node />} />
              <QuickstartCard language="PHP" tutorial={<PHP />}/>
              <QuickstartCard language="Ruby" tutorial={<Ruby />}/>
              <QuickstartCard language="Python" tutorial={<Python />} />
              <QuickstartCard language="Java" tutorial={<Java />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default quickstartContent;
