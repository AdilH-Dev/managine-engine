import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Settings, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { priorityService, Setup } from "@/services/setupService";
import Helpdesk from "./healper/Helpdesk";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { MuiStylePagination } from "@/components/common/MuiStylePagination";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const prioritySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});

interface FormInputs {
  name: string;
  description?: string;
  color: string;
}

const Priority = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Setup | null>(null);
  const [data, setData] = useState<Setup[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"name" | "description">("name");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    defaultValues: { name: "", description: "", color: "#000000" },
    resolver: zodResolver(prioritySchema),
  });

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setCurrentPage(1);
      setSearchTerm(searchInput.trim());
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    fetchPriorities();
  }, [currentPage, itemsPerPage, sortOrder, sortBy, searchTerm]);

  const fetchPriorities = async () => {
    setLoading(true);
    try {
      const res = await priorityService.getAll({
        page: currentPage,
        limit: itemsPerPage,
        sort_by: sortBy,
        sort_order: sortOrder,
        search: searchTerm,
      });

      setData(res.data || []);
      setTotalPages(res.pagination?.totalPages || 1);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column: "name" | "description") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const onSubmit = async (formData: FormInputs) => {
    setActionLoading(true);
    try {
      if (selectedTask) {
        await priorityService.update(selectedTask.id, formData);
        toast({ title: "Success", description: "Updated successfully" });
      } else {
        await priorityService.create(formData);
        toast({ title: "Success", description: "Created successfully" });
      }
      setIsOpen(false);
      reset({ name: "", description: "", color: "#000000" });
      setSelectedTask(null);
      fetchPriorities();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (item: Setup) => {
    setSelectedTask(item);
    reset(item);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedTask) return;
    setActionLoading(true);
    try {
      await priorityService.delete(selectedTask.id);
      toast({ title: "Deleted", description: "Deleted successfully" });
      fetchPriorities();
      setShowDelete(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Deletion failed",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <Helpdesk>
      <div className="min-h-screen bg-white p-6 w-full">
        {/* Header */}
        <div className="flex justify-between items-end border-b border-[#e6e6e6] border-dotted mb-[6px]">
          <h1 className="text-[21px] font-normal text-gray-800">Priority</h1>
          <span className="bg-blue-600 w-[25px] h-[25px] flex items-center justify-center rounded-full text-white text-sm font-bold mb-1">
            ?
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-1 gap-4 flex-wrap">
          {/* New Button */}
          <button
            className="px-3 py-1.5 border border-[#ccd3de] rounded text-xs text-gray-700 hover:bg-[#ececec] leading-[11px] focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
            onClick={() => {
              setSelectedTask(null);
              reset({ name: "", description: "", color: "#000000" });
              setIsOpen(true);
            }}
          >
            New Priority
          </button>

          {/* Search */}
          <div className="relative flex-1 min-w-[190px] lg:flex-none lg:w-[125px]">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name"
              className="pl-9 bg-white py-[4px] rounded"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-visible border-b border-gray-200">
          <Table className="min-w-[600px] w-full text-sm">
            <TableHeader>
              <TableRow className="py-1 border-t">
                <TableHead className="w-10 h-[37px]"></TableHead>
                <TableHead className="min-w-[150px] lg:text-xs font-semibold leading-[36px] text-base text-[#515526]">
                  <div
                    className="flex items-center cursor-pointer select-none"
                    onClick={() => handleSort("name")}
                  >
                    Name
                    {sortBy === "name" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp size={14} className="ml-1 text-gray-600" />
                      ) : (
                        <ArrowDown size={14} className="ml-1 text-gray-600" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="min-w-[250px] lg:text-xs font-semibold leading-[36px] text-base text-[#515526]">
                  <div
                    className="flex items-center cursor-pointer select-none"
                    onClick={() => handleSort("description")}
                  >
                    Description
                    {sortBy === "description" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp size={14} className="ml-1 text-gray-600" />
                      ) : (
                        <ArrowDown size={14} className="ml-1 text-gray-600" />
                      ))}
                  </div>
                </TableHead>
                <TableHead className="text-base text-[#515526]">
                  Color
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                [...Array(itemsPerPage)].map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton className="h-4 w-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[120px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[220px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[60px]" />
                    </TableCell>
                  </TableRow>
                ))
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-6 text-gray-500"
                  >
                    No data found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50 bg-white">
                    <TableCell className="p-2 text-xs">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-100 rounded p-1 w-full">
                          <Settings className="w-4 h-4 text-gray-500" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          sideOffset={4}
                          className="z-50 w-[140px]"
                        >
                          <DropdownMenuItem onClick={() => handleEdit(item)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedTask(item);
                              setShowDelete(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>

                    <TableCell
                      className="p-2 text-xs sm:text-sm cursor-pointer hover:underline"
                      onClick={() => handleEdit(item)}
                    >
                      {item.name}
                    </TableCell>

                    <TableCell className="p-2 lg:text-xs sm:text-sm max-w-[400px] truncate">
                      {item.description || "-"}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 border rounded"
                          style={{ backgroundColor: item.color }}
                        ></span>
                        {item.color}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!loading && data.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <Select
                value={String(itemsPerPage)}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
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
              <span className="text-sm text-gray-600 whitespace-nowrap">
                Per Page
              </span>
            </div>
            <MuiStylePagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        {/* Add/Edit Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[500px] bg-white border-0 shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-normal">
                {selectedTask ? "Edit Priority" : "New Priority"}
              </DialogTitle>
              <span className="w-full h-[1px] bg-[#f6f6f6]"></span>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 pt-4"
              autoComplete="off"
            >
              {/* Name */}
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="name"
                  className="w-[120px] text-sm font-normal relative "
                >
                  Name{" "}
                  <span className="text-red-500 absolute -top-[2px[ left-10">
                    *
                  </span>
                </Label>
                <div className="flex-1">
                  <Input
                    id="name"
                    placeholder="Enter Name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="description"
                  className="w-[120px] font-normal text-sm"
                >
                  Description
                </Label>
                <div className="flex-1">
                  <Textarea
                    id="description"
                    className="w-full resize-none bg-white"
                    placeholder="Enter Description"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Color */}
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="color"
                  className="w-[120px] font-normal text-sm relative"
                >
                  Color{" "}
                  <span className="text-red-500 absolute -top-[2px] left-9">
                    *
                  </span>
                </Label>
                <div className="flex-1">
                  <Input
                    id="color"
                    type="color"
                    className="w-[60px] h-[40px] cursor-pointer"
                    {...register("color")}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-[#4588f0]  rounded-full hover:bg-[#3774d1] py-[6px] px-4 text-base font-normal"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={actionLoading}
                  className="bg-[#f5f5f5]  rounded-full text-[#787878] hover:bg-[#e1e1e1] border border-[#d4d4d4] font-normal hover:text-[787878] py-[6px] px-4 text-base font-normal"
                >
                  Cancel
                </Button>
              </div>
              <span className="w-full h-[1px] bg-[#f4f4f4]"></span>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
          <AlertDialogContent className="rounded-xl py-2 px-0 bg-white">
            <AlertDialogHeader className="border-b">
              <AlertDialogTitle className="text-red-600 px-3">
                Delete
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription className="px-3">
              Do you want to delete "{selectedTask?.name}"?
            </AlertDialogDescription>
            <AlertDialogFooter className="px-3 mb-2">
              <AlertDialogCancel
                className="rounded-full px-6"
                disabled={actionLoading}
              >
                Cancel
              </AlertDialogCancel>
              <Button
                className="bg-red-600 text-white rounded-full px-6"
                onClick={handleDelete}
                disabled={actionLoading}
              >
                {actionLoading ? "Deleting..." : "Confirm"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Helpdesk>
  );
};

export default Priority;
