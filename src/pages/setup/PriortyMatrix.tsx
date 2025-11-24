import React, { useState } from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react";
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

const urgencies = ["High", "Low", "Medium", "Normal", "Urgency", "Urgent"];

// Example priority options
const priorities = ["Select Priorty", "Critical", "High", "Low", "Medium", "Normal"];

const PriorityMatrix = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [openCell, setOpenCell] = useState<string | null>(null);
  const [highlightedCols, setHighlightedCols] = useState<number[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<Record<string, string>>({});

  const handleSelectPriority = (rowIndex: number, colIndex: number, value: string) => {
    setSelectedPriorities((prev) => ({
      ...prev,
      [`${rowIndex}-${colIndex}`]: value,
    }));
  };

  return (
    <Helpdesk>
      <div className="min-h-screen bg-white p-4">
        <div className="flex items-center justify-between border-b pt-2 bg-white border-[#e6e6e6] border-dotted">
          <h2 className="text-xl font-semibold text-foreground leading-[40px]">
            Priorty Matrix
          </h2>
          <button>
            <span className="bg-blue-600 w-[25px] h-[25px] flex items-center justify-center rounded-full text-white text-sm">
              ?
            </span>
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white">
          <p className="text-sm leading-[24px] text-[#68686f] mb-4">
            Define Priority based on Impact and Urgency
          </p>
          <p className="flex items-center justify-center gap-1.5 text-[#262f36] mb-3 text-base">
            Urgency
            <ArrowRight className="text-[#8d9499] mt-1" size={18} />
          </p>

          <div className="overflow-x-auto">
            <Table className="border-collapse">
              <TableHeader>
                <TableRow className="border-t">
                  {/* Impact Header */}
                  <TableHead
                    className="text-sm bg-white py-2 flex items-center justify-center text-gray-600 border-none w-[127px]"
                  >
                    Impact <ArrowDown size={20} className="text-[#a1a7ab]" />
                  </TableHead>

                  {/* Urgency Headers */}
                  {urgencies.map((u, colIndex) => (
                    <TableHead
                      key={u}
                      onMouseEnter={() => {
                        if (!highlightedCols.includes(colIndex)) {
                          setHighlightedCols([...highlightedCols, colIndex]);
                        }
                      }}
                      className={`
                      text-gray-700 py-2 text-sm text-center transition-colors duration-150 border-none cursor-pointer
                      ${highlightedCols.includes(colIndex) ? "bg-[#ffe184]" : "bg-[#ffd818]"}
                    `}
                    >
                      {u}
                    </TableHead>
                  ))}


                </TableRow>
              </TableHeader>


              <TableBody>
                {impacts.map((impact, rowIndex) => (
                  <TableRow key={rowIndex} className="border-none even:bg-gray-100">
                    <TableCell
                      className={`text-xs border-none py-2 w-[127px] text-gray-400 duration-100 ${hoveredRow === rowIndex
                        ? "bg-[#ecca64] text-gray-900"
                        : "bg-[#d6e3eb] text-gray-700"
                        }`}
                    >
                      {impact}
                    </TableCell>

                    {urgencies.map((u, colIndex) => {
                      const key = `${rowIndex}-${colIndex}`;
                      const cellKey = `cell-${rowIndex}-${colIndex}`;
                      const selected = selectedPriorities[key] || "Select Priority";

                      return (
                        <TableCell
                          key={colIndex}
                          className={`text-center text-xs py-2 text-gray-600 cursor-pointer duration-100 border-none w-[100px] ${hoveredRow === rowIndex && hoveredCol === colIndex
                            ? "bg-blue-100"
                            : "hover:bg-blue-50"
                            } 
                            ${selectedPriorities[cellKey] ? "border border-gray-600" : ""}`}
                          onMouseEnter={() => {
                            setHoveredRow(rowIndex);
                            setHoveredCol(colIndex);

                            //NEW: permanently highlight the header of this column
                            if (!highlightedCols.includes(colIndex)) {
                              setHighlightedCols([...highlightedCols, colIndex]);
                            }
                          }}
                          onMouseLeave={() => {
                            setHoveredRow(null);
                          }}

                        >
                          <DropdownMenu
                            onOpenChange={(isOpen) => setOpenCell(isOpen ? cellKey : null)}
                          >
                            <DropdownMenuTrigger asChild>
                              <button className="w-full flex items-center justify-between text-xs text-gray-700 py-1 focus:outline-none rounded-none">
                                {selected}

                                {/* Icon only shows for the opened cell */}
                                {openCell === cellKey && <ChevronDown size={16} />}
                              </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="center" className="min-w-[120px]  border border-b-0 rounded-none border-gray-950">
                              {priorities.map((priority) => (
                                <DropdownMenuItem
                                  key={priority}
                                  onClick={() => handleSelectPriority(rowIndex, colIndex, priority)}
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
            <Label htmlFor="override-switch" className="text-sm font-normal">
              Allow requesters and technicians to override the priority matrix
            </Label>
          </div>
          <p className="text-sm text-gray-400 mt-1 font-normal">
            This will allow requesters and technicians to define their priority for
            the request ignoring the global priority matrix values.
          </p>
        </div>
      </div>
    </Helpdesk>
  );
};

export default PriorityMatrix;
