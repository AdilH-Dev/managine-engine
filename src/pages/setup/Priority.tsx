import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoIosArrowRoundUp, IoIosHelpCircle } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { useForm } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { MainLayout } from "@/components/Layout/MainLayout";
import Helpdesk from "./healper/Helpdesk";

const Priority = () => {
  const [priorities, setPriorities] = useState([
    {
      name: "Critical",
      description: "Immediate Action Required",
      color: "#d11818",
    },
    { name: "High", description: "Affects Business", color: "#ff0000" },
    { name: "Low", description: "Affects Individual", color: "#666666" },
    { name: "Medium", description: "Affects Service", color: "#ff6600" },
    { name: "Normal", description: "Degradation in service", color: "#006600" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  // ✅ React Hook Form for managing form fields
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      color: "#000000",
    },
  });

  // ✅ Open "New Priority" dialog
  const handleNewPriority = () => {
    setEditMode(false);
    setCurrentIndex(null);
    reset({ name: "", description: "", color: "#000000" });
    setIsOpen(true);
  };

  // ✅ Open "Edit Priority" dialog with prefilled data
  const handleEditPriority = (priority, index) => {
    setEditMode(true);
    setCurrentIndex(index);
    setValue("name", priority.name);
    setValue("description", priority.description);
    setValue("color", priority.color);
    setIsOpen(true);
  };

  // ✅ Delete Priority
  const handleDeletePriority = (priority) => {
    if (confirm(`Delete ${priority.name}?`)) {
      setPriorities((prev) => prev.filter((p) => p.name !== priority.name));
    }
  };

  // ✅ Save / Update
  const onSubmit = (data) => {
    if (editMode && currentIndex !== null) {
      const updated = [...priorities];
      updated[currentIndex] = data;
      setPriorities(updated);
    } else {
      setPriorities((prev) => [...prev, data]);
    }
    setIsOpen(false);
    setEditMode(false);
    reset();
  };

  return (
    <Helpdesk>
      <div className="min-h-screen bg-white p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-[21px] font-normal text-gray-800">Priority</h1>
            <IoIosHelpCircle className="text-blue-500" size={28} />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button
                onClick={handleNewPriority}
                className="px-3 py-1.5 border rounded-md text-xs leading-[11px] text-gray-700 hover:bg-gray-50"
              >
                New Priority
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-white">
              <DialogHeader>
                <DialogTitle>
                  {editMode ? "Edit Priority" : "New Priority"}
                </DialogTitle>
              </DialogHeader>

              {/* ✅ React Hook Form Used Here */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 pt-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm font-medium">Name *</Label>

                    {errors.name && (
                      <p className="text-red-500 text-xs">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <Input
                    placeholder="Enter Priority Name"
                    {...register("name", { required: "Name is required" })}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <textarea
                    {...register("description")}
                    placeholder="Enter Description"
                    className="w-full border border-gray-300 rounded-md text-sm p-2 resize-none focus:ring-2 focus:ring-[#6C63FF] outline-none"
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Color *</Label>
                  <Input
                    type="color"
                    {...register("color", { required: "Color is required" })}
                    className="w-[60px] h-[36px] border border-gray-300 rounded-md cursor-pointer"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#6C63FF] text-white px-6 py-2 rounded-full hover:bg-[#5a54e6]"
                  >
                    {editMode ? "Save Changes" : "Save"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-3 text-sm text-gray-700">
            <span>
              1 - {priorities.length} of {priorities.length}
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
              <TableHead>Color</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {priorities.map((priority, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center space-x-3 text-gray-700 relative">
                    {/* Dropdown Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="relative group">
                          <button className="p-1 hover:bg-gray-100 rounded-full">
                            <FiSettings className="text-gray-600 group-hover:text-black transition-colors" />
                          </button>
                          <div className="absolute top-7 left-10 -translate-x-1/2 bg-white text-black text-[11px] font-medium px-2 py-[1px] border border-black rounded shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                            Action
                          </div>
                        </div>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="start"
                        sideOffset={6}
                        className="bg-white rounded-md shadow-md"
                      >
                        <DropdownMenuItem
                          onClick={() => handleEditPriority(priority, index)}
                          className="cursor-pointer text-gray-800 hover:bg-gray-100"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeletePriority(priority)}
                          className="cursor-pointer text-gray-800 hover:bg-gray-100"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <span>{priority.name}</span>
                  </div>
                </TableCell>

                <TableCell>{priority.description}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-3 h-3 rounded-sm border"
                      style={{ backgroundColor: priority.color }}
                    ></span>
                    <span className="text-gray-700">{priority.color}</span>
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

export default Priority;
