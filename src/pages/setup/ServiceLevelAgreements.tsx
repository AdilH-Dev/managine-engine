// import { MainLayout } from "@/components/Layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GripVertical, Plus, Minus, Check } from "lucide-react";

interface FilterCondition {
  id: string;
  field: string;
  operator: string;
}

const ServiceLevelAgreements = () => {
  const navigate = useNavigate();

  // Move FilterBuilder state and functions here
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>([
    { id: "1", field: "", operator: "" },
  ]);

  const fields = [
    { value: "approval_status", label: "Approval Status" },
    { value: "cancelation_requested", label: "Cancelation Requested" },
    { value: "category", label: "Category" },
    { value: "created_by", label: "Created By" },
    { value: "created_date", label: "Created Date" },
    { value: "department", label: "Department" },
    { value: "description", label: "Description" },
    { value: "emails_to_notify", label: "Emails to Notify" },
    { value: "first_response_overdue_status", label: "First Response Overdue Status" },
  ];

  const operators = [
    { value: "is", label: "is" },
    { value: "is_not", label: "is not" },
    { value: "is_empty", label: "is empty" },
    { value: "is_not_empty", label: "is not empty" },
  ];

  const addFilterCondition = () => {
    setFilterConditions([
      ...filterConditions,
      { id: Date.now().toString(), field: "", operator: "" },
    ]);
  };

  const removeFilterCondition = (id: string) => {
    if (filterConditions.length > 1) {
      setFilterConditions(filterConditions.filter((condition) => condition.id !== id));
    }
  };

  const updateFilterCondition = (id: string, key: keyof FilterCondition, value: string) => {
    setFilterConditions(
      filterConditions.map((condition) => (condition.id === id ? { ...condition, [key]: value } : condition))
    );
  };

  const [openField, setOpenField] = useState<string | null>(null);

  return (
    <>
      <div className="bg-white">
        <div className="mb-6  px-[24px] py-[15px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-gray-100">
          <h3 className="text-xl font-bold text-foreground text-black flex-shrink-0 ">
            NEW Incident SLA
          </h3>
        </div>

        <div className="ps-8 pe-5  ">
          <div className=" font-normal text-primary h-[29px]  ">
            Details
          </div>

          <div className="w-full h-[1px] bg-gray-300 "></div>

          <div className="flex flex-col gap-6 px-6 py-6 mt-6">
            {/* Name dropdown */}
            <div className="flex items-center gap-3 w-[327px]">
              <label className="text-sm font-normal text-[#404040] whitespace-nowrap">
                Name <span className="text-red-500">*</span>
              </label>
              <select
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Name
                </option>
                <option value="name1">Name One</option>
                <option value="name2">Name Two</option>
                <option value="name3">Name Three</option>
              </select>
            </div>

            {/* Site dropdown */}
            <div className="flex items-center gap-3 w-[327px]">
              <label className="text-sm font-normal text-[#404040] whitespace-nowrap">
                Site <span className="text-red-500">*</span>
              </label>
              <select
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Site
                </option>
                <option value="site1">Site One</option>
                <option value="site2">Site Two</option>
                <option value="site3">Site Three</option>
              </select>
            </div>
          </div>
               
               {/* Descrition */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Description
            </label>
            <Textarea placeholder="Enter Description" rows={3} />
          </div>

          <div className="w-full h-[1px] bg-gray-300 mb-6"></div>

          {/* Condition (Radio Buttons) */}
          <div className="flex flex-col">
            <label className="block text-sm font-bold text-[#404040] mb-1">
              Conditions 
            </label>
            <div className="flex items-center gap-7 mt-1">
              <span className="text-sm gap-4">When a request arrives :</span>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="condition"
                  value="new"
                  className="accent-blue-500"
                />
                Apply conditions based on criteria
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="condition"
                  value="used"
                  className="accent-blue-500"
                />
                Apply no condition
              </label>
            </div>
          </div>

          {/* Filter Builder Section */}
          <div className="w-full space-y-3 mt-4">
            {filterConditions.map((condition, index) => (
              <div
                key={condition.id}
                className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-300"
              >
                <button
                  className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Drag handle"
                >
                  <GripVertical className="w-5 h-5" />
                </button>

                <Popover open={openField === condition.id} onOpenChange={(open) => setOpenField(open ? condition.id : null)}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-[200px] justify-between bg-white"
                    >
                      {condition.field
                        ? fields.find((field) => field.value === condition.field)?.label
                        : "-- Select Column --"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                    <Command>
                      <CommandInput placeholder="Search field..." />
                      <CommandList>
                        <CommandEmpty>No field found.</CommandEmpty>
                        <CommandGroup>
                          {fields.map((field) => (
                            <CommandItem
                              key={field.value}
                              value={field.value}
                              onSelect={(value) => {
                                updateFilterCondition(condition.id, "field", value);
                                setOpenField(null);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  condition.field === field.value ? "opacity-100" : "opacity-0"
                                }`}
                              />
                              {field.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <Select
                  value={condition.operator}
                  onValueChange={(value) =>
                    updateFilterCondition(condition.id, "operator", value)
                  }
                >
                  <SelectTrigger className="w-[150px] bg-white">
                    <SelectValue placeholder="Select Operator" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {operators.map((op) => (
                      <SelectItem key={op.value} value={op.value}>
                        {op.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-2 ml-auto">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFilterCondition(condition.id)}
                    disabled={filterConditions.length === 1}
                    className="h-8 w-8"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={addFilterCondition}
                    className="h-8 w-8"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-sm">
            Any request matching above conditions should be
          </div>

          {/* Time Laps Section */}
          <div className="flex flex-col gap-6 w-[800px] mt-7">
            {/* === 1st Row: Responded within === */}
            <div className="flex items-center gap-6">
              <label className="text-sm font-normal text-[#404040] whitespace-nowrap">
                Responded within:
              </label>

              {/* Days */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Days</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-16 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Hours */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Hours</label>
                <select className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">0</option>
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Minutes */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Minutes</label>
                <select className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">0</option>
                  {Array.from({ length: 59 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* === 2nd Row: Resolved within === */}
            <div className="flex items-center gap-8">
              <label className="text-sm font-normal text-[#404040] whitespace-nowrap">
                Resolved within:
              </label>

              {/* Days */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Days</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-16 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Hours */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Hours</label>
                <select className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">0</option>
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Minutes */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Minutes</label>
                <select className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">0</option>
                  {Array.from({ length: 59 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-200 my-6"></div>

          <div className="flex flex-col gap-3">
            {/* Checkbox 1 */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="resolved1"
                className="w-4 h-4 accent-blue-500 rounded-sm border border-gray-400 cursor-pointer"
              />
              <label
                htmlFor="resolved1"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Should be resolved irrespective of operational hours
              </label>
            </div>

            {/* Checkbox 2 */}
            <div className="flex items-center gap-2 ps-5">
              <input
                type="checkbox"
                id="resolved2"
                className="w-4 h-4 accent-blue-500 rounded-sm border border-gray-400 cursor-pointer"
              />
              <label
                htmlFor="resolved2"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Including holidays
              </label>
            </div>

            {/* Checkbox 3 */}
            <div className="flex items-center gap-2 ps-5">
              <input
                type="checkbox"
                id="resolved3"
                className="w-4 h-4 accent-blue-500 rounded-sm border border-gray-400 cursor-pointer"
              />
              <label
                htmlFor="resolved3"
                className="text-sm  text-gray-700 cursor-pointer"
              >
                Including weekends
              </label>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-200 my-6"></div>

          {/* Response Time Escalation */}
          <div>
            <h2 className="font-semibold text-black">
              If response time has elapsed
            </h2>
            <div className="px-6 ">
              {/* Checkbox and Label */}
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="resolved4"
                  className="w-4 h-4 accent-blue-500 rounded-sm border border-gray-400 cursor-pointer"
                  onChange={(e) => {
                    const section = document.getElementById("extraFields0");
                    if (section) {
                      section.style.display = e.target.checked ? "block" : "none";
                    }
                  }}
                />
                <label
                  htmlFor="resolved4"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Enable Level 1 Escalation
                </label>
              </div>

              {/* Hidden fields that show on checkbox click */}
              <div id="extraFields0" className="mt-6 space-y-6 hidden">
                {/* 1️⃣ Four dropdowns in a row */}
                <div className="flex gap-4 w-48">
                  <select className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm ">
                    <option>Escalate After</option>
                    <option>Escalate Before</option>
                  </select>
                  {/* Days */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Days</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-16 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Hours */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Hours</label>
                    <select className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">0</option>
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Minutes */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Minutes</label>
                    <select className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">0</option>
                      {Array.from({ length: 59 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2️⃣ Escalate To label + input beneath */}
                <div>
                  <label className="block text-sm font-bold text-[#404040] mb-1">
                    Escalate To <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Select Organization,Roles and/or Technician"
                    className="w-3/4 border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>

                {/* 3️⃣ Dropdown with + button on left */}
                <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-48 ">
                  <button className="ml-2 w-6 h-6 flex items-center justify-center text-black rounded-full hover:bg-blue-600">
                    +
                  </button>
                  <select className="flex-1 text-sm focus:outline-none">
                    <option>Select Custom Action</option>
                    <option>Notification</option>
                    <option>Field Update</option>
                  </select>
                </div>

                {/* 4️⃣ Text beneath */}
                <div>
                  <p className="text-xsm text-gray-400">
                    No actions are configured
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-200 my-6"></div>

          {/* Resolution Time Escalation */}
          <div>
            <h2 className="font-semibold text-black">
              If resolution time has elapsed
            </h2>
            <div className="px-6 ">
              {/* Checkbox and Label */}
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="resolved5"
                  className="w-4 h-4 accent-blue-500 rounded-sm border border-gray-400 cursor-pointer"
                  onChange={(e) => {
                    const section = document.getElementById("extraFields");
                    if (section) {
                      section.style.display = e.target.checked ? "block" : "none";
                    }
                  }}
                />
                <label
                  htmlFor="resolved5"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Enable Level 1 Escalation
                </label>
              </div>

              {/* Hidden fields that show on checkbox click */}
              <div id="extraFields" className="mt-6 space-y-6 hidden">
                {/* 1️⃣ Four dropdowns in a row */}
                <div className="flex gap-4 w-48">
                  <select className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm ">
                    <option>Escalate After</option>
                    <option>Escalate Before</option>
                  </select>
                  {/* Days */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Days</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-16 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Hours */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Hours</label>
                    <select className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">0</option>
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Minutes */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Minutes</label>
                    <select className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">0</option>
                      {Array.from({ length: 59 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2️⃣ Escalate To label + input beneath */}
                <div>
                  <label className="block text-sm font-bold text-[#404040] mb-1">
                    Escalate To <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Select Organization,Roles and/or Technician"
                    className="w-3/4 border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>

                {/* 3️⃣ Dropdown with + button on left */}
                <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-48 ">
                  <button className="ml-2 w-6 h-6 flex items-center justify-center text-black rounded-full hover:bg-blue-600">
                    +
                  </button>
                  <select className="flex-1 text-sm focus:outline-none">
                    <option>Select Custom Action</option>
                    <option>Notification</option>
                    <option>Field Update</option>
                  </select>
                </div>

                {/* 4️⃣ Text beneath */}
                <div>
                  <p className="text-xsm text-gray-400">
                    No actions are configured
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-200 my-6"></div>

            <div className="px-6 ">
              {/* Checkbox and Label */}
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="resolved6"
                  className="w-4 h-4 accent-blue-500 rounded-sm border border-gray-400 cursor-pointer"
                  onChange={(e) => {
                    const section = document.getElementById("extraFields1");
                    if (section) {
                      section.style.display = e.target.checked ? "block" : "none";
                    }
                  }}
                />
                <label
                  htmlFor="resolved6"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Enable Level 2 Escalation
                </label>
              </div>

              {/* Hidden fields that show on checkbox click */}
              <div id="extraFields1" className="mt-6 space-y-6 hidden">
                {/* 1️⃣ Four dropdowns in a row */}
                <div className="flex gap-4 w-48">
                  <select className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm ">
                    <option>Escalate After</option>
                    <option>Escalate Before</option>
                  </select>
                  {/* Days */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Days</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-16 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Hours */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Hours</label>
                    <select className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">0</option>
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Minutes */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Minutes</label>
                    <select className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">0</option>
                      {Array.from({ length: 59 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2️⃣ Escalate To label + input beneath */}
                <div>
                  <label className="block text-sm font-bold text-[#404040] mb-1">
                    Escalate To <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Select Organization,Roles and/or Technician"
                    className="w-3/4 border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>

                {/* 3️⃣ Dropdown with + button on left */}
                <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-48 ">
                  <button className="ml-2 w-6 h-6 flex items-center justify-center text-black rounded-full hover:bg-blue-600">
                    +
                  </button>
                  <select className="flex-1 text-sm focus:outline-none">
                    <option>Select Custom Action</option>
                    <option>Notification</option>
                    <option>Field Update</option>
                  </select>
                </div>

                {/* 4️⃣ Text beneath */}
                <div>
                  <p className="text-xsm text-gray-400">
                    No actions are configured
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-200 my-6"></div>

            <div className="px-6 ">
              {/* Checkbox and Label */}
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="resolved7"
                  className="w-4 h-4 accent-blue-500 rounded-sm border border-gray-400 cursor-pointer"
                  onChange={(e) => {
                    const section = document.getElementById("extraFields2");
                    if (section) {
                      section.style.display = e.target.checked ? "block" : "none";
                    }
                  }}
                />
                <label
                  htmlFor="resolved7"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Enable Level 3 Escalation
                </label>
              </div>

              {/* Hidden fields that show on checkbox click */}
              <div id="extraFields2" className="mt-6 space-y-6 hidden">
                {/* 1️⃣ Four dropdowns in a row */}
                <div className="flex gap-4 w-48">
                  <select className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm ">
                    <option>Escalate After</option>
                    <option>Escalate Before</option>
                  </select>
                  {/* Days */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Days</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-16 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Hours */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Hours</label>
                    <select className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">0</option>
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Minutes */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Minutes</label>
                    <select className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">0</option>
                      {Array.from({ length: 59 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2️⃣ Escalate To label + input beneath */}
                <div>
                  <label className="block text-sm font-bold text-[#404040] mb-1">
                    Escalate To <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Select Organization,Roles and/or Technician"
                    className="w-3/4 border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>

                {/* 3️⃣ Dropdown with + button on left */}
                <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-48 ">
                  <button className="ml-2 w-6 h-6 flex items-center justify-center text-black rounded-full hover:bg-blue-600">
                    +
                  </button>
                  <select className="flex-1 text-sm focus:outline-none">
                    <option>Select Custom Action</option>
                    <option>Notification</option>
                    <option>Field Update</option>
                  </select>
                </div>

                {/* 4️⃣ Text beneath */}
                <div>
                  <p className="text-xsm text-gray-400">
                    No actions are configured
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-200 my-6"></div>

            <div className="px-6 ">
              {/* Checkbox and Label */}
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="resolved8"
                  className="w-4 h-4 accent-blue-500 rounded-sm border border-gray-400 cursor-pointer"
                  onChange={(e) => {
                    const section = document.getElementById("extraFields3");
                    if (section) {
                      section.style.display = e.target.checked ? "block" : "none";
                    }
                  }}
                />
                <label
                  htmlFor="resolved8"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Enable Level 4 Escalation
                </label>
              </div>

              {/* Hidden fields that show on checkbox click */}
              <div id="extraFields3" className="mt-6 space-y-6 hidden">
                {/* 1️⃣ Four dropdowns in a row */}
                <div className="flex gap-4 w-48">
                  <select className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm ">
                    <option>Escalate After</option>
                    <option>Escalate Before</option>
                  </select>
                  {/* Days */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Days</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-16 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Hours */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Hours</label>
                    <select className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">0</option>
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Minutes */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700">Minutes</label>
                    <select className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">0</option>
                      {Array.from({ length: 59 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2️⃣ Escalate To label + input beneath */}
                <div>
                  <label className="block text-sm font-bold text-[#404040] mb-1">
                    Escalate To <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Select Organization,Roles and/or Technician"
                    className="w-3/4 border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>

                {/* 3️⃣ Dropdown with + button on left */}
                <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-48 ">
                  <button className="ml-2 w-6 h-6 flex items-center justify-center text-black rounded-full hover:bg-blue-600">
                    +
                  </button>
                  <select className="flex-1 text-sm focus:outline-none">
                    <option>Select Custom Action</option>
                    <option>Notification</option>
                    <option>Field Update</option>
                  </select>
                </div>

                {/* 4️⃣ Text beneath */}
                <div>
                  <p className="text-xsm text-gray-400">
                    No actions are configured
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-10 mb-10 gap-6 py-16">
            {/* Save Button */}
            <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
              Save
            </button>

            {/* Cancel Button */}
            <button className="px-4 py-2 border border-gray-400 text-gray-700 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceLevelAgreements;