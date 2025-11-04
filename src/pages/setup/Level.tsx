import { useState, useEffect } from "react";
import { IoIosHelpCircle, IoIosArrowRoundUp } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { levelService } from "@/services/setupServices";

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
import { level } from "@/services/setupServices";
import Helpdesk from "./healper/Helpdesk";

const Level = () => {
  const [data, setData] = useState<level[]>([]);

  const FetchLevels = async () => {
    try {
      const res = await levelService.getLevels();
      setData(res);
    } catch (error) {
      console.error("Error in fetchig data", error);
    }
  };
  useEffect(() => {
    FetchLevels();
  }, []);
  console.log("Fetched Data", data);

  const [levels, setLevels] = useState([
    { name: "Tier 1", description: "Info" },
    { name: "Tier 2", description: "Tips" },
    { name: "Tier 3", description: "Trouble Shooting 1" },
    { name: "Tier 4", description: "Trouble Shooting 2" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(null);

  // ✅ Initialize React Hook Form
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
    },
  });

  // ✅ Open modal for new level
  const openNewLevelDialog = () => {
    setEditMode(false);
    reset({ name: "", description: "" });
    setIsOpen(true);
  };

  // ✅ Open modal for editing
  const handleEditLevel = (index) => {
    const level = levels[index];
    setEditMode(true);
    setCurrentLevelIndex(index);
    setValue("name", level.name);
    setValue("description", level.description);
    setIsOpen(true);
  };

  // ✅ Handle form submission
  const onSubmit = (data) => {
    if (editMode && currentLevelIndex !== null) {
      // Update existing level
      const updated = [...levels];
      updated[currentLevelIndex] = data;
      setLevels(updated);
    } else {
      // Add new level
      setLevels((prev) => [...prev, data]);
    }
    setIsOpen(false);
    setEditMode(false);
    reset();
  };

  const handleDeleteLevel = (index) => {
    setLevels((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Helpdesk>
      <div className="min-h-screen bg-white p-6 border-none shadow-none relative overflow-visible">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[21px] font-normal text-gray-800">Level</h1>
          <IoIosHelpCircle className="text-blue-500" size={28} />
        </div>

        {/* Top Controls */}
        <div className="flex items-center justify-between mb-4">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button
                onClick={openNewLevelDialog}
                className="px-3 py-1.5 border rounded-md text-xs leading-[11px] text-gray-700 hover:bg-gray-50"
              >
                New Level
              </button>
            </DialogTrigger>

            {/* ✅ Dialog with React Hook Form */}
            <DialogContent className="sm:max-w-[500px] bg-white border-0 shadow-lg">
              <DialogHeader>
                <DialogTitle>
                  {editMode ? "Edit Level" : "New Level"}
                </DialogTitle>
              </DialogHeader>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 pt-4"
              >
                <div>
                  <div className="flex  items-center gap-2 mb-2 justify-start">
                    <Label htmlFor="name">Name*</Label>
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <Input
                    id="name"
                    placeholder="Enter Level Name"
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
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white w-[140px] h-[44px]"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary w-[140px] h-[44px]"
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
              1 - {levels.length} of {levels.length}
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

        {/* ✅ Table */}
        <div className="w-full overflow-visible">
          <Table className="w-full border-0 [&_th]:border-0 [&_td]:border-0">
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center">
                    Name
                    <IoIosArrowRoundUp size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {levels.map((level, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center space-x-3 text-gray-700 relative">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="relative group">
                            <button className="p-1 hover:bg-gray-100 rounded-full transition">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="h-5 w-5 text-gray-600 group-hover:text-black transition-colors"
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
                            <div className="absolute top-7 left-10 -translate-x-1/2 bg-white text-black text-[11px] font-medium px-2 py-[1px] border border-black rounded shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                              Action
                            </div>
                          </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="start"
                          sideOffset={6}
                          className="bg-white rounded-md shadow-md w-[140px]"
                        >
                          <DropdownMenuItem
                            onClick={() => handleEditLevel(index)}
                            className="text-black cursor-pointer hover:bg-gray-100"
                          >
                            Edit Level
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteLevel(index)}
                            className="text-black cursor-pointer hover:bg-gray-100"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <span>{level.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{level.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Helpdesk>
  );
};

export default Level;
