import { useState, useEffect } from "react";
import { IoIosHelpCircle, IoIosArrowRoundUp } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { regionService, region } from "@/services/setupServices";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Search, Settings } from "lucide-react";
import { MuiStylePagination } from "@/components/common/MuiStylePagination";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { nameDescriptionSchema, NameDescriptionSchema } from "@/lib/validation";
import { Card } from "@/components/ui/card";

const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="animate-pulse space-y-2">
    {[...Array(rows)].map((_, i) => (
      <Skeleton key={i} className="h-10 w-full bg-gray-100" />
    ))}
  </div>
);

const Regions = () => {
  const [regions, setRegions] = useState<region[]>([]);
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
  const [currentRegion, setCurrentRegion] = useState<region | null>(null);
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
    mode: "all",
  });

  const FetchRegions = async () => {
    setTableLoading(true);
    try {
      const res = await regionService.getRegions({
        page: currentPage,
        limit: itemsPerPage,
        sort_by: sortBy,
        sort_order: sortOrder,
        search: searchTerm,
      });

      if (res.success) {
        setRegions(res.data?.regions || []);
        setPagination(
          res.data?.pagination || {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            itemsPerPage: 5,
          }
        );
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    FetchRegions();
  }, [sortOrder, sortBy, currentPage, itemsPerPage, searchTerm]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setCurrentPage(1);
      setSearchTerm(searchInput.trim());
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const openNewRegionDialog = () => {
    setEditMode(false);
    setCurrentRegion(null);
    reset({ name: "", description: "" });
    setIsOpen(true);
  };

  const handleEditRegion = (reg: region) => {
    setEditMode(true);
    setCurrentRegion(reg);
    setValue("name", reg.name);
    setValue("description", reg.description || "");
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentRegion) return;
    setDeleteLoading(true);
    try {
      const res = await regionService.deleteRegion(currentRegion.id!);

      if (res.success) {
        toast({
          title: "Success",
          description: res.message || `Region "${currentRegion.name}" removed.`,
          className:
            "bg-green-600 text-white border-none fixed bottom-4 right-4 shadow-lg w-[500px]",
        });
        setShowDelete(false);
        FetchRegions();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        className:
          "bg-red-600 text-white border-none fixed bottom-4 right-4 shadow-lg w-[500px]",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const onSubmit: SubmitHandler<NameDescriptionSchema> = async (data) => {
    try {
      let res;
      if (editMode && currentRegion) {
        res = await regionService.updateRegion(
          currentRegion.id!,
          data as region
        );
      } else {
        res = await regionService.createRegion(data as region);
      }

      if (res.success) {
        toast({
          title: "Success",
          description: res.message || "Operation successful",
        });
        setIsOpen(false);
        FetchRegions();
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="p-[16px] bg-white h-full">
      {/* Header */}

      <div className="bg-white border-b py-[6px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-[21px] font-normal text-foreground flex-shrink-0">
          Regions
        </h2>

        {/* Filter Section */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[190px] lg:flex-none lg:w-[125px]">
            <Input
              placeholder="Search"
              className="pr-9 bg-white"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>

          {/* <Button
                  variant="outline"
                  size="icon"
                  className="bg-[#DEDEDE] hover:bg-[#DEDEDE]/90"
                >
                  <img alt="clearIcon" src={clearIcon} />
                </Button>
      
                <Button
                  variant="default"
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
                >
                  <img alt="searchIcons" src={searchIcons} />
                </Button> */}
        </div>
      </div>

      {/* Controls */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={openNewRegionDialog}
            className="px-[10px] my-[10px] py-[3px] font-normal text-[12px] rounded-sm hover:bg-[#ececec] border bg-white text-[#333333] h-auto"
          >
            New Region
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px] bg-white border-0 shadow-lg">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Region" : "New Region"}</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
            autoComplete="off"
          >
            {/* Region Name */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="name">Region Name *</Label>
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
              <Input
                id="name"
                placeholder="Enter Region Name"
                {...register("name", {
                  required: "Region Name is required",
                })}
                maxLength={51}
                autoComplete="off"
              />
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="description">Description</Label>
              </div>
              <Input
                id="description"
                placeholder="Enter Description"
                {...register("description")}
                maxLength={501}
                autoComplete="off"
              />
            </div>

            {/* Organization Roles */}
            <div className="pt-2">
              <h3 className="text-lg font-semibold mb-3">Organization Roles</h3>

              <div className="flex items-center gap-4 mb-4">
                {/* Role Name */}
                <div className="flex-1">
                  <Label className="block mb-1">Role Name</Label>
                  <select className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select Role</option>
                    {/* Example Options */}
                    <option>Manager</option>
                    <option>Supervisor</option>
                    <option>Staff</option>
                  </select>
                </div>

                {/* User */}
                <div className="flex-1">
                  <Label className="block mb-1">User</Label>
                  <select
                    className="w-full border rounded-md p-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled
                  >
                    <option value="">Select User</option>
                  </select>
                </div>

                {/* Add/Remove Buttons */}
                <div className="flex items-center gap-2 mt-6">
                  <button
                    type="button"
                    className="text-gray-500 border rounded px-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 border rounded px-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
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
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Table */}
      {/* <div className="overflow-hidden rounded-lg min-h-[200px]"> */}
      <Card className="shadow-none rounded-none border-none">
        {tableLoading ? (
          <TableSkeleton rows={5} />
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead onClick={() => handleSort("name")}>
                    <div className="flex items-center">
                      Region Name
                      <IoIosArrowRoundUp
                        size={16}
                        className={`ml-1 transition-transform ${
                          sortBy === "name" && sortOrder === "desc"
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort("description")}>
                    <div className="flex items-center">
                      Description
                      <IoIosArrowRoundUp
                        size={16}
                        className={`ml-1 transition-transform ${
                          sortBy === "description" && sortOrder === "desc"
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                  </TableHead>

                  {/* <TableHead className="text-center">Action</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {regions.length > 0
                  ? regions.map((reg, index) => (
                      <TableRow key={reg.id}>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center justify-center rounded p-1">
                              <Settings className="w-4 h-4 text-gray-500" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              <DropdownMenuItem
                                onClick={() => handleEditRegion(reg)}
                              >
                                Edit Region
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentRegion(reg);
                                  setShowDelete(true);
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        {/* <TableCell>
                            </TableCell> */}
                        <TableCell>{reg.name || "-"}</TableCell>
                        <TableCell>{reg.description || "-"}</TableCell>
                      </TableRow>
                    ))
                  : " No data found."}
              </TableBody>
            </Table>
          </>
        )}
      </Card>
      {/* </div> */}

      {/* Pagination */}
      {!tableLoading && (
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
            <span className="text-sm text-gray-600 whitespace-nowrap">
              Per Page
            </span>
          </div>
          <div>
            <MuiStylePagination
              totalPages={pagination.totalPages}
              currentPage={pagination.currentPage}
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
            Do you want to delete the selected Region?
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
  );
};

export default Regions;
