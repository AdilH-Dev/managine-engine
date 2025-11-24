import { MainLayout } from "@/components/Layout/MainLayout";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { DropdownData } from "@/types/ticket";
import { useEffect, useMemo, useState } from "react";
import CustomSelect from "@/components/CustomSelect";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, getDay, getDaysInMonth, startOfMonth, addMonths, addYears } from "date-fns";

// Calendar Input Component
interface CalendarInputProps {
  value?: Date | null;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

const CalendarInput = ({
  value,
  onChange,
  placeholder = "Select date",
  className = "",
}: CalendarInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value || undefined);
  const [currentMonth, setCurrentMonth] = useState<Date>(value || new Date());

  const handleSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    onChange?.(newDate);
  };

  const handleClearDate = () => {
    setSelectedDate(undefined);
    onChange?.(undefined);
  };

  const handlePrevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handlePrevYear = () => setCurrentMonth(addYears(currentMonth, -1));
  const handleNextYear = () => setCurrentMonth(addYears(currentMonth, 1));

  const handleToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today);
    onChange?.(today);
  };

  const monthStart = startOfMonth(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);
  const startingDayOfWeek = getDay(monthStart);

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const dayLabels = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number | null) => {
    if (!day || !selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={`relative flex items-center ${className}`}>
          <div className="flex-1 px-3 py-2 border border-gray-300 rounded bg-white text-sm text-gray-700 cursor-pointer w-full">
            {selectedDate ? format(selectedDate, "MM/dd/yyyy") : placeholder}
          </div>
          <div className="absolute right-3 flex items-center gap-1">
            {selectedDate && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearDate();
                }}
                className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg 
                  className="w-3 h-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            )}
            <div className="pointer-events-none">
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-4">
        <div className="w-80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevYear}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <ChevronLeft className="w-4 h-4" />
                <ChevronLeft className="w-4 h-4 -ml-2" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevMonth}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-center font-semibold text-gray-800">
              {format(currentMonth, "MMMM yyyy")}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextMonth}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextYear}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4" />
                <ChevronRight className="w-4 h-4 -ml-2" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayLabels.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-gray-600 py-2"
              >
                {day}
              </div>
            ))}
            {weeks.map((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <div key={`${weekIndex}-${dayIndex}`}>
                  {day === null ? (
                    <div />
                  ) : (
                    <button
                      onClick={() => handleSelect(day)}
                      className={`w-full h-8 rounded text-sm transition-colors ${
                        isSelected(day)
                          ? "bg-blue-500 text-white font-semibold"
                          : isToday(day)
                            ? "bg-blue-500 text-white font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {day}
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="flex justify-start pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              className="text-blue-500 border-blue-500 rounded-full bg-white hover:bg-white  hover:text-blue-500 mt-2"
              onClick={handleToday}
            >
              Today
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default function NewButton() {
  const [showNetworkDetails, setShowNetworkDetails] = useState(true);
  const [showMonitorDetails, setShowMonitorDetails] = useState(true);
  const [showHardDiskDetails, setShowHardDiskDetails] = useState(true);
  const [showProcessorDetails, setShowProcessorDetails] = useState(true);
  const navigate = useNavigate();
  const { control } = useForm();

  // State for dynamic fields
  const [hardDiskFields, setHardDiskFields] = useState([{ id: 1 }]);
  const [processorFields, setProcessorFields] = useState([{ id: 1 }]);
  const [monitorFields, setMonitorFields] = useState([{ id: 1 }]);
  const [networkFields, setNetworkFields] = useState([{ id: 1 }]);

  // Static dropdown data with all required properties
  const [dropDown, setDropDown] = useState<DropdownData>({
    products: [
      { id: 1, name: "Dell OptiPlex", value: "1", label: "Dell OptiPlex" },
      { id: 2, name: "Linux", value: "2", label: "Linux" },
      { id: 3, name: "MAC", value: "3", label: "MAC" },
      { id: 4, name: "Precision 3570", value: "4", label: "Precision 3570" },
      { id: 5, name: "Precision 5560", value: "5", label: "Precision 5560" },
      {
        id: 6,
        name: "Product 1 of test 1 inside test",
        value: "6",
        label: "Product 1 of test 1 inside test",
      },
      { id: 7, name: "Unknown Server", value: "7", label: "Unknown Server" },
      { id: 8, name: "Windows", value: "8", label: "Windows" },
    ],
    domains: [
      { id: 1, name: "company.local", value: "1", label: "company.local" },
      {
        id: 2,
        name: "corp.example.com",
        value: "2",
        label: "corp.example.com",
      },
      { id: 3, name: "office.net", value: "3", label: "office.net" },
      { id: 4, name: "enterprise.org", value: "4", label: "enterprise.org" },
      { id: 5, name: "workplace.dev", value: "5", label: "workplace.dev" },
      { id: 6, name: "business.co", value: "6", label: "business.co" },
      { id: 7, name: "organization.io", value: "7", label: "organization.io" },
    ],
    vendors: [
      { id: 1, name: "Apple", value: "1", label: "Apple" },
      { id: 2, name: "Dell", value: "2", label: "Dell" },
      { id: 3, name: "HP", value: "3", label: "HP" },
      { id: 4, name: "Lenovo", value: "4", label: "Lenovo" },
    ],
      repair: [
      { id: 1, name: "Disposed", value: "1", label: "Disposed" },
      { id: 2, name: "Expired", value: "2", label: "Expired" },
      { id: 3, name: "In Repair", value: "3", label: "In Repair" },
      { id: 4, name: "In store", value: "4", label: "In store" },
      { id: 5, name: "In Use", value: "4", label: "In Use" },
    ],
       base: [
      { id: 1, name: "Data Center,FL", value: "2", label: "Data Center,FL" },
      { id: 2, name: "HeadQuaters,NY", value: "3", label: "HeadQuaters,NY" },
      { id: 3, name: "IDC, SA", value: "4", label: "IDC, SA" },
      { id: 4, name: "viion lahore", value: "4", label: "viion lahore" },
    ],

     closureCodes: [],
    // Add all required properties from DropdownData type
    category: [],
    departments: [],
    users: [],
    roles: [],
    allowedToView: [],
    requesters: [],
    assets: [],
    requestTypes: [],
    impacts: [],
    modes: [],
    levels: [],
    sites: [],
    groups: [],
    categories: [],
    technicians: [],
    priorities: [],
    statuses: [],
    userEmails: [],
  });

  // Functions for Hard Disks
  const addHardDiskField = () => {
    setHardDiskFields([...hardDiskFields, { id: hardDiskFields.length + 1 }]);
  };

  const removeHardDiskField = (index: number) => {
    setHardDiskFields(hardDiskFields.filter((_, i) => i !== index));
  };

  // Functions for Processors
  const addProcessorField = () => {
    setProcessorFields([
      ...processorFields,
      { id: processorFields.length + 1 },
    ]);
  };

  const removeProcessorField = (index: number) => {
    setProcessorFields(processorFields.filter((_, i) => i !== index));
  };

  // Functions for Monitors
  const addMonitorField = () => {
    setMonitorFields([...monitorFields, { id: monitorFields.length + 1 }]);
  };

  const removeMonitorField = (index: number) => {
    setMonitorFields(monitorFields.filter((_, i) => i !== index));
  };

  // Functions for Network Details
  const addNetworkField = () => {
    setNetworkFields([...networkFields, { id: networkFields.length + 1 }]);
  };

  const removeNetworkField = (index: number) => {
    setNetworkFields(networkFields.filter((_, i) => i !== index));
  };

  return (
    <MainLayout title="Setup">
      <div className="bg-white">
        <div className="">
          {" "}
          {/*for  grid col-3*/}
          {/* header */}
          <div className="flex items-center gap-3 ps-3 mx-6 my-3 pt-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
              className="h-6 w-6 border border-gray-400 rounded-sm py-4 px-5 hover:bg-gray-200  hover:text-black font-[400]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Button>
            <h2 className="font-[700] text-2xl text-[#333]">New Computer</h2>
          </div>
        </div>

        <div className="border-t border-gray-200 my-3"></div>

        {/* name & product */}
        <div className="grid grid-cols-2 gap-7 px-6 py-2 mt-6">
          {/* Name dropdown */}
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#666] whitespace-nowrap w-32">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder=""
              className="pl-9 bg-white py-[8px] rounded w-[450px]"
            />
          </div>

          {/* Product dropdown */}
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#666] whitespace-nowrap w-32">
              Product<span className="text-red-500">*</span>
            </label>
            <div className="w-[450px]">
              <Controller
                name="product"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    options={dropDown?.products || []}
                    placeholder="-- Select product --"
                    showNoneOption
                    defaultValue={
                      dropDown?.products?.find((p) => p.id == field.value) ||
                      null
                    }
                    onChange={(option) => field.onChange(option?.id.toString())}
                    className="w-full"
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-2"></div>

        {/* computer */}
        <h3 className="font-[600] text-[#333] text-lg ms-7 my-3">Computer</h3>
        <div className="grid grid-cols-2 gap-7 ms-7">
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Service Tag
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>

          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Manufacturer
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>

          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Bios Date
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>

          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Domain
            </label>
            <Controller
              name="domain"
              control={control}
              render={({ field }) => (
                <div className="w-[450px]">
                  <CustomSelect
                    {...field}
                    options={dropDown?.domains || []}
                    placeholder="-- Select Domain --"
                    showNoneOption
                    defaultValue={
                      dropDown?.domains?.find((d) => d.id == field.value) ||
                      null
                    }
                    onChange={(option) => field.onChange(option?.id.toString())}
                    className="w-full"
                  />
                </div>
              )}
            />
          </div>

          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              SMBios Version
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>

          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              test
            </label>
            <Input
              placeholder="e.g. http://www.example.com"
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>

          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              dynamic testing
            </label>
            <Input
              placeholder="e.g. johndoe@example.com"
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>

          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Bios Version
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>

          <div className="flex items-center gap-7"></div>

          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Bios Manufacturer
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 my-3"></div>

        {/* OS */}
        <h3 className="font-[600] text-[#333] text-lg ms-7 my-3">
          Operating System
        </h3>

        <div className="grid grid-cols-2 gap-4 ms-7">
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Name
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>

          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Version
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>

          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Build Number
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>

          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Service Pack
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>

          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Product ID
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 my-3"></div>

        {/* Memory Details */}
        <h3 className="font-[600] text-[#333] text-lg ms-7 my-3">
          Memory Details
        </h3>

        <div className="grid grid-cols-2 gap-4 ms-7">
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              RAM
            </label>
            <div className="relative w-[450px]">
              <Input
                placeholder=""
                className="bg-white py-[8px] rounded w-full pr-12"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#515562] text-sm">
                GB
              </span>
            </div>
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Virtual Memory
            </label>
            <div className="relative w-[450px]">
              <Input
                placeholder=""
                className="bg-white py-[8px] rounded w-full pr-12"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#515562] text-sm">
                GB
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-3"></div>

        {/* Processors */}
        <div className="ms-7 my-3">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setShowProcessorDetails(!showProcessorDetails)}
          >
            <svg
              className={`w-3 h-3 ml-2 transition-transform duration-200 text-gray-400 ${
                showProcessorDetails ? "rotate-0" : "-rotate-90"
              }`}
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
            <h3 className="font-[600] text-[#333] text-lg ms-1 py-5">
              Processors
            </h3>
          </div>

          {showProcessorDetails && (
            <>
              <div className="flex justify-between items-center bg-gray-50 mx-10 ps-11 font-[400] text-normal text-[#666] py-2">
                <div className="flex-1 text-center">
                  <span>Processor Info</span>
                </div>
                <div className="flex-1 text-center">
                  <span>Manufacturer</span>
                </div>
                <div className="flex-1 text-center">
                  <span>Clock Speed (MHz)</span>
                </div>
                <div className="flex-1 text-center">
                  <span>Number of cores</span>
                </div>
                <div className="w-20"></div>
              </div>

              {processorFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex justify-between mx-16 gap-3 my-4 items-center"
                >
                  <div className="flex-1">
                    <Input
                      placeholder=""
                      className="bg-white py-[8px] rounded w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder=""
                      className="bg-white py-[8px] rounded w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder=""
                      className="bg-white py-[8px] rounded w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder=""
                      className="bg-white py-[8px] rounded w-full"
                    />
                  </div>
                  <div className="flex gap-2 w-20 justify-center">
                    <button
                      onClick={addProcessorField}
                      className="w-7 h-7 flex items-center justify-center border border-gray-300 text-gray-500 rounded text-sm hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeProcessorField(index)}
                      className="w-7 h-7 flex items-center justify-center border border-gray-300 text-gray-500 rounded text-sm hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="border-t border-gray-200 my-3"></div>

        {/* Hard Disks */}
        <div className="ms-7 my-3">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setShowHardDiskDetails(!showHardDiskDetails)}
          >
            <svg
              className={`w-3 h-3 ml-2 transition-transform duration-200 text-gray-400 ${
                showHardDiskDetails ? "rotate-0" : "-rotate-90"
              }`}
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
            <h3 className="font-[600] text-[#333] text-lg ms-1 py-5">
              Hard Disks
            </h3>
          </div>

          {showHardDiskDetails && (
            <>
              <div className="flex justify-between items-center bg-gray-50 mx-16 font-[400] text-normal text-[#666] py-2">
                <div className="flex-1 text-center">
                  <span>Model</span>
                </div>
                <div className="flex-1 text-center">
                  <span>Serial Number</span>
                </div>
                <div className="flex-1 text-center">
                  <span>Manufacturer</span>
                </div>
                <div className="flex-1 text-center">
                  <span>Capacity (In GB)</span>
                </div>
                <div className="w-20"></div>
              </div>

              {hardDiskFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex justify-between mx-16 gap-3 my-4 items-center"
                >
                  <div className="flex-1">
                    <Input
                      placeholder=""
                      className="bg-white py-[8px] rounded w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder=""
                      className="bg-white py-[8px] rounded w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder=""
                      className="bg-white py-[8px] rounded w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder=""
                      className="bg-white py-[8px] rounded w-full"
                    />
                  </div>
                  <div className="flex gap-2 w-20 justify-center">
                    <button
                      onClick={addHardDiskField}
                      className="w-7 h-7 flex items-center justify-center border border-gray-300 text-gray-500 rounded text-sm hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeHardDiskField(index)}
                      className="w-7 h-7 flex items-center justify-center border border-gray-300 text-gray-500 rounded text-sm hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="border-t border-gray-200 my-3"></div>

        {/* Keyboard */}
        <h3 className="font-[600] text-[#333] text-lg ms-7 my-3">Keyboard</h3>

        <div className="grid grid-cols-2 gap-4 ms-7">
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Keyboard Type
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Manufacturer
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Serial Number
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 my-3"></div>

        {/* Mouse */}
        <h3 className="font-[600] text-[#333] text-lg ms-7 my-3">Mouse</h3>

        <div className="grid grid-cols-2 gap-4 ms-7">
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Mouse Type
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Serial Number
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Mouse Buttons
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Mouse Manufacturer
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 my-3"></div>

        {/* Monitors */}
        <div className="ms-7 my-3">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setShowMonitorDetails(!showMonitorDetails)}
          >
            <svg
              className={`w-3 h-3 ml-2 transition-transform duration-200 text-gray-400 ${
                showMonitorDetails ? "rotate-0" : "-rotate-90"
              }`}
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
            <h3 className="font-[600] text-[#333] text-lg ms-1 py-5">
              Monitors
            </h3>
          </div>

          {showMonitorDetails && (
            <>
              <div className="flex justify-between items-center bg-gray-50 mx-16 font-[400] text-normal text-[#666] py-2">
                <div className="flex-1 text-center">
                  <span>Monitor Type</span>
                </div>
                <div className="flex-1 text-center">
                  <span>Serial Number</span>
                </div>
                <div className="flex-1 text-center">
                  <span>Manufacturer</span>
                </div>
                <div className="flex-1 text-center">
                  <span>MaxResolution</span>
                </div>
                <div className="w-20"></div>
              </div>

              {monitorFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex justify-between mx-16 gap-3 my-4 items-center"
                >
                  <div className="flex-1">
                    <Input
                      placeholder=""
                      className="bg-white py-[8px] rounded w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder=""
                      className="bg-white py-[8px] rounded w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder=""
                      className="bg-white py-[8px] rounded w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder=""
                      className="bg-white py-[8px] rounded w-full"
                    />
                  </div>
                  <div className="flex gap-2 w-20 justify-center">
                    <button
                      onClick={addMonitorField}
                      className="w-7 h-7 flex items-center justify-center border border-gray-300 text-gray-500 rounded text-sm hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeMonitorField(index)}
                      className="w-7 h-7 flex items-center justify-center border border-gray-300 text-gray-500 rounded text-sm hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="border-t border-gray-200 my-3"></div>

        {/* Asset Details */}
        <h3 className="font-[600] text-[#333] text-lg ms-7 my-3">
          Asset Details
        </h3>

        <div className="grid grid-cols-2 gap-4 ms-7">
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Serial Number
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              AssetTag
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Vendor
            </label>
            <Controller
              name="vendor"
              control={control}
              render={({ field }) => (
                <div className="w-[450px]">
                  <CustomSelect
                    {...field}
                    options={dropDown?.vendors || []}
                    placeholder="-- Select Vendor --"
                    showNoneOption
                    defaultValue={
                      dropDown?.vendors?.find((v) => v.id == field.value) ||
                      null
                    }
                    onChange={(option) => field.onChange(option?.id.toString())}
                    className="w-full"
                  />
                </div>
              )}
            />
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Barcode / QR code
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Purchase Cost
            </label>
            <div className="relative w-[450px]">
              <Input
                placeholder=""
                className="bg-white py-[8px] rounded w-full pr-12"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#515562] text-sm">
                $
              </span>
            </div>
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Acquisition Date
            </label>
            <div className="w-[450px]">
              <CalendarInput placeholder="MM/DD/YYYY" />
            </div>
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Expiry Date
            </label>
            <div className="w-[450px]">
              <CalendarInput placeholder="MM/DD/YYYY" />
            </div>
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Warranty Expiry Date
            </label>
            <div className="w-[450px]">
              <CalendarInput placeholder="MM/DD/YYYY" />
            </div>
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Location
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 my-3"></div>

        {/* Asset State */}
        <h3 className="font-[600] text-[#333] text-lg ms-7 my-3">
          Asset State
        </h3>

        <div className="grid grid-cols-2 gap-4 ms-7">
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#666] whitespace-nowrap w-32">
              Asset is currently<span className="text-red-500">*</span>
            </label>
            <div className="w-[450px]">
              <Controller
                name="repair"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    options={dropDown?.repair || []}
                    placeholder="in Repair"
                    showNoneOption
                    defaultValue={
                      dropDown?.repair?.find((p) => p.id == field.value) ||
                      null
                    }
                    onChange={(option) => field.onChange(option?.id.toString())}
                    className="w-full"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              User
            </label>
            <Input
              placeholder="--Select User--"
              className="bg-gray-200 py-[8px] rounded w-[450px]"
              disabled
            />
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Associated To 
            </label>
            <Input
              placeholder="Select asset to associate"
              className="bg-gray-200 py-[8px] rounded w-[450px]"
              disabled
            />
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              Department
            </label>
            <Input
              placeholder="--Select Department--"
              className="bg-gray-200 py-[8px] rounded w-[450px]"
              disabled
            />
          </div>
         <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#666] whitespace-nowrap w-32">
              Site
            </label>
            <div className="w-[450px]">
              <Controller
                name="sites"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    options={dropDown?.base || []}
                    placeholder="Base Site"
                    showNoneOption
                    defaultValue={
                      dropDown?.base?.find((p) => p.id == field.value) ||
                      null
                    }
                    onChange={(option) => field.onChange(option?.id.toString())}
                    className="w-full"
                  />
                )}
              />
            </div>
          </div>
            <div className="flex items-center gap-7">
          </div>

          <div className="flex items-center ms-20 gap-5">
            <input type="checkbox" className="w-4 h-4 text-gray-100 bg-gray-100" />
            <span>Retain Associated asset/User/Department's site</span>
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32"></label>
          </div>
          <div className="flex items-center gap-7">
            <label className="text-[14px] font-[400] text-[#515562] whitespace-nowrap w-32">
              State Comments
            </label>
            <Input
              placeholder=""
              className="bg-white py-[8px] rounded w-[450px]"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 my-3"></div>

        {/* Network Details */}
        <div className="ms-7 my-3">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setShowNetworkDetails(!showNetworkDetails)}
          >
            <svg
              className={`w-3 h-3 ml-2 transition-transform duration-200 text-gray-400 ${
                showNetworkDetails ? "rotate-0" : "-rotate-90"
              }`}
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
            <h3 className="font-[600] text-[#333] text-lg ms-1 py-5">
              Network Details
            </h3>
          </div>

          {showNetworkDetails && (
            <>
              <div className="flex justify-between bg-gray-100 mx-16 font-[400] text-normal text-[#666] py-2">
                <span>IP Address</span>
                <span>MAC Address</span>
                <span>NIC</span>
                <span>Network</span>
                <span>Default Gateway</span>
                <span>DHCP Enabled</span>
                <span>DHCP Server</span>
                <span>DNS Hostname</span>
                <span>Type</span>
                <span className="w-20">Actions</span>
              </div>

              {networkFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex justify-between mx-16 gap-3 my-4 items-center"
                >
                  <Input
                    placeholder=""
                    className="bg-white py-[8px] rounded flex-1"
                  />
                  <Input
                    placeholder=""
                    className="bg-white py-[8px] rounded flex-1"
                  />
                  <Input
                    placeholder=""
                    className="bg-white py-[8px] rounded flex-1"
                  />
                  <Input
                    placeholder=""
                    className="bg-white py-[8px] rounded flex-1"
                  />
                  <Input
                    placeholder=""
                    className="bg-white py-[8px] rounded flex-1"
                  />
                  <Input
                    placeholder=""
                    className="bg-white py-[8px] rounded flex-1"
                  />
                  <Input
                    placeholder=""
                    className="bg-white py-[8px] rounded flex-1"
                  />
                  <Input
                    placeholder=""
                    className="bg-white py-[8px] rounded flex-1"
                  />
                  <Input
                    placeholder=""
                    className="bg-white py-[8px] rounded flex-1"
                  />
                  <div className="flex gap-2 w-20 justify-center">
                    <button
                      onClick={addNetworkField}
                      className="w-7 h-7 flex items-center justify-center border border-gray-300 text-gray-500 rounded text-sm hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeNetworkField(index)}
                      className="w-7 h-7 flex items-center justify-center  border border-gray-300 text-gray-500 rounded text-sm hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* buttons */}
        <div className="flex justify-center gap-2 my-10 pb-10  ">
          <button
            className="px-4 py-1 bg-[#4588f0] text-white rounded-full text-[13px] hover:bg-blue-700 transition-colors duration-200"
            // onClick={handleApply}
          >
            Save
          </button>
          <button
            className="px-3.5 py-1 border border-gray-300 rounded-full text-[13px] hover:bg-blue-50 transition-colors duration-200"
            // onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </MainLayout>
  );
}