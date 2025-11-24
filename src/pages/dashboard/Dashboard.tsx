import { MainLayout } from "@/components/Layout/MainLayout";
import { Card } from "@/components/ui/card";
import PieChartNew from "./PieChartNew";
import BarChart from "./BarChart";
import GaugeChart from "./GaugeChart1";
import ChartGauge from "./ChartGauge";
import EmptyChart from "./EmptyChart";
import StackedBarChart from "./StackedBarChart";
import StackedAreaChart from "./StackedAreaChart";
import SmallPieChart from "./SmallPieChart";
import { useState, useRef, useEffect } from "react";

// Settings Box Component
const SettingsBox = ({
  isOpen,
  onClose,
  refreshFrequency,
  onRefreshFrequencyChange,
  autoRefresh,
  onAutoRefreshChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  refreshFrequency: string;
  onRefreshFrequencyChange: (frequency: string) => void;
  autoRefresh: boolean;
  onAutoRefreshChange: (enabled: boolean) => void;
}) => {
  const frequencies = [
    "Never",
    "30 seconds",
    "1 minute",
    "5 minutes",
    "15 minutes",
    "30 minutes",
    "1 hour",
  ];
  const ref = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleFrequencySelect = (frequency: string) => {
    onRefreshFrequencyChange(frequency);
    setIsDropdownOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-96"
    >
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-lg font-[400px] text-gray-900 mb-2">Settings</h2>
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm font-[400px] text-gray-700 mb-2">
            Refresh Frequency
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {refreshFrequency}
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {frequencies.map((frequency) => (
                  <button
                    key={frequency}
                    type="button"
                    className={`w-full px-3 py-2 text-sm text-left transition-colors ${
                      frequency === refreshFrequency
                        ? ""
                        : "text-gray-700 hover:bg-cyan-50 hover:text-blue-600"
                    }`}
                    onClick={() => handleFrequencySelect(frequency)}
                  >
                    {frequency}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => onAutoRefreshChange(!autoRefresh)}
            className={`relative inline-flex h-4 w-9 items-center rounded-full ${
              autoRefresh ? "bg-green-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                autoRefresh ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <label className="text-sm font-[400px] text-gray-700">
            Enable SmartView
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <circle cx="10" cy="10" r="10" fill="#3b82f6" />
            <text
              x="10"
              y="14"
              textAnchor="middle"
              fill="white"
              fontFamily="Arial"
              fontSize="10"
              fontWeight="bold"
            >
              ?
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

// Reusable CustomDropdown Component with bold heading
const CustomDropdown = ({
  options,
  defaultValue,
}: {
  options: string[];
  defaultValue: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-auto" ref={ref}>
      <div
        className="cursor-pointer font-[600] text-[#262f36] text-normal py-1 px-2 whitespace-nowrap truncate flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
        title={selected}
      >
        <span className="truncate">{selected}</span>
        <svg
          className={`w-3 h-3 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-0" : "rotate-0"
          } text-gray-400`}
          fill="none"
          stroke="currentColor"
          strokeWidth={5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute mt-0 w-full sm:min-w-[200px] bg-white rounded-sm shadow-md border border-gray-200 z-10">
          {options.map((option) => (
            <div
              key={option}
              className="px-2 py-1 cursor-pointer hover:bg-cyan-50 hover:text-[#4588f0] text-[13px] font-medium whitespace-nowrap truncate font-normal"
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              title={option}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Fixed CardActions component with dynamic icons based on chart type

const CardActions = ({
  onRefresh,
  onMaximize,
  onGraph,
  isMaximized = false,
  showGraphButton = true,
  isVisible = true,
  chartType = "graph", // New prop to determine icon type
}: {
  onRefresh: () => void;
  onMaximize: () => void;
  onGraph?: () => void;
  isMaximized?: boolean;
  showGraphButton?: boolean;
  isVisible?: boolean;
  chartType?: "pie" | "table" | "bar" | "line" | "graph"; // New prop
}) => {
  // Function to get the appropriate graph icon
  const getGraphIcon = () => {
    switch (chartType) {
      case "pie":
        return (
          <svg
            className="w-3.5 h-3.5 text-purple-500" // Purple for pie charts
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
            <path d="M22 12A10 10 0 0 0 12 2v10z" />
          </svg>
        );
      case "table":
        return (
          <svg
            className="w-3.5 h-3.5 text-green-500" // Green for tables
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="15" y1="3" x2="15" y2="21" />
          </svg>
        );
      case "bar":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="gray"
            viewBox="0 0 16 16"
          >
            <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z" />
          </svg>
        );
      case "line":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="gray"
            viewBox="0 0 16 16"
          >
            <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z" />
          </svg>
        );
      default:
        return (
          <svg
            className="w-3.5 h-3.5 text-gray-500" // Gray for default
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M3 13h4v8H3zm7-5h4v13h-4zm7-6h4v19h-4z" />
          </svg>
        );
    }
  };

  return (
    <div className="flex items-center">
      <div
        className={`flex items-center bg-white border border-gray-300 rounded-md px-1 shadow-sm transition-all duration-200 ${
          !isVisible ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Maximize Button  */}
        <button
          onClick={onMaximize}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
          title={isMaximized ? "Minimize" : "Maximize"}
        >
          {isMaximized ? (
            // Minimize icon (inward arrows - correct minimize/restore icon)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="gray"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707M15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707"
              />
            </svg>
          ) : (
            // Maximize icon (outward arrows)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="gray"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"
              />
            </svg>
          )}
        </button>

        {/* Refresh Button  */}
        <button
          onClick={onRefresh}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
          title="Refresh"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="gray"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192l-2.36 1.966c-.12.1-.12.284 0 .384L7.59 4.658A.25.25 0 0 0 8 4.466" />
          </svg>
        </button>

        {/* Graph Button  */}
        {showGraphButton && onGraph && (
          <>
            <button
              onClick={onGraph}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
              title="Change Graph Type"
            >
              {getGraphIcon()}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Filter Box Component as Dropdown
const FilterBox = ({
  isOpen,
  onClose,
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  onApply: (selectedSite: string, selectedGroup: string) => void;
}) => {
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [applyToDashboardOnly, setApplyToDashboardOnly] = useState(false);
  const [isSiteDropdownOpen, setIsSiteDropdownOpen] = useState(false);
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
  const [siteSearch, setSiteSearch] = useState("");
  const [groupSearch, setGroupSearch] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [showReferredTooltip, setShowReferredTooltip] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
        setIsSiteDropdownOpen(false);
        setIsGroupDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleApply = () => {
    onApply(selectedSite, selectedGroup);
    onClose();
  };

  const toggleApplyToDashboard = () => {
    setApplyToDashboardOnly(!applyToDashboardOnly);
  };

  const handleGroupSelect = (option: string) => {
    if (!selectedGroups.includes(option)) {
      setSelectedGroups([...selectedGroups, option]);
    }
    setIsGroupDropdownOpen(false);
    setGroupSearch("");
  };

  const removeGroup = (groupToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedGroups(
      selectedGroups.filter((group) => group !== groupToRemove)
    );
  };

  const siteOptions = [
    "All Sites",
    "Base Sites",
    "DataCenter, FL",
    "Headquaters, NY",
    "IDC, SA",
    "viiion, Lahore",
  ];
  const groupOptions = [
    "Base Sites",
    "All Groups",
    "Not in any Company",
    "App Development",
    "Data Management",
    "Development",
  ];

  // Filter options based on search
  const filteredSiteOptions = siteOptions.filter((option) =>
    option.toLowerCase().includes(siteSearch.toLowerCase())
  );

  const filteredGroupOptions = groupOptions.filter(
    (option) =>
      option.toLowerCase().includes(groupSearch.toLowerCase()) &&
      !selectedGroups.includes(option)
  );

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute right-[170px] top-full mt-2 w-[500px] bg-white rounded-lg shadow-lg border border-gray-200 z-50"
    >
      <div className="p-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-base text-gray-900 mb-1">Filters</h2>
          <div className="text-xs text-gray-600 flex gap-2 items-center">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors  ${
                  applyToDashboardOnly ? "bg-green-500" : "bg-gray-200"
                }`}
                onClick={toggleApplyToDashboard}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                    applyToDashboardOnly ? "translate-x-4" : "translate-x-1"
                  }`}
                />
              </button>
              <span>Apply to this dashboard only</span>
              <div className="relative flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#0080ff"
                  viewBox="0 0 16 16"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="cursor-help"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                </svg>
                {showTooltip && (
                  <div className="absolute bottom-1/2 -translate-x-1/2 bottom-full mb-2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50 w-max">
                    Your settings will be applied only on this dashboard
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800 "></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Site Dropdown */}
        <div className="mb-3">
          <label className="block text-[13px] text-[#333] mb-2">
            Select Site
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white flex justify-between items-center font-normal text-[#333]"
              onClick={() => setIsSiteDropdownOpen(!isSiteDropdownOpen)}
            >
              {selectedSite || "All Sites"}
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isSiteDropdownOpen ? "rotate-0" : "rotate-0"
                } text-gray-500`}
                fill="none"
                stroke="currentColor"
                strokeWidth={4}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isSiteDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {/* Search Bar for Sites */}
                <div className="p-2 border-b border-gray-200">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder=""
                      className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      value={siteSearch}
                      onChange={(e) => setSiteSearch(e.target.value)}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute left-2.5 top-2.5 w-3 h-3 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
                      />
                    </svg>
                  </div>
                </div>

                {filteredSiteOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`w-full px-3 py-2 text-[13px] text-left transition-colors font-normal ${
                      option === selectedSite
                        ? "bg-cyan-50 text-blue-600"
                        : "text-gray-700 hover:bg-cyan-50 hover:text-blue-600"
                    }`}
                    onClick={() => {
                      setSelectedSite(option);
                      setIsSiteDropdownOpen(false);
                      setSiteSearch("");
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Group Dropdown */}
        <div className="mb-3">
          <label className="block text-[13px] text-[#333] mb-2">
            Select Group
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full border border-gray-300 rounded-sm px-3 py-0.5 text-[13px] text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white flex justify-between items-center font-normal min-h-[33px] flex-wrap gap-1"
              onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}
            >
              {selectedGroups.length === 0 ? (
                <span className="text-gray-400"></span>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {selectedGroups.map((group) => (
                    <span
                      key={group}
                      className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1.5 text-xs text-gray-700"
                    >
                      <button
                        type="button"
                        onClick={(e) => removeGroup(group, e)}
                        className="hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="bg-gray-300 rounded-full p-0.5"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                      {group}
                    </span>
                  ))}
                </div>
              )}
            </button>

            {isGroupDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filteredGroupOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="w-full px-3 py-2 text-[13px] text-left transition-colors font-normal text-gray-700 hover:bg-cyan-50 hover:text-blue-600"
                    onClick={() => handleGroupSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center my-2.5 gap-2">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-400 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-[13px]">Include referred site also</span>
          <div className="relative flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              onMouseEnter={() => setShowReferredTooltip(true)}
              onMouseLeave={() => setShowReferredTooltip(false)}
              className="cursor-help"
            >
              <circle cx="8" cy="8" r="8" fill="#53a6f9ff" />
              <path
                d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16m0-1A7 7 0 1 0 8 1a7 7 0 0 0 0 14"
                fill="#3290eeff"
              />
              <circle cx="8" cy="4.5" r="1" fill="white" />
              <rect
                x="7.5"
                y="7"
                width="1"
                height="4.5"
                fill="white"
                rx="0.5"
              />
            </svg>
            {showReferredTooltip && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50 w-max">
                Include referred sites in the filter results
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
              </div>
            )}
          </div>
        </div>

        <div className="text-[13px] text-[#333] mb-3 flex items-start  items-center bg-[#fff1cc] border border-yellow-500 p-1 rounded">
          <span className="mx-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="8" r="8" fill="#b59046  " />
              <path
                d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16m0-1A7 7 0 1 0 8 1a7 7 0 0 0 0 14"
                fill="#b59046"
              />
              <circle cx="8" cy="4.5" r="1" fill="white" />
              <rect
                x="7.5"
                y="7"
                width="1"
                height="4.5"
                fill="white"
                rx="0.5"
              />
            </svg>
          </span>
          Referred sites will not be included for searching through All Groups
          and Not in any Group of any site.
        </div>

        <div className="flex justify-center gap-2 my-5  ">
          <button
            className="px-4 py-1 bg-[#4588f0] text-white rounded-full text-[13px] hover:bg-blue-700 transition-colors duration-200"
            onClick={handleApply}
          >
            Apply
          </button>
          <button
            className="px-3.5 py-1 border border-gray-300 rounded-full text-[13px] hover:bg-blue-50 transition-colors duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Chart Container for Maximized View with Legends - UPDATED
const MaximizedChartWithLegends = ({
  children,
  chartName,
  showLegends = "true",
}: {
  children: React.ReactNode;
  chartName: string;
  showLegends?: string;
}) => {
  const getLegendsForChart = (
    chartName: string
  ): Array<{ label: string; color: string }> => {
    const legendsMap: {
      [key: string]: Array<{ label: string; color: string }>;
    } = {
      openRequestsByMode: [
        { label: "Email", color: "#207FFB" },
        { label: "Web Form", color: "#7fdf00" },
        { label: "Not Assigned", color: "#d7d7d7" },
        { label: "Mobile Application", color: "#904ec2" },
        { label: "Phone Call", color: "#f00" },
      ],
      slaViolationByTechnician: [{ label: "SLA Violated", color: "#E42527" }],
      openRequestsByPriority: [
        { label: "Not Assigned", color: "#d7d7d7" },
        { label: "Low", color: "#666" },
        { label: "High", color: "#f00" },
        { label: "Normal", color: "#39630b" },
        { label: "Critical", color: "#ca4100" },
      ],
      requestsReceivedLast20Days: [
        { label: "Non Violated", color: "#14b474" },
        { label: "SLA Violated", color: "#e33e3e" },
      ],
      requestsCompletedLast20Days: [
        { label: "Non Violated", color: "#14b474" },
        { label: "SLA Violated", color: "#e33e3e" },
      ],
      slaViolatedRequests: [
        { label: "SLA Violated", color: "#E42527" },
        { label: "Remaining", color: "#D3D3D3" },
      ],
      unassignedOpenRequests: [
        { label: "Unassigned", color: "#E42527" },
        { label: "Assigned", color: "#D3D3D3" },
      ],
      requestsApproachingSLA: [
        { label: "Approaching SLA", color: "#FFA500" },
        { label: "Within SLA", color: "#D3D3D3" },
      ],
      default: [
        { label: "Value", color: "#3b82f6" },
        { label: "Target", color: "#ef4444" },
        { label: "Threshold", color: "#10b981" },
      ],
    };

    return legendsMap[chartName] || legendsMap["default"];
  };

  const legends = getLegendsForChart(chartName);

  if (!showLegends) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-3/4 h-full">{children}</div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full">
      {/* Chart Area - Increased size with no bottom legends */}
      <div className="flex-1 flex items-center justify-center p-2 bg-white">
        <div className="w-full h-[200px] max-w-full max-h-full scale-110 transform origin-center">
          {children}
        </div>
      </div>
    </div>
  );
};

// Gauge Chart Container without legends
const MaximizedGaugeChart = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex items-center justify-center p-8">
      <div className="w-full h-full max-w-full max-h-full scale-125 transform origin-center">
        {children}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [maximizedCard, setMaximizedCard] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDashboardBox, setShowDashboardBox] = useState(false);
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [selectedSite, setSelectedSite] = useState("Base Site");
  const [selectedGroup, setSelectedGroup] = useState("All Groups");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [showSettingsBox, setShowSettingsBox] = useState(false);
  const [refreshFrequency, setRefreshFrequency] = useState("Never");
  const [enableSmartView, setEnableSmartView] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0); // NEW: Track scroll position

  // Add refresh states for each card
  const [refreshStates, setRefreshStates] = useState<{ [key: string]: number }>(
    {
      requestsByTechnician: 0,
      openRequestsByMode: 0,
      requestsLastWeek: 0,
      slaViolationByTechnician: 0,
      requestsApproachingSLA: 0,
      slaViolatedRequests: 0,
      unassignedOpenRequests: 0,
      openRequestsByPriority: 0,
      requestsReceivedLast20Days: 0,
      requestsCompletedLast20Days: 0,
    }
  );

  const filterRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Add hover handlers
  const handleCardMouseEnter = (cardName: string) => {
    setHoveredCard(cardName);
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
  };

  // Add useEffect for settings click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setShowSettingsBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enhanced refresh handler
  const handleRefresh = (cardName: string) => {
    console.log(`Refreshing ${cardName}`);

    // Update the refresh state to trigger re-render
    setRefreshStates((prev) => ({
      ...prev,
      [cardName]: prev[cardName] + 1,
    }));

    // Simulate API call or data refresh
    setTimeout(() => {
      console.log(`${cardName} data refreshed`);
    }, 500);
  };

  const handleGraphChange = (cardName: string) => {
    console.log(`Changing graph type for ${cardName}`);
  };

  // FIXED: Enhanced maximize handler to preserve scroll position
  const handleMaximize = (cardName: string) => {
    if (maximizedCard === cardName) {
      // When minimizing, restore the scroll position
      setMaximizedCard(null);
      // Use setTimeout to ensure the DOM has updated before scrolling
      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 0);
    } else {
      // When maximizing, save the current scroll position
      setScrollPosition(window.scrollY);
      setMaximizedCard(cardName);
    }
  };

  const handleFilterApply = (site: string, group: string) => {
    setSelectedSite(site);
    setSelectedGroup(group);
    console.log("Filters applied:", { site, group });
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Render maximized card overlay
  const renderMaximizedOverlay = () => {
    if (!maximizedCard) return null;

    return (
      <div className="fixed inset-0 z-40 pointer-events-none">
        {/* Overlay for main content area only - adjust left/top based on your sidebar/header size */}
        <div className="absolute left-20 top-16 right-0 bottom-8 bg-white shadow-2xl">
          {/* Maximized Card Content */}
          <div className="h-full w-full p-6 pointer-events-auto">
            {maximizedCard === "requestsByTechnician" && (
              <Card className="h-full w-full p-6">
                <div className="flex justify-between items-center mb-4">
                  <CustomDropdown
                    defaultValue="Requests by Technician"
                    options={[
                      "Requests by Technician",
                      "Requests by Priority",
                      "Requests by Mode",
                      "Requests by Level",
                      "Requests by Category",
                    ]}
                  />
                  <CardActions
                    onRefresh={() => handleRefresh("requestsByTechnician")}
                    onMaximize={() => handleMaximize("requestsByTechnician")}
                    isMaximized={true}
                    showGraphButton={false}
                    isVisible={true}
                    chartType="table"
                  />
                </div>
                <div className="overflow-y-auto flex-1 min-h-0 h-[calc(100%-80px)]">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <td className="px-4 py-2 w-1/2"></td>
                        <td className="px-2 py-2 text-center text-[#666]">
                          Open
                        </td>
                        <td className="px-2 py-2 text-center text-[#666]">
                          OnHold
                        </td>
                        <td className="px-2 py-2 text-center text-[#666]">
                          OverDue
                        </td>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-[#666]">
                      {[
                        ["Howard Stern", 7, 2, 5],
                        ["Jennifer Doe", 4, 0, 4],
                        ["John Roberts", 3, 0, 3],
                        ["Hira", 2, 0, 1],
                        ["Shawn Adams", 2, 0, 2],
                        ["Bilal Chohan", 1, 0, 1],
                        ["Bella Mark", 1, 0, 1],
                        ["Unassigned", 15, 2, 2],
                      ].map(([name, open, hold, overdue]) => (
                        <tr
                          key={name as string}
                          className="transition-colors duration-300 hover:bg-gray-100"
                        >
                          <td className="px-4 py-2">{name as string}</td>
                          <td className="px-2 py-2 text-center text-black">
                            {open as number}
                          </td>
                          <td className="px-2 py-2 text-center text-black">
                            {hold as number}
                          </td>
                          <td className="px-2 py-2 text-center text-[#f00]">
                            {overdue as number}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-bold transition-colors duration-300 hover:bg-gray-100">
                        <td className="px-4 py-2 text-[#666]">Total</td>
                        <td className="px-2 py-2 text-center text-[#666]">
                          25
                        </td>
                        <td className="px-2 py-2 text-center text-[#666]">4</td>
                        <td className="px-2 py-2 text-center text-[#f00]">
                          19
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {maximizedCard === "openRequestsByMode" && (
              <Card className="h-full w-full p-6">
                <div className="flex justify-between items-center mb-4">
                  <CustomDropdown
                    defaultValue="Open Requests by Mode"
                    options={[
                      "Open Requests by Mode",
                      "Open Requests by Category",
                      "Open Requests by Level",
                    ]}
                  />
                  <CardActions
                    onRefresh={() => handleRefresh("openRequestsByMode")}
                    onMaximize={() => handleMaximize("openRequestsByMode")}
                    onGraph={() => handleGraphChange("openRequestsByMode")}
                    isMaximized={true}
                    showGraphButton={true}
                    isVisible={true}
                    chartType="pie"
                  />
                </div>
                <div className="h-[calc(100%-80px)]">
                  <MaximizedChartWithLegends chartName="openRequestsByMode">
                    <div className="h-full w-full p-4">
                      <PieChartNew  />
                    </div>
                  </MaximizedChartWithLegends>
                </div>
              </Card>
            )}

            {maximizedCard === "requestsLastWeek" && (
              <Card className="h-full w-full p-6">
                <div className="flex justify-between items-center mb-4">
                  <CustomDropdown
                    defaultValue="Requests Last Week"
                    options={[
                      "Requests Last Week",
                      "Requests This Week",
                      "Requests This Month",
                      "Requests Last Month",
                    ]}
                  />
                  <CardActions
                    onRefresh={() => handleRefresh("requestsLastWeek")}
                    onMaximize={() => handleMaximize("requestsLastWeek")}
                    isMaximized={true}
                    showGraphButton={false}
                    isVisible={true}
                    chartType="table"
                  />
                </div>
                <div className="h-[calc(100%-80px)] overflow-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <td className="px-2 py-2 text-left w-1/3"></td>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (day) => (
                            <td
                              key={day}
                              className="px-2 py-2 text-center font-normal"
                            >
                              {day}
                            </td>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        ["Inbound", "text-[#3d8aff]"],
                        ["Completed", "text-[#37b067]"],
                        ["OverDue", "text-[#e50000]"],
                      ].map(([label, color]) => (
                        <tr
                          key={label as string}
                          className="transition-colors duration-300 hover:bg-gray-100"
                        >
                          <td className="px-2 py-2 text-left font-normal">
                            {label as string}
                          </td>
                          {Array(7)
                            .fill(0)
                            .map((val, idx) => (
                              <td
                                key={idx}
                                className={`px-2 py-2 text-center ${
                                  color as string
                                }`}
                              >
                                {val}
                              </td>
                            ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {maximizedCard === "slaViolationByTechnician" && (
              <Card className="h-full w-full p-6">
                <div className="flex justify-between items-center mb-4">
                  <CustomDropdown
                    defaultValue="SLA Violation by Technician"
                    options={[
                      "SLA Violation by Technician",
                      "SLA Violation by Priority",
                      "SLA Violation by Category",
                      "SLA Violation by Level",
                      "SLA Violation by Group",
                    ]}
                  />
                  <CardActions
                    onRefresh={() => handleRefresh("slaViolationByTechnician")}
                    onMaximize={() =>
                      handleMaximize("slaViolationByTechnician")
                    }
                    onGraph={() =>
                      handleGraphChange("slaViolationByTechnician")
                    }
                    isMaximized={true}
                    showGraphButton={true}
                    isVisible={true}
                    chartType="bar"
                  />
                </div>
                <div className="h-[calc(100%-80px)]">
                  <MaximizedChartWithLegends chartName="slaViolationByTechnician">
                    <div className="h-full w-full p-4">
                      <BarChart />
                    </div>
                  </MaximizedChartWithLegends>
                </div>
              </Card>
            )}

            {maximizedCard === "requestsApproachingSLA" && (
              <Card className="h-full w-full p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-transparent text-black text-sm not-italic font-bold sm:ps-4">
                    Requests Approaching SLA Violation
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("requestsApproachingSLA")}
                    onMaximize={() => handleMaximize("requestsApproachingSLA")}
                    isMaximized={true}
                    showGraphButton={false}
                    isVisible={true}
                  />
                </div>
                <div className="h-[calc(100%-80px)]">
                  <div className="h-full w-full flex items-center justify-center">
                    <EmptyChart />
                  </div>
                </div>
              </Card>
            )}

            {maximizedCard === "slaViolatedRequests" && (
              <Card className="h-full w-full p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-transparent text-black text-sm not-italic font-bold">
                    SLA Violated Requests
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("slaViolatedRequests")}
                    onMaximize={() => handleMaximize("slaViolatedRequests")}
                    isMaximized={true}
                    showGraphButton={false}
                    isVisible={true}
                  />
                </div>
                <div className="h-[calc(100%-80px)]">
                  <MaximizedGaugeChart>
                    <GaugeChart />
                  </MaximizedGaugeChart>
                </div>
              </Card>
            )}

            {maximizedCard === "unassignedOpenRequests" && (
              <Card className="h-full w-full p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-transparent text-black text-sm not-italic font-bold">
                    Unassigned and Open Requests
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("unassignedOpenRequests")}
                    onMaximize={() => handleMaximize("unassignedOpenRequests")}
                    isMaximized={true}
                    showGraphButton={false}
                    isVisible={true}
                  />
                </div>
                <div className="h-[calc(100%-80px)]">
                  <MaximizedGaugeChart>
                    <ChartGauge />
                  </MaximizedGaugeChart>
                </div>
              </Card>
            )}

            {maximizedCard === "openRequestsByPriority" && (
              <Card className="h-full w-full p-6">
                <div className="flex justify-between items-center">
                  <span className="bg-transparent text-black text-sm not-italic font-bold sm:ps-4">
                    Open Requests by Priority
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("openRequestsByPriority")}
                    onMaximize={() => handleMaximize("openRequestsByPriority")}
                    onGraph={() => handleGraphChange("openRequestsByPriority")}
                    isMaximized={true}
                    showGraphButton={true}
                    isVisible={true}
                    chartType="pie"
                  />
                </div>
                <div className="h-[calc(100%-80px)]">
                  <MaximizedChartWithLegends chartName="openRequestsByPriority">
                    <div className="h-full w-full p-4">
                      <SmallPieChart />
                    </div>
                  </MaximizedChartWithLegends>
                </div>
              </Card>
            )}

            {maximizedCard === "requestsReceivedLast20Days" && (
              <Card className="h-full w-full p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-transparent text-black text-sm not-italic font-bold">
                    Requests received in last 20 days
                  </span>
                  <CardActions
                    onRefresh={() =>
                      handleRefresh("requestsReceivedLast20Days")
                    }
                    onMaximize={() =>
                      handleMaximize("requestsReceivedLast20Days")
                    }
                    onGraph={() =>
                      handleGraphChange("requestsReceivedLast20Days")
                    }
                    isMaximized={true}
                    showGraphButton={true}
                    isVisible={true}
                    chartType="bar"
                  />
                </div>
                <div className="h-[calc(100%-80px)]">
                  <MaximizedChartWithLegends chartName="requestsReceivedLast20Days">
                    <div className="h-full w-full p-4">
                      <StackedBarChart />
                    </div>
                  </MaximizedChartWithLegends>
                </div>
              </Card>
            )}

            {maximizedCard === "requestsCompletedLast20Days" && (
              <Card className="h-full w-full p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-transparent text-black text-sm not-italic font-bold">
                    Requests completed in last 20 days
                  </span>
                  <CardActions
                    onRefresh={() =>
                      handleRefresh("requestsCompletedLast20Days")
                    }
                    onMaximize={() =>
                      handleMaximize("requestsCompletedLast20Days")
                    }
                    onGraph={() =>
                      handleGraphChange("requestsCompletedLast20Days")
                    }
                    isMaximized={true}
                    showGraphButton={true}
                    isVisible={true}
                    chartType="line"
                  />
                </div>
                <div className="h-[calc(100%-80px)]">
                  <MaximizedChartWithLegends chartName="requestsCompletedLast20Days">
                    <div className="h-full w-full p-4">
                      <StackedAreaChart />
                    </div>
                  </MaximizedChartWithLegends>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  };

  // If in fullscreen mode, render only the cards without main navigation but WITH Helpdesk Dashboard header
  if (isFullscreen && !maximizedCard) {
    return (
      <div className="fixed inset-0 z-50 overflow-auto">
        {/* Keep Helpdesk Dashboard Header Visible in Fullscreen - Made Sticky */}
        <div className="sticky top-0 z-30  border-b border-gray-200 py-4 px-9 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex items-center gap-2 relative group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="#1E90FF"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                </svg>
                <button
                  onClick={() => setShowDashboardBox(!showDashboardBox)}
                  className="text-lg font-normal text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  Helpdesk Dashboard
                  {/* Copy and Edit Icons that appear on hover */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className="text-gray-500 hover:text-blue-600 cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className="text-gray-500 hover:text-blue-600 cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Updated Filter and Settings Buttons */}
            <div className="flex items-center gap-2 relative" ref={filterRef}>
              {/* Base Site & All Groups in one button with vertical separator */}
              <button
                onClick={() => setShowFilterBox(!showFilterBox)}
                className="flex items-center gap-1.5 px-2.5 py-2 border border-gray-300 rounded-sm bg-white text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.44 7.95c0-3.97-3.63-7.13-7.73-6.32-2.55.47-4.57 2.55-5.04 5.04-.34 1.95.13 3.7 1.21 5.11.4.54.74 1.01 1.14 1.55s.74 1.01 1.14 1.55l2.89 3.63 2.89-3.63c.4-.47.74-1.01 1.14-1.55s.74-1.01 1.14-1.55c.74-1.08 1.21-2.42 1.21-3.83z"
                    stroke="#677177"
                    stroke-miterlimit="10"
                  />
                  <path
                    d="M9.99 10.37a2.42 2.42 0 1 0 0-4.84 2.42 2.42 0 0 0 0 4.84Z"
                    stroke="#677177"
                    stroke-miterlimit="10"
                  />
                </svg>
                {/* {selectedSite} */}
                <span>All Sites</span>
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                {/* {selectedGroup} */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M12.77 4.08a4.12 4.12 0 0 1 4.12 4.12c0 2.27-1.85 4.12-4.12 4.12m-.04.18h.92a4.58 4.58 0 0 1 4.58 4.58m-11-4.58a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-5.46 5c0-2.76 2.24-5 5-5h.91c2.76 0 5 2.24 5 5"
                    stroke="#677177"
                    stroke-miterlimit="10"
                  />
                </svg>
                <span>All Groups</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 text-gray-500`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Fullscreen button */}
              <button
                onClick={handleFullscreenToggle}
                className="flex items-center gap-2 px-2.5 py-2.5 border border-gray-300 rounded-sm bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                title={isFullscreen ? "" : ""}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  fill="currentColor"
                  className="bi bi-fullscreen text-gray-500 bg-white"
                  viewBox="0 0 16 16"
                >
                  {isFullscreen ? (
                    <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z" />
                  ) : (
                    <path d="M1 1v4h2V3h2V1H1zm14 0h-4v2h2v2h2V1zM1 15h4v-2H3v-2H1v4zm14 0v-4h-2v2h-2v2h4z" />
                  )}
                </svg>
                {isFullscreen ? "" : ""}
              </button>

              {/* Settings button */}
              <div className="relative" ref={settingsRef}>
                <button
                  onClick={() => setShowSettingsBox(!showSettingsBox)}
                  className="flex items-center gap-2 px-2.5 py-2.5 border border-gray-300 rounded-sm bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 text-gray-500 bg-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                  </svg>
                </button>

                <SettingsBox
                  isOpen={showSettingsBox}
                  onClose={() => setShowSettingsBox(false)}
                  refreshFrequency={refreshFrequency}
                  onRefreshFrequencyChange={setRefreshFrequency}
                  autoRefresh={enableSmartView}
                  onAutoRefreshChange={setEnableSmartView}
                />
              </div>

              {/* +New button */}
              <button className="flex items-center px-2 py-2.5 bg-[#4588f0] text-white rounded-sm text-[13px]  hover:bg-blue-700 transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                New
              </button>

              <FilterBox
                isOpen={showFilterBox}
                onClose={() => setShowFilterBox(false)}
                onApply={handleFilterApply}
              />
            </div>
          </div>
        </div>

        <div className="p-4 h-full overflow-auto">
          {/* Normal Dashboard Cards */}
          <div className="px-2 sm:px-4 md:px-6 py-4 space-y-8">
            {/* === Row 1 === */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <Card
                key={`requestsByTechnician-${refreshStates.requestsByTechnician}`}
                className="p-4 sm:p-6 h-auto lg:h-[400px] flex flex-col overflow-hidden transition-all duration-200"
                onMouseEnter={() =>
                  handleCardMouseEnter("requestsByTechnician")
                }
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center mb-4">
                  <CustomDropdown
                    defaultValue="Requests by Technician"
                    options={[
                      "Requests by Technician",
                      "Requests by Priority",
                      "Requests by Mode",
                      "Requests by Level",
                      "Requests by Category",
                    ]}
                  />
                  <CardActions
                    onRefresh={() => handleRefresh("requestsByTechnician")}
                    onMaximize={() => handleMaximize("requestsByTechnician")}
                    isMaximized={false}
                    showGraphButton={false}
                    isVisible={hoveredCard === "requestsByTechnician"}
                    chartType="table"
                  />
                </div>

                <div className="overflow-y-auto flex-1 min-h-0">
                  <table className="w-full text-xs sm:text-sm text-left">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <td className="px-4 py-2 w-1/2"></td>
                        <td className="px-2 py-2 text-center text-[#666]">
                          Open
                        </td>
                        <td className="px-2 py-2 text-center text-[#666]">
                          OnHold
                        </td>
                        <td className="px-2 py-2 text-center text-[#666]">
                          OverDue
                        </td>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-[#666]">
                      {[
                        ["Howard Stern", 7, 2, 5],
                        ["Jennifer Doe", 4, 0, 4],
                        ["John Roberts", 3, 0, 3],
                        ["Hira", 2, 0, 1],
                        ["Shawn Adams", 2, 0, 2],
                        ["Bilal Chohan", 1, 0, 1],
                        ["Bella Mark", 1, 0, 1],
                        ["Unassigned", 15, 2, 2],
                      ].map(([name, open, hold, overdue]) => (
                        <tr
                          key={name as string}
                          className="transition-colors duration-300 hover:bg-gray-100"
                        >
                          <td className="px-4 py-2">{name as string}</td>
                          <td className="px-2 py-2 text-center text-black">
                            {open as number}
                          </td>
                          <td className="px-2 py-2 text-center text-black">
                            {hold as number}
                          </td>
                          <td className="px-2 py-2 text-center text-[#f00]">
                            {overdue as number}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-bold transition-colors duration-300 hover:bg-gray-100">
                        <td className="px-4 py-2 text-[#666]">Total</td>
                        <td className="px-2 py-2 text-center text-[#666]">
                          25
                        </td>
                        <td className="px-2 py-2 text-center text-[#666]">4</td>
                        <td className="px-2 py-2 text-center text-[#f00]">
                          19
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card
                key={`openRequestsByMode-${refreshStates.openRequestsByMode}`}
                className="p-4 sm:p-6 h-auto lg:h-[400px] overflow-hidden transition-all duration-200"
                onMouseEnter={() => handleCardMouseEnter("openRequestsByMode")}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center mb-4">
                  <CustomDropdown
                    defaultValue="Open Requests by Mode"
                    options={[
                      "Open Requests by Mode",
                      "Open Requests by Category",
                      "Open Requests by Level",
                    ]}
                  />
                  <CardActions
                    onRefresh={() => handleRefresh("openRequestsByMode")}
                    onMaximize={() => handleMaximize("openRequestsByMode")}
                    onGraph={() => handleGraphChange("openRequestsByMode")}
                    isMaximized={false}
                    showGraphButton={true}
                    isVisible={hoveredCard === "openRequestsByMode"}
                    chartType="pie"
                  />
                </div>
                <PieChartNew 
                maximizedCard={maximizedCard}/>
              </Card>
            </div>

            {/* === Row 2 === */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <Card
                key={`requestsLastWeek-${refreshStates.requestsLastWeek}`}
                className="p-4 sm:p-6 h-auto lg:h-[400px] overflow-hidden transition-all duration-200"
                onMouseEnter={() => handleCardMouseEnter("requestsLastWeek")}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center ">
                  <CustomDropdown
                    defaultValue="Requests Last Week"
                    options={[
                      "Requests Last Week",
                      "Requests This Week",
                      "Requests This Month",
                      "Requests Last Month",
                    ]}
                  />
                  <CardActions
                    onRefresh={() => handleRefresh("requestsLastWeek")}
                    onMaximize={() => handleMaximize("requestsLastWeek")}
                    isMaximized={false}
                    showGraphButton={false}
                    isVisible={hoveredCard === "requestsLastWeek"}
                    chartType="table"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm border-collapse">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <td className="px-2 py-2 text-left w-1/3"></td>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (day) => (
                            <td
                              key={day}
                              className="px-2 py-2 text-center font-normal"
                            >
                              {day}
                            </td>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        ["Inbound", "text-[#3d8aff]"],
                        ["Completed", "text-[#37b067]"],
                        ["OverDue", "text-[#e50000]"],
                      ].map(([label, color]) => (
                        <tr
                          key={label as string}
                          className="transition-colors duration-300 hover:bg-gray-100"
                        >
                          <td className="px-2 py-2 text-left font-normal">
                            {label as string}
                          </td>
                          {Array(7)
                            .fill(0)
                            .map((val, idx) => (
                              <td
                                key={idx}
                                className={`px-2 py-2 text-center ${
                                  color as string
                                }`}
                              >
                                {val}
                              </td>
                            ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card
                key={`slaViolationByTechnician-${refreshStates.slaViolationByTechnician}`}
                className="p-4 sm:p-6 h-auto lg:h-[400px] overflow-hidden transition-all duration-200"
                onMouseEnter={() =>
                  handleCardMouseEnter("slaViolationByTechnician")
                }
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center mb-4">
                  <CustomDropdown
                    defaultValue="SLA Violation by Technician"
                    options={[
                      "SLA Violation by Technician",
                      "SLA Violation by Priority",
                      "SLA Violation by Category",
                      "SLA Violation by Level",
                      "SLA Violation by Group",
                    ]}
                  />
                  <CardActions
                    onRefresh={() => handleRefresh("slaViolationByTechnician")}
                    onMaximize={() =>
                      handleMaximize("slaViolationByTechnician")
                    }
                    onGraph={() =>
                      handleGraphChange("slaViolationByTechnician")
                    }
                    isMaximized={false}
                    showGraphButton={true}
                    isVisible={hoveredCard === "slaViolationByTechnician"}
                    chartType="bar"
                  />
                </div>
                <BarChart
                maximizedCard={maximizedCard} />
              </Card>
            </div>

            {/* === Row 3 === */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <Card
                key={`requestsApproachingSLA-${refreshStates.requestsApproachingSLA}`}
                className="p-4 sm:p-6 h-[360px] overflow-hidden transition-all duration-200"
                onMouseEnter={() =>
                  handleCardMouseEnter("requestsApproachingSLA")
                }
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-transparent text-[#262f36] text-normal not-italic font-[600] sm:ps-4">
                    Requests Approaching SLA Violation
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("requestsApproachingSLA")}
                    onMaximize={() => handleMaximize("requestsApproachingSLA")}
                    isMaximized={false}
                    showGraphButton={false}
                    isVisible={hoveredCard === "requestsApproachingSLA"}
                  />
                </div>
                <EmptyChart />
              </Card>

              <Card
                key={`slaViolatedRequests-${refreshStates.slaViolatedRequests}`}
                className="p-4 sm:p-6 h-[360px] overflow-hidden transition-all duration-200"
                onMouseEnter={() => handleCardMouseEnter("slaViolatedRequests")}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-transparent text-[#262f36] text-normal not-italic font-[600]">
                    SLA Violated Requests
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("slaViolatedRequests")}
                    onMaximize={() => handleMaximize("slaViolatedRequests")}
                    isMaximized={false}
                    showGraphButton={false}
                    isVisible={hoveredCard === "slaViolatedRequests"}
                  />
                </div>
                <GaugeChart />
              </Card>

              <Card
                key={`unassignedOpenRequests-${refreshStates.unassignedOpenRequests}`}
                className="p-4 sm:p-6 h-[360px] overflow-hidden transition-all duration-200"
                onMouseEnter={() =>
                  handleCardMouseEnter("unassignedOpenRequests")
                }
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-transparent text-[#262f36] text-normal not-italic font-[600]">
                    Unassigned and Open Requests
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("unassignedOpenRequests")}
                    onMaximize={() => handleMaximize("unassignedOpenRequests")}
                    isMaximized={false}
                    showGraphButton={false}
                    isVisible={hoveredCard === "unassignedOpenRequests"}
                  />
                </div>
                <ChartGauge />
              </Card>

              <Card
                key={`openRequestsByPriority-${refreshStates.openRequestsByPriority}`}
                className="p-4 sm:p-6 h-[360px] overflow-hidden transition-all duration-200"
                onMouseEnter={() =>
                  handleCardMouseEnter("openRequestsByPriority")
                }
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center">
                  <span className="bg-transparent text-[#262f36] text-normal not-italic font-[600] sm:ps-4">
                    Open Requests by Priority
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("openRequestsByPriority")}
                    onMaximize={() => handleMaximize("openRequestsByPriority")}
                    onGraph={() => handleGraphChange("openRequestsByPriority")}
                    isMaximized={false}
                    showGraphButton={true}
                    isVisible={hoveredCard === "openRequestsByPriority"}
                    chartType="pie"
                  />
                </div>
                <SmallPieChart 
                maximizedCard={maximizedCard}/>
              </Card>
            </div>

            {/* === Row 4 === */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <Card
                key={`requestsReceivedLast20Days-${refreshStates.requestsReceivedLast20Days}`}
                className="p-4 sm:p-6 h-auto lg:h-[400px] overflow-hidden transition-all duration-200"
                onMouseEnter={() =>
                  handleCardMouseEnter("requestsReceivedLast20Days")
                }
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-transparent text-[#262f36] text-normal not-italic font-[600]">
                    Requests received in last 20 days
                  </span>
                  <CardActions
                    onRefresh={() =>
                      handleRefresh("requestsReceivedLast20Days")
                    }
                    onMaximize={() =>
                      handleMaximize("requestsReceivedLast20Days")
                    }
                    onGraph={() =>
                      handleGraphChange("requestsReceivedLast20Days")
                    }
                    isMaximized={false}
                    showGraphButton={true}
                    isVisible={hoveredCard === "requestsReceivedLast20Days"}
                    chartType="bar"
                  />
                </div>
                <StackedBarChart
                maximizedCard={maximizedCard} />
              </Card>

              <Card
                key={`requestsCompletedLast20Days-${refreshStates.requestsCompletedLast20Days}`}
                className="p-4 sm:p-6 h-auto lg:h-[400px] overflow-hidden transition-all duration-200"
                onMouseEnter={() =>
                  handleCardMouseEnter("requestsCompletedLast20Days")
                }
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-transparent text-[#262f36] text-normal not-italic font-[600]">
                    Requests completed in last 20 days
                  </span>
                  <CardActions
                    onRefresh={() =>
                      handleRefresh("requestsCompletedLast20Days")
                    }
                    onMaximize={() =>
                      handleMaximize("requestsCompletedLast20Days")
                    }
                    onGraph={() =>
                      handleGraphChange("requestsCompletedLast20Days")
                    }
                    isMaximized={false}
                    showGraphButton={true}
                    isVisible={hoveredCard === "requestsCompletedLast20Days"}
                    chartType="line"
                  />
                </div>
                <StackedAreaChart
                maximizedCard={maximizedCard} />
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal dashboard view
  return (
    <MainLayout title="NewDashboard">
      <div>
        {/* Normal Dashboard Header */}
        <nav className="px-6 py-8 pb-0  mb-0 flex flex-wrap items-center justify-between bg-white">
          <div className="flex items-center ps-5 space-x-6 font-[600] text-sm gap-5">
            {[
              "Dashboard",
              "Scheduler",
              "Tech Availabilty Chart",
              "Tasks",
              "Reminders",
              "Announcements",
            ].map((item) => (
              <a
                key={item}
                href={"#" + item.toLowerCase()}
                onClick={(e) => {
                  e.preventDefault();
                  const links = document.querySelectorAll(".nav-link");
                  links.forEach((link) =>
                    link.classList.remove(
                      "text-[#4588f0]",
                      "border-b-2",
                      "border-[#4588f0]"
                    )
                  );
                  e.currentTarget.classList.add(
                    "text-[#4588f0]",
                    "border-b-2",
                    "border-[#4588f0]"
                  );
                }}
                className={`nav-link pb-[9px] hover:text-[#4588f0] hover:border-b-2 hover:border-[#4588f0] ${
                  item === "Dashboard"
                    ? "text-[#4588f0] border-b-2 border-[#4588f0]"
                    : ""
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        <div className="border-t border-gray-300"></div>

        {/* Helpdesk Dashboard Header - Made Sticky */}
        <div className="sticky top-0 z-30  border-b border-gray-200 py-4 px-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center ">
              <div className="flex items-center gap-2 relative group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="#1E90FF"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                </svg>
                <button
                  onClick={() => setShowDashboardBox(!showDashboardBox)}
                  className="text-lg font-normal text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  Helpdesk Dashboard
                  {/* Copy and Edit Icons that appear on hover */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className="text-gray-500 hover:text-blue-600 cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className="text-gray-500 hover:text-blue-600 cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Updated Filter and Settings Buttons */}
            <div className="flex items-center gap-2 relative " ref={filterRef}>
              {/* Base Site & All Groups in one button with vertical separator */}
              <button
                onClick={() => setShowFilterBox(!showFilterBox)}
                className="flex items-center bg-white gap-1.5 px-2.5 py-2 border border-gray-300 rounded-sm  text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.44 7.95c0-3.97-3.63-7.13-7.73-6.32-2.55.47-4.57 2.55-5.04 5.04-.34 1.95.13 3.7 1.21 5.11.4.54.74 1.01 1.14 1.55s.74 1.01 1.14 1.55l2.89 3.63 2.89-3.63c.4-.47.74-1.01 1.14-1.55s.74-1.01 1.14-1.55c.74-1.08 1.21-2.42 1.21-3.83z"
                    stroke="#677177"
                    stroke-miterlimit="10"
                  />
                  <path
                    d="M9.99 10.37a2.42 2.42 0 1 0 0-4.84 2.42 2.42 0 0 0 0 4.84Z"
                    stroke="#677177"
                    stroke-miterlimit="10"
                  />
                </svg>
                {/* {selectedSite} */}
                <span>All Sites</span>
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M12.77 4.08a4.12 4.12 0 0 1 4.12 4.12c0 2.27-1.85 4.12-4.12 4.12m-.04.18h.92a4.58 4.58 0 0 1 4.58 4.58m-11-4.58a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-5.46 5c0-2.76 2.24-5 5-5h.91c2.76 0 5 2.24 5 5"
                    stroke="#677177"
                    stroke-miterlimit="10"
                  />
                </svg>
                {/* {selectedGroup} */}
                <span>All Groups</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 text-gray-500`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Fullscreen button */}
              <button
                onClick={handleFullscreenToggle}
                className="flex items-center bg-white gap-2 px-2.5 py-2.5 border border-gray-300 rounded-sm text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                title={isFullscreen ? "" : ""}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="gray"
                  className="bi bi-fullscreen"
                  viewBox="0 0 16 16"
                >
                  {isFullscreen ? (
                    <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z" />
                  ) : (
                    <path d="M1 1v4h2V3h2V1H1zm14 0h-4v2h2v2h2V1zM1 15h4v-2H3v-2H1v4zm14 0v-4h-2v2h-2v2h4z" />
                  )}
                </svg>
                {isFullscreen ? "" : ""}
              </button>

              {/* Settings button */}
              <div className="relative" ref={settingsRef}>
                <button
                  onClick={() => setShowSettingsBox(!showSettingsBox)}
                  className="flex items-center gap-2 px-2.5 py-2.5 bg-white border border-gray-300 rounded-sm text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                  </svg>
                </button>

                <SettingsBox
                  isOpen={showSettingsBox}
                  onClose={() => setShowSettingsBox(false)}
                  refreshFrequency={refreshFrequency}
                  onRefreshFrequencyChange={setRefreshFrequency}
                  autoRefresh={enableSmartView}
                  onAutoRefreshChange={setEnableSmartView}
                />
              </div>

              {/* +New button */}
              <button className="flex items-center px-2.5 py-2.5 bg-[#4588f0] text-white rounded-sm text-sm font-normal hover:bg-blue-700 transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                New
              </button>

              <FilterBox
                isOpen={showFilterBox}
                onClose={() => setShowFilterBox(false)}
                onApply={handleFilterApply}
              />
            </div>
          </div>
        </div>

        {showDashboardBox && (
          <div className="absolute mt-2 left-9 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search Dashboard"
                className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
                />
              </svg>
            </div>

            <div className="mb-5">
              <div className="flex justify-between text-gray-600 text-xs font-bold uppercase tracking-wide mb-8">
                <span>FAVORITES</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-pin-angle-fill text-end"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z" />
                </svg>
              </div>
              <div className="text-gray-400 text-sm ml-2 text-center">
                No favorites
              </div>
            </div>

            <div className="border-t border-dashed border-gray-300 w-full my-2"></div>

            <div>
              <div className="flex items-center justify-between text-gray-600 text-xs font-bold uppercase tracking-wide mb-1">
                <span>Canned Dashboard</span>
              </div>

              <ul className="space-y-1">
                {[
                  { name: "Activities Dashboard", active: true },
                  { name: "Helpdesk Dashboard", active: false },
                  { name: "Zia Dashboard", active: false },
                ].map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer ${
                      item.active
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span>{item.name}</span>
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-gray-400 hover:text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.178 3.63a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.084 2.24a1 1 0 00-.364 1.118l1.178 3.63c.3.922-.755 1.688-1.54 1.118l-3.084-2.24a1 1 0 00-1.175 0l-3.084 2.24c-.785.57-1.84-.196-1.54-1.118l1.178-3.63a1 1 0 00-.364-1.118L2.52 9.057c-.783-.57-.38-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.178-3.63z" />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Normal Dashboard Cards (hidden when maximized) */}
        {!maximizedCard && (
          <div className="px-2 sm:px-4 md:px-6 py-4 space-y-8">
            {/* === Row 1 === */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <Card
                key={`requestsByTechnician-${refreshStates.requestsByTechnician}`}
                className="p-4 sm:p-6 h-auto lg:h-[370px] flex flex-col overflow-hidden transition-all duration-200"
                onMouseEnter={() =>
                  handleCardMouseEnter("requestsByTechnician")
                }
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center mb-4">
                  <CustomDropdown
                    defaultValue="Requests by Technician"
                    options={[
                      "Requests by Technician",
                      "Requests by Priority",
                      "Requests by Mode",
                      "Requests by Level",
                      "Requests by Category",
                    ]}
                  />
                  <CardActions
                    onRefresh={() => handleRefresh("requestsByTechnician")}
                    onMaximize={() => handleMaximize("requestsByTechnician")}
                    isMaximized={false}
                    showGraphButton={false}
                    isVisible={hoveredCard === "requestsByTechnician"}
                    chartType="table"
                  />
                </div>

                <div className="overflow-y-auto flex-1 min-h-0">
                  <table className="w-full text-xs sm:text-sm text-left">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <td className="px-4 py-2 w-1/2"></td>
                        <td className="px-2 py-2 text-center text-[#666] ">
                          Open
                        </td>
                        <td className="px-2 py-2 text-center text-[#666] ">
                          OnHold
                        </td>
                        <td className="px-2 py-2 text-center text-[#666] ">
                          OverDue
                        </td>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-[#666]">
                      {[
                        ["Howard Stern", 7, 2, 5],
                        ["Jennifer Doe", 4, 0, 4],
                        ["John Roberts", 3, 0, 3],
                        ["Hira", 2, 0, 1],
                        ["Shawn Adams", 2, 0, 2],
                        ["Bilal Chohan", 1, 0, 1],
                        ["Bella Mark", 1, 0, 1],
                        ["Unassigned", 15, 2, 2],
                      ].map(([name, open, hold, overdue]) => (
                        <tr
                          key={name as string}
                          className="transition-colors duration-300 hover:bg-gray-100"
                        >
                          <td className="px-4 py-2">{name as string}</td>
                          <td className="px-2 py-2 text-center text-[#333]">
                            {open as number}
                          </td>
                          <td className="px-2 py-2 text-center text-[#333]">
                            {hold as number}
                          </td>
                          <td className="px-2 py-2 text-center text-[#f00]">
                            {overdue as number}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-bold transition-colors duration-300 hover:bg-gray-100">
                        <td className="px-4 py-2 text-[#666]">Total</td>
                        <td className="px-2 py-2 text-center text-[#666]">
                          25
                        </td>
                        <td className="px-2 py-2 text-center text-[#666]">4</td>
                        <td className="px-2 py-2 text-center text-[#f00] ">
                          19
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card
                key={`openRequestsByMode-${refreshStates.openRequestsByMode}`}
                className="p-4 sm:p-6 h-auto lg:h-[370px] overflow-hidden transition-all duration-200"
                onMouseEnter={() => handleCardMouseEnter("openRequestsByMode")}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center ">
                  <CustomDropdown
                    defaultValue="Open Requests by Mode"
                    options={[
                      "Open Requests by Mode",
                      "Open Requests by Category",
                      "Open Requests by Level",
                    ]}
                  />
                  <CardActions
                    onRefresh={() => handleRefresh("openRequestsByMode")}
                    onMaximize={() => handleMaximize("openRequestsByMode")}
                    onGraph={() => handleGraphChange("openRequestsByMode")}
                    isMaximized={false}
                    showGraphButton={true}
                    isVisible={hoveredCard === "openRequestsByMode"}
                    chartType="pie"
                  />
                </div>
                <PieChartNew 
                maximizedCard={maximizedCard}
                />
              </Card>
            </div>

            {/* === Row 2 === */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <Card
                key={`requestsLastWeek-${refreshStates.requestsLastWeek}`}
                className="p-4 sm:p-6 h-auto lg:h-[370px] overflow-hidden transition-all duration-200"
                onMouseEnter={() => handleCardMouseEnter("requestsLastWeek")}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center ">
                  <CustomDropdown
                    defaultValue="Requests Last Week"
                    options={[
                      "Requests Last Week",
                      "Requests This Week",
                      "Requests This Month",
                      "Requests Last Month",
                    ]}
                  />
                  <CardActions
                    onRefresh={() => handleRefresh("requestsLastWeek")}
                    onMaximize={() => handleMaximize("requestsLastWeek")}
                    isMaximized={false}
                    showGraphButton={false}
                    isVisible={hoveredCard === "requestsLastWeek"}
                    chartType="table"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm border-collapse">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <td className="px-2 py-2 text-left w-1/3"></td>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (day) => (
                            <td key={day} className="px-2 py-2 text-center ">
                              {day}
                            </td>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        ["Inbound", "text-[#3d8aff]"],
                        ["Completed", "text-[#37b067]"],
                        ["OverDue", "text-[#e50000]"],
                      ].map(([label, color]) => (
                        <tr
                          key={label as string}
                          className="transition-colors duration-300 hover:bg-gray-100"
                        >
                          <td className="px-2 py-2 text-left ">
                            {label as string}
                          </td>
                          {Array(7)
                            .fill(0)
                            .map((val, idx) => (
                              <td
                                key={idx}
                                className={`px-2 py-2 text-center ${
                                  color as string
                                }`}
                              >
                                {val}
                              </td>
                            ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card
                key={`slaViolationByTechnician-${refreshStates.slaViolationByTechnician}`}
                className="p-4 sm:p-6 h-auto lg:h-[370px] overflow-hidden transition-all duration-200"
                onMouseEnter={() =>
                  handleCardMouseEnter("slaViolationByTechnician")
                }
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center">
                  <CustomDropdown
                    defaultValue="SLA Violation by Technician"
                    options={[
                      "SLA Violation by Technician",
                      "SLA Violation by Priority",
                      "SLA Violation by Category",
                      "SLA Violation by Level",
                      "SLA Violation by Group",
                    ]}
                  />
                  <CardActions
                    onRefresh={() => handleRefresh("slaViolationByTechnician")}
                    onMaximize={() =>
                      handleMaximize("slaViolationByTechnician")
                    }
                    onGraph={() =>
                      handleGraphChange("slaViolationByTechnician")
                    }
                    isMaximized={false}
                    showGraphButton={true}
                    isVisible={hoveredCard === "slaViolationByTechnician"}
                    chartType="bar"
                  />
                </div>
                <BarChart 
                 maximizedCard={maximizedCard}/>
              </Card>
            </div>

            {/* === Row 3 === */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <Card
                key={`requestsApproachingSLA-${refreshStates.requestsApproachingSLA}`}
                className="p-4 sm:p-6 h-[340px] overflow-hidden transition-all duration-200"
                onMouseEnter={() =>
                  handleCardMouseEnter("requestsApproachingSLA")
                }
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center">
                  <span className="bg-transparent text-[#262f36] text-normal not-italic font-[600] sm:ps-4">
                    Requests Approaching SLA Violation
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("requestsApproachingSLA")}
                    onMaximize={() => handleMaximize("requestsApproachingSLA")}
                    isMaximized={false}
                    showGraphButton={false}
                    isVisible={hoveredCard === "requestsApproachingSLA"}
                  />
                </div>
                <EmptyChart />
              </Card>

              <Card
                key={`slaViolatedRequests-${refreshStates.slaViolatedRequests}`}
                className="p-4 sm:p-5 h-[340px] overflow-hidden transition-all duration-200"
                onMouseEnter={() => handleCardMouseEnter("slaViolatedRequests")}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center">
                  <span className="bg-transparent text-[#262f36] text-normal not-italic font-[600]">
                    SLA Violated Requests
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("slaViolatedRequests")}
                    onMaximize={() => handleMaximize("slaViolatedRequests")}
                    isMaximized={false}
                    showGraphButton={false}
                    isVisible={hoveredCard === "slaViolatedRequests"}
                  />
                </div>
                <GaugeChart />
              </Card>

              <Card
                key={`unassignedOpenRequests-${refreshStates.unassignedOpenRequests}`}
                className="p-3 sm:p-4 h-[340px] overflow-hidden transition-all duration-200"
                onMouseEnter={() =>
                  handleCardMouseEnter("unassignedOpenRequests")
                }
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center">
                  <span className="bg-transparent text-[#262f36] text-normal not-italic font-[600]">
                    Unassigned and Open Requests
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("unassignedOpenRequests")}
                    onMaximize={() => handleMaximize("unassignedOpenRequests")}
                    isMaximized={false}
                    showGraphButton={false}
                    isVisible={hoveredCard === "unassignedOpenRequests"}
                  />
                </div>
                <ChartGauge />
              </Card>

              <Card
                key={`openRequestsByPriority-${refreshStates.openRequestsByPriority}`}
                className="p-4 sm:p-4 h-[340px] overflow-hidden transition-all duration-200"
                onMouseEnter={() =>
                  handleCardMouseEnter("openRequestsByPriority")
                }
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center">
                  <span className="bg-transparent text-[#262f36] text-normal not-italic font-[600] sm:ps-4">
                    Open Requests by Priority
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("openRequestsByPriority")}
                    onMaximize={() => handleMaximize("openRequestsByPriority")}
                    onGraph={() => handleGraphChange("openRequestsByPriority")}
                    isMaximized={false}
                    showGraphButton={true}
                    isVisible={hoveredCard === "openRequestsByPriority"}
                    chartType="pie"
                  />
                </div>
                <SmallPieChart 
                 maximizedCard={maximizedCard}/>
              </Card>
            </div>

            {/* === Row 4 === */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <Card
                key={`requestsReceivedLast20Days-${refreshStates.requestsReceivedLast20Days}`}
                className="p-4 sm:p-6 h-auto lg:h-[370px] overflow-hidden transition-all duration-200"
                onMouseEnter={() =>
                  handleCardMouseEnter("requestsReceivedLast20Days")
                }
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center ">
                  <span className="bg-transparent text-[#262f36] text-normal not-italic font-[600]">
                    Requests received in last 20 days
                  </span>
                  <CardActions
                    onRefresh={() =>
                      handleRefresh("requestsReceivedLast20Days")
                    }
                    onMaximize={() =>
                      handleMaximize("requestsReceivedLast20Days")
                    }
                    onGraph={() =>
                      handleGraphChange("requestsReceivedLast20Days")
                    }
                    isMaximized={false}
                    showGraphButton={true}
                    isVisible={hoveredCard === "requestsReceivedLast20Days"}
                    chartType="bar"
                  />
                </div>
                <StackedBarChart 
                 maximizedCard={maximizedCard} />
              </Card>

              <Card
                key={`requestsCompletedLast20Days-${refreshStates.requestsCompletedLast20Days}`}
                className="p-4 sm:p-6 h-auto lg:h-[370px] overflow-hidden transition-all duration-200"
                onMouseEnter={() =>
                  handleCardMouseEnter("requestsCompletedLast20Days")
                }
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="flex justify-between items-center">
                  <span className="bg-transparent text-[#262f36] text-normal not-italic font-[600]">
                    Requests completed in last 20 days
                  </span>
                  <CardActions
                    onRefresh={() =>
                      handleRefresh("requestsCompletedLast20Days")
                    }
                    onMaximize={() =>
                      handleMaximize("requestsCompletedLast20Days")
                    }
                    onGraph={() =>
                      handleGraphChange("requestsCompletedLast20Days")
                    }
                    isMaximized={false}
                    showGraphButton={true}
                    isVisible={hoveredCard === "requestsCompletedLast20Days"}
                    chartType="line"
                  />
                </div>
                <StackedAreaChart  
                 maximizedCard={maximizedCard}/>
              </Card>
            </div>
          </div>
        )}

        {/* Maximized Card Overlay */}
        {renderMaximizedOverlay()}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
