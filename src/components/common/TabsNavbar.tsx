import React from "react";
import { NavLink } from "react-router-dom";

interface Tab {
  name: string;
  path: string;
}

interface TabsNavbarProps {
  tabs: Tab[];
}

const TabsNavbar: React.FC<TabsNavbarProps> = ({ tabs }) => {
  return (
    <div className="border-b border-gray-200 bg-white sticky top-0 z-10 overflow-y-hidden left-2 ">
      <div className="flex overflow-x-auto whitespace-nowrap px-2 scrollbar-hide justify-around">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `relative px-4 py-3 text-sm font-normal transition-colors duration-200
              ${
                isActive
                  ? "text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-600 after:rounded-t-sm "
                  : "text-gray-800 hover:text-blue-600 "
              }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default TabsNavbar;
