import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// import { ChevronLeft, ChevronRight, Plus, HelpCircle } from "lucide-react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { useNavigate } from "react-router-dom";
// import plusIcon from "@/assets/svg-icons/plus-icon.svg";
import searchIcons from "@/assets/svg-icons/search-icons.svg";
import clearIcon from "@/assets/svg-icons/clear-icon.svg";
import reqEditIcon from "@/assets/svg-icons/req-edit-icon.svg";
import reqworkIcon from "@/assets/svg-icons/req-work-icon.svg";
import { format } from "date-fns";
import ticketIconNew from "@/assets/svg-icons/ticket-icon-new.svg";
import flagIconNew from "@/assets/svg-icons/flag.svg";

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
import CustomSelect from "@/components/CustomSelect";
import { ticketService } from "@/services/ticketService";
import { toast } from "@/hooks/use-toast";
import { useTableSelection } from "@/hooks/useTableSelection";

// -----------------------------------
import { Skeleton } from "@/components/ui/skeleton";
import { MuiStylePagination } from "@/components/common/MuiStylePagination";
import { DropdownData } from "@/types/ticket";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { closeFormSchema, CloseFormSchema } from "@/lib/validation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Trash2, Plus, Edit, Search, Filter, LogOut, User } from "lucide-react";
// import { TicketForm } from "@/components/tickets/TicketForm";

// const statusColors = {
//   open: "default",
//   "in-progress": "secondary",
//   closed: "outline",
// } as const;

// const priorityColors = {
//   low: "outline",
//   medium: "secondary",
//   high: "destructive",
// } as const;

// const assets = [
//   {
//     id: 1,
//     subject: "Laptop not booting",
//     requester: "Ali Raza",
//     technician: "Bilal Ahmed",
//     group: "IT Support",
//     status: "Open",
//     dueBy: "2025-10-28",
//     createdAt: "2025-10-20",
//   },
//   {
//     id: 2,
//     subject: "Printer not responding",
//     requester: "Sara Khan",
//     technician: "Hassan Malik",
//     group: "Hardware Team",
//     status: "In Progress",
//     dueBy: "2025-10-26",
//     createdAt: "2025-10-19",
//   },
//   {
//     id: 3,
//     subject: "Email access issue",
//     requester: "Usman Tariq",
//     technician: "Zeeshan Ali",
//     group: "Network Team",
//     status: "Resolved",
//     dueBy: "2025-10-22",
//     createdAt: "2025-10-18",
//   },
//   {
//     id: 4,
//     subject: "Monitor flickering issue",
//     requester: "Fatima Noor",
//     technician: "Imran Saeed",
//     group: "IT Support",
//     status: "Pending",
//     dueBy: "2025-10-29",
//     createdAt: "2025-10-21",
//   },
//   {
//     id: 5,
//     subject: "Software installation request",
//     requester: "Ahmed Khan",
//     technician: "Asad Iqbal",
//     group: "Application Team",
//     status: "Closed",
//     dueBy: "2025-10-24",
//     createdAt: "2025-10-17",
//   },
// ];

// const requestsData = [
//   {
//     id: "6",
//     createdAt: "25-11-2021 at 12:29 PM",
//     requestor: "Smith",
//     category: "Firewall",
//     subject: "Request for checking",
//     priority: "Critical" as const,
//     status: "Unassigned" as const,
//   },
//   {
//     id: "5",
//     createdAt: "24-11-2021 at 11:58 PM",
//     requestor: "Smith",
//     category: "Firewall",
//     subject: "Request for checking",
//     priority: "Critical" as const,
//     status: "Unassigned" as const,
//   },
//   {
//     id: "4",
//     createdAt: "24-11-2021 at 11:38 PM",
//     requestor: "Smith",
//     category: "Firewall",
//     subject: "Request for checking",
//     priority: "Critical" as const,
//     status: "Unassigned" as const,
//   },
//   {
//     id: "3",
//     createdAt: "24-11-2021 at 10:38 PM",
//     requestor: "Smith",
//     category: "Firewall",
//     subject: "Request for checking",
//     priority: "Critical" as const,
//     status: "Unassigned" as const,
//   },
//   {
//     id: "2",
//     createdAt: "24-11-2021 at 07:38 PM",
//     requestor: "Smith",
//     category: "Firewall",
//     subject: "Request for checking",
//     priority: "Critical" as const,
//     status: "Unassigned" as const,
//   },
//   {
//     id: "1",
//     createdAt: "24-11-2021 at 06:38 PM",
//     requestor: "Smith",
//     category: "Firewall",
//     subject: "Request for checking",
//     priority: "Low" as const,
//     status: "Assigned" as const,
//   },
//   {
//     id: "0",
//     createdAt: "23-11-2021 at 05:38 PM",
//     requestor: "Smith",
//     category: "Network",
//     subject: "Network configuration completed",
//     priority: "Medium" as const,
//     status: "Completed" as const,
//   },
// ];

