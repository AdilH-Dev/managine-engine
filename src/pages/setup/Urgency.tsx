import React, { useState, useEffect } from "react";
import { IoIosHelpCircle } from "react-icons/io";
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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, Search, Settings } from "lucide-react";
import Helpdesk from "./healper/Helpdesk";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MuiStylePagination } from "@/components/common/MuiStylePagination";

const Urgency = () => {
  const [urgencies, setUrgencies] = useState([
    { id: 1, name: "High", description: "This Change has urgency level high" },
    { id: 2, name: "Low", description: "This Change is low level urgency" },
    { id: 3, name: "Medium", description: "This change has moderate urgency" },
    {
      id: 4,
      name: "Normal",
      description: "This Change urgency level is normal",
    },
    {
      id: 5,
      name: "Urgent",
      description: "This Change requires urgent action",
    },
    { id: 6, name: "Critical", description: "Severe urgency level" },
  ]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: urgencies.length,
    itemsPerPage: 5,
  });

  const [displayData, setDisplayData] = useState([]);

  // Modal States
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUrgency, setCurrentUrgency] = useState(null);

  // Delete State
  const [showDelete, setShowDelete] = useState(false);

  // Search
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Sorting
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", description: "" },
  });

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setPagination((p) => ({ ...p, currentPage: 1 }));
      setSearchTerm(searchInput.trim());
    }, 400);

    return () => clearTimeout(handler);
  }, [searchInput]);

  // SORT + SEARCH + PAGINATION
  useEffect(() => {
    let filtered = [...urgencies];

    // SEARCH
    if (searchTerm) {
      filtered = filtered.filter((i) =>
        i.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // SORT
    filtered.sort((a, b) => {
      const x = a[sortBy].toLowerCase();
      const y = b[sortBy].toLowerCase();

      if (x < y) return sortOrder === "asc" ? -1 : 1;
      if (x > y) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    // PAGINATION
    const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const paginated = filtered.slice(start, start + pagination.itemsPerPage);

    setDisplayData(paginated);

    setPagination((prev) => ({
      ...prev,
      totalItems: filtered.length,
      totalPages: Math.ceil(filtered.length / prev.itemsPerPage),
    }));
  }, [
    urgencies,
    searchTerm,
    sortBy,
    sortOrder,
    pagination.currentPage,
    pagination.itemsPerPage,
  ]);

  // SORT HANDLER
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // OPEN CREATE MODAL
  const openNewForm = () => {
    setEditMode(false);
    reset();
    setIsOpen(true);
  };

  // EDIT HANDLER
  const handleEdit = (urg) => {
    setEditMode(true);
    setCurrentUrgency(urg);
    setValue("name", urg.name);
    setValue("description", urg.description);
    setIsOpen(true);
  };

  // FORM SUBMIT
  const onSubmit = (form) => {
    if (editMode && currentUrgency) {
      setUrgencies((prev) =>
        prev.map((u) =>
          u.id === currentUrgency.id ? { ...form, id: u.id } : u
        )
      );
    } else {
      setUrgencies((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setIsOpen(false);
    reset();
  };

  // DELETE ITEM
  const confirmDelete = () => {
    setUrgencies((prev) => prev.filter((u) => u.id !== currentUrgency.id));
    setShowDelete(false);
  };

  return (
    <Helpdesk>
      <div className="min-h-screen bg-white p-6 w-full">
        {/* HEADER */}
        <div className="flex justify-between items-end border-b border-[#e6e6e6] mb-[4px]">
          <h1 className="text-[21px] font-normal text-gray-800">Urgency</h1>
          <span className="bg-blue-600 w-[25px] h-[25px] flex items-center justify-center rounded-full text-white text-sm font-bold mb-1">
            ?
          </span>
        </div>

        {/* TOP CONTROLS */}
        <div className="flex flex-wrap items-center justify-between mb-1 gap-4">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button
                onClick={openNewForm}
                className="px-3 py-1.5 border border-[#ccd3de] rounded text-xs text-gray-700 hover:bg-[#ececec]"
              >
                New Urgency
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-white border-0 shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {editMode ? "Edit Urgency" : "New Urgency"}
                </DialogTitle>
                <span className="w-full h-[1px] bg-[#f6f6f6]"></span>
              </DialogHeader>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 pt-4"
              >
                <div className="flex items-center gap-4">
                  <Label className="w-[120px] text-sm">Name *</Label>
                  <Input {...register("name", { required: true })} />
                </div>

                <div className="flex items-center gap-4">
                  <Label className="w-[120px] text-sm">Description</Label>
                  <Textarea {...register("description")} />
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <Button className="rounded-full">
                    {editMode ? "Save Changes" : "Save"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* SEARCH */}
          <div className="relative min-w-[190px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name"
              className="pl-9"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <Table className="min-w-[600px] w-full text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead
                  className="cursor-pointer  text-[#515526]"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Name{" "}
                    {sortBy === "name" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp size={14} className="ml-1" />
                      ) : (
                        <ArrowDown size={14} className="ml-1" />
                      ))}
                  </div>
                </TableHead>

                <TableHead className="lg:text-xs text-[#515526]">
                  Description
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {displayData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6">
                    No data found.
                  </TableCell>
                </TableRow>
              ) : (
                displayData.map((urg) => (
                  <TableRow key={urg.id}>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Settings className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleEdit(urg)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentUrgency(urg);
                              setShowDelete(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>

                    <TableCell
                      className="cursor-pointer hover:underline"
                      onClick={() => handleEdit(urg)}
                    >
                      {urg.name}
                    </TableCell>
                    <TableCell>{urg.description}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between mt-6">
          {/* Items per page */}
          <div className="flex items-center gap-2 text-sm">
            <span>Show</span>
            <Select
              defaultValue={String(pagination.itemsPerPage)}
              onValueChange={(value) =>
                setPagination((prev) => ({
                  ...prev,
                  itemsPerPage: Number(value),
                  currentPage: 1,
                }))
              }
            >
              <SelectTrigger className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
            <span className="whitespace-nowrap">Per Page</span>
          </div>

          {/* Pagination Component */}
          <div>
            <MuiStylePagination
              totalPages={pagination.totalPages}
              currentPage={pagination.currentPage}
              onPageChange={(page) =>
                setPagination((prev) => ({ ...prev, currentPage: page }))
              }
            />
          </div>
        </div>

        {/* DELETE CONFIRMATION */}
        <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-600">
                Delete
              </AlertDialogTitle>
            </AlertDialogHeader>

            <AlertDialogDescription>
              Do you want to delete this urgency?
            </AlertDialogDescription>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 text-white"
                onClick={confirmDelete}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Helpdesk>
  );
};

export default Urgency;
