import React, { useState } from "react";
import { IoIosHelpCircle, IoIosArrowRoundUp } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useForm } from "react-hook-form";
import { MainLayout } from "@/components/Layout/MainLayout";
import Helpdesk from "./healper/Helpdesk";

const Urgency = () => {
  const [urgencies, setUrgencies] = useState([
    { name: "High", description: "This Change has urgency level high" },
    { name: "Low", description: "This Change is low level urgency" },
    {
      name: "Medium",
      description: "This change has moderate level of urgency",
    },
    { name: "Normal", description: "This Change has urgent level normal" },
    { name: "Urgent", description: "This Change requires urgent action" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: { name: "", description: "" },
  });

  // ✅ Add / Update
  const onFormSubmit = (data) => {
    if (editMode && currentIndex !== null) {
      const updated = [...urgencies];
      updated[currentIndex] = data;
      setUrgencies(updated);
    } else {
      setUrgencies((prev) => [...prev, data]);
    }
    reset();
    setIsOpen(false);
    setEditMode(false);
  };

  // ✅ Open New Form
  const openNewForm = () => {
    setEditMode(false);
    reset();
    setIsOpen(true);
  };

  // ✅ Edit Item
  const handleEdit = (index) => {
    const urgency = urgencies[index];
    setCurrentIndex(index);
    setEditMode(true);
    setValue("name", urgency.name);
    setValue("description", urgency.description);
    setIsOpen(true);
  };

  // ✅ Delete Item
  const handleDelete = (index) => {
    setUrgencies((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Helpdesk>
      <div className="min-h-screen bg-white p-6 border-none shadow-none relative overflow-visible">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[21px] font-normal text-gray-800">Urgency</h1>
          <IoIosHelpCircle className="text-blue-500" size={28} />
        </div>

        {/* Top Controls */}
        <div className="flex items-center justify-between mb-4">
          {/* Dialog */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button
                onClick={openNewForm}
                className="px-3 py-1.5 border rounded-md text-xs text-gray-700 hover:bg-gray-50"
              >
                New Urgency
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-white border-0 shadow-lg">
              <DialogHeader>
                <DialogTitle>
                  {editMode ? "Edit Urgency" : "New Urgency"}
                </DialogTitle>
              </DialogHeader>

              <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="space-y-4 pt-4"
              >
                {/* Name Field */}
                <div>
                  <div className="flex items-center gap-2 mb-2 ">
                    <Label htmlFor="name">Name*</Label>
                    {errors.name && (
                      <p className="text-red-500 text-xs">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <Input
                    id="name"
                    placeholder="Enter Urgency Name"
                    {...register("name", { required: "Name is required" })}
                  />
                </div>

                {/* Description Field */}
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter Description"
                    {...register("description")}
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary">
                    {editMode ? "Save Changes" : "Save"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Pagination */}
          <div className="flex items-center space-x-3 text-sm text-gray-700">
            <span>
              1 - {urgencies.length} of {urgencies.length}
            </span>
            <div className="flex items-center">
              <button className="p-1.5 rounded hover:bg-gray-100 ml-2">
                <FaChevronLeft size={20} className="text-gray-300" />
              </button>
              <button className="p-1.5 rounded hover:bg-gray-100">
                <FaChevronRight size={20} className="text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <Table className="w-full border-0 overflow-visible">
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center">
                  Name <IoIosArrowRoundUp size={14} className="ml-1" />
                </div>
              </TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {urgencies.map((urgency, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center space-x-3 text-gray-700 relative group">
                    {/* Dropdown Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                            className="h-5 w-5 text-gray-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.591 1.054c1.527-.878 3.313.908 2.435 2.435a1.724 1.724 0 001.055 2.591c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.055 2.591c.878 1.527-.908 3.313-2.435 2.435a1.724 1.724 0 00-2.591 1.055c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.591-1.055c-1.527.878-3.313-.908-2.435-2.435a1.724 1.724 0 00-1.055-2.591c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.055-2.591c-.878-1.527.908-3.313 2.435-2.435.996.572 2.165.153 2.591-1.054z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </button>
                      </DropdownMenuTrigger>

                      {/* Tooltip */}
                      <div className="absolute top-7 left-10 -translate-x-1/2 bg-white text-black text-[11px] font-medium px-2 py-[1px] border-t-2 border-l-2 border-r-2 border-black rounded shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                        Action
                      </div>

                      <DropdownMenuContent align="start" className="w-[140px]">
                        <DropdownMenuItem
                          onClick={() => handleEdit(index)}
                          className="cursor-pointer text-black"
                        >
                          Edit Urgency
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(index)}
                          className="cursor-pointer text-black"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <span>{urgency.name}</span>
                  </div>
                </TableCell>
                <TableCell>{urgency.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Helpdesk>
  );
};

export default Urgency;