// const requestsData = [
//   // 🔴 Critical + Unassigned
//   {
//     assign: "James",
//     completion: "20",
//     id: "30",
//     createdAt: "14-10-2025 at 10:22 AM",
//     requestor: "Alice Johnson",
//     category: "Firewall",
//     subject: "Unblock port 443 for web access",
//     priority: "Critical" as const,
//     status: "Unassigned" as const,
//   },
//   {
//     assign: "James",
//     completion: "20",
//     id: "29",
//     createdAt: "14-10-2025 at 09:58 AM",
//     requestor: "Robert King",
//     category: "Network",
//     subject: "Major outage in branch router",
//     priority: "Critical" as const,
//     status: "Unassigned" as const,
//   },
//   {
//     assign: "James",
//     completion: "20",
//     id: "28",
//     createdAt: "13-10-2025 at 07:11 PM",
//     requestor: "Sophia Patel",
//     category: "Database",
//     subject: "Production DB not responding",
//     priority: "Critical" as const,
//     status: "Unassigned" as const,
//   },
//   {
//     assign: "James",
//     completion: "20",
//     id: "27",
//     createdAt: "13-10-2025 at 06:45 PM",
//     requestor: "Liam Carter",
//     category: "Server",
//     subject: "Critical CPU overload on node-5",
//     priority: "Critical" as const,
//     status: "Unassigned" as const,
//   },
//   {
//     assign: "James",
//     completion: "20",
//     id: "26",
//     createdAt: "13-10-2025 at 05:28 PM",
//     requestor: "Isabella Brown",
//     category: "Firewall",
//     subject: "Multiple failed login attempts",
//     priority: "Critical" as const,
//     status: "Unassigned" as const,
//   },
//   {
//     assign: "James",
//     completion: "20",
//     id: "25",
//     createdAt: "13-10-2025 at 03:19 PM",
//     requestor: "James Parker",
//     category: "Security",
//     subject: "Malware detected on gateway",
//     priority: "Critical" as const,
//     status: "Unassigned" as const,
//   },

//   // 🟠 High + Assigned
//   {
//     assign: "James",
//     completion: "20",
//     id: "24",
//     createdAt: "13-10-2025 at 11:10 AM",
//     requestor: "Olivia Wilson",
//     category: "Network",
//     subject: "Slow VPN connectivity for remote staff",
//     priority: "High" as const,
//     status: "Assigned" as const,
//   },
//   {
//     assign: "James",
//     completion: "20",
//     id: "23",
//     createdAt: "12-10-2025 at 09:32 PM",
//     requestor: "Ethan Miller",
//     category: "Firewall",
//     subject: "Access rule request for external vendor",
//     priority: "High" as const,
//     status: "Assigned" as const,
//   },
//   {
//     assign: "James",
//     completion: "20",
//     id: "22",
//     createdAt: "12-10-2025 at 08:59 PM",
//     requestor: "Charlotte Evans",
//     category: "Email",
//     subject: "Spam filtering not working properly",
//     priority: "High" as const,
//     status: "Assigned" as const,
//   },
//   {
//     assign: "James",
//     completion: "20",
//     id: "21",
//     createdAt: "12-10-2025 at 05:18 PM",
//     requestor: "Daniel White",
//     category: "Network",
//     subject: "DNS resolving delay on main server",
//     priority: "High" as const,
//     status: "Assigned" as const,
//   },
//   {
//     assign: "James",
//     completion: "20",
//     id: "20",
//     createdAt: "12-10-2025 at 03:25 PM",
//     requestor: "Mia Green",
//     category: "Server",
//     subject: "SSL certificate renewal pending",
//     priority: "High" as const,
//     status: "Assigned" as const,
//   },
//   {
//     assign: "James",
//     completion: "20",
//     id: "19",
//     createdAt: "12-10-2025 at 02:18 PM",
//     requestor: "Lucas Scott",
//     category: "Security",
//     subject: "New user access review required",
//     priority: "High" as const,
//     status: "Assigned" as const,
//   },

