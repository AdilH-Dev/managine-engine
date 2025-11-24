import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Button } from "@/components/ui/button";
import { MuiStylePagination } from "@/components/common/MuiStylePagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categoryDescriptionSchema,
  type CategoryDescriptionSchema,
} from "@/lib/validation";
import { SubCategoryService } from "@/services/setupServices";
import { toast } from "@/hooks/use-toast";

interface SubCategory {
  id: number;
  name: string;
  description?: string;
  category_id?: number;
}

interface SubCategoryTableProps {
  parentCategoryId: number;
  onChange?: () => void; // parent’s fetchCategories()
}

const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="animate-pulse space-y-2">
    {[...Array(rows)].map((_, i) => (
      <Skeleton key={i} className="h-10 w-full bg-gray-100" />
    ))}
  </div>
);

const SubCategoryTable: React.FC<SubCategoryTableProps> = ({
  parentCategoryId,
  onChange,
}) => {
  const [items, setItems] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Search functionality (debounced)
  const [searchInput, setSearchInput] = useState(""); // user typing
  const [searchTerm, setSearchTerm] = useState(""); // actual query used

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<SubCategory | null>(null);

  const [showDelete, setShowDelete] = useState(false);
  const [currentDeleteItem, setCurrentDeleteItem] =
    useState<SubCategory | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryDescriptionSchema>({
    resolver: zodResolver(categoryDescriptionSchema),
    defaultValues: { name: "", description: "" },
  });

  // ✅ Fetch subcategories from API
  const fetchSubCategories = async () => {
    if (!parentCategoryId) return; // skip if no parent
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        category_id: parentCategoryId,
      };
      const res = await SubCategoryService.getSubCategories(params);
      if (res.success) {
        setItems(res.data.subCategories || []);
        setTotalPages(res.data.pagination?.totalPages || 1);
      } else {
        setItems([]);
        toast({
          title: "Error",
          description: res.message || "Failed to load subcategories.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to fetch subcategories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Fetch when pagination, search term, or parentCategoryId changes
  useEffect(() => {
    fetchSubCategories();
  }, [currentPage, itemsPerPage, searchTerm, parentCategoryId]);

  // ⏳ Debounce search input (wait until user finishes typing)
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(searchInput.trim());
      setCurrentPage(1);
    }, 500); // delay 500ms

    return () => clearTimeout(handler);
  }, [searchInput]);

  // ✏️ Edit handler
  const openEdit = (item: SubCategory) => {
    setEditItem(item);
    setIsEditOpen(true);
    reset({ name: item.name, description: item.description || "" });
  };

  const onEditSubmit: SubmitHandler<CategoryDescriptionSchema> = async (
    data
  ) => {
    if (!editItem) return;
    setEditLoading(true);
    try {
      const payload = {
        name: data.name,
        description: data.description,
        category_id: editItem.category_id,
      };
      const res = await SubCategoryService.updateSubCategory(
        editItem.id,
        payload
      );
      if (res.success) {
        toast({
          title: "Success",
          description: res.message || "Subcategory updated successfully",
        });
        setIsEditOpen(false);
        setEditItem(null);
        fetchSubCategories();
        onChange?.(); // 🔁 Notify parent
      } else {
        toast({
          title: "Error",
          description: res.message || "Update failed",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setEditLoading(false);
    }
  };

  // 🗑️ Delete handler
  const confirmDelete = async () => {
    if (!currentDeleteItem) return;
    setDeleteLoading(true);
    try {
      const res = await SubCategoryService.deleteSubCategory(
        currentDeleteItem.id
      );
      if (res.success) {
        toast({
          title: "Deleted",
          description: res.message || "Subcategory deleted successfully",
          variant: "destructive",
        });
        setShowDelete(false);
        setCurrentDeleteItem(null);
        fetchSubCategories();
        onChange?.(); // 🔁 Refresh parent
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  if (!parentCategoryId) {
    return (
      <div className="p-6 bg-white rounded-lg border-t text-center text-gray-500">
        Please select a category to view its subcategories.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg border-t">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
        <h1 className="text-base font-medium text-gray-800">Subcategories</h1>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search subcategory"
            className="pl-9 py-[8px] rounded border"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md">
        {loading ? (
          <TableSkeleton />
        ) : items.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-2 px-4 font-semibold">Name</th>
                <th className="text-left py-2 px-4 font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((sub) => (
                <tr key={sub.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">
                    <div className="flex items-center space-x-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 hover:bg-gray-100 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.8}
                              stroke="currentColor"
                              className="h-5 w-5 text-gray-500"
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
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => openEdit(sub)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentDeleteItem(sub);
                              setShowDelete(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <span>{sub.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4">{sub.description || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-6 text-gray-500">
            No subcategories found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {!loading && (
        <div className="flex items-center justify-between mt-6">
          {/* Items per page selector */}
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

          <MuiStylePagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
              onChange?.();
            }}
          />
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white border-0 shadow-lg">
          <DialogHeader>
            <DialogTitle>Edit Subcategory</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onEditSubmit)}
            className="space-y-4 pt-4"
            autoComplete="off"
          >
            <div>
              <Label>Name*</Label>
              <Input {...register("name")} placeholder="Subcategory name" />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label>Description</Label>
              <Input {...register("description")} placeholder="Description" />
              {errors.description && (
                <p className="text-red-500 text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || editLoading}>
                {isSubmitting || editLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
        <AlertDialogContent className="rounded-xl py-2 px-0 bg-white">
          <AlertDialogHeader className="border-b">
            <AlertDialogTitle className="text-red-600 px-3">
              Delete
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="px-3">
            Do you want to delete the selected subcategory?
          </AlertDialogDescription>
          <AlertDialogFooter className="px-3 mb-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-700"
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

export default SubCategoryTable;
