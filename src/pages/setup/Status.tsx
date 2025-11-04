import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoIosArrowRoundUp, IoIosHelpCircle } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MainLayout } from "@/components/Layout/MainLayout";
import Helpdesk from "./healper/Helpdesk";

const Status = () => {
  const [statusList, setStatusList] = useState({
    inProgress: [
      {
        name: "In Progress",
        description: "Currently work is under progress",
        stopTimer: "Stop",
        color: "#E8F8E8",
      },
      {
        name: "On Hold",
        description: "Request Onhold",
        stopTimer: "Stop",
        color: "#E8F8E8",
      },
    ],
    completed: [
      {
        name: "Closed",
        description: "Request Completed",
        stopTimer: "-",
        color: "#004D00",
      },
      {
        name: "Rejected",
        description: "Declined or Denied",
        stopTimer: "-",
        color: "#FF0000",
      },
    ],
  });

  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      stopTimer: "Running",
      color: "#000000",
      type: "inProgress",
    },
  });

  // Handle Form Submit
  const onSubmit = (data) => {
    if (editItem) {
      // Edit mode
      const updatedList = { ...statusList };
      updatedList[data.type] = updatedList[data.type].map((item) =>
        item.name === editItem.name ? data : item
      );
      setStatusList(updatedList);
    } else {
      // Add mode
      setStatusList((prev) => ({
        ...prev,
        [data.type]: [...prev[data.type], data],
      }));
    }

    reset();
    setIsOpen(false);
    setEditItem(null);
  };

  const handleEdit = (item, type) => {
    setEditItem(item);
    setIsOpen(true);
    setValue("name", item.name);
    setValue("description", item.description);
    setValue("stopTimer", item.stopTimer);
    setValue("color", item.color);
    setValue("type", type);
  };

  const handleDelete = (item, type) => {
    if (confirm(`Delete "${item.name}"?`)) {
      setStatusList((prev) => ({
        ...prev,
        [type]: prev[type].filter((s) => s.name !== item.name),
      }));
    }
  };

  return (
    <Helpdesk>
      <div className="min-h-screen bg-white p-6">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <h1 className="text-[21px] font-normal text-gray-800">Status</h1>
          <IoIosHelpCircle className="text-blue-500" size={28} />
        </div>

        {/* Top Controls */}
        <div className="flex items-center justify-between mb-4">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => {
                  reset();
                  setEditItem(null);
                  setIsOpen(true);
                }}
                className="px-3 py-1.5 border rounded-md text-xs leading-[11px] text-gray-700 hover:bg-gray-50"
              >
                New Status
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[550px] bg-white">
              <DialogHeader>
                <DialogTitle>
                  {editItem ? "Edit Status" : "New Status"}
                </DialogTitle>
              </DialogHeader>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 pt-4"
              >
                {/* Name */}
                <div className="grid grid-cols-3 items-center gap-3">
                  <div className="flex justify-between col-span-1">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Name <span className="text-red-500">*</span>
                    </Label>
                    {errors.name && (
                      <p className="text-red-500 text-xs ml-2">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <Input
                    id="name"
                    placeholder="Enter Status Name"
                    {...register("name", { required: "Required" })}
                    className="col-span-2"
                  />
                </div>

                {/* Description */}
                <div className="grid grid-cols-3 items-start gap-3">
                  <Label htmlFor="description" className="col-span-1 text-sm">
                    Description
                  </Label>
                  <textarea
                    id="description"
                    placeholder="Enter Description"
                    {...register("description")}
                    className="col-span-2 border border-gray-300 rounded-md text-sm p-2 resize-none focus:ring-2 focus:ring-[#6C63FF] outline-none"
                    rows={3}
                  />
                </div>

                {/* Stop Timer */}
                <div className="grid grid-cols-3 items-center gap-3">
                  <Label htmlFor="stopTimer" className="col-span-1 text-sm">
                    Stop Timer
                  </Label>
                  <select
                    id="stopTimer"
                    {...register("stopTimer")}
                    className="col-span-2 border border-gray-300 rounded-md text-sm p-2"
                  >
                    <option value="Running">Running</option>
                    <option value="Stop">Stop</option>
                    <option value="-">-</option>
                  </select>
                </div>

                {/* Color */}
                <div className="grid grid-cols-3 items-center gap-3">
                  <div className="flex justify-between col-span-1">
                    <Label htmlFor="color" className="text-sm font-medium">
                      Color <span className="text-red-500">*</span>
                    </Label>
                    {errors.color && (
                      <p className="text-red-500 text-xs ml-2">
                        {errors.color.message}
                      </p>
                    )}
                  </div>
                  <Input
                    type="color"
                    id="color"
                    {...register("color", { required: "Required" })}
                    className="w-[60px] h-[36px] border border-gray-300 rounded-md cursor-pointer"
                  />
                </div>

                {/* Type */}
                <div className="grid grid-cols-3 items-center gap-3">
                  <Label htmlFor="type" className="col-span-1 text-sm">
                    Type
                  </Label>
                  <select
                    id="type"
                    {...register("type")}
                    className="col-span-2 border border-gray-300 rounded-md text-sm p-2"
                  >
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-6">
                  <Button
                    type="submit"
                    className="bg-[#6C63FF] text-white px-6 py-2 rounded-full hover:bg-[#5a54e6]"
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full px-6 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-3 text-sm text-gray-700">
            <span>
              1 - {statusList.inProgress.length + statusList.completed.length}{" "}
              of {statusList.inProgress.length + statusList.completed.length}
            </span>
            <div className="flex items-center">
              <button className="p-1.5 rounded hover:bg-gray-100 ml-2">
                <FaChevronLeft size={18} className="text-gray-400" />
              </button>
              <button className="p-1.5 rounded hover:bg-gray-100">
                <FaChevronRight size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center">
                  Name
                  <IoIosArrowRoundUp size={14} className="ml-1 font-medium" />
                </div>
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Stop Timer</TableHead>
              <TableHead>Color</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* In Progress Section */}
            <TableRow>
              <TableCell colSpan={4}>
                <span className="font-semibold text-gray-700">
                  Type : In Progress
                </span>
              </TableCell>
            </TableRow>
            {statusList.inProgress.map((item, index) => (
              <TableRow key={`inProgress-${index}`}>
                <TableCell>
                  <div className="flex items-center space-x-3 text-gray-700 relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:bg-gray-100 rounded-full">
                          <FiSettings className="text-gray-600" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        sideOffset={6}
                        className="bg-white rounded-md shadow-md"
                      >
                        <DropdownMenuItem
                          onClick={() => handleEdit(item, "inProgress")}
                          className="cursor-pointer text-gray-800 hover:bg-gray-100"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(item, "inProgress")}
                          className="cursor-pointer text-gray-800 hover:bg-gray-100"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <span>{item.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.stopTimer}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-4 h-2 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-gray-700">{item.color}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {/* Completed Section */}
            <TableRow>
              <TableCell colSpan={4}>
                <span className="font-semibold text-gray-700">
                  Type : Completed
                </span>
              </TableCell>
            </TableRow>
            {statusList.completed.map((item, index) => (
              <TableRow key={`completed-${index}`}>
                <TableCell>
                  <div className="flex items-center space-x-3 text-gray-700 relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:bg-gray-100 rounded-full">
                          <FiSettings className="text-gray-600" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        sideOffset={6}
                        className="bg-white rounded-md shadow-md"
                      >
                        <DropdownMenuItem
                          onClick={() => handleEdit(item, "completed")}
                          className="cursor-pointer text-gray-800 hover:bg-gray-100"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(item, "completed")}
                          className="cursor-pointer text-gray-800 hover:bg-gray-100"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <span>{item.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.stopTimer}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-4 h-2 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-gray-700">{item.color}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Helpdesk>
  );
};

export default Status;
