import React, { useState, useEffect } from "react";
import SubCategoryTable from "./SubCategoryTable";

import { useForm, SubmitHandler } from "react-hook-form";
import CustomSelect, { Option } from "@/components/CustomSelect";

import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryService, category } from "@/services/setupServices";
import { MdKeyboardArrowRight } from "react-icons/md";
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
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  categoryDescriptionSchema,
  type CategoryDescriptionSchema,
} from "@/lib/validation";
import { subCategorySchema, type SubCategorySchema } from "@/lib/validation";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp, Search, Settings } from "lucide-react";
import Helpdesk from "./healper/Helpdesk";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { MuiStylePagination } from "@/components/common/MuiStylePagination";
import {
  ArrowDown as ArrowDownIcon,
  ArrowUp as ArrowUpIcon,
} from "lucide-react";

import { zodResolver as zodRes } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="animate-pulse space-y-2">
    {[...Array(rows)].map((_, i) => (
      <Skeleton key={i} className="h-10 w-full bg-gray-100" />
    ))}
  </div>
);

/**
 * Subcategory zod schema (required category_id)
 * We define it locally so the component works immediately.
 * If you prefer, move this to your "@/lib/validation" file.
 */

const Category = () => {
  const [categorySearch, setCategorySearch] = useState("");
  const [isSubDialogOpen, setIsSubDialogOpen] = useState(false);
  const [selectedParentCategory, setSelectedParentCategory] =
    useState<string>("");
  const [categories, setCategories] = useState<category[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 5,
  });
  const [categoryDropdown, setCategoryDropdown] = useState<any[]>([]);
  const [dropdownLoading, setDropdownLoading] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<category | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<string>("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Main Category form (uses your existing schema)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryDescriptionSchema>({
    resolver: zodResolver(categoryDescriptionSchema),
    defaultValues: { name: "", description: "" },
    mode: "onSubmit",
  });

  // Subcategory form (uses local subCategorySchema which requires category_id)
  const {
    register: registerSub,
    handleSubmit: handleSubSubmit,
    reset: resetSub,
    setValue: setSubValue,
    formState: { errors: subErrors, isSubmitting: isSubSubmitting },
  } = useForm<SubCategorySchema>({
    resolver: zodRes(subCategorySchema),
    defaultValues: { name: "", description: "", category_id: "" },
    mode: "onSubmit",
  });

  // -------------------- SUBCATEGORY --------------------
  const onSubSubmit: SubmitHandler<SubCategorySchema> = async (data) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        category_id: data.category_id,
      };
      const res = await CategoryService.createSubCategory(payload);
      if (res.success) {
        toast({
          title: "Success",
          description: "Subcategory added successfully",
        });
        setIsSubDialogOpen(false);
        resetSub();
        setSelectedParentCategory("");
        fetchCategories();
      } else {
        toast({
          title: "Error",
          description: res.message || "Failed to create subcategory",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // -------------------- CATEGORY DROPDOWN --------------------
  const fetchCategoryDropdown = async () => {
    setDropdownLoading(true);
    try {
      const res = await CategoryService.getCategoriesDropDown();
      if (res.success) setCategoryDropdown(res.data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setDropdownLoading(false);
    }
  };

  // -------------------- FETCH CATEGORIES --------------------
  const fetchCategories = async () => {
    setTableLoading(true);
    try {
      const res = await CategoryService.getCategories({
        page: currentPage,
        limit: itemsPerPage,
        sort_by: sortBy,
        sort_order: sortOrder,
        search: searchTerm,
      });
      if (res.success) {
        setCategories(res.data?.categories || []);
        setPagination(res.data?.pagination || pagination);
      } else {
        toast({
          title: "Error",
          description: res.message || "Failed to fetch categories",
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
    fetchCategoryDropdown();
  }, []);
  useEffect(() => {
    fetchCategories();
  }, [sortOrder, sortBy, currentPage, itemsPerPage, searchTerm]);
  useEffect(() => {
    const handler = setTimeout(() => {
      setCurrentPage(1);
      setSearchTerm(searchInput.trim());
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const handleSort = (column: string) => {
    if (sortBy === column) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  // -------------------- NEW / EDIT CATEGORY --------------------
  const openNewCategoryDialog = () => {
    setEditMode(false);
    setCurrentCategory(null);
    reset({ name: "", description: "" });
    setIsOpen(true);
  };
  const handleEditCategory = (cat: category) => {
    setEditMode(true);
    setCurrentCategory(cat);
    setValue("name", cat.name);
    setValue("description", cat.description || "");
    setIsOpen(true);
  };

  // -------------------- DELETE CATEGORY --------------------
  const confirmDelete = async () => {
    if (!currentCategory) return;
    setDeleteLoading(true);
    try {
      const res = await CategoryService.deleteCategory(currentCategory.id!);
      if (res.success) {
        toast({
          title: "Success",
          description: res.message || "Deleted successfully",
        });
        setShowDelete(false);
        fetchCategories();
      } else {
        toast({
          title: "Error",
          description: res.message || "Failed to delete",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // -------------------- SAVE CATEGORY --------------------
  const onSubmit: SubmitHandler<CategoryDescriptionSchema> = async (data) => {
    try {
      let res;
      if (editMode && currentCategory)
        res = await CategoryService.updateCategory(
          currentCategory.id!,
          data as category
        );
      else res = await CategoryService.createCategory(data as category);

      if (res.success) {
        toast({
          title: "Success",
          description: res.message || "Operation successful",
        });
        setIsOpen(false);
        fetchCategories();
      } else {
        toast({
          title: "Error",
          description: res.message || "Operation failed",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Helpdesk>
      <div className="min-h-screen bg-white p-4 w-full ">
        {/* Header */}
        <div className="flex justify-between items-end border-b border-[#e6e6e6] border-dotted  mb-[6px]  ">
          <h1 className="text-[21px] font-normal text-[#262f36]  mb-[1px] ">
            Category
          </h1>
          <span className="bg-blue-600 w-[25px] h-[25px] flex items-center justify-center rounded-full text-white text-sm font-bold mb-1">
            ?
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-end justify-between mb-[5px]  gap-4 flex-wrap    ">
          <div className="flex items-center  gap-1 ">
            {/* New Category Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <button
                  onClick={openNewCategoryDialog}
                  className="px-3 py-1.5 border border-[#ccd3de] rounded text-xs text-gray-700 hover:bg-[#ececec] leading-[11px] focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
                >
                  New Category
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-white border-0 shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-lg font-normal">
                    {editMode ? "Edit Category" : "New Category"}
                  </DialogTitle>
                  <span className="w-full h-[1px] bg-[#f6f6f6]"></span>
                </DialogHeader>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 pt-4"
                  autoComplete="off"
                >
                  {/* Name Field */}
                  <div className="flex items-center gap-4">
                    <Label
                      htmlFor="name"
                      className="w-[120px] font-sm font-normal relative"
                    >
                      Name
                      <span className="text-red-500 absolute -top-[2px] left-10">
                        *
                      </span>
                    </Label>

                    <div className="flex-1 gap-1">
                      <Input
                        id="category"
                        placeholder="Enter Category Name"
                        {...register("name")}
                        maxLength={51}
                        autoComplete="off"
                        className="w-full"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description Field */}
                  <div className="flex items-center gap-4">
                    <Label
                      htmlFor="description"
                      className="w-[120px] font-normal text-sm"
                    >
                      Description
                    </Label>
                    <div className="flex-1 gap-1">
                      <Textarea
                        id="description"
                        placeholder="Enter Description"
                        {...register("description")}
                        maxLength={501}
                        autoComplete="off"
                        className="w-full resize-none bg-white"
                      />
                      {errors.description && (
                        <p className="text-red-500 text-xs">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4 pt-4">
                    <Button
                      type="submit"
                      className="bg-[#4588f0] py-[6px] px-4 text-base font-normal rounded-full hover:bg-[#3774d1] "
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
                      className="bg-[#f5f5f5]  rounded-full text-[#787878] hover:bg-[#e1e1e1] border border-[#d4d4d4]  hover:text-[787878]  py-[5px] px-4 text-base font-normal"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {/* Add Subcategory Dialog */}
            {/* Add Subcategory Dialog */}
            <Dialog open={isSubDialogOpen} onOpenChange={setIsSubDialogOpen}>
              <DialogTrigger asChild>
                <button
                  onClick={() => {
                    fetchCategoryDropdown(); // fetch categories once
                    resetSub();
                    setSelectedParentCategory("");
                    setSubValue("category_id", "");
                    setCategorySearch(""); // reset search
                    setIsSubDialogOpen(true);
                  }}
                  className="px-3 py-1.5 border border-[#ccd3de] rounded text-xs text-gray-700 hover:bg-[#ececec] leading-[11px] focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
                >
                  New Sub Category
                </button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[500px] bg-white border-0 shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl font-normal">
                    Add Subcategory
                  </DialogTitle>
                  <span className="w-full h-[1px] bg-[#f6f6f6]"></span>
                </DialogHeader>

                <form
                  onSubmit={handleSubSubmit(onSubSubmit)}
                  className="space-y-6 pt-4"
                  autoComplete="off"
                >
                  {/* Name Field */}
                  <div className="flex items-center gap-4">
                    <Label
                      htmlFor="sub-name"
                      className="w-[120px] font-normal text-sm relative"
                    >
                      Name{" "}
                      <span className="text-red-500 absolute -top-[2px] left-10">
                        *
                      </span>
                    </Label>
                    <div className="flex-1">
                      <Input
                        id="sub-name"
                        placeholder="Enter Subcategory Name"
                        {...registerSub("name")}
                        maxLength={51}
                        autoComplete="off"
                        className="w-full"
                      />
                      {subErrors.name && (
                        <p className="text-red-500 text-xs">
                          {subErrors.name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description Field */}
                  <div className="flex items-center gap-4">
                    <Label
                      htmlFor="sub-description"
                      className="w-[120px] font-normal text-sm"
                    >
                      Description
                    </Label>
                    <div className="flex-1">
                      <Textarea
                        id="sub-description"
                        placeholder="Enter Description"
                        {...registerSub("description")}
                        maxLength={501}
                        autoComplete="off"
                        className="w-full resize-none bg-white"
                      />
                      {subErrors.description && (
                        <p className="text-red-500 text-xs">
                          {subErrors.description.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Category Selection Dropdown */}
                  <div className="flex items-center gap-4">
                    <Label
                      htmlFor="parent-category "
                      className="w-[120px] text-sm font-normal relative"
                    >
                      Category{" "}
                      <span className="text-red-500 absolute -top-[2px] left-[62px]">
                        *
                      </span>
                    </Label>

                    <div className="flex-1">
                      <CustomSelect
                        options={categoryDropdown.map((cat) => ({
                          name: cat.name,
                          id: cat.id.toString(),
                        }))}
                        placeholder="Select Category"
                        defaultValue={
                          selectedParentCategory
                            ? {
                                name:
                                  categoryDropdown.find(
                                    (x) =>
                                      x.id.toString() === selectedParentCategory
                                  )?.name || "",
                                id: selectedParentCategory,
                              }
                            : null
                        }
                        onChange={(item) => {
                          const value = item?.id || "";
                          setSelectedParentCategory(value);
                          setSubValue("category_id", value);
                        }}
                        showNoneOption={false}
                        className="h-[32px] text-sm"
                        dropdownClassName="text-sm"
                      />

                      {subErrors.category_id && (
                        <p className="text-red-500 text-xs mt-1">
                          {subErrors.category_id.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Hidden input for RHF */}
                  <input
                    type="hidden"
                    {...registerSub("category_id")}
                    value={selectedParentCategory}
                    readOnly
                  />

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4 pt-4">
                    <Button
                      type="submit"
                      className="bg-[#4588f0] py-[5px] px-4 text-base font-normal rounded-full hover:bg-[#3774d1] "
                      disabled={isSubSubmitting}
                    >
                      {isSubSubmitting ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-[#f5f5f5] py-[5px] px-4 text-base font-normal rounded-full text-[#787878] hover:bg-[#e1e1e1] border border-[#d4d4d4]  hover:text-[787878]"
                      onClick={() => setIsSubDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

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

        {/* --- TABLE --- */}
        <div className="overflow-visible   ">
          <Table className="min-w-[600px] w-full text-sm">
            <TableHeader>
              <TableRow className="py-1 border-t">
                <TableHead className="w-[43px] h-[37px]"></TableHead>
                <TableHead
                  className="w-[400px] lg:text-xs font-semibold leading-[36px]  text-[#515526] "
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center ">
                    Name
                    {sortBy === "name" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp size={14} className="ml-1 text-gray-600" />
                      ) : (
                        <ArrowDown size={14} className="ml-1 text-gray-600" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="w-[400px] lg:text-xs font-semibold leading-[36px]  text-[#515526]"
                  onClick={() => handleSort("description")}
                >
                  <div className="flex items-center">
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
                <TableSkeleton rows={itemsPerPage} />
              ) : categories.length > 0 ? (
                categories.map((cat) => (
                  <React.Fragment key={cat.id}>
                    <TableRow
                      className={`${
                        expandedCategory === cat.id ? "bg-gray-100" : ""
                      }`}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-1 hover:bg-gray-100 rounded-full">
                                <Settings className="w-4 h-4 text-gray-500" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white rounded-md shadow-md">
                              <DropdownMenuItem
                                onClick={() => handleEditCategory(cat)}
                              >
                                Edit Category
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentCategory(cat);
                                  setShowDelete(true);
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex">
                          <div className="flex">
                            <MdKeyboardArrowRight
                              size={24}
                              onClick={() =>
                                setExpandedCategory(
                                  expandedCategory === cat.id ? null : cat.id
                                )
                              }
                              className={`text-gray-500 transition-transform duration-300 font-bold cursor-pointer ${
                                expandedCategory === cat.id ? "rotate-90" : ""
                              }`}
                            />
                          </div>

                          {cat.name}
                        </div>
                      </TableCell>
                      <TableCell>{cat.description}</TableCell>
                    </TableRow>
                    {expandedCategory === cat.id && (
                      <TableRow>
                        <TableCell colSpan={3} className="bg-gray-50 p-0">
                          <SubCategoryTable
                            parentCategoryId={cat.id}
                            onChange={fetchCategories}
                          />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-4 text-gray-500"
                  >
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* --- Pagination --- */}
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
                  currentPage={pagination.currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
          <AlertDialogContent className="rounded-xl py-4 px-6 bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-600 text-lg font-semibold">
                Delete Category
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-gray-600 text-sm">
                Are you sure you want to delete category "
                {currentCategory?.name}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-end gap-2 mt-4">
              <AlertDialogCancel
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </AlertDialogCancel>
              <Button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Helpdesk>
  );
};

export default Category;
