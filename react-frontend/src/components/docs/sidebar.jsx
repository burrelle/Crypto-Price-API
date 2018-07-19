import React from "react";

const Sidebar = () => {
  return (
    <div id="sidebar" className="h-full flex flex-col flex-no-shrink w-1/4 ">
      <div className="flex-grow overflow-y-auto p-4 leading-loose">
        <div className="text-sm font-bold text-grey-darkest">Endpoints</div>
        <div>
          <a href="#" className="no-underline text-grey hover:text-purple-dark">
            Coins
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
