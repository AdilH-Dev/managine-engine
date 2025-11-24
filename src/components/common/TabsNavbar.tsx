import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface Tab {
  name: string;
  path: string;
}

interface TabsNavbarProps {
  tabs: Tab[];
}

interface TabState {
  visibleTabs: Tab[];
  hiddenTabs: Tab[];
}

const TabsNavbar: React.FC<TabsNavbarProps> = ({ tabs }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [tabState, setTabState] = useState<TabState>({
    visibleTabs: [],
    hiddenTabs: tabs, // start with all hidden until we measure
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const { visibleTabs, hiddenTabs } = tabState;

  // Calculate which tabs fit in the container. Ensure current route's tab is visible.
  const calculateTabs = () => {
    if (!containerRef.current || !measureRef.current) return;

    // Reserve some padding for the "more" button etc.
    const containerWidth = containerRef.current.offsetWidth - 40;
    let usedWidth = 0;

    const newVisible: Tab[] = [];
    const newHidden: Tab[] = [];

    const measureItems = measureRef.current.querySelectorAll(
      ".measure-item"
    ) as NodeListOf<HTMLElement>;

    tabs.forEach((tab, index) => {
      // fallback width if measurement not available
      const width = measureItems[index]?.offsetWidth || 80;

      if (usedWidth + width <= containerWidth) {
        usedWidth += width;
        newVisible.push(tab);
      } else {
        newHidden.push(tab);
      }
    });

    // Ensure the active route's tab is visible (so when user navigates to a hidden tab it shows immediately)
    const activePath = location.pathname;
    const activeInHiddenIndex = newHidden.findIndex(
      (t) => t.path === activePath
    );

    if (activeInHiddenIndex !== -1) {
      // move active tab to visible; move last visible to hidden (if any)
      const [activeTab] = newHidden.splice(activeInHiddenIndex, 1);

      // If there is no space (no visible tab to push), we still push it onto visible (may overflow)
      // but better: swap with last visible to keep counts stable
      const swappedOut = newVisible.pop();
      newVisible.push(activeTab);
      if (swappedOut) newHidden.unshift(swappedOut); // push swapped out at front of hidden
    }

    setTabState({
      visibleTabs: newVisible,
      hiddenTabs: newHidden,
    });
  };

  // Run on mount and whenever tabs or location change (so navigation triggers recalculation)
  useEffect(() => {
    // initial run
    calculateTabs();

    // small timeout to run after layout/fonts settle
    const t = setTimeout(() => calculateTabs(), 100);

    // also run on window resize (covers zoom & container changes)
    window.addEventListener("resize", calculateTabs);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", calculateTabs);
    };
    // include location so navigation triggers recalculation and ensures active tab is visible
  }, [tabs, location.pathname]);

  // When user clicks an item from the hidden menu: navigate and close the menu.
  // calculateTabs will run (because location.pathname changed) and will force active tab visible.
  const handleHiddenTabClick = (clickedTab: Tab) => {
    setMenuOpen(false);
    navigate(clickedTab.path);
  };

  return (
    <>
      {/* Measurement container */}
      <div
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none h-0 overflow-hidden"
        aria-hidden
      >
        {tabs.map((tab) => (
          <div
            key={tab.path}
            className="measure-item inline-block px-4 pt-2 text-sm font-normal"
          >
            {tab.name}
          </div>
        ))}
      </div>

      {/* Navbar */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10 w-full">
        <div
          ref={containerRef}
          className="flex items-center  whitespace-nowrap justify-start  px-4  relative"
        >
          {/* Visible Tabs */}
          {visibleTabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `relative py-[10px] px-[15px] text-sm transition-colors duration-200 ${
                  isActive
                    ? "text-[#4588F0] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-600"
                    : "text-gray-800 hover:text-blue-600"
                }`
              }
              onClick={() => {
                // If the user clicks a visible tab we want to recalc so active stays visible (no-op usually)
                // but keep the menu closed
                setMenuOpen(false);
              }}
            >
              {tab.name}
            </NavLink>
          ))}

          {/* Hidden Tabs Menu */}
          {hiddenTabs.length > 0 && (
            <TooltipProvider>
              <Tooltip delayDuration={150}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setMenuOpen((o) => !o)}
                    className="px-2 py-2 mb-2 text-xl font-bold cursor-pointer hover:text-blue-600 transition-colors"
                    aria-expanded={menuOpen}
                    aria-label="More tabs"
                    type="button"
                  >
                    …
                  </button>
                </TooltipTrigger>

                <TooltipContent
                  side="bottom"
                  className="bg-black text-white px-2 py-1 rounded-sm"
                >
                  More
                </TooltipContent>
              </Tooltip>

              {menuOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white shadow-md rounded-md border py-2 z-50 min-w-[140px]">
                  {hiddenTabs.map((tab) => (
                    <button
                      key={tab.path}
                      onClick={() => handleHiddenTabClick(tab)}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-[#f2f9ff] hover:text-[#4588F0] cursor-pointer"
                      type="button"
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
              )}
            </TooltipProvider>
          )}
        </div>
      </div>
    </>
  );
};

export default TabsNavbar;
