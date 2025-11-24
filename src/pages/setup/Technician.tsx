import { MainLayout } from "@/components/Layout/MainLayout";
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
import { Loader2, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import clearIcon from "@/assets/svg-icons/clear-icon.svg";

import { Search } from "lucide-react";

import searchIcons from "@/assets/svg-icons/search-icons.svg";
import plusIcon from "@/assets/svg-icons/plus-icon.svg";
import { ticketService } from "@/services/ticketService";
import { toast } from "@/hooks/use-toast";
import { DropdownData } from "@/types/ticket";
import { Skeleton } from "@/components/ui/skeleton";
import { MuiStylePagination } from "@/components/common/MuiStylePagination";
import { technicianFormSchema, TechnicianFormSchema } from "@/lib/validation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomSelect from "@/components/CustomSelect";

const resetFeilds = {
  firstname: "",
  lastname: "",
  employee_id: "",
  email: "",
  phonenumber: "",
  mobile: "",
  site_id: "",
  department_id: "",
  associated_sites: "",
  associated_departments: "",
  job_title: "",
  reporting_manager_id: "",
  description: "",
  cost_per_hour: "",
};

const Technician = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropDown] = useState<DropdownData | null>(null);
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [siteFilter, setSiteFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("5");
  const [totalPages, setTotalPages] = useState(1);

  const [showDelete, setShowDelete] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [delId, setDelId] = useState(null);
  const [editId, setEditId] = useState(null);

  const {
    register,
    handleSubmit,
    // setValue,
    // watch,
    reset,
    // setValue,
    control,
    // getValues,
    formState: { errors },
    // } = useForm({
  } = useForm<TechnicianFormSchema>({
    resolver: zodResolver(technicianFormSchema),
    defaultValues: {
      site_id: "",
      department_id: "",
      associated_sites: "",
      reporting_manager_id: "",
      associated_departments: "",
    },
  });

  useEffect(() => {
    loadDropdownData();
  }, []);

  const loadDropdownData = async () => {
    try {
      const [dropDownData] = await Promise.all([ticketService.getDropdown("")]);
      setDropDown(dropDownData?.data);
    } catch (error) {
      console.log("error loading dropdown data", error);
    }
  };

  useEffect(() => {
    Technician();
  }, [searchTerm, siteFilter, departmentFilter, itemsPerPage, currentPage]);

  const Technician = async () => {
    setLoading2(true);
    try {
      const params: any = {};
      if (searchTerm) params.search = searchTerm;
      if (siteFilter !== "all") params.site_id = siteFilter;
      if (departmentFilter !== "all") params.department_id = departmentFilter;

      if (currentPage) params.page = currentPage;
      if (itemsPerPage) params.limit = itemsPerPage;

      const response = await ticketService.getTechnician(params);
      if (response?.success) {
        console.log(response, "response--->>>>");
        setTickets(response.data.technicians || []);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to load requester",
      //   variant: "destructive",
      // });
      setTickets([]);
      setTotalPages(1);
    } finally {
      setLoading2(false);
    }
  };

  const onSubmit = async (data: TechnicianFormSchema) => {
    setLoading(true);
    try {
      const formData: any = {
        ...data,
        company_id: "1",
      };

      if (editId) {
        const res = await ticketService.updateTechnician(editId, formData);
        if (res?.success) {
          setIsOpen(false);
          Technician();
          setEditId(null);
          toast({
            title: "Success",
            description: "Requester updated successfully",
          });
        }
      } else {
        const res = await ticketService.createTechnician(formData);
        if (res?.success) {
          setIsOpen(false);
          Technician();
          toast({
            title: "Success",
            description: "Technician created successfully",
          });
        }
      }
    } catch (error) {
      console.log("error--->>", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editId) {
      loadTechnicianData(editId);
    }
  }, [editId]);

  const loadTechnicianData = async (techId) => {
    try {
      const res = await ticketService.getSingleTechnician(techId);
      if (res?.success) {
        const technician = res.data;
        reset({
          firstname: technician.firstname || "",
          lastname: technician.lastname || "",
          employee_id: technician.employee_id || "",
          email: technician.email || "",
          phonenumber: technician.phonenumber || "",
          mobile: technician.mobile || "",
          site_id: technician.site_id ? String(technician.site_id) : "",
          department_id: technician.department_id
            ? String(technician.department_id)
            : "",
          associated_sites: technician.associated_sites
            ? String(technician.associated_sites)
            : "",
          associated_departments: technician.associated_departments
            ? String(technician.associated_departments)
            : "",
          job_title: technician.job_title ? String(technician.job_title) : "",
          reporting_manager_id: technician.reporting_manager_id
            ? String(technician.reporting_manager_id)
            : "",
          description: technician.description || "",
          cost_per_hour: technician.cost_per_hour || "",
        });
      }
    } catch (error) {
      console.log("error loading requester data", error);
    }
  };

  const handleDelete = async () => {
    setLoading3(true);
    try {
      const response = await ticketService.deleteTechnician(delId);
      if (response?.success) {
        Technician();
        setShowDelete(false);
        setDelId(null);
        toast({
          title: "Success",
          description: "Technician deleted successfully",
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
          Technician
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

          <div className="relative flex-1 min-w-[190px] lg:flex-none lg:w-[125px]">
            <CustomSelect
              options={dropDown?.departments || []}
              placeholder="-- Select Department --"
              defaultValue={
                dropDown?.departments?.find((r) => r.id == departmentFilter) ||
                null
              }
              onChange={(option) => setDepartmentFilter(option?.id.toString())}
              showNoneOption
            />
          </div>

          <div className="relative flex-1 min-w-[190px] lg:flex-none lg:w-[125px]">
            <CustomSelect
              options={dropDown?.sites || []}
              placeholder="-- Select Site --"
              defaultValue={
                dropDown?.sites?.find((r) => r.id == siteFilter) || null
              }
              onChange={(option) => setSiteFilter(option?.id.toString())}
              showNoneOption
            />
          </div>
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="px-[10px] my-[10px] py-[3px] font-normal text-[12px] rounded-sm hover:bg-[#ececec] border bg-white text-[#333333] h-auto">
            Add Technician
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] bg-white">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit" : "Add"} Technician</DialogTitle>
          </DialogHeader>
          <form
            // onSubmit={handleSubmit(onSubmit)}
            onSubmit={(e) => {
              e.stopPropagation(); // prevents parent form submission
              handleSubmit(onSubmit)(e); // call react-hook-form submit
            }}
          >
            <div className="space-y-4 pt-4 max-h-[70vh] overflow-y-auto p-1 border-t">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">
                    First Name *
                    {errors.firstname && (
                      <span className="text-sm text-destructive mt-1 font-normal">
                        {errors.firstname.message}
                      </span>
                    )}
                  </Label>
                  <Input
                    {...register("firstname")}
                    id="firstName"
                    placeholder="Enter First Name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastname">
                    Last Name
                    {errors.lastname && (
                      <span className="text-sm text-destructive mt-1 font-normal">
                        {errors.lastname.message}
                      </span>
                    )}
                  </Label>
                  <Input
                    {...register("lastname")}
                    id="lastname"
                    placeholder="Enter Last Name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employee_id">
                    Employee ID
                    {errors.employee_id && (
                      <span className="text-sm text-destructive mt-1 font-normal">
                        {errors.employee_id.message}
                      </span>
                    )}
                  </Label>
                  <Input
                    {...register("employee_id")}
                    id="employee_id"
                    placeholder="Enter Employee ID"
                  />
                </div>
                <div>
                  <Label htmlFor="email">
                    Email *
                    {errors.email && (
                      <span className="text-sm text-destructive mt-1 font-normal">
                        &nbsp;{errors.email.message}
                      </span>
                    )}
                  </Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="Enter Email"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phonenumber">Phone</Label>
                  <Input
                    {...register("phonenumber")}
                    id="phonenumber"
                    placeholder="Enter Phone"
                    type="tel"
                  />
                </div>

                <div>
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    {...register("mobile")}
                    id="mobile"
                    placeholder="Enter Mobile"
                    type="tel"
                  />
                </div>
                {/* <div>
                  <Label htmlFor="company">Company*</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="company1">Company 1</SelectItem>
                      <SelectItem value="company2">Company 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="site_id">Site</Label>
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
                  <Label htmlFor="department_id">Department</Label>
                  <Controller
                    name="department_id"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <CustomSelect
                          {...field}
                          options={dropDown?.departments || []}
                          placeholder="-- Select Department --"
                          defaultValue={
                            dropDown?.departments?.find(
                              (r) => r.id == field.value
                            ) || null
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="associated_sites">Sites Association</Label>
                  <Controller
                    name="associated_sites"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <CustomSelect
                          {...field}
                          options={dropDown?.sites || []}
                          placeholder="-- Select Associate Sites --"
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
                  <Label htmlFor="associated_departments">
                    Department Association
                  </Label>
                  <Controller
                    name="associated_departments"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <CustomSelect
                          {...field}
                          options={dropDown?.departments || []}
                          placeholder="-- Select Associate Department --"
                          defaultValue={
                            dropDown?.departments?.find(
                              (r) => r.id == field.value
                            ) || null
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="job_title">Job Title</Label>
                  <Input
                    {...register("job_title")}
                    id="job_title"
                    placeholder="Enter Job Title"
                  />
                </div>
                <div>
                  <Label htmlFor="reporting_manager_id">
                    Reporting Manager
                  </Label>
                  <Controller
                    name="reporting_manager_id"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <CustomSelect
                          {...field}
                          options={dropDown?.users || []}
                          placeholder="-- Select Reporting Manager --"
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    {...register("description")}
                    id="description"
                    placeholder="Enter Description"
                  />
                </div>
                <div className="">
                  <Label htmlFor="cost_per_hour">Cost Per Hour</Label>
                  <Input
                    {...register("cost_per_hour")}
                    id="cost_per_hour"
                    placeholder="Enter cost"
                    type="number"
                  />
                  {/* <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Site" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="site1">Head Office</SelectItem>
                    <SelectItem value="site2">Branch A</SelectItem>
                  </SelectContent>
                </Select> */}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-4 pt-4 border-t">
              <Button
                variant="outline"
                type="button"
                className="bg-white w-[140px] h-[44px]"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-primary w-[140px] h-[44px]"
                // onClick={() => {
                //   setIsOpen(false);
                // }}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editId ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Card className="shadow-none rounded-none border-none">
        {loading2 ? (
          <div className="p-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full mb-4" />
            ))}
          </div>
        ) : tickets.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No technician found</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Site</TableHead>
                  {/* <TableHead className="text-center">Action</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets?.map((technician, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center justify-center rounded p-1">
                          <Settings className="w-4 h-4 text-gray-500" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem
                            onClick={() => {
                              setIsOpen(true);
                              setEditId(technician.id);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setShowDelete(true);
                              setDelId(technician.id);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>
                      {technician?.firstname} {technician?.lastname}
                    </TableCell>
                    <TableCell>{technician?.email}</TableCell>
                    <TableCell>{technician?.department}</TableCell>
                    <TableCell>{technician?.group}</TableCell>
                    <TableCell>{technician?.site}</TableCell>
                    {/* <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center justify-center gap-2 hover:bg-gray-100 rounded p-1 w-full">
                          <MoreVertical className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setShowDelete(true);
                              setDelId(technician.id);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Delete Dialog */}
            <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
              <AlertDialogContent className="rounded-xl py-2 px-0 bg-white">
                <AlertDialogHeader className="border-b">
                  <AlertDialogTitle className="text-red-600 px-3">
                    Delete
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className="px-3">
                  Do you want to delete the Technician?
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
                    {loading3 && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}

        <div className="flex items-center justify-between mt-6">
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
          <div>
            {/* your table data */}
            <MuiStylePagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Technician;
