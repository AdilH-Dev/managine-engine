import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ArrowUp, ArrowDown, Settings, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteSchema, SiteFormInputs } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AddSite from "./AddSite";
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestTypeService, siteServices } from "@/services/setupService";
import { Setup } from "@/services/setupService";
import Helpdesk from "./healper/Helpdesk";
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

interface FormInputs {
  name: string;
  description: string;
  province?: string;
  address?: string;
  email?: string;
  phone?: string;
  fax?: string;
  website?: string;
}


const Site = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setdeleteLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Setup | null>(null);
  const [data, setData] = useState<Setup[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("active");


  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SiteFormInputs>({
    resolver: zodResolver(siteSchema),
  });



  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSite();
    }, 600);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, sortOrder, currentPage, itemsPerPage]);


  const fetchSite = async () => {
    setLoading(true);
    try {
      const result = await siteServices.getAll({
        page: currentPage,
        limit: itemsPerPage,
        sort_by: "name",
        search: searchTerm.trim(),
        status: statusFilter,
        sort_order: sortOrder,
      });

      setData(result.data || []);
      if (result.pagination && result.pagination.totalPages) {
        setTotalPages(result.pagination.totalPages);
      } else {
        setTotalPages(1);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: extractErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      // Small delay for smoother skeleton transition
      setTimeout(() => setLoading(false), 500);
    }
  };

  const toggleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
  };


  const onSubmit = async (formData: SiteFormInputs) => {
    setActionLoading(true);
    setServerError(null);
    try {
      if (selectedTask) {
        const res = await siteServices.update(selectedTask.id, formData);
        toast({
          title: "Success",
          description: res?.message || "Updated successfully.",
        });
        console.log(res);
      } else {
        const res = await siteServices.create(formData as Setup);
        toast({
          title: "Success",
          description: res?.message || "Created successfully.",
        });
      }
      fetchSite();
      setIsOpen(false);
      reset();
      setSelectedTask(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: extractErrorMessage(error),
        variant: "destructive",
      });
    }
    finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (item: Setup) => {
  navigate(`/setup/add-site?id=${item.id}`, { state: { siteData: item } });
};


  const handleDelete = async () => {
    if (!selectedTask) return;
    setdeleteLoading(true);
    try {
      const res = await siteServices.delete(selectedTask.id);
      await fetchSite();
      toast({
        title: "Deleted",
        description: res?.message || "Record deleted successfully.",
      });
      setShowDelete(false);
      setSelectedTask(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: extractErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setdeleteLoading(false);
    }
  };



  return (
    <>
      <div className="min-h-screen bg-white p-4">
        {/* Header */}
        {/* Header */}
        <div className="flex items-center justify-between border-b pt-2 bg-white border-[#e6e6e6] border-dotted">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-foreground leading-[40px]">
              Sites
            </h2>
            <span className="text-gray-400">|</span>
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
                fetchSite(); // refresh when changing
              }}
            >
              <SelectTrigger className="w-[70px] h-[28px] bg-white border-none text-gray-600 text-sm focus:ring-gray-400 rounded-none  focus:outline-none p-0">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <button>
            <span className="bg-blue-600 w-7 h-7 flex items-center justify-center rounded-full text-white text-sm">
              ?
            </span>
          </button>
        </div>


        {/* Add Button */}
        <div className="bg-white flex justify-between items-center">
          <Button
            // disabled={loading || actionLoading}
           className="mt-[10px] mb-[6px] bg-white h-auto text-[#333333] text-xs font-normal rounded-[4px] border border-[#ccd3de] px-[10px] py-[3px] hover:bg-gray-100 focus:outline-none  focus:border-blue-500"
            onClick={() => navigate("/setup/add-site")}
          >
            New Site
          </Button>

             <div className="relative flex-1 min-w-[190px] lg:flex-none lg:w-[125px]">
            <Input
              placeholder="Search"
              className="pr-9 bg-white"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1);}}
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-visible">
          <Table className="min-w-[600px] w-full text-sm">
            <TableHeader>
              <TableRow className="py-1">
                <TableHead className="w-10 text-xs"></TableHead>
                <TableHead className="min-w-[150px] text-xs sm:text-sm">
                  <div
                    className="flex items-center cursor-pointer select-none"
                    onClick={toggleSort}
                  >
                    Name
                    {sortOrder === "asc" ? (
                      <ArrowUp size={14} className="ml-1 text-gray-600" />
                    ) : (
                      <ArrowDown size={14} className="ml-1 text-gray-600" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="min-w-[250px] text-xs sm:text-sm text-gray-500">
                  Region
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading
                ? [...Array(itemsPerPage)].map((_, index) => (
                  <TableRow key={index}>
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
                : data.length === 0
                  ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center py-6 text-gray-500"
                      >
                        No data available.
                      </TableCell>
                    </TableRow>
                  )
                  : data.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50 bg-white">
                      <TableCell className="py-1 text-xs">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-100 rounded p-1 w-full">
                            <Settings className="w-4 h-4 text-gray-500" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="start"
                            sideOffset={4}
                            className="z-50 w-[140px]"
                          >
                            <DropdownMenuItem disabled={actionLoading} onClick={() => handleEdit(item)}>
                              Edit Site
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedTask(item);
                                setShowDelete(true);
                              }}
                              disabled={actionLoading}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>

                      <TableCell
                        className="py-2 text-xs sm:text-sm cursor-pointer hover:underline"
                        onClick={() => handleEdit(item)}
                      >
                        {item.name}
                      </TableCell>

                      <TableCell className="py-2 text-xs sm:text-sm max-w-[400px] truncate">
                        {item?.region?.name || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>

        {!loading && data.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <Select
                defaultValue={String(itemsPerPage)}
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
              <span className="text-sm text-gray-600">Per Page</span>
            </div>
            <div>
              <MuiStylePagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}


        {/* Delete Dialog */}
        <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
          <AlertDialogContent className="rounded-xl py-2 px-0 bg-white">
            <AlertDialogHeader className="border-b">
              <AlertDialogTitle className="text-red-600 px-3">Delete</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription className="px-3">
              Do you want to delete the "{selectedTask?.name}"?
            </AlertDialogDescription>

            <AlertDialogFooter className="px-3 mb-2">
              <AlertDialogCancel disabled={actionLoading} className="rounded-full px-6">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleteLoading}
                className="bg-red-600 text-white rounded-full px-6 hover:bg-red-700 transition"
              >
                {deleteLoading ? "Confirming..." : "Confirm"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default Site;