//   // 🟡 Medium + In Progress
//   {
//     assign: "James",
//     completion: "20",
//     id: "18",
//     createdAt: "11-10-2025 at 11:43 AM",
//     requestor: "Ella Adams",
//     category: "Email",
//     subject: "Mailbox quota upgrade requested",
//     priority: "Medium" as const,
//     status: "In Progress" as const,
//   },
//   {
//     assign: "James",
//     completion: "20",
//     id: "17",
//     createdAt: "11-10-2025 at 09:18 AM",
//     requestor: "Henry Turner",
//     category: "Database",
//     subject: "Scheduled backup validation",
//     priority: "Medium" as const,
//     status: "In Progress" as const,
//   },
//   {
//     assign: "James",
//     completion: "20",
//     id: "16",
//     createdAt: "10-10-2025 at 08:55 PM",
//     requestor: "Ava Martinez",
//     category: "Network",
//     subject: "LAN cabling inspection ongoing",
//     priority: "Medium" as const,
//     status: "In Progress" as const,
//   },
//   {
//     assign: "James",
//     completion: "20",
//     id: "15",
//     createdAt: "10-10-2025 at 07:21 PM",
//     requestor: "Noah Walker",
//     category: "Firewall",
//     subject: "Reviewing inactive access rules",
//     priority: "Medium" as const,
//     status: "In Progress" as const,
//   },
//   {
//     assign: "James",
//     completion: "20",
//     id: "14",
//     createdAt: "10-10-2025 at 04:49 PM",
//     requestor: "Grace Lewis",
//     category: "Hardware",
//     subject: "Replacing faulty switch unit",
//     priority: "Medium" as const,
//     status: "In Progress" as const,
//   },
//   {
//     assign: "James",
//     completion: "20",
//     id: "13",
//     createdAt: "09-10-2025 at 11:15 AM",
//     requestor: "Jacob Brooks",
//     category: "Server",
//     subject: "Disk cleanup and optimization",
//     priority: "Medium" as const,
//     status: "In Progress" as const,
//   },

//   // 🟢 Low + Completed
//   {
//     assign: "James",
//     completion: "100",
//     id: "12",
//     createdAt: "09-10-2025 at 09:42 AM",
//     requestor: "Zoe Harris",
//     category: "Network",
//     subject: "Routine patch update applied",
//     priority: "Low" as const,
//     status: "Completed" as const,
//   },
//   {
//     assign: "James",
//     completion: "100",
//     id: "11",
//     createdAt: "09-10-2025 at 08:38 AM",
//     requestor: "William Thompson",
//     category: "Hardware",
//     subject: "Printer setup completed in Room 302",
//     priority: "Low" as const,
//     status: "Completed" as const,
//   },
//   {
//     assign: "James",
//     completion: "100",
//     id: "10",
//     createdAt: "08-10-2025 at 04:17 PM",
//     requestor: "Amelia Hall",
//     category: "Software",
//     subject: "Installed VPN client update",
//     priority: "Low" as const,
//     status: "Completed" as const,
//   },
//   {
//     assign: "James",
//     completion: "100",
//     id: "9",
//     createdAt: "08-10-2025 at 02:58 PM",
//     requestor: "Matthew Young",
//     category: "Email",
//     subject: "Configured auto-archive for HR mailbox",
//     priority: "Low" as const,
//     status: "Completed" as const,
//   },
//   {
//     assign: "James",
//     completion: "100",
//     id: "8",
//     createdAt: "08-10-2025 at 11:45 AM",
//     requestor: "Lily Morgan",
//     category: "Network",
//     subject: "Network printer successfully tested",
//     priority: "Low" as const,
//     status: "Completed" as const,
//   },
//   {
//     assign: "James",
//     completion: "100",
//     id: "7",
//     createdAt: "07-10-2025 at 10:09 AM",
//     requestor: "Benjamin Reed",
//     category: "Hardware",
//     subject: "Desktop memory upgraded",
//     priority: "Low" as const,
//     status: "Completed" as const,
//   },
// ];

