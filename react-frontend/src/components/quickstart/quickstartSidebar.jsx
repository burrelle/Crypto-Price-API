import React from "react";

const QuickstartSidebar = () => {
  const languages = ["Python", "Node", "Ruby", "PHP", "Java"];
  return (
    <div id="sidebar" className="h-full flex flex-col flex-no-shrink w-1/4 ">
      <div className="flex-grow overflow-y-auto p-4 leading-loose">
        <div className="text-sm font-bold text-grey-darkest">Languages</div>
        {languages.map(lang => {
          return (
            <div key={lang}>
              <a
                href={"#" + lang}
                className="no-underline text-grey hover:text-purple-dark"
              >
                {lang}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickstartSidebar;
