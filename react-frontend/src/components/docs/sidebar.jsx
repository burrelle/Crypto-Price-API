import React from "react";

const Sidebar = () => {
  const endpoints = ['Assets', 'Exchanges']
  return (
    <div id="sidebar" className="h-full flex flex-col flex-no-shrink w-1/4 ">
      <div className="flex-grow overflow-y-auto p-4 leading-loose">
        <div className="text-sm font-bold text-grey-darkest">Endpoints</div>
        <div>
        {endpoints.map(endpoint => {
          return (
            <div key={endpoint}>
              <a
                href={"#" + endpoint}
                className="no-underline text-grey hover:text-purple-dark"
              >
                {endpoint}
              </a>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