const Requests = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("5");
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(1);

  // Filter requests based on active tab
  // const filteredRequests = requestsData.filter((req) => {
  //   if (activeTab === "unassigned") return req.status === "Unassigned";
  //   if (activeTab === "assigned") return req.status === "Assigned";
  //   if (activeTab === "completed") return req.status === "Completed";
  //   return true;
  // });

  // const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentItems = filteredRequests.slice(startIndex, endIndex);

  // /////////////////////////////////

  // const { user, logout } = useAuth();

  const dateArr = [
    { name: "Last 24 hours", id: "last_24_hours" },
    { name: "This week", id: "this_week" },
    { name: "Last week", id: "last_week" },
    { name: "Last 30 days", id: "last_30_days" },
    { name: "Last 90 days", id: "last_90_days" },
    { name: "This month", id: "this_month" },
    { name: "This quarter", id: "this_quarter" },
    { name: "Last quarter", id: "last_quarter" },
    { name: "This year", id: "this_year" },
    { name: "Last year", id: "last_year" },
    { name: "All data", id: "all_data" },
  ];
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [requesterFilter, setRequesterFilter] = useState<string>("all");
  const [technicianFilter, setTechnicianFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("this_year");
  console.log(requesterFilter, "requesterFilterrequesterFilter");
  // const [showForm, setShowForm] = useState(false);
  // const [editingTicket, setEditingTicket] = useState<Ticket | undefined>();
  // const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const {
    // isAllSelected,
    // isSomeSelected,
    // isSelected,
    // toggleAll,
    // toggleItem,
    // selectedItems,
    // clearSelection,
  } = useTableSelection({
    items: tickets,
    getItemId: (ticket) => ticket.id,
  });
  const [dropDown, setDropDown] = useState<DropdownData | null>(null);

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
      toast({
        title: "Error",
        description: "Failed to load form data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadTickets();
  }, [
    searchTerm,
    technicianFilter,
    requesterFilter,
    statusFilter,
    priorityFilter,
    itemsPerPage,
    currentPage,
    dateFilter,
  ]);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (searchTerm) params.search = searchTerm;
      if (statusFilter !== "all") params.status_id = statusFilter;
      if (priorityFilter !== "all") params.priority = priorityFilter;
      if (requesterFilter !== "all") params.requested_by = requesterFilter;
      if (technicianFilter !== "all") params.assigned_to = technicianFilter;
      if (dateFilter) params.date_filter = dateFilter;

      if (currentPage) params.page = currentPage;
      if (itemsPerPage) params.limit = itemsPerPage;

      const response = await ticketService.getTickets(params);
      if (response?.success) {
        console.log(response, "response--->>>>");
        setTickets(response.data.tickets);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load tickets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async (id: string) => {
  //   try {
  //     await ticketService.deleteTicket(id);
  //     toast({ title: "Success", description: "Ticket deleted successfully" });
  //     loadTickets();
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to delete ticket",
  //       variant: "destructive",
  //     });
  //   }
  //   setDeleteConfirm(null);
  // };

  // const handleBulkDelete = async () => {
  //   try {
  //     await ticketService.deleteTickets(selectedItems.map((t) => t.id));
  //     toast({ title: "Success", description: `${selectedItems.length} tickets deleted` });
  //     clearSelection();
  //     loadTickets();
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to delete tickets",
  //       variant: "destructive",
  //     });
  //   }
  // };

  // const handleFormSuccess = () => {
  //   setShowForm(false);
  //   setEditingTicket(undefined);
  //   loadTickets();
  // };

  // const handleEdit = (ticket: Ticket) => {
  //   setEditingTicket(ticket);
  //   setShowForm(true);
  // };

  // const statusColors = {
  //   open: "default",
  //   "in-progress": "secondary",
  //   pending: "outline",
  //   closed: "outline",
  //   cancelled: "destructive",
  // } as const;

  // const priorityColors = {
  //   low: "outline",
  //   medium: "secondary",
  //   high: "destructive",
  //   urgent: "destructive",
  // } as const;

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === tickets.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tickets.map((t) => t.id));
    }
  };

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors },
    // } = useForm({
  } = useForm<CloseFormSchema>({
    resolver: zodResolver(closeFormSchema),
    defaultValues: {
      is_requester_acknowledged: "false",
      closure_code_id: "",
      // department_id: "",
      // role_id: "",
      // reporting_manager_id: "",
      // allowed_to_view: "1",
    },
  });

  console.log(errors, "errors", getValues());

  const [closeLoading, setCloseLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const onSubmit = async (data: CloseFormSchema) => {
    setCloseLoading(true);
    try {
      const formData: any = {
        ...data,
        request_ids: selectedRows,
        status_id: "7", // Closed status id
      };
      console.log(formData, "formDataformData");
      // if (editId) {
      //   const res = await ticketService.updateRequester(editId, formData);
      //   if (res?.success) {
      //     reset();
      //     setIsOpen(false);
      //     // Requester();
      //     // setEditId(null);
      //     toast({
      //       title: "Success",
      //       description: "Requester updated successfully",
      //     });
      //   }
      // } else {
      const res = await ticketService.closeTickets(formData);
      if (res?.success) {
        reset();
        setIsOpen(false);
        loadTickets();
        setSelectedRows([]);
        toast({
          title: "Success",
          description: "Request closed successfully",
        });
      }
      // }

      // if (id) {
      //   const res = await ticketService.updateTicket(id, formData);
      //   console.log("updating ticket...", res, res);
      //   if (res?.success) {
      //     // toast({
      //     //   title: "Success",
      //     //   description: "Ticket created successfully",
      //     // });
      //      navigate("/requests")
      //     toast({ title: "Success", description: "Ticket updated successfully" });
      //   }
      // } else {
      //   const res = await ticketService.createTicket(formData);
      //   if (res?.success) {
      //     navigate("/requests")
      //     toast({
      //       title: "Success",
      //       description: "Ticket created successfully",
      //     });
      //   }
      // }
      // onSuccess();
    } catch (error) {
      console.log(error, "error");
    } finally {
      setCloseLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    const formData: any = {
      request_ids: selectedRows,
    };
    console.log(formData, "formDataformData");
    try {
      const response = await ticketService.deleteTickets(formData);
      console.log(response, "responsedel");
      if (response?.success) {
        setShowDelete(false);
        // setDelId(null);
        loadTickets();
        setSelectedRows([]);
        toast({
          title: "Success",
          description: "Requests deleted successfully",
        });
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setDeleteLoading(false);
    }
  };


  const assignTickests = async (e) => {
    console.log(e, "eventevent");
    setLoading(true);
    const formData: any = {
      request_ids: selectedRows,
      "assigned_to": e?.id
    };
    console.log(formData, "formDataformData");
    try {
      const response = await ticketService.assignTicket(formData);
      console.log(response, "responsedel");
      if (response?.success) {
        // setShowDelete(false);
        // setDelId(null);
        loadTickets();
        setSelectedRows([]);
        toast({
          title: "Success",
          description: "Requests assigned successfully",
        });
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <MainLayout title="Requests">
      <div className="h-full bg-white">
        {/* <AppHeader title="Requests" onBack={() => window.history.back()} /> */}

        {/* <main className="max-w-7xl mx-auto p-6"> */}
        {/* Header with Request List and Add Request button */}
        {/* <div className="flex items-center justify-between mb-4 ">
            <h2 className="text-xl font-semibold text-foreground">
              Request List
            </h2>
            <Button onClick={()=>{navigate("/add-ticket")}} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Add Request
                <span className="h-[18px] w-[18px] mr-2 rounded-full bg-white text-primary flex items-center justify-center">
                    <img alt="plusIcon" src={plusIcon}/>
                </span>
            </Button>
          </div> */}
        {/* Header */}
        <div className="bg-white px-[24px] py-[15px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-center">
          {/* <h2 className="text-xl font-semibold text-foreground flex-shrink-0">
            Request List
          </h2> */}

          {/* Filter Section */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[125px] lg:flex-none lg:w-[125px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search By"
                className="pl-9 bg-white py-[8px] rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select
              defaultValue={requesterFilter}
              onValueChange={(value) => {
                setRequesterFilter(value);
              }}
            >
              <SelectTrigger className="w-[125px] bg-white">
                <SelectValue placeholder="Requester" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">Requesters</SelectItem>
                {dropDown?.requesters?.map((item) => {
                  return <SelectItem value={item?.id}>{item?.name}</SelectItem>;
                })}
              </SelectContent>
            </Select>

            <Select
              defaultValue={technicianFilter}
              onValueChange={(value) => {
                setTechnicianFilter(value);
              }}
            >
              <SelectTrigger className="w-[125px] bg-white">
                <SelectValue placeholder="Technician" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">Technician</SelectItem>
                {dropDown?.technicians?.map((item) => {
                  return <SelectItem value={item?.id}>{item?.name}</SelectItem>;
                })}
              </SelectContent>
            </Select>

            {/* <Select>
              <SelectTrigger className="w-[125px] bg-white">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select> */}

            <Select
              defaultValue={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
              }}
            >
              <SelectTrigger className="w-[125px] bg-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">Status</SelectItem>
                {dropDown?.statuses?.map((item) => {
                  return <SelectItem value={item?.id}>{item?.name}</SelectItem>;
                })}
                {/* <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="pending-verification">
                  Pending Verification
                </SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="staging">Staging</SelectItem> */}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              className="bg-[#DEDEDE] hover:bg-[#DEDEDE]/90 rounded-none"
            >
              <img alt="clearIcon" src={clearIcon} />
            </Button>

            <Button
              variant="default"
              size="icon"
              className="bg-primary hover:bg-primary/90 rounded-none "
            >
              <img alt="searchIcons" src={searchIcons} />
            </Button>
          </div>
          {/* <Button
            onClick={() => {
              navigate("/add-ticket");
            }}
            className="w-[160px] rounded-none bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Add Request
            <span className="h-[18px] w-[18px] mr-2 rounded-full bg-white text-primary flex items-center justify-center">
              <img alt="plusIcon" src={plusIcon} />
            </span>
          </Button> */}
        </div>
        {/* Filters */}
        {/* <RequestFilters /> */}

        {/* Tabs */}

        <div
          // value={activeTab}
          // onValueChange={setActiveTab}
          className="bg-white px-[24px] pb-[15px] mt-0"
        >
          <div className="bg-white py-[5px] flex  gap-4  lg:items-center lg:justify-between">
            <h2 className="text-[18px] text-foreground flex-shrink-0">
              All Requests
            </h2>

            {/* Filter Section */}
            <div className="flex flex-wrap items-center gap-2">
              <CustomSelect
                // defaultValue={{ name: "Last 24 hours", id: "last_24_hours" }}
                showNoneOption={false}
                defaultValue={dateArr?.find((r) => r.id == dateFilter) || null}
                // defaultValue={dateFilter}
                onChange={(option) => setDateFilter(option?.id.toString())}
                options={dateArr || []}
                className="px-[10px] py-[5px] text-[12px] text-[#344256] rounded-[3px]"
                dropdownClassName="right-0"
              />
            </div>
          </div>
          <div className="flex flex-wrap pb-[10px] items-center gap-3 border-b">
            <div
              onClick={() => {
                navigate("/add-ticket");
              }}
              className="relative px-[10px] py-[5px] rounded-[3px] cursor-pointer border font-normal flex items-center justify-center  text-[#344256] text-[12px]"
            >
              Add Request
            </div>
            <div className="relative px-[10px] py-[5px] rounded-[3px] cursor-pointer border font-normal flex items-center justify-center  text-[#344256] text-[12px]">
              Edit
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              {/* <DialogTrigger asChild> */}
              <Button
                onClick={() => {
                  if (selectedRows.length == 0) {
                    setIsAlert(true);
                    return;
                  }
                  setIsOpen(true);
                }}
                className="px-[10px] py-[5px] font-normal text-[12px] rounded-sm hover:bg-[#ececec] border bg-white text-[#333333] h-auto"
              >
                Close
              </Button>
              {/* </DialogTrigger> */}

              <DialogContent className="sm:max-w-[800px] bg-white p-0">
                <DialogHeader className=" border-b p-4 text-[18px]">
                  <DialogTitle className="font-normal">
                    Close Request
                  </DialogTitle>
                </DialogHeader>

                <div className="font-semibold text-[16px] mb-2 px-4 border-b pb-2">
                  Closure Info
                </div>

                <form
                  onSubmit={(e) => {
                    e.stopPropagation();
                    handleSubmit(onSubmit)(e);
                  }}
                  className="space-y-3 px-8 pb-2"
                >
                  {/* ---------- FORM ROWS START ---------- */}

                  {/* Is FCR */}
                  <div className="grid grid-cols-[220px_1fr] items-center gap-3">
                    <Label className="font-normal text-[14px]">Is FCR</Label>
                    <Input
                      type="checkbox"
                      className="w-4 h-4"
                      {...register("is_fcr")}
                    />
                  </div>

                  {/* Requester Acknowledged Resolution */}
                  <div className="grid grid-cols-[220px_1fr] items-center gap-3">
                    <Label className="font-normal text-[14px]">
                      Requester Acknowledged Resolution
                    </Label>

                    {/* <RadioGroup
                    {...register("is_requester_acknowledged")}
                    className="flex gap-8"
                  >
                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem className="text-[14px]" value={"true"} />
                      <span className="text-[14px]">Yes</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem className="text-[14px]" value={"false"} />
                      <span className="text-[14px]">No</span>
                    </label>
                  </RadioGroup> */}
                    <Controller
                      name="is_requester_acknowledged"
                      control={control}
                      defaultValue="false"
                      render={({ field }) => (
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex gap-8"
                        >
                          <label className="flex items-center gap-2 cursor-pointer">
                            <RadioGroupItem
                              value="true"
                              className="text-[14px]"
                            />
                            <span className="text-[14px]">Yes</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <RadioGroupItem
                              value="false"
                              className="text-[14px]"
                            />
                            <span className="text-[14px]">No</span>
                          </label>
                        </RadioGroup>
                      )}
                    />
                  </div>

                  {/* Closing Comments */}
                  <div className="grid grid-cols-[220px_1fr] items-start gap-4">
                    <Label
                      htmlFor="closing_comment"
                      className="font-normal text-[14px]"
                    >
                      Closing Comments
                    </Label>

                    <Input
                      {...register("closing_comment")}
                      id="closing_comment"
                      placeholder="Enter closing comments"
                      className="w-full"
                    />
                  </div>

                  {/* Closure Code */}
                  <div className="grid grid-cols-[220px_1fr] items-start gap-4">
                    <Label className="font-normal text-[14px]">
                      Closure Code
                    </Label>

                    <Controller
                      name="closure_code_id"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          options={dropDown?.closureCodes || []}
                          placeholder="-- Select Closure Code --"
                          defaultValue={
                            dropDown?.closureCodes?.find(
                              (r) => r.id == field.value
                            ) || null
                          }
                          onChange={(option) =>
                            field.onChange(option?.id.toString())
                          }
                          showNoneOption
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  {/* Closure Comments / Status Change Comments */}
                  <div className="grid grid-cols-[220px_1fr] items-start gap-4">
                    <Label
                      htmlFor="comment"
                      className="font-normal text-[14px]"
                    >
                      Closure Comments / Status Change Comments
                    </Label>

                    <Input
                      {...register("comment")}
                      id="comment"
                      placeholder="Enter comments"
                      className="w-full"
                    />
                  </div>

                  {/* ---------- FORM ROWS END ---------- */}

                  {/* Footer buttons */}
                  <div className="flex justify-center gap-4 mt-6 pt-4 pb-2">
                    <Button
                      type="submit"
                      disabled={closeLoading}
                      className="bg-primary w-[120px] h-[40px]"
                    >
                      Save
                    </Button>

                    <Button
                      variant="outline"
                      type="button"
                      className="w-[120px] h-[40px]"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            <CustomSelect
              // placeholder="Assign"
              showNoneOption={false}
              defaultValue={{ name: "Assign", id: "assign" }}
              options={dropDown?.technicians || []}
              className="px-[10px] py-[5px] text-[12px] text-[#344256] rounded-[3px]"
              onChange={(e) => {
                if (selectedRows.length == 0) {
                  setIsAlert(true);
                  return;
                }
                assignTickests(e);
              }}
            />

            {/* <div className="relative px-[10px] py-[5px] rounded-[3px] cursor-pointer border font-normal flex items-center justify-center  text-[#344256] text-[12px]">
              Delete
            </div> */}

            <Button
              onClick={() => {
                if (selectedRows.length == 0) {
                  setIsAlert(true);
                  return;
                }
                setShowDelete(true);
              }}
              className="px-[10px] py-[5px] font-normal text-[12px] rounded-sm hover:bg-[#ececec] border bg-white text-[#333333] h-auto"
            >
              Delete
            </Button>

            {/* Delete Dialog */}
            <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
              <AlertDialogContent className="rounded-xl py-2 px-0 bg-white">
                <AlertDialogHeader className="border-b">
                  <AlertDialogTitle className="text-red-600 px-3">
                    Delete
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className="px-3">
                  Do you want to delete the selected requests?
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
                    disabled={deleteLoading}
                  >
                    {deleteLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* alert Dialog */}
          <AlertDialog open={isAlert} onOpenChange={setIsAlert}>
            <AlertDialogContent className="rounded-xl py-2 px-0 bg-white">
              <AlertDialogHeader className="border-b">
                <AlertDialogTitle className="px-3">Alert</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription className="px-3">
                Please select request(s) to close
              </AlertDialogDescription>

              <AlertDialogFooter className="px-3 mb-2">
                {/* <AlertDialogCancel className="rounded-full px-6">
                          Cancel
                        </AlertDialogCancel> */}
                <AlertDialogAction
                  onClick={() => {
                    setIsAlert(false);
                  }}
                  className="text-white rounded-full px-6 transition"
                  // disabled={loading3}
                >
                  {/* {loading3 && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
                  Ok
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* <TabsList className="w-full justify-center bg-transparent bg-white rounded-none h-auto p-0">
            <TabsTrigger
              value="unassigned"
              className="max-w-[300px] flex-1 rounded-none border border-primary data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted/50 data-[state=inactive]:bg-white py-3"
            >
              Unassigned
            </TabsTrigger>
            <TabsTrigger
              value="assigned"
              className="max-w-[300px] flex-1 rounded-none border border-primary data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted/50 data-[state=inactive]:bg-white py-3"
            >
              Assigned
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="max-w-[300px] flex-1 rounded-none border border-primary data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted/50 data-[state=inactive]:bg-white py-3"
            >
              Completed
            </TabsTrigger>
          </TabsList> */}

          {loading ? (
            <div className="p-8">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full mb-4" />
              ))}
            </div>
          ) : tickets.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">No requests found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8">
                    {/* <input
        type="checkbox"
        checked={selectedRows.length === tickets.length}
        onChange={toggleSelectAll}
        onClick={(e) => e.stopPropagation()}
      /> */}
                    <Checkbox
                      checked={
                        selectedRows.length === tickets.length &&
                        tickets.length > 0
                      }
                      onCheckedChange={toggleSelectAll}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead className="w-[350px]">Subject</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due By</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets?.map((ticket) => (
                  <TableRow
                    key={ticket.id}
                    onClick={() => {
                      navigate(`/request/${ticket.id}`);
                    }}
                    className={`cursor-pointer hover:bg-gray-50 ${
                      selectedRows.includes(ticket.id) ? "bg-[#fff2d1]" : ""
                    }`}
                  >
                    {/* Checkbox cell */}
                    {/* <TableCell
        className="w-8"
        onClick={(e) => e.stopPropagation()}   // prevent row click
      >
        <input
          type="checkbox"
          checked={selectedRows.includes(ticket.id)}
          onChange={() => toggleRow(ticket.id)}
        />
      </TableCell> */}
                    <TableCell
                      className="w-8"
                      onClick={(e) => e.stopPropagation()} // prevent row click
                    >
                      <Checkbox
                        checked={selectedRows.includes(ticket.id)}
                        onCheckedChange={() => toggleRow(ticket.id)}
                      />
                    </TableCell>
                    <TableCell>{ticket.ticket_number}</TableCell>
                    {/* <TableCell><span>
                      <img alt="" src={ticketIconNew}/>
                      </span>{ticket.subject}</TableCell>
                    <TableCell> */}
                    <TableCell>
                      <span className="flex items-center gap-2">
                        <img alt="" src={ticketIconNew} className="w-5 h-5" />
                        {ticket.subject}
                      </span>
                    </TableCell>
                    <TableCell>
                      {ticket.requester
                        ? `${ticket.requester.firstname} ${ticket.requester.lastname}`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {ticket.assignee
                        ? `${ticket.assignee.firstname} ${ticket.assignee.lastname}`
                        : "-"}
                    </TableCell>
                    <TableCell>{ticket.group?.name ?? "-"}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1">
                        <img alt="" src={flagIconNew} className="w-4 h-4" />
                        {ticket.status?.name ?? "-"}
                      </span>
                    </TableCell>
                    {/* <TableCell>{ticket.status?.name ?? "-"}</TableCell> */}
                    {/* <TableCell>{ticket?.due_date}</TableCell>
                    <TableCell>{ticket?.createdAt}</TableCell> */}
                    <TableCell>
                      {ticket?.due_date
                        ? format(
                            new Date(ticket.due_date),
                            "dd MMM yyyy, hh:mm a"
                          )
                        : "-"}
                    </TableCell>

                    <TableCell>
                      {ticket?.createdAt
                        ? format(
                            new Date(ticket.createdAt),
                            "dd MMM yyyy, hh:mm a"
                          )
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-3">
                        <img
                          onClick={(e) => {
                            e.stopPropagation(); // 👈 Prevent parent click
                            navigate(`/add-ticket?id=${ticket.id}`);
                          }}
                          alt="reqEditIcon"
                          src={reqEditIcon}
                          className="cursor-pointer"
                        />
                        <img
                          onClick={(e) => {
                            e.stopPropagation(); // 👈 Prevent parent click
                            navigate(`/request/${ticket.id}?tab=conversations`);
                          }}
                          alt="reqworkIcon"
                          src={reqworkIcon}
                          className="cursor-pointer"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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

          {/* <TabsContent value="unassigned" className="mt-6">
              <div className="space-y-3 mb-6">
                {currentItems.map((item) => (
                  <RequestCard  key={item.id} {...item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="assigned" className="mt-6">
              <div className="space-y-3 mb-6">
                {currentItems.map((item) => (
                  <RequestCard key={item.id} {...item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <div className="space-y-3 mb-6">
                {currentItems.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No completed requests
                  </div>
                ) : (
                  currentItems.map((item) => (
                    <RequestCard key={item.id} {...item} />
                  ))
                )}
              </div>
            </TabsContent> */}
          {/* Pagination */}
          {/* <div className="flex items-center justify-between bg-white">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Show</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[70px] h-8 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-muted-foreground">Per Page</span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (currentPage) => (
                  <Button
                    key={currentPage}
                    variant={currentPage === currentPage ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(currentPage)}
                  >
                    {currentPage}
                  </Button>
                )
              )}

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div> */}
        </div>

        {/* </main> */}
      </div>
    </MainLayout>
  );
};

export default Requests;
