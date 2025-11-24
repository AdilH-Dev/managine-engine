import { useState, useEffect } from "react";
import { IoIosHelpCircle } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mode, modeService } from "@/services/setupServices";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
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
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDown, ArrowUp, Search, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { MuiStylePagination } from "@/components/common/MuiStylePagination";
import Helpdesk from "./healper/Helpdesk";
import { nameDescriptionSchema, NameDescriptionSchema } from "@/lib/validation";
import { Textarea } from "@/components/ui/textarea";

const Mode = () => {
  const [modes, setModes] = useState<mode[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 5,
  });
  const [tableLoading, setTableLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentMode, setCurrentMode] = useState<mode | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<string>("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NameDescriptionSchema>({
    resolver: zodResolver(nameDescriptionSchema),
    defaultValues: { name: "", description: "" },
    mode: "onSubmit",
  });

  // Fetch Modes
  const fetchModes = async () => {
    setTableLoading(true);
    try {
      const res = await modeService.getModes({
        page: currentPage,
        limit: itemsPerPage,
        sort_by: sortBy,
        sort_order: sortOrder,
        search: searchTerm,
      });
      if (res.success) {
        setModes(res.data?.modes || []);
        setPagination(
          res.data?.pagination || {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            itemsPerPage: 5,
          }
        );
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchModes();
  }, [currentPage, itemsPerPage, sortBy, sortOrder, searchTerm]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setCurrentPage(1);
      setSearchTerm(searchInput.trim());
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const handleSort = (column: string) => {
    if (sortBy === column)
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    else {
      setSortBy(column);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const openNewDialog = () => {
    setEditMode(false);
    setCurrentMode(null);
    reset({ name: "", description: "" });
    setIsOpen(true);
  };

  const handleEdit = (m: mode) => {
    setEditMode(true);
    setCurrentMode(m);
    setValue("name", m.name);
    setValue("description", m.description || "");
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentMode) return;
    setDeleteLoading(true);
    try {
      const res = await modeService.deleteMode(currentMode.id);
      if (res.success) {
        toast({ title: "Success", description: res.message || "Mode deleted" });
        setShowDelete(false);
        fetchModes();
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
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

  const onSubmit: SubmitHandler<NameDescriptionSchema> = async (data) => {
    try {
      let res;
      if (editMode && currentMode)
        res = await modeService.updateMode(currentMode.id, data as mode);
      else res = await modeService.createMode(data as mode);
      if (res.success) {
        toast({
          title: "Success",
          description: res.message || "Operation successful",
        });
        setIsOpen(false);
        fetchModes();
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Helpdesk>
      <div className="min-h-screen bg-white p-6 w-full">
        {/* Header */}
        <div className="flex justify-between items-end border-b border-[#e6e6e6] border-dotted mb-[6px]">
          <h1 className="text-[21px] font-normal text-gray-800">Mode</h1>
          <span className="bg-blue-600 w-[25px] h-[25px] flex items-center justify-center rounded-full text-white text-sm font-bold mb-1">
            ?
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-1 gap-4 flex-wrap">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button
                onClick={openNewDialog}
                className="px-3 py-1.5 border border-[#ccd3de] rounded text-xs text-gray-700 hover:bg-[#ececec] leading-[11px] focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
              >
                New Mode
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-white border-0 shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-normal">
                  {editMode ? "Edit Mode" : "New Mode"}
                </DialogTitle>
                <span className="w-full h-[1px] bg-[#f6f6f6]"></span>
              </DialogHeader>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 pt-4"
                autoComplete="off"
              >
                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="name"
                    className="w-[120px] font-normal text-sm relative"
                  >
                    Name{" "}
                    <span className="text-red-500 absolute -top-[2px] left-10">
                      *
                    </span>
                  </Label>
                  <div className="flex-1">
                    <Input
                      id="name"
                      placeholder="Enter Mode Name"
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
                    className="w-[120px] text-sm font-normal"
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
                    className="bg-[#4588f0] py-[5px] px-4 text-base font-normal rounded-full hover:bg-[#3774d1] "
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? editMode
                        ? "Saving..."
                        : "Submitting..."
                      : editMode
                      ? "Save Changes"
                      : "Save"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-[#f5f5f5]  rounded-full text-[#787878] hover:bg-[#e1e1e1] border border-[#d4d4d4] py-[5px] px-4 text-base font-normal font-normal hover:text-[787878]"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

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
                <TableHead className="min-w-[150px] lg:text-xs font-semibold leading-[36px]  text-[#515526]">
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
                <TableHead className="min-w-[250px] lg:text-xs font-semibold leading-[36px] text-[#515526] ">
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableLoading ? (
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
              ) : modes.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-6 text-gray-500"
                  >
                    No data found.
                  </TableCell>
                </TableRow>
              ) : (
                modes.map((m) => (
                  <TableRow key={m.id} className="hover:bg-gray-50 bg-white">
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
                          <DropdownMenuItem onClick={() => handleEdit(m)}>
                            Edit Mode
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentMode(m);
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
                      onClick={() => handleEdit(m)}
                    >
                      {m.name}
                    </TableCell>
                    <TableCell className="p-2 lg:text-xs sm:text-sm max-w-[400px] truncate">
                      {m.description}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!tableLoading && (
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
            <div>
              <MuiStylePagination
                totalPages={pagination.totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
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
              Do you want to delete the selected Mode?
            </AlertDialogDescription>
            <AlertDialogFooter className="px-3 mb-2">
              <AlertDialogCancel className="rounded-full px-6">
                Cancel
              </AlertDialogCancel>
              <Button
                onClick={confirmDelete}
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

export default Mode;
