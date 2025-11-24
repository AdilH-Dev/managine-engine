import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Search, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { MuiStylePagination } from "@/components/common/MuiStylePagination";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { impactService, Setup } from "@/services/setupService";
import Helpdesk from "./healper/Helpdesk";
import { Textarea } from "@/components/ui/textarea";

const extractErrorMessage = (error: any): string => {
  if (!error) return "Something went wrong.";
  const data = error.response?.data;
  if (!data) return error.message || "Something went wrong.";
  if (data.message) return data.message;
  if (data.Message) return data.Message;
  if (data.error) return data.error;
  if (data.Error) return data.Error;
  if (data.errors) {
    const firstError = Object.values(data.errors)[0];
    return Array.isArray(firstError) ? firstError[0] : String(firstError);
  }
  if (error.message) return error.message;
  return "Something went wrong. Please try again.";
};

const impactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});

const ImpactPage = () => {
  const [impacts, setImpacts] = useState<Setup[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Setup | null>(null);
  const [editImpact, setEditImpact] = useState<Setup | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger,
  } = useForm<Setup>({
    defaultValues: { name: "", description: "" },
    resolver: zodResolver(impactSchema),
  });

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchImpacts();
    }, 600);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, sortOrder, currentPage, itemsPerPage]);

  const fetchImpacts = async () => {
    setLoading(true);
    try {
      const result = await impactService.getAll({
        page: currentPage,
        limit: itemsPerPage,
        sort_by: "name",
        search: searchTerm.trim(),
        sort_order: sortOrder,
      });
      setImpacts(result.data || []);
      setTotalPages(result.pagination?.totalPages || 1);
    } catch (error: any) {
      toast({
        title: "Error",
        description: extractErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSort = () => setSortOrder(sortOrder === "asc" ? "desc" : "asc");

  const onFormSubmit = async (formData: Setup) => {
    const isValid = await trigger();
    if (!isValid) return;

    try {
      let response;
      if (editImpact)
        response = await impactService.update(editImpact.id!, formData);
      else response = await impactService.create(formData);

      await fetchImpacts();
      setIsOpen(false);
      reset();
      setEditImpact(null);
      toast({
        title: "Success",
        description:
          response?.message ||
          (editImpact
            ? "Impact updated successfully"
            : "Impact created successfully"),
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: extractErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  const handleEdit = (impact: Setup) => {
    setEditImpact(impact);
    reset(impact);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedTask) return;
    try {
      const res = await impactService.delete(selectedTask.id);
      fetchImpacts();
      setShowDelete(false);
      toast({
        title: "Delete",
        description: res?.message || "Deleted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: extractErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  return (
    <Helpdesk>
      <div className="min-h-screen bg-white p-6 w-full">
        {/* Header */}
        <div className="flex justify-between items-end border-b border-[#e6e6e6] border-dotted mb-[6px]">
          <h1 className="text-[21px] font-normal text-gray-800">Impacts</h1>
          <span className="bg-blue-600 w-[25px] h-[25px] flex items-center justify-center rounded-full text-white text-sm font-bold mb-1">
            ?
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-1 gap-4 flex-wrap">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => {
                  setEditImpact(null);
                  reset();
                  setIsOpen(true);
                }}
                disabled={isSubmitting}
                className="px-3 py-1.5 border border-[#ccd3de] rounded text-xs text-gray-700 hover:bg-[#ececec] leading-[11px] focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
              >
                New Impact
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-white border-0 shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-normal">
                  {editImpact ? "Edit Impact" : "New Impact"}
                </DialogTitle>
                <span className="w-full h-[1px] bg-[#f6f6f6]"></span>
              </DialogHeader>

              <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="space-y-6 pt-4"
                autoComplete="off"
              >
                <div className="flex items-center gap-4 ">
                  <Label
                    htmlFor="name"
                    className="w-[120px] font-normal text-sm relative "
                  >
                    Name{" "}
                    <span className="text-red-500 absolute -top-[2px]  left-10">
                      *
                    </span>
                  </Label>
                  <div className="flex-1">
                    <Input
                      id="name"
                      placeholder="Enter Impact Name"
                      {...register("name")}
                      maxLength={51}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>
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
                      placeholder="Enter Description"
                      className="w-full resize-none bg-white"
                      {...register("description")}
                      maxLength={501}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
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
                    className="bg-[#f5f5f5]  py-[6px] px-4 text-base font-normal rounded-full text-[#787878] hover:bg-[#e1e1e1] border border-[#d4d4d4]  font-normal hover:text-[787878]"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <div className="relative flex-1 min-w-[190px] lg:flex-none lg:w-[125px]">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name"
              className="pl-9 bg-white py-[4px] rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-visible border-b border-gray-200">
          <Table className="min-w-[600px] w-full text-sm">
            <TableHeader>
              <TableRow className="py-1 border-t">
                <TableHead className="w-10 h-[37px]"></TableHead>
                <TableHead className="min-w-[150px] lg:text-xs font-semibold leading-[36px]  text-[#515526]">
                  <div
                    className="flex items-center cursor-pointer select-none"
                    onClick={toggleSort}
                  >
                    Name{" "}
                    {sortOrder === "asc" ? (
                      <ArrowUp size={14} className="ml-1 text-gray-600" />
                    ) : (
                      <ArrowDown size={14} className="ml-1 text-gray-600" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="min-w-[250px] lg:text-xs font-semibold leading-[36px]  text-[#515526]">
                  <div
                    className="flex items-center cursor-pointer select-none"
                    onClick={toggleSort}
                  >
                    Description{" "}
                    {sortOrder === "asc" ? (
                      <ArrowUp size={14} className="ml-1 text-gray-600" />
                    ) : (
                      <ArrowDown size={14} className="ml-1 text-gray-600" />
                    )}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(itemsPerPage)].map((_, i) => (
                  <TableRow key={i} className="p-3">
                    <TableCell>
                      <Skeleton className="h-4 w-4 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[120px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[220px]" />
                    </TableCell>
                  </TableRow>
                ))
              ) : impacts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-6 text-gray-500"
                  >
                    No data found.
                  </TableCell>
                </TableRow>
              ) : (
                impacts.map((impact) => (
                  <TableRow
                    key={impact.id}
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
                          <DropdownMenuItem onClick={() => handleEdit(impact)}>
                            Edit Impact
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedTask(impact);
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
                      onClick={() => handleEdit(impact)}
                    >
                      {impact.name}
                    </TableCell>
                    <TableCell className="p-2 lg:text-xs sm:text-sm max-w-[400px] truncate">
                      {impact.description || "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!loading && impacts.length > 0 && (
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

        {/* Delete Confirmation */}
        <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
          <AlertDialogContent className="rounded-xl py-2 px-0 bg-white">
            <AlertDialogHeader className="border-b">
              <AlertDialogTitle className="text-red-600 px-3">
                Delete
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription className="px-3">
              Do you want to delete the selected Impact "{selectedTask?.name}"?
            </AlertDialogDescription>
            <AlertDialogFooter className="px-3 mb-2">
              <AlertDialogCancel className="rounded-full px-6">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isSubmitting}
                className="bg-red-600 text-white rounded-full px-6 hover:bg-red-700 transition"
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

export default ImpactPage;
