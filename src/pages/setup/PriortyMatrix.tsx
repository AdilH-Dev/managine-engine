import React, { useState } from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { ArrowDown, ArrowRight } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Helpdesk from "./healper/Helpdesk";

const impacts = [
  "Affects Business",
  "Affects Department",
  "Affects Group",
  "Affects User",
  "High",
  "Low",
  "Medium",
];

const urgencies = ["High", "Low", "Medium", "Normal", "Urgent"];

// Example priority options
const priorities = ["Critical", "High", "Medium", "Low", "None"];

const PriorityMatrix = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [selectedPriorities, setSelectedPriorities] = useState<
    Record<string, string>
  >({});

  const handleSelectPriority = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    setSelectedPriorities((prev) => ({
      ...prev,
      [`${rowIndex}-${colIndex}`]: value,
    }));
  };

  return (
    <Helpdesk>
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-2 bg-white border-[#e6e6e6] border-dotted rounded-none">
        <h2 className="text-base font-semibold text-foreground flex-shrink-0 leading-[40px]">
          Priority Matrix
        </h2>
        <span className="bg-blue-600 w-7 h-7 flex items-center justify-center rounded-full text-white text-sm">
          ?
        </span>
      </div>

      {/* Table Section */}
      <div className="bg-white p-4">
        <p className="text-sm leading-[24px] text-[#68686f] mb-4">
          Define Priority based on Impact and Urgency
        </p>
        <p className="flex items-center justify-center gap-1.5 text-[#262f36] mb-3 text-base">
          Urgency
          <ArrowRight className="text-[#8d9499]" size={16} />
        </p>

        <div className="overflow-x-auto">
          <Table className="border-collapse">
            <TableHeader>
              <TableRow className="border-t">
                <TableHead className="font-sm bg-white py-1.5 flex gap-1.5 items-center text-gray-600 w-full border-none">
                  Impact <ArrowDown size={14} />
                </TableHead>
                {urgencies.map((u, colIndex) => (
                  <TableHead
                    key={u}
                    className={`text-gray-700 py-1.5 font-sm text-center transition-colors duration-100 border-none ${
                      hoveredCol === colIndex ? "bg-blue-200" : "bg-[#ffe184]"
                    }`}
                  >
                    {u}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {impacts.map((impact, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="border-none even:bg-gray-100"
                >
                  <TableCell
                    className={`text-sm border-none py-1.5 text-gray-400 duration-100 ${
                      hoveredRow === rowIndex
                        ? "bg-[#dc8738] text-gray-900"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {impact}
                  </TableCell>

                  {urgencies.map((u, colIndex) => {
                    const key = `${rowIndex}-${colIndex}`;
                    const selected =
                      selectedPriorities[key] || "Select Priority";

                    return (
                      <TableCell
                        key={colIndex}
                        className={`text-center text-xs py-1.5 text-gray-600 cursor-pointer duration-100 border-none ${
                          hoveredRow === rowIndex && hoveredCol === colIndex
                            ? "bg-blue-100"
                            : "hover:bg-blue-50"
                        }`}
                        onMouseEnter={() => {
                          setHoveredRow(rowIndex);
                          setHoveredCol(colIndex);
                        }}
                        onMouseLeave={() => {
                          setHoveredRow(null);
                          setHoveredCol(null);
                        }}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="w-full text-xs text-gray-700 py-1 focus:outline-none">
                              {selected}
                            </button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent
                            align="center"
                            className="min-w-[120px]"
                          >
                            {priorities.map((priority) => (
                              <DropdownMenuItem
                                key={priority}
                                onClick={() =>
                                  handleSelectPriority(
                                    rowIndex,
                                    colIndex,
                                    priority
                                  )
                                }
                                className="text-xs"
                              >
                                {priority}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center gap-2 mt-6">
          <Switch id="override-switch" defaultChecked />
          <Label
            htmlFor="override-switch"
            className="text-xs text-gray-400 font-normal"
          >
            Allow requesters and technicians to override the priority matrix
          </Label>
        </div>
        <p className="text-xs text-gray-400 mt-1 font-normal">
          This will allow requesters and technicians to define their priority
          for the request ignoring the global priority matrix values.
        </p>
      </div>
    </Helpdesk>
  );
};

export default PriorityMatrix;
