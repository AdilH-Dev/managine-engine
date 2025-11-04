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
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useForm } from "react-hook-form";
import { MainLayout } from "@/components/Layout/MainLayout";
import Helpdesk from "./healper/Helpdesk";

const Impact = () => {
  const [impacts, setImpacts] = useState([
    { name: "Affects Business", description: "Affects the normal business" },
    { name: "Affects Department", description: "Affects a department" },
    { name: "Affects Group", description: "Affects a group of people" },
    { name: "Affects User", description: "Affects a particular user" },
    {
      name: "High",
      description: "Significant impact on operations and services",
    },
    { name: "Low", description: "Minor impact on operations and services" },
    {
      name: "Medium",
      description: "Moderate impact on operations and services",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editImpact, seteditImpact] = useState(false);
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

  const handleEditImpact = (index) => {
    const impact = impacts[index];
    setCurrentIndex(index);
    seteditImpact(true);
    setIsOpen(true);
    setValue("name", impact.name);
    setValue("description", impact.description);
  };

  const handleDeleteImpact = (index) => {
    setImpacts((prev) => prev.filter((_, i) => i !== index));
  };

  const onFormSubmit = (data) => {
    if (editImpact && currentIndex !== null) {
      const updated = [...impacts];
      updated[currentIndex] = data;
      setImpacts(updated);
    } else {
      setImpacts((prev) => [...prev, data]);
    }
    seteditImpact(false);
    setIsOpen(false);
    reset();
  };

  return (
    <Helpdesk>
      <div className="min-h-screen bg-white p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[21px] font-normal text-gray-800">Impact</h1>
          <IoIosHelpCircle className="text-blue-500" size={28} />
        </div>

        <div className="flex items-center justify-between mb-4">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => {
                  seteditImpact(false);
                  reset();
                  setIsOpen(true);
                }}
                className="px-3 py-1.5 border rounded-md text-xs text-gray-700 hover:bg-gray-50"
              >
                New Impact
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-white">
              <DialogHeader>
                <DialogTitle>
                  {editImpact ? "Edit Impact" : "New Impact"}
                </DialogTitle>
              </DialogHeader>

              <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="space-y-4 pt-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="name">Name*</Label>

                    {errors.name && (
                      <p className="text-red-500 text-xs">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <Input
                    id="name"
                    placeholder="Enter Impact Name"
                    {...register("name", { required: "Name is required" })}
                  />
                </div>

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
                    {editImpact ? "Save Changes" : "Save"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <div className="flex items-center space-x-3 text-sm text-gray-700">
            <span>
              1 - {impacts.length} of {impacts.length}
            </span>
            <div className="flex items-center">
              <FaChevronLeft size={20} className="text-gray-300 ml-2" />
              <FaChevronRight size={20} className="text-gray-300" />
            </div>
          </div>
        </div>

        <Table>
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
            {impacts.map((impact, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center space-x-3 text-gray-700 relative">
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
                      <DropdownMenuContent align="start" className="w-[140px]">
                        <DropdownMenuItem
                          onClick={() => handleEditImpact(index)}
                        >
                          Edit Impact
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteImpact(index)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <span>{impact.name}</span>
                  </div>
                </TableCell>
                <TableCell>{impact.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Helpdesk>
  );
};

export default Impact;
