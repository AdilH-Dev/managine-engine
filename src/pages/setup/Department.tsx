import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { setupService } from "@/services/setupServices";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { MuiStylePagination } from "@/components/common/MuiStylePagination";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { departmentFormSchema, DepartmentFormSchema } from "@/lib/validation";
import { Textarea } from "@/components/ui/textarea";
import CustomSelect from "@/components/CustomSelect";
import { ticketService } from "@/services/ticketService";
import { DropdownData } from "@/types/ticket";

const resetFeilds = {
  name: "",
  site_id: "",
  department_head_id: "",
  description: "",
};

const Department = () => {
  const [dropDown, setDropDown] = useState<DropdownData | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("5");
  const [totalPages, setTotalPages] = useState(1);
  const [editId, setEditId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [delId, setDelId] = useState(null);

  const {
    register,
    handleSubmit,
    // setValue,
    // watch,
    reset,
    // setValue,
    control,
    getValues,
    formState: { errors },
    // } = useForm({
  } = useForm<DepartmentFormSchema>({
    resolver: zodResolver(departmentFormSchema),
    // defaultValues: {
    //   site_id: "",
    //   department_id: "",
    //   role_id: "",
    //   reporting_manager_id: "",
    //   allowed_to_view: "1",
    // },
  });
  console.log(getValues(), "getValues()");

  useEffect(() => {
    loadDropdownData();
  }, []);

  const loadDropdownData = async () => {
    try {
      // const [reqData, techData, groupData] = await Promise.all([
      const [dropDownData] = await Promise.all([ticketService.getDropdown("")]);
      console.log(dropDownData?.data, "dropDownDatadropDownData");
      setDropDown(dropDownData?.data);
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to load form data",
      //   variant: "destructive",
      // });
    }
  };

  useEffect(() => {
    loadDepartments();
  }, [
    searchTerm,
    // technicianFilter,
    // requesterFilter,
    // statusFilter,
    // priorityFilter,
    itemsPerPage,
    currentPage,
    // dateFilter,
  ]);

  const loadDepartments = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (searchTerm) params.search = searchTerm;

      if (currentPage) params.page = currentPage;
      if (itemsPerPage) params.limit = itemsPerPage;

      const response = await setupService.getDepartments(params);
      if (response?.success) {
        console.log(response, "response--->>>>");
        setDepartments(response.data.departments);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: DepartmentFormSchema) => {
    setLoading2(true);
    try {
      const formData: any = {
        ...data,
        company_id: "1",
      };
      if (editId) {
        const res = await setupService.updateDepartment(editId, formData);
        if (res?.success) {
          // reset(resetFeilds);
          setIsOpen(false);
          loadDepartments();
          toast({
            title: "Success",
            description: "Department updated successfully",
          });
        }
      } else {
        const res = await setupService.createDepartment(formData);
        if (res?.success) {
          // reset(resetFeilds);
          setIsOpen(false);
          loadDepartments();
          toast({
            title: "Success",
            description: "Department created successfully",
          });
        }
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    if (editId) {
      loadDepartmentData(editId);
    }
  }, [editId]);

  const loadDepartmentData = async (departmentId) => {
    try {
      const res = await setupService.getDepartment(departmentId);
      if (res?.success) {
        const dep = res.data;
        reset({
          name: dep.name || "",
          site_id: dep.site_id ? String(dep.site_id) : "",
          department_head_id: dep.department_head_id
            ? String(dep.department_head_id)
            : "",
          description: dep.description || "",
        });
      }
      // setDropDown(dropDownData?.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load form data",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    setLoading3(true);
    try {
      const response = await setupService.deleteDepartment(delId);
      console.log(response, "responsedel");
      if (response?.success) {
        setShowDelete(false);
        setDelId(null);
        loadDepartments();
        toast({
          title: "Success",
          description: "Department deleted successfully",
        });
      }
    } catch {
    } finally {
      setLoading3(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      reset(resetFeilds);
      setEditId(null);
      setDelId(null);
    }
  }, [isOpen]);

  return (
    <div className="p-[16px] bg-white h-full">
      <div className="bg-white border-b py-[6px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-[21px] font-normal text-foreground flex-shrink-0">
          Departments
        </h2>

        {/* Filter Section */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[190px] lg:flex-none lg:w-[125px]">
            <Input
              placeholder="Search"
              className="pr-9 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {/* <Button className="bg-primary flex items-center gap-2">
                Add Department <Plus className="w-4 h-4" />
                </Button> */}
          {/* <div className="bg-white pt-[10px] pb-[10px]"> */}
          <Button className="px-[10px] my-[10px] py-[3px] font-normal text-[12px] rounded-sm hover:bg-[#ececec] border bg-white text-[#333333] h-auto">
            New Department
            {/* <span className="h-[18px] w-[18px] rounded-full bg-white text-primary flex items-center justify-center flex-shrink-0">
                <img alt="plusIcon" src={plusIcon} />
              </span> */}
          </Button>
          {/* </div> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-[20px] font-bold">
              {editId ? "Edit" : "Add"} Department
            </DialogTitle>
          </DialogHeader>
          <form
            // onSubmit={handleSubmit(onSubmit)}
            onSubmit={(e) => {
              e.stopPropagation(); // prevents parent form submission
              handleSubmit(onSubmit)(e); // call react-hook-form submit
            }}
          >
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="name">
                  Name *
                  {errors.name && (
                    <span className="text-sm text-destructive mt-1 font-normal">
                      {errors.name.message}
                    </span>
                  )}
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter Department Name"
                />
              </div>
              <div>
                <Label htmlFor="site_id">Sites</Label>
                <Controller
                  name="site_id"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <CustomSelect
                        {...field}
                        options={dropDown?.sites || []}
                        placeholder="-- Select Site --"
                        defaultValue={
                          dropDown?.sites?.find((r) => r.id == field.value) ||
                          null
                        }
                        onChange={(option) =>
                          field.onChange(option?.id.toString())
                        }
                        showNoneOption
                      />
                    </div>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="department_head_id">Department Head</Label>
                <Controller
                  name="department_head_id"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <CustomSelect
                        {...field}
                        options={dropDown?.users || []}
                        placeholder="-- Select Department Head --"
                        defaultValue={
                          dropDown?.users?.find((r) => r.id == field.value) ||
                          null
                        }
                        onChange={(option) =>
                          field.onChange(option?.id.toString())
                        }
                        showNoneOption
                      />
                    </div>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="description">
                  Description
                  {errors.description && (
                    <span className="text-sm text-destructive mt-1 font-normal">
                      {errors.description.message}
                    </span>
                  )}
                </Label>
                <Textarea
                  className="bg-white"
                  {...register("description")}
                  id="description"
                  placeholder="Enter Department Name"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  variant="outline"
                  type="button"
                  className="bg-white w-[140px] h-[44px]"
                  onClick={() => {
                    reset(resetFeilds);
                    setIsOpen(false);
                    setEditId(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={loading2}
                  className="bg-primary w-[140px] h-[44px]"
                  type="submit"
                >
                  {loading2 && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editId ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Card className="shadow-none rounded-none border-none">
        {loading ? (
          <div className="p-8">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full mb-4" />
            ))}
          </div>
        ) : departments.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No departments found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Department Head</TableHead>

                {/* <TableHead className="text-center">Action</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept, index) => (
                <TableRow key={dept.id}>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center justify-center rounded p-1">
                        <Settings className="w-4 h-4 text-gray-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem
                          onClick={() => {
                            setIsOpen(true);
                            setEditId(dept.id);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setShowDelete(true);
                            setDelId(dept.id);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  {/* <TableCell>
                  </TableCell> */}
                  <TableCell>{dept.name || "-"}</TableCell>
                  <TableCell>{dept.description || "-"}</TableCell>
                  <TableCell>
                    {dept?.departmentHead
                      ? `${dept?.departmentHead?.firstname} ${dept?.departmentHead?.lastname}`
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <Select
              defaultValue={itemsPerPage}
              onValueChange={(value) => {
                setItemsPerPage(value);
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
          {/* <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        &lt;
                      </Button>
                      <Button size="sm" className="bg-primary">
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        2
                      </Button>
                      <Button variant="outline" size="sm">
                        3
                      </Button>
                      <Button variant="outline" size="sm">
                        4
                      </Button>
                      <Button variant="outline" size="sm">
                        &gt;
                      </Button>
                    </div> */}
          <div>
            {/* your table data */}
            <MuiStylePagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Delete Dialog */}
        <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
          <AlertDialogContent className="rounded-xl py-2 px-0 bg-white">
            <AlertDialogHeader className="border-b">
              <AlertDialogTitle className="text-red-600 px-3">
                Delete
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription className="px-3">
              Do you want to delete the Department?
            </AlertDialogDescription>

            {/* {serverError && (
                            <p className="text-red-500 text-sm px-3 mt-1">{serverError}</p>
                          )} */}

            <AlertDialogFooter className="px-3 mb-2">
              <AlertDialogCancel className="rounded-full px-6">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 text-white rounded-full px-6 hover:bg-red-700 transition"
                disabled={loading3}
              >
                {loading3 && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </div>
  );
};

export default Department;
