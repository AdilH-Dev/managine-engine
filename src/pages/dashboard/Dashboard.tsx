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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-96"
    >
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-lg font-normal text-gray-900 mb-2">Settings</h2>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-normal text-gray-700 mb-2">
            Refresh Frequency
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            value={refreshFrequency}
            onChange={(e) => onRefreshFrequencyChange(e.target.value)}
          >
            {frequencies.map((frequency) => (
              <option key={frequency} value={frequency}>
                {frequency}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => onAutoRefreshChange(!autoRefresh)}
            className={`relative inline-flex h-4 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              autoRefresh ? "bg-green-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                autoRefresh ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <label className="text-sm font-normal text-gray-700">
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
              text-anchor="middle"
              fill="white"
              font-family="Arial"
              font-size="10"
              font-weight="bold"
            >
              ?
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

// Reusable CustomDropdown Component
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
        className="cursor-pointer font-semibold text-black text-xs py-1 px-2 whitespace-nowrap truncate flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
        title={selected}
      >
        <span className="truncate">{selected}</span>
        <svg
          className={`w-3 h-3 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          } text-gray-400`}
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
      </div>

      {isOpen && (
        <div className="absolute mt-1 w-full sm:w-auto bg-white rounded-lg shadow-md border border-gray-200 z-10">
          {options.map((option) => (
            <div
              key={option}
              className="px-2 py-1 cursor-pointer hover:bg-cyan-50 hover:text-[#4588f0] my-1 text-xs whitespace-nowrap truncate"
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

// CardActions component for refresh, maximize, and graph buttons
const CardActions = ({
  onRefresh,
  onMaximize,
  onGraph,
  isMaximized = false,
  showGraphButton = true,
}: {
  onRefresh: () => void;
  onMaximize: () => void;
  onGraph?: () => void;
  isMaximized?: boolean;
  showGraphButton?: boolean;
}) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center bg-white border border-gray-300 rounded-full px-1 shadow-sm transition-all duration-200">
        <button
          onClick={onRefresh}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
          title="Refresh"
        >
          <svg
            className="w-3.5 h-3.5 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M21 12a9 9 0 1 1-3.51-7.09M21 3v6h-6" />
          </svg>
        </button>

        <div className="w-px h-4 bg-gray-300 mx-1"></div>

        {showGraphButton && onGraph && (
          <>
            <button
              onClick={onGraph}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
              title="Change Graph Type"
            >
              <svg
                className="w-3.5 h-3.5 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M3 13h4v8H3zm7-5h4v13h-4zm7-6h4v19h-4z" />
              </svg>
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
          </>
        )}

        <button
          onClick={onMaximize}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
          title={isMaximized ? "Minimize" : "Maximize"}
        >
          <svg
            className="w-3.5 h-3.5 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {isMaximized ? (
              <path d="M4 14v6h6M20 10V4h-6M20 4l-7 7M4 20l7-7" />
            ) : (
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            )}
          </svg>
        </button>
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
  const [selectedSite, setSelectedSite] = useState("Base Site");
  const [selectedGroup, setSelectedGroup] = useState("All Groups");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleApply = () => {
    onApply(selectedSite, selectedGroup);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
    >
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-gray-900 mb-1">
            Filters
          </h2>
          <div className="text-xs text-gray-600">
            Apply to this dashboard only
          </div>
        </div>

        <div className="mb-3">
          <label
            htmlFor="site-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Site
          </label>
          <select
            id="site-select"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
          >
            <option value="Base Site">Base Site</option>
            <option value="Site 2">Site 2</option>
            <option value="Site 3">Site 3</option>
          </select>
        </div>

        <div className="mb-3">
          <label
            htmlFor="group-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Group
          </label>
          <select
            id="group-select"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="All Groups">All Groups</option>
            <option value="Group 1">Group 1</option>
            <option value="Group 2">Group 2</option>
            <option value="Group 3">Group 3</option>
          </select>
        </div>

        <div className="text-xs text-gray-600 mb-3 flex items-start bg-yellow-100 p-2 rounded">
          <span className="mr-1">❶</span>
          Referred sites will not be included for searching through All Groups
          and Not in any Group of any site.
        </div>

        <div className="flex gap-2">
          <button
            className="flex-1 bg-blue-600 text-white py-2 px-2 rounded-md text-sm font-normal hover:bg-blue-700 transition-colors duration-200"
            onClick={handleApply}
          >
            Apply
          </button>
          <button
            className="flex-1 border border-blue-600 text-blue-600 py-2 px-2 rounded-md text-sm font-normal hover:bg-blue-50 transition-colors duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Chart Container for Maximized View with Legends
const MaximizedChartWithLegends = ({
  children,
  chartName,
  showLegends = true,
}: {
  children: React.ReactNode;
  chartName: string;
  showLegends?: boolean;
}) => {
  const getLegendsForChart = (
    chartName: string
  ): Array<{ label: string; color: string }> => {
    const legendsMap: {
      [key: string]: Array<{ label: string; color: string }>;
    } = {
      openRequestsByMode: [
        { label: "Email", color: "#207FFB" },
        { label: "Not Assigned", color: "#d7d7d7" },
        { label: "Phone Call", color: "#7fdf00" },
        { label: "Web Form", color: "#904ec2" },
      ],
      slaViolationByTechnician: [
        { label: "SLA Violated", color: "#E42527" },
        { label: "Non Violated", color: "#14b474" },
      ],
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
        <div className="w-full h-full">{children}</div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full">
      {/* Chart Area */}
      <div className="flex-1 flex items-center justify-center p-4 bg-white">
        <div className="w-full h-full">{children}</div>
      </div>

      {/* Right Sidebar Legends */}
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto">
        <div className="text-lg font-semibold text-gray-800 mb-6">Legends</div>

        <div className="space-y-3">
          {legends.map((legend, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: legend.color }}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {legend.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Gauge Chart Container without legends
const MaximizedGaugeChart = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex items-center justify-center p-8">
      {children}
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
  const filterRef = useRef<HTMLDivElement>(null);
  const [showSettingsBox, setShowSettingsBox] = useState(false);
  const [refreshFrequency, setRefreshFrequency] = useState("Never");
  const [enableSmartView, setEnableSmartView] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

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

  const handleRefresh = (cardName: string) => {
    console.log(`Refreshing ${cardName}`);
  };

  const handleGraphChange = (cardName: string) => {
    console.log(`Changing graph type for ${cardName}`);
  };

  const handleMaximize = (cardName: string) => {
    if (maximizedCard === cardName) {
      setMaximizedCard(null);
    } else {
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
                <div className="flex justify-between items-center mb-4 border-b border-gray-300 py-2">
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
                    onRefresh={() => handleRefresh("Requests by Technician Table")}
                    onMaximize={() => handleMaximize("requestsByTechnician")}
                    isMaximized={true}
                    showGraphButton={false}
                  />
                </div>
                <div className="overflow-y-auto flex-1 min-h-0 h-[calc(100%-80px)]">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <td className="px-4 py-2 w-1/2"></td>
                        <td className="px-2 py-2 text-center">Open</td>
                        <td className="px-2 py-2 text-center">OnHold</td>
                        <td className="px-2 py-2 text-center">OverDue</td>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        ["Shawn Adams", 4, 0, 4],
                        ["John Roberts", 4, 0, 3],
                        ["Faisal", 3, 0, 1],
                        ["Jennifer Doe", 3, 0, 3],
                        ["Bella Mark", 2, 0, 2],
                        ["Howard Stern", 1, 0, 1],
                        ["Unassigned", 10, 3, 4],
                      ].map(([name, open, hold, overdue]) => (
                        <tr
                          key={name as string}
                          className="transition-colors duration-300 hover:bg-gray-100"
                        >
                          <td className="px-4 py-2">{name as string}</td>
                          <td className="px-2 py-2 text-center">
                            {open as number}
                          </td>
                          <td className="px-2 py-2 text-center">
                            {hold as number}
                          </td>
                          <td className="px-2 py-2 text-center text-[#f00]">
                            {overdue as number}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-semibold transition-colors duration-300 hover:bg-gray-100">
                        <td className="px-4 py-2">Total</td>
                        <td className="px-2 py-2 text-center">27</td>
                        <td className="px-2 py-2 text-center">3</td>
                        <td className="px-2 py-2 text-center text-[#f00]">18</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {maximizedCard === "openRequestsByMode" && (
              <Card className="h-full w-full p-6">
                <div className="flex justify-between items-center mb-4 border-b border-gray-300 py-2">
                  <CustomDropdown
                    defaultValue="Open Requests by Mode"
                    options={[
                      "Open Requests by Mode",
                      "Open Requests by Category",
                      "Open Requests by Level",
                    ]}
                  />
                  <CardActions
                    onRefresh={() => handleRefresh("Open Requests by Mode Chart")}
                    onMaximize={() => handleMaximize("openRequestsByMode")}
                    onGraph={() => handleGraphChange("Open Requests by Mode Chart")}
                    isMaximized={true}
                    showGraphButton={true}
                  />
                </div>
                <div className="h-[calc(100%-80px)]">
                  <MaximizedChartWithLegends chartName="openRequestsByMode">
                    <div className="h-full w-full p-4">
                      <PieChartNew />
                    </div>
                  </MaximizedChartWithLegends>
                </div>
              </Card>
            )}

            {maximizedCard === "requestsLastWeek" && (
              <Card className="h-full w-full p-6">
                <div className="flex justify-between items-center mb-4 border-b border-gray-300 py-2">
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
                    onRefresh={() => handleRefresh("Requests Last Week Table")}
                    onMaximize={() => handleMaximize("requestsLastWeek")}
                    isMaximized={true}
                    showGraphButton={false}
                  />
                </div>
                <div className="h-[calc(100%-80px)] overflow-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <td className="px-2 py-2 text-left w-1/3"></td>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (day) => (
                            <td key={day} className="px-2 py-2 text-center">
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
                          <td className="px-2 py-2 text-left">
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
                <div className="flex justify-between items-center mb-4 border-b border-gray-300 py-2">
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
                    onRefresh={() => handleRefresh("SLA Violation by Technician Chart")}
                    onMaximize={() => handleMaximize("slaViolationByTechnician")}
                    onGraph={() => handleGraphChange("SLA Violation by Technician Chart")}
                    isMaximized={true}
                    showGraphButton={true}
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
                <div className="flex justify-between items-center mb-4 border-b border-gray-300 py-2">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold sm:ps-4">
                    Requests Approaching SLA Violation
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("Requests Approaching SLA Violation Chart")}
                    onMaximize={() => handleMaximize("requestsApproachingSLA")}
                    isMaximized={true}
                    showGraphButton={false}
                  />
                </div>
                <div className="h-[calc(100%-80px)]">
                  <MaximizedGaugeChart>
                    <EmptyChart />
                  </MaximizedGaugeChart>
                </div>
              </Card>
            )}

            {maximizedCard === "slaViolatedRequests" && (
              <Card className="h-full w-full p-6">
                <div className="flex justify-between items-center mb-2 border-b border-gray-300 py-1">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold">
                    SLA Violated Requests
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("SLA Violated Requests Gauge")}
                    onMaximize={() => handleMaximize("slaViolatedRequests")}
                    isMaximized={true}
                    showGraphButton={false}
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
                <div className="flex justify-between items-center mb-2 border-b border-gray-300 py-1">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold">
                    Unassigned and Open Requests
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("Unassigned and Open Requests Gauge")}
                    onMaximize={() => handleMaximize("unassignedOpenRequests")}
                    isMaximized={true}
                    showGraphButton={false}
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
                <div className="flex justify-between items-center border-b border-gray-300 py-2">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold sm:ps-4">
                    Open Requests by Priority
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("Open Requests by Priority Chart")}
                    onMaximize={() => handleMaximize("openRequestsByPriority")}
                    onGraph={() => handleGraphChange("Open Requests by Priority Chart")}
                    isMaximized={true}
                    showGraphButton={true}
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
                <div className="flex justify-between items-center mb-2 border-b border-gray-300 py-2">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold">
                    Requests received in last 20 days
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("Requests Received Last 20 Days Chart")}
                    onMaximize={() => handleMaximize("requestsReceivedLast20Days")}
                    onGraph={() => handleGraphChange("Requests Received Last 20 Days Chart")}
                    isMaximized={true}
                    showGraphButton={true}
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
                <div className="flex justify-between items-center mb-2 border-b border-gray-300 py-2">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold">
                    Requests completed in last 20 days
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("Requests Completed Last 20 Days Chart")}
                    onMaximize={() => handleMaximize("requestsCompletedLast20Days")}
                    onGraph={() => handleGraphChange("Requests Completed Last 20 Days Chart")}
                    isMaximized={true}
                    showGraphButton={true}
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

  // If in fullscreen mode, render only the cards without header and sidebar
  if (isFullscreen && !maximizedCard) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <div className="absolute  right-4 z-50">
          <button
            onClick={handleFullscreenToggle}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 bg-white shadow-lg border border-gray-200"
            title="Exit Fullscreen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-fullscreen-exit"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
            </svg>
          </button>
        </div>
        
        <div className="p-4 h-full overflow-auto">
          {/* Normal Dashboard Cards */}
          <div className="px-2 sm:px-4 md:px-6 py-4 space-y-8">
            {/* === Row 1 === */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <Card className="p-4 sm:p-6 h-auto lg:h-[400px] flex flex-col overflow-hidden">
                <div className="flex justify-between items-center mb-3 border-b border-gray-300 py-2">
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
                    onRefresh={() => handleRefresh("Requests by Technician Table")}
                    onMaximize={() => handleMaximize("requestsByTechnician")}
                    isMaximized={false}
                    showGraphButton={false}
                  />
                </div>

                <div className="overflow-y-auto flex-1 min-h-0">
                  <table className="w-full text-xs sm:text-sm text-left">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <td className="px-4 py-2 w-1/2"></td>
                        <td className="px-2 py-2 text-center">Open</td>
                        <td className="px-2 py-2 text-center">OnHold</td>
                        <td className="px-2 py-2 text-center">OverDue</td>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        ["Shawn Adams", 4, 0, 4],
                        ["John Roberts", 4, 0, 3],
                        ["Faisal", 3, 0, 1],
                        ["Jennifer Doe", 3, 0, 3],
                        ["Bella Mark", 2, 0, 2],
                        ["Howard Stern", 1, 0, 1],
                        ["Unassigned", 10, 3, 4],
                      ].map(([name, open, hold, overdue]) => (
                        <tr
                          key={name as string}
                          className="transition-colors duration-300 hover:bg-gray-100"
                        >
                          <td className="px-4 py-2">{name as string}</td>
                          <td className="px-2 py-2 text-center">
                            {open as number}
                          </td>
                          <td className="px-2 py-2 text-center">
                            {hold as number}
                          </td>
                          <td className="px-2 py-2 text-center text-[#f00]">
                            {overdue as number}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-semibold transition-colors duration-300 hover:bg-gray-100">
                        <td className="px-4 py-2">Total</td>
                        <td className="px-2 py-2 text-center">27</td>
                        <td className="px-2 py-2 text-center">3</td>
                        <td className="px-2 py-2 text-center text-[#f00]">18</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 h-auto lg:h-[400px] overflow-hidden">
                <div className="flex justify-between items-center mb-4 border-b border-gray-300 py-2">
                  <CustomDropdown
                    defaultValue="Open Requests by Mode"
                    options={[
                      "Open Requests by Mode",
                      "Open Requests by Category",
                      "Open Requests by Level",
                    ]}
                  />
                  <CardActions
                    onRefresh={() => handleRefresh("Open Requests by Mode Chart")}
                    onMaximize={() => handleMaximize("openRequestsByMode")}
                    onGraph={() => handleGraphChange("Open Requests by Mode Chart")}
                    isMaximized={false}
                    showGraphButton={true}
                  />
                </div>
                <PieChartNew />
              </Card>
            </div>

            {/* === Row 2 === */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <Card className="p-4 sm:p-6 h-auto lg:h-[400px] overflow-hidden">
                <div className="flex justify-between items-center mb-4 border-b border-gray-300 py-2">
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
                    onRefresh={() => handleRefresh("Requests Last Week Table")}
                    onMaximize={() => handleMaximize("requestsLastWeek")}
                    isMaximized={false}
                    showGraphButton={false}
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm border-collapse">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <td className="px-2 py-2 text-left w-1/3"></td>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (day) => (
                            <td key={day} className="px-2 py-2 text-center">
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
                          <td className="px-2 py-2 text-left">
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

              <Card className="p-4 sm:p-6 h-auto lg:h-[400px] overflow-hidden">
                <div className="flex justify-between items-center mb-4 border-b border-gray-300 py-2">
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
                    onRefresh={() => handleRefresh("SLA Violation by Technician Chart")}
                    onMaximize={() => handleMaximize("slaViolationByTechnician")}
                    onGraph={() => handleGraphChange("SLA Violation by Technician Chart")}
                    isMaximized={false}
                    showGraphButton={true}
                  />
                </div>
                <BarChart />
              </Card>
            </div>

            {/* === Row 3 === */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <Card className="p-4 sm:p-6 h-[360px] overflow-hidden">
                <div className="flex justify-between items-center mb-4 border-b border-gray-300 py-2">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold sm:ps-4">
                    Requests Approaching SLA Violation
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("Requests Approaching SLA Violation Chart")}
                    onMaximize={() => handleMaximize("requestsApproachingSLA")}
                    isMaximized={false}
                    showGraphButton={false}
                  />
                </div>
                <EmptyChart />
              </Card>

              <Card className="p-4 sm:p-6 h-[360px] overflow-hidden">
                <div className="flex justify-between items-center mb-2 border-b border-gray-300 py-1">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold">
                    SLA Violated Requests
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("SLA Violated Requests Gauge")}
                    onMaximize={() => handleMaximize("slaViolatedRequests")}
                    isMaximized={false}
                    showGraphButton={false}
                  />
                </div>
                <GaugeChart />
              </Card>

              <Card className="p-4 sm:p-6 h-[360px] overflow-hidden">
                <div className="flex justify-between items-center mb-2 border-b border-gray-300 py-1">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold">
                    Unassigned and Open Requests
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("Unassigned and Open Requests Gauge")}
                    onMaximize={() => handleMaximize("unassignedOpenRequests")}
                    isMaximized={false}
                    showGraphButton={false}
                  />
                </div>
                <ChartGauge />
              </Card>

              <Card className="p-4 sm:p-6 h-[360px] overflow-hidden">
                <div className="flex justify-between items-center border-b border-gray-300 py-2">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold sm:ps-4">
                    Open Requests by Priority
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("Open Requests by Priority Chart")}
                    onMaximize={() => handleMaximize("openRequestsByPriority")}
                    onGraph={() => handleGraphChange("Open Requests by Priority Chart")}
                    isMaximized={false}
                    showGraphButton={true}
                  />
                </div>
                <SmallPieChart />
              </Card>
            </div>

            {/* === Row 4 === */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <Card className="p-4 sm:p-6 h-auto lg:h-[400px] overflow-hidden">
                <div className="flex justify-between items-center mb-2 border-b border-gray-300 py-2">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold">
                    Requests received in last 20 days
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("Requests Received Last 20 Days Chart")}
                    onMaximize={() => handleMaximize("requestsReceivedLast20Days")}
                    onGraph={() => handleGraphChange("Requests Received Last 20 Days Chart")}
                    isMaximized={false}
                    showGraphButton={true}
                  />
                </div>
                <StackedBarChart />
              </Card>

              <Card className="p-4 sm:p-6 h-auto lg:h-[400px] overflow-hidden">
                <div className="flex justify-between items-center mb-2 border-b border-gray-300 py-2">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold">
                    Requests completed in last 20 days
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("Requests Completed Last 20 Days Chart")}
                    onMaximize={() => handleMaximize("requestsCompletedLast20Days")}
                    onGraph={() => handleGraphChange("Requests Completed Last 20 Days Chart")}
                    isMaximized={false}
                    showGraphButton={true}
                  />
                </div>
                <StackedAreaChart />
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
        <nav className="px-4 pt-2 pb-0 mb-0 flex flex-wrap items-center justify-between mt-7">
          <div className="flex items-center space-x-6 font-normal text-gray-700 gap-3">
            {[
              "Dashboard",
              "Sheduler",
              "Test Availabilty Chart",
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
                      "text-blue-600",
                      "border-b-2",
                      "border-blue-600"
                    )
                  );
                  e.currentTarget.classList.add(
                    "text-blue-600",
                    "border-b-2",
                    "border-blue-600"
                  );
                }}
                className={`nav-link pb-[9px] hover:text-blue-600 hover:border-b-2 hover:border-blue-600 ${
                  item === "Dashboard"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : ""
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        <div className="border-t border-gray-300"></div>

        {/* Helpdesk Dashboard Header */}
        <div className="flex justify-between items-center px-9 mt-7">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zm3.164 2.5h2.49a6.958 6.958 0 0 0-.656-2.5h-2.334c.174.782.282 1.623.312 2.5zm.847 1.5H8.5v2.5h2.653a12.5 12.5 0 0 0 .337-2.5zm2.99 1.5h-2.49c-.03.877-.138 1.718-.312 2.5h2.334a6.958 6.958 0 0 0 .656-2.5zM4.51 11.5h2.49c.03.877.138 1.718.312 2.5H4.847a12.5 12.5 0 0 1-.337-2.5zm-.847-1.5H7.5V7.5H4.847a12.5 12.5 0 0 0-.337 2.5zM2.255 12h1.835a9.267 9.267 0 0 1-.64-1.539 6.7 6.7 0 0 1-.597-.933A7.025 7.025 0 0 0 2.255 12zm1.35-8a9.267 9.267 0 0 0 .64 1.539c.247.365.415.712.597.933A7.025 7.025 0 0 1 2.255 4h1.35z" />
              </svg>
              <button
                onClick={() => setShowDashboardBox(!showDashboardBox)}
                className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Helpdesk Dashboard
              </button>
            </div>
          </div>

          {/* Filter and Settings Buttons */}
          <div className="flex items-center gap-4 relative" ref={filterRef}>
            <div className="flex items-center gap-2">
              <button
                onClick={handleFullscreenToggle}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="20"
                  fill="currentColor"
                  className="bi bi-fullscreen"
                  viewBox="0 0 16 16"
                >
                  {isFullscreen ? (
                    <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
                  ) : (
                    <path d="M1 1v4h2V3h2V1H1zm14 0h-4v2h2v2h2V1zM1 15h4v-2H3v-2H1v4zm14 0v-4h-2v2h-2v2h4z"/>
                  )}
                </svg>
              </button>

              <div className="relative" ref={settingsRef}>
                <button
                  onClick={() => setShowSettingsBox(!showSettingsBox)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  title="Settings"
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
            </div>

            {/* Filter Buttons */}
            <button
              onClick={() => setShowFilterBox(!showFilterBox)}
              className="flex align-center px-4 py-2 gap-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                color="gray"
                className="bi bi-geo-alt"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32.2 32.2 0 0 1 8 14.58a32.2 32.2 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.37 8.02 3 7.06 3 6a5 5 0 1 1 10 0c0 1.06-.37 2.02-.834 2.94M8 16s6-5.686 6-10A6 6 0 1 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4" />
              </svg>
              {selectedSite}
            </button>

            <button
              onClick={() => setShowFilterBox(!showFilterBox)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="gray"
                className="bi bi-people-fill"
                viewBox="0 0 16 16"
              >
                <path d="M13 7c1.105 0 2-.672 2-1.5S14.105 4 13 4s-2 .672-2 1.5S11.895 7 13 7M3 7c1.105 0 2-.672 2-1.5S4.105 4 3 4 1 4.672 1 5.5 1.895 7 3 7m10 1c-1.657 0-3 1.12-3 2.5V12h6v-1.5c0-1.38-1.343-2.5-3-2.5M3 8c-1.657 0-3 1.12-3 2.5V12h6v-1.5C6 9.12 4.657 8 3 8" />
              </svg>
              {selectedGroup}
            </button>

            <FilterBox
              isOpen={showFilterBox}
              onClose={() => setShowFilterBox(false)}
              onApply={handleFilterApply}
            />
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
              <div className="flex justify-between text-gray-600 text-xs font-semibold uppercase tracking-wide mb-8">
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
              <div className="flex items-center justify-between text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1">
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
              <Card className="p-4 sm:p-6 h-auto lg:h-[400px] flex flex-col overflow-hidden">
                <div className="flex justify-between items-center mb-3 border-b border-gray-300 py-2">
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
                    onRefresh={() => handleRefresh("Requests by Technician Table")}
                    onMaximize={() => handleMaximize("requestsByTechnician")}
                    isMaximized={false}
                    showGraphButton={false}
                  />
                </div>

                <div className="overflow-y-auto flex-1 min-h-0">
                  <table className="w-full text-xs sm:text-sm text-left">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <td className="px-4 py-2 w-1/2"></td>
                        <td className="px-2 py-2 text-center">Open</td>
                        <td className="px-2 py-2 text-center">OnHold</td>
                        <td className="px-2 py-2 text-center">OverDue</td>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        ["Shawn Adams", 4, 0, 4],
                        ["John Roberts", 4, 0, 3],
                        ["Faisal", 3, 0, 1],
                        ["Jennifer Doe", 3, 0, 3],
                        ["Bella Mark", 2, 0, 2],
                        ["Howard Stern", 1, 0, 1],
                        ["Unassigned", 10, 3, 4],
                      ].map(([name, open, hold, overdue]) => (
                        <tr
                          key={name as string}
                          className="transition-colors duration-300 hover:bg-gray-100"
                        >
                          <td className="px-4 py-2">{name as string}</td>
                          <td className="px-2 py-2 text-center">
                            {open as number}
                          </td>
                          <td className="px-2 py-2 text-center">
                            {hold as number}
                          </td>
                          <td className="px-2 py-2 text-center text-[#f00]">
                            {overdue as number}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-semibold transition-colors duration-300 hover:bg-gray-100">
                        <td className="px-4 py-2">Total</td>
                        <td className="px-2 py-2 text-center">27</td>
                        <td className="px-2 py-2 text-center">3</td>
                        <td className="px-2 py-2 text-center text-[#f00]">18</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 h-auto lg:h-[400px] overflow-hidden">
                <div className="flex justify-between items-center mb-4 border-b border-gray-300 py-2">
                  <CustomDropdown
                    defaultValue="Open Requests by Mode"
                    options={[
                      "Open Requests by Mode",
                      "Open Requests by Category",
                      "Open Requests by Level",
                    ]}
                  />
                  <CardActions
                    onRefresh={() => handleRefresh("Open Requests by Mode Chart")}
                    onMaximize={() => handleMaximize("openRequestsByMode")}
                    onGraph={() => handleGraphChange("Open Requests by Mode Chart")}
                    isMaximized={false}
                    showGraphButton={true}
                  />
                </div>
                <PieChartNew />
              </Card>
            </div>

            {/* === Row 2 === */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <Card className="p-4 sm:p-6 h-auto lg:h-[400px] overflow-hidden">
                <div className="flex justify-between items-center mb-4 border-b border-gray-300 py-2">
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
                    onRefresh={() => handleRefresh("Requests Last Week Table")}
                    onMaximize={() => handleMaximize("requestsLastWeek")}
                    isMaximized={false}
                    showGraphButton={false}
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm border-collapse">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <td className="px-2 py-2 text-left w-1/3"></td>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (day) => (
                            <td key={day} className="px-2 py-2 text-center">
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
                          <td className="px-2 py-2 text-left">
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

              <Card className="p-4 sm:p-6 h-auto lg:h-[400px] overflow-hidden">
                <div className="flex justify-between items-center mb-4 border-b border-gray-300 py-2">
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
                    onRefresh={() => handleRefresh("SLA Violation by Technician Chart")}
                    onMaximize={() => handleMaximize("slaViolationByTechnician")}
                    onGraph={() => handleGraphChange("SLA Violation by Technician Chart")}
                    isMaximized={false}
                    showGraphButton={true}
                  />
                </div>
                <BarChart />
              </Card>
            </div>

            {/* === Row 3 === */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <Card className="p-4 sm:p-6 h-[360px] overflow-hidden">
                <div className="flex justify-between items-center mb-4 border-b border-gray-300 py-2">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold sm:ps-4">
                    Requests Approaching SLA Violation
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("Requests Approaching SLA Violation Chart")}
                    onMaximize={() => handleMaximize("requestsApproachingSLA")}
                    isMaximized={false}
                    showGraphButton={false}
                  />
                </div>
                <EmptyChart />
              </Card>

              <Card className="p-4 sm:p-6 h-[360px] overflow-hidden">
                <div className="flex justify-between items-center mb-2 border-b border-gray-300 py-1">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold">
                    SLA Violated Requests
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("SLA Violated Requests Gauge")}
                    onMaximize={() => handleMaximize("slaViolatedRequests")}
                    isMaximized={false}
                    showGraphButton={false}
                  />
                </div>
                <GaugeChart />
              </Card>

              <Card className="p-4 sm:p-6 h-[360px] overflow-hidden">
                <div className="flex justify-between items-center mb-2 border-b border-gray-300 py-1">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold">
                    Unassigned and Open Requests
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("Unassigned and Open Requests Gauge")}
                    onMaximize={() => handleMaximize("unassignedOpenRequests")}
                    isMaximized={false}
                    showGraphButton={false}
                  />
                </div>
                <ChartGauge />
              </Card>

              <Card className="p-4 sm:p-6 h-[360px] overflow-hidden">
                <div className="flex justify-between items-center border-b border-gray-300 py-2">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold sm:ps-4">
                    Open Requests by Priority
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("Open Requests by Priority Chart")}
                    onMaximize={() => handleMaximize("openRequestsByPriority")}
                    onGraph={() => handleGraphChange("Open Requests by Priority Chart")}
                    isMaximized={false}
                    showGraphButton={true}
                  />
                </div>
                <SmallPieChart />
              </Card>
            </div>

            {/* === Row 4 === */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <Card className="p-4 sm:p-6 h-auto lg:h-[400px] overflow-hidden">
                <div className="flex justify-between items-center mb-2 border-b border-gray-300 py-2">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold">
                    Requests received in last 20 days
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("Requests Received Last 20 Days Chart")}
                    onMaximize={() => handleMaximize("requestsReceivedLast20Days")}
                    onGraph={() => handleGraphChange("Requests Received Last 20 Days Chart")}
                    isMaximized={false}
                    showGraphButton={true}
                  />
                </div>
                <StackedBarChart />
              </Card>

              <Card className="p-4 sm:p-6 h-auto lg:h-[400px] overflow-hidden">
                <div className="flex justify-between items-center mb-2 border-b border-gray-300 py-2">
                  <span className="bg-transparent text-black text-sm not-italic font-semibold">
                    Requests completed in last 20 days
                  </span>
                  <CardActions
                    onRefresh={() => handleRefresh("Requests Completed Last 20 Days Chart")}
                    onMaximize={() => handleMaximize("requestsCompletedLast20Days")}
                    onGraph={() => handleGraphChange("Requests Completed Last 20 Days Chart")}
                    isMaximized={false}
                    showGraphButton={true}
                  />
                </div>
                <StackedAreaChart />
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