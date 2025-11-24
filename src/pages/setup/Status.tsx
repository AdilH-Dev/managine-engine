import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { IoIosHelpCircle } from "react-icons/io";
import { ArrowUp, ArrowDown, Search, Settings } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Helpdesk from "./healper/Helpdesk";
import { MuiStylePagination } from "@/components/common/MuiStylePagination";
import { statusService } from "@/services/setupServices";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="animate-pulse space-y-2">
    {[...Array(rows)].map((_, i) => (
      <Skeleton key={i} className="h-10 w-full bg-gray-100" />
    ))}
  </div>
);

const Status = () => {
  const [statuses, setStatuses] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState("name");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      color: "#000000",
      type: "inProgress",
    },
    mode: "onSubmit",
  });

  // Search debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchTerm(searchInput.trim());
      setPagination((prev) => ({ ...prev, currentPage: 1 }));
    }, 500);
    return () => clearTimeout(delay);
  }, [searchInput]);

  // Fetch statuses
  const fetchStatuses = async () => {
    setTableLoading(true);
    try {
      const res = await statusService.getStatuses({
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        sort_by: sortBy,
        sort_order: sortOrder,
        search: searchTerm,
      });

      setStatuses(res.statuses || []);
      setPagination(res.pagination);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to fetch statuses",
        variant: "destructive",
      });
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, [
    pagination.currentPage,
    pagination.itemsPerPage,
    sortBy,
    sortOrder,
    searchTerm,
  ]);

  // Sort handler
  const handleSort = (column: string) => {
    if (sortBy === column) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const onSubmit = async (formData: any) => {
    try {
      const typeValue = formData.type === "inProgress" ? 1 : 2;
      const payload = {
        name: formData.name,
        description: formData.description,
        color: formData.color,
        type: typeValue,
      };

      let res;
      if (editItem)
        res = await statusService.updateStatus(editItem.id, payload);
      else res = await statusService.createStatus(payload);

      if (res.success) {
        toast({
          title: "Success",
          description: res.message || "Operation successful",
        });
        setIsOpen(false);
        fetchStatuses();
        reset();
        setEditItem(null);
      } else {
        toast({
          title: "Error",
          description: res.message || "Operation failed",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        className:
          "bg-red-600 text-white border-none fixed bottom-4 right-4 shadow-lg w-[500px]",
      });
    }
  };

  const handleEdit = (item: any) => {
    setEditItem(item);
    setIsOpen(true);
    setValue("name", item.name);
    setValue("description", item.description || "");
    setValue("color", item.color);
    setValue("type", item.type === 1 ? "inProgress" : "completed");
  };

  const confirmDelete = (item: any) => {
    setDeleteTarget(item);
    setShowDelete(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const res = await statusService.deleteStatus(deleteTarget.id);
      if (res.success) {
        toast({
          title: "Success",
          description: res.message || "Status deleted successfully",
        });
        setShowDelete(false);
        fetchStatuses();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Group statuses by type_label
  const groupedStatuses = useMemo(() => {
    const grouped: { label: string; data: any[] }[] = [];
    statuses.forEach((s) => {
      const label =
        s.type_label || (s.type === 1 ? "In Progress" : "Completed");
      const group = grouped.find((g) => g.label === label);
      if (group) group.data.push(s);
      else grouped.push({ label, data: [s] });
    });
    return grouped;
  }, [statuses]);

  return (
    <Helpdesk>
      <div className="min-h-screen bg-white p-6 w-full">
        {/* Header */}
        <div className="flex justify-between items-end border-b border-[#e6e6e6] border-dotted  mb-[6px] ">
          <h1 className="text-[21px] font-normal text-[#262f36]  mb-[1px]">
            Status
          </h1>
          <span className="bg-blue-600 w-[25px] h-[25px] flex items-center justify-center rounded-full text-white text-sm font-bold mb-1">
            ?
          </span>
        </div>

        {/* Top Controls */}
        <div className="flex items-center justify-between mb-1 gap-3 flex-wrap ">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => {
                  reset();
                  setEditItem(null);
                  setIsOpen(true);
                }}
                className="px-3 py-1.5 border border-[#ccd3de] rounded text-xs text-gray-700 hover:bg-[#ececec] leading-[11px] focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
              >
                New Status
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-white border-0 shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-lg font-normal">
                  {editItem ? "Edit Status" : "New Status"}
                </DialogTitle>
                <span className="w-full h-[1px] bg-[#f4f4f4]"></span>
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
                    className="w-[120px] font-normal text-sm relative"
                  >
                    Name
                    <span className="text-red-500 absolute -top-[2px] left-10">
                      *
                    </span>
                  </Label>
                  <div className="flex-1">
                    <Input
                      id="name"
                      placeholder="Enter Status Name"
                      {...register("name", {
                        required: "Name is required",
                        maxLength: {
                          value: 50,
                          message: "Name cannot exceed 50 characters",
                        },
                      })}
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
                      className="w-full resize-none bg-white"
                      id="description"
                      placeholder="Enter Description"
                      {...register("description", {
                        maxLength: {
                          value: 500,
                          message: "Description cannot exceed 500 characters",
                        },
                      })}
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
                    className="w-[120px] text-sm font-normal relative"
                  >
                    Color
                    <span className="text-red-500 absolute -top-[2px] left-9">
                      *
                    </span>
                  </Label>
                  <div className="flex-1">
                    <Input
                      type="color"
                      id="color"
                      {...register("color", { required: true })}
                    />
                  </div>
                </div>

                {/* Type */}
                {/* Type */}
                {/* Type */}
                <div className="flex items-center gap-4">
                  <Label className="w-[120px] text-sm font-normal">
                    In Progress
                  </Label>

                  <div className="flex items-center gap-6">
                    {/* In Progress radio */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="1"
                        checked={watch("type") === "1"}
                        onChange={() => setValue("type", "1")}
                        className="h-3.5 w-3.5 text-indigo-500 border-gray-400 focus:ring-0"
                      />
                      <span className="text-sm text-gray-700">In Progress</span>
                    </label>

                    {/* Completed radio */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="2"
                        checked={watch("type") === "2"}
                        onChange={() => setValue("type", "2")}
                        className="h-3.5 w-3.5 text-indigo-500 border-gray-400 focus:ring-0"
                      />
                      <span className="text-sm text-gray-700">Completed</span>
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-4 pt-4">
                  <Button
                    type="submit"
                    className="bg-[#4588f0] py-0 px-7 rounded-full hover:bg-[#3774d1] text-sm font-normal"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? editItem
                        ? "Saving..."
                        : "Submitting..."
                      : editItem
                      ? "Save Changes"
                      : "Save"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-[#f5f5f5] px-6 py-0 rounded-full text-[#787878] hover:bg-[#e1e1e1] border border-[#d4d4d4] text-sm font-normal hover:text-[787878]"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Search Input */}
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
          {tableLoading ? (
            <TableSkeleton rows={6} />
          ) : (
            <Table className="min-w-[600px] w-full text-sm">
              <TableHeader>
                <TableRow className="py-1 border-t">
                  <TableHead className="w-[43px] h-[37px]"></TableHead>
                  <TableHead className="w-[400px] lg:text-xs font-semibold leading-[36px] text-base text-[#515526]">
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
                  <TableHead className="min-w-[250px] lg:text-xs font-semibold leading-[36px]  text-[#515526]">
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
                  <TableHead className="min-w-[60px] text-xs sm:text-sm text-[#515526]">
                    Color
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {groupedStatuses.map((group) => (
                  <React.Fragment key={group.label}>
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="font-semibold text-gray-700 py-2"
                      >
                        Type: {group.label}
                      </TableCell>
                    </TableRow>

                    {group.data.length > 0 ? (
                      group.data.map((item: any) => (
                        <TableRow
                          key={item.id}
                          className="hover:bg-gray-50 bg-white"
                        >
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
                                <DropdownMenuItem
                                  onClick={() => handleEdit(item)}
                                >
                                  Edit Status
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => confirmDelete(item)}
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
                            {item.description}
                          </TableCell>
                          <TableCell className="p-2 text-xs sm:text-sm">
                            <div
                              className="w-8 h-2 border"
                              style={{ backgroundColor: item.color }}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center py-6 text-gray-500"
                        >
                          No data found.
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Pagination */}
        {!tableLoading && (
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <Select
                defaultValue={String(pagination.itemsPerPage)}
                onValueChange={(value) => {
                  setPagination((prev) => ({
                    ...prev,
                    itemsPerPage: Number(value),
                    currentPage: 1,
                  }));
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
        )}

        {/* Delete Confirmation */}
        <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
          <AlertDialogContent className="rounded-xl py-2 px-0 bg-white">
            <AlertDialogHeader className="border-b">
              <AlertDialogTitle className="text-red-600 px-3">
                Delete
              </AlertDialogTitle>
            </AlertDialogHeader>

            <AlertDialogDescription className="px-3">
              Do you want to delete the selected Status?
            </AlertDialogDescription>

            <AlertDialogFooter className="px-3 mb-2">
              <AlertDialogCancel className="rounded-full px-6">
                Cancel
              </AlertDialogCancel>
              <Button
                onClick={handleDelete}
                className="bg-red-600 text-white rounded-full px-6 hover:bg-red-700 transition"
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Confirm"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Helpdesk>
  );
};

export default Status;
