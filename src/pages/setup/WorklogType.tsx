import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { ArrowDown, ArrowUp, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import Helpdesk from "./healper/Helpdesk";
import { worklogTypeservices } from "@/services/setupService";
import { Setup } from "@/services/setupService";
import { Textarea } from "@/components/ui/textarea";
import { NameDescriptionSchema, nameDescriptionSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

const WorklogType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Setup | null>(null);
  const [data, setData] = useState<Setup[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteLoading, setdeleteLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NameDescriptionSchema>({
    defaultValues: { name: "", description: "" },
    resolver: zodResolver(nameDescriptionSchema),
  });

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchWorklogTypes();
    }, 600);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);
  useEffect(() => {
    fetchWorklogTypes();
  }, [sortOrder, currentPage, itemsPerPage]);

  const toggleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
  };

  const fetchWorklogTypes = async () => {
    setLoading(true);
    try {
      const result = await worklogTypeservices.getAll({
        page: currentPage,
        limit: itemsPerPage,
        sort_by: "name",
        search: searchTerm.trim(),
        sort_order: sortOrder,
      });

      setData(result.data || []);
      setTotalPages(result.pagination?.totalPages || 1);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  // Create / Update
  const onSubmit = async (formData) => {
    setActionLoading(true);
    try {
      if (selectedTask) {
        const res = await worklogTypeservices.update(selectedTask.id, formData);
        toast({
          title: "Updated",
          description: res.message,
        });
      } else {
        const res = await worklogTypeservices.create(formData as Setup);
        toast({
          title: "Created",
          description: res.message,
        });
      }
      fetchWorklogTypes();
      setIsOpen(false);
      reset({ name: "", description: "" });
      setSelectedTask(null);
    } catch (error: any) {
      console.log(error);
    }
    finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (item: Setup) => {
    setSelectedTask(item);
    reset(item);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await worklogTypeservices.delete(selectedTask.id);
      if (res?.message) {
        fetchWorklogTypes();
        toast({
          title: "Deleted",
          description: res.message,
          variant: "default",
        });
      }
    } catch (error: any) {
      console.log(error);
    }
    finally {
      setdeleteLoading(false);
    }
  };

  return (
    <Helpdesk>
      <div className="min-h-screen bg-white p-4">

        <div className="bg-white border-b border-dotted py-[6px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-xl text-[#333333] font-normal leading-[33px]">
            Worklog Type
          </h2>
          <div className="relative flex-1 min-w-[190px] lg:flex-none lg:w-[125px]">
            <Input
              placeholder="Search"
              className="pr-9 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div className="bg-white flex justify-between items-center">
          <Button
            className="mt-[10px] mb-[6px] bg-white h-auto text-[#333333] text-xs font-normal rounded-[4px] border border-[#ccd3de] px-[10px] py-[3px] hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            onClick={() => {
              setSelectedTask(null);
              reset({ name: "", description: "" });
              setIsOpen(true);
            }}
          >
            New WorklogType
          </Button>
        </div>

        <Table className="bg-white border-b border-gray-200">
          <TableHeader>
            <TableRow className="py-1 border-t">
              <TableHead className="w-[43px] h-[37px]"></TableHead>
              <TableHead className="w-[400px] lg:text-xs font-semibold leading-[36px]">
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
              <TableHead className="min-w-[250px] lg:text-xs font-semibold leading-[36px]">
                <div className="flex items-center cursor-pointer select-none">
                  Description
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
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
                ))}
              </>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-6 text-gray-500"
                >
                  No data available.
                </TableCell>
              </TableRow>
            ) : (
              data?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="py-1 text-xs">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-100 rounded p-1 w-full">
                        <Settings className="w-4 h-4 text-gray-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" sideOffset={4} className="z-50">
                        <DropdownMenuItem onClick={() => handleEdit(item)}>
                          Edit Worklog Type
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
                    className="py-1 text-xs cursor-pointer hover:underline"
                    onClick={() => handleEdit(item)}
                  >
                    {item.name}
                  </TableCell>

                  <TableCell className="py-1 text-xs">{item.description}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

        </Table>

        {/* Pagination + Items per Page */}
        {!loading && data.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <Select defaultValue={String(itemsPerPage)} onValueChange={(value) => {
                setItemsPerPage(Number(value))
                setCurrentPage(1);
              }}>
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

        {/* Add / Edit Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[600px] bg-white px-[16px] py-4">
            <DialogHeader>
              <DialogTitle className="text-lg font-normal">
                {selectedTask ? "Edit  Worklog Type" : "New WorklogType"}
              </DialogTitle>
            </DialogHeader>
            <span className="w-full h-[1px] bg-[#f4f4f4]"></span>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-2">
              <div className="lg:flex sm:flex-none items-center justify-between">
                <div className="flex items-center gap-2 mb-3 lg:w-[500px] sm:w-none">
                  <Label>Name <span className="text-red-500">*</span></Label> {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <Input
                  id="name"
                  {...register("name")}
                />
              </div>

              <div className="lg:flex sm:flex-none items-center justify-between">
                <div className="flex items-center gap-2 mb-3 lg:w-[500px] sm:w-none">
                  <Label>Description</Label>
                  {errors.description && (
                    <p className="text-red-500 text-xs">{errors.description.message}</p>
                  )}
                </div>
                <Textarea
                  id="description"
                  className="resize-none bg-white"
                  {...register("description")}
                />
              </div>

              <div className="flex justify-center gap-4 pt-4">

                <Button disabled={isSubmitting} type="submit" className="bg-[#4588f0] py-0 px-7 rounded-full hover:bg-[#3774d1] text-sm font-normal">
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
                <Button
                  type="button"
                  className="bg-[#f5f5f5] px-6 py-0 rounded-full text-[#787878] hover:bg-[#e1e1e1] border border-[#d4d4d4] text-sm font-normal"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  disabled={actionLoading}
                >
                  Cancel
                </Button>
              </div>
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
              Do you want to delete selected Worklog Type?
            </AlertDialogDescription>

            <AlertDialogFooter className="px-3 mb-2">
              <AlertDialogCancel className="rounded-full px-6">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
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

export default WorklogType;
