import { MainLayout } from "@/components/Layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  Circle,
  Loader2,
  Mail,
  MoreVertical,
  Plus,
  Search,
  Square,
  Tickets,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ticketIcon from "@/assets/svg-icons/ticket-icon.svg";
import { useEffect, useState } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import plusIcon from "@/assets/svg-icons/plus-icon.svg";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ticketService } from "@/services/ticketService";
import { format, formatDistanceToNow } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteFormSchema, NoteFormSchema } from "@/lib/validation";
import { DropdownData } from "@/types/ticket";
import IncidentIcon from "@/assets/svg-icons/Incident-icon.svg";
import ChecklistModal from "./ChecklistModal";
import MyEditor from "@/components/common/MyEditor";
import CustomSelect from "@/components/CustomSelect";
import { InputFile } from "@/components/tickets/InputFile";

const RequestDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  // const { tab } = useParams();
  const initialTab = searchParams.get("tab") || "detail";
  // console.log("URL Tab Param:", tab);

  const [activeTab, setActiveTab] = useState(initialTab);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  console.log("Active Tab:", activeTab);

  const comments = [
    {
      id: 1,
      name: "James Smith",
      initials: "JS",
      time: "8 hours ago",
      text: "The hardware issue has been identified and reported for immediate attention. Further diagnostics are required to determine the root cause and resolve it efficiently.",
      avatar: "James1",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      initials: "SJ",
      time: "5 hours ago",
      text: "Software patch has been deployed successfully. Monitoring is in progress to ensure stability and resolve any residual issues.",
      avatar: "Sarah2",
    },
    {
      id: 3,
      name: "Michael Brown",
      initials: "MB",
      time: "2 hours ago",
      text: "Network connectivity restored after switch reboot. Further observation required to confirm if this resolves recurring outages.",
      avatar: "Michael3",
    },
    {
      id: 4,
      name: "Emily Davis",
      initials: "ED",
      time: "just now",
      text: "Request for new storage upgrade has been submitted to the IT procurement team for review and approval.",
      avatar: "Emily4",
    },
  ];
  const [detailsData, setDetailsData]: any = useState({});
  const [historyData, setHistoryData]: any = useState([]);
  const [noteData, setNoteData]: any = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("5");
  // const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (id && activeTab === "history") {
      loadHistoryData(id);
    }
  }, [id, activeTab]);

  console.log(detailsData, "detailsDatadetailsData");

  const loadHistoryData = async (ticketId) => {
    const params: any = {};
    // if (searchTerm) params.search = searchTerm;
    if (ticketId) params.ticket_id = ticketId;
    // if (priorityFilter !== "all") params.priority = priorityFilter;
    // if (requesterFilter !== "all") params.requested_by = requesterFilter;
    // if (technicianFilter !== "all") params.assigned_to = technicianFilter;
    // if (dateFilter) params.date_filter = dateFilter;

    if (currentPage) params.page = currentPage;
    if (itemsPerPage) params.limit = itemsPerPage;
    try {
      // const [reqData, techData, groupData] = await Promise.all([
      const res = await ticketService.getTicketHistory(params);
      console.log(res, "resresresresresresres");
      if (res?.success) {
        const history = res?.data?.data;
        console.log(history, "loooppp");
        setHistoryData(history);
        // reset({
        //   requested_by: ticket.requested_by ? String(ticket.requested_by) : "",
        //   asset_id: ticket.asset_id ? String(ticket.asset_id) : "",
        //   subject: ticket.subject || "",
        //   request_type_id: ticket.request_type_id
        //     ? String(ticket.request_type_id)
        //     : "",
        //   impact_id: ticket.impact_id ? String(ticket.impact_id) : "",
        //   mode_id: ticket.mode_id ? String(ticket.mode_id) : "",
        //   level_id: ticket.level_id ? String(ticket.level_id) : "",
        //   site_id: ticket.site_id ? String(ticket.site_id) : "",
        //   group_id: ticket.group_id ? String(ticket.group_id) : "",
        //   category_id: ticket.category_id ? String(ticket.category_id) : "",
        //   sub_category_id: ticket.sub_category_id ? String(ticket.sub_category_id) : "",
        //   assigned_to: ticket.assigned_to ? String(ticket.assigned_to) : "",
        //   priority_id: ticket.priority_id ? String(ticket.priority_id) : "",
        //   status_id: ticket.status_id ? String(ticket.status_id) : "",
        //   completed: ticket.completed || "",
        //   notify_by: ticket.notify_by || 1,
        //   notify_emails: ticket.notifyEmails?.[0]?.email || "",
        //   description: ticket.description || "",
        //   attachments: ticket.attachments || [],
        // });
      }
      // setDropDown(dropDownData?.data);
    } catch (error) {
      console.log(error, "errorerror");
    }
  };

  useEffect(() => {
    if (id && activeTab === "conversations") {
      loadNoteData(id);
    }
  }, [id, activeTab]);

  console.log(detailsData, "detailsDatadetailsData");

  const loadNoteData = async (ticketId) => {
    const params: any = {};
    // if (searchTerm) params.search = searchTerm;
    if (ticketId) params.ticket_id = ticketId;
    // if (priorityFilter !== "all") params.priority = priorityFilter;
    // if (requesterFilter !== "all") params.requested_by = requesterFilter;
    // if (technicianFilter !== "all") params.assigned_to = technicianFilter;
    // if (dateFilter) params.date_filter = dateFilter;

    if (currentPage) params.page = currentPage;
    if (itemsPerPage) params.limit = itemsPerPage;
    try {
      // const [reqData, techData, groupData] = await Promise.all([
      const res = await ticketService.getTicketNotes(params);
      console.log(res, "resresresresresresres");
      if (res?.success) {
        const note = res?.data?.notes;
        console.log(note, "notenotenote");
        setNoteData(note);
        // reset({
        //   requested_by: ticket.requested_by ? String(ticket.requested_by) : "",
        //   asset_id: ticket.asset_id ? String(ticket.asset_id) : "",
        //   subject: ticket.subject || "",
        //   request_type_id: ticket.request_type_id
        //     ? String(ticket.request_type_id)
        //     : "",
        //   impact_id: ticket.impact_id ? String(ticket.impact_id) : "",
        //   mode_id: ticket.mode_id ? String(ticket.mode_id) : "",
        //   level_id: ticket.level_id ? String(ticket.level_id) : "",
        //   site_id: ticket.site_id ? String(ticket.site_id) : "",
        //   group_id: ticket.group_id ? String(ticket.group_id) : "",
        //   category_id: ticket.category_id ? String(ticket.category_id) : "",
        //   sub_category_id: ticket.sub_category_id ? String(ticket.sub_category_id) : "",
        //   assigned_to: ticket.assigned_to ? String(ticket.assigned_to) : "",
        //   priority_id: ticket.priority_id ? String(ticket.priority_id) : "",
        //   status_id: ticket.status_id ? String(ticket.status_id) : "",
        //   completed: ticket.completed || "",
        //   notify_by: ticket.notify_by || 1,
        //   notify_emails: ticket.notifyEmails?.[0]?.email || "",
        //   description: ticket.description || "",
        //   attachments: ticket.attachments || [],
        // });
      }
      // setDropDown(dropDownData?.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load details data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (id && activeTab === "detail") {
      loadTicketData(id);
    }
  }, [id, activeTab]);

  console.log(detailsData, "detailsDatadetailsData");

  const loadTicketData = async (ticketId) => {
    try {
      // const [reqData, techData, groupData] = await Promise.all([
      const res = await ticketService.getTicket(ticketId);
      // console.log(res, "resresresresresresres");
      if (res?.success) {
        const ticket = res.data;
        setDetailsData(ticket);
        // reset({
        //   requested_by: ticket.requested_by ? String(ticket.requested_by) : "",
        //   asset_id: ticket.asset_id ? String(ticket.asset_id) : "",
        //   subject: ticket.subject || "",
        //   request_type_id: ticket.request_type_id
        //     ? String(ticket.request_type_id)
        //     : "",
        //   impact_id: ticket.impact_id ? String(ticket.impact_id) : "",
        //   mode_id: ticket.mode_id ? String(ticket.mode_id) : "",
        //   level_id: ticket.level_id ? String(ticket.level_id) : "",
        //   site_id: ticket.site_id ? String(ticket.site_id) : "",
        //   group_id: ticket.group_id ? String(ticket.group_id) : "",
        //   category_id: ticket.category_id ? String(ticket.category_id) : "",
        //   sub_category_id: ticket.sub_category_id ? String(ticket.sub_category_id) : "",
        //   assigned_to: ticket.assigned_to ? String(ticket.assigned_to) : "",
        //   priority_id: ticket.priority_id ? String(ticket.priority_id) : "",
        //   status_id: ticket.status_id ? String(ticket.status_id) : "",
        //   completed: ticket.completed || "",
        //   notify_by: ticket.notify_by || 1,
        //   notify_emails: ticket.notifyEmails?.[0]?.email || "",
        //   description: ticket.description || "",
        //   attachments: ticket.attachments || [],
        // });
      }
      // setDropDown(dropDownData?.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load details data",
        variant: "destructive",
      });
    }
  };

  console.log(detailsData?.ticket_number, "detailsData?.ticket_number");
  console.log(historyData, "historyDatahistoryData");

  console.log(noteData, "noteDatanoteDatanoteData");

  //  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<NoteFormSchema>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      // site_id: "",
      // department_id: "",
      // associated_sites: "",
      // reporting_manager_id: "",
      // associated_departments: "",
    },
  });

  const onSubmit = async (data: NoteFormSchema) => {
    setLoading(true);
    try {
      const formData: any = {
        ...data,
        ticket_id: id,
      };
      const res = await ticketService.createNote(formData);
      if (res?.success) {
        reset();
        setIsOpen(false);
        loadNoteData(id);
        toast({
          title: "Success",
          description: "Note added successfully",
        });
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const [dropDown, setDropDown] = useState<DropdownData | null>(null);

  console.log(dropDown, "resolution -- dropDowndropDown");

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

  function Row({ label, value }) {
    return (
      <div className="grid grid-cols-[130px_1fr]">
        <span className="text-[14px] px-[8px] py-[6px]">{label}</span>
        <div className="font-semibold text-[14px] px-[8px] py-[6px]">
          {value}
        </div>
      </div>
    );
  }
  const [isOpen2, setIsOpen2] = useState(false);
  const [status, setStatus] = useState("3");
  const [submitApp, setSubmitApp] = useState(false);

  console.log("isOpen2isOpen2isOpen2", isOpen2);

  return (
    <MainLayout title="Requests">
      <div className="p-[16px] h-full grid grid-cols-[2.5fr_1fr] gap-4">
        <div className="bg-white border p-[30px] rounded-3xl h-full">
          <div className="flex items-start gap-3 ">
            {/* Left Icon */}
            <div
  className="
    bg-[url('@/assets/images/all.png')]
    bg-no-repeat
    w-[48px]
    h-[48px]
    inline-block
    align-middle
    mt-[5px]
    bg-[-525px_-13px]
    flex-shrink-0
  "
></div>

            {/* Right Content */}
            <div className="flex flex-col">
              {/* Title row */}
              <div className="flex items-center flex-wrap gap-2 text-[15px] mb-1">
                <span className="font-normal text-[20px] text-[#888]">
                  {detailsData?.ticket_number
                    ? `# ${detailsData.ticket_number}`
                    : "# -"}
                </span>
                <span className="font-semibold text-gray-700 text-[20px]">
                  {detailsData?.subject || "-"}
                </span>
              </div>

              {/* Tags row */}
              <div className="flex items-center flex-wrap gap-3 mt-1 text-sm text-gray-700">
                {/* Incident Tag */}
                <span className="px-2 py-0.5 border rounded-md text-xs bg-[#f1faff] border-[#b3d6ff] text-[#333333">
                  Incident Request
                </span>

                {/* Divider */}
                <span className="text-gray-300">|</span>

                {/* Priority */}
                <div className="flex items-center text-[12px]">
                  <span className="">Priority :</span>
                  <span
                    className={`w-3 h-3 rounded-sm ${
                      detailsData?.priority?.color
                        ? `bg-[${detailsData.priority.color}]`
                        : "bg-orange-500"
                    }`}
                  ></span>
                  <span className={`"text-gray-700`}>
                    {detailsData?.priority?.name
                      ? `${detailsData.priority.name}`
                      : "-"}
                  </span>
                </div>

                <span className="text-gray-300">|</span>

                {/* Requested By */}
                <div className="flex items-center gap-1 text-[12px]">
                  <span className="">Requested By</span>
                  <span className="text-blue-600">
                    {detailsData?.requester
                      ? `${detailsData?.requester?.firstname || ""} ${detailsData?.requester?.lastname || ""}`
                      : "-"}
                  </span>
                </div>

                {/* <span className="text-gray-300">|</span> */}

                {/* Date */}
                <span className="text-[12px]">
                  on {detailsData?.createdAt
                    ? format(
                        new Date(detailsData?.createdAt),
                        "MMMM, dd yyyy 'at' hh:mm a"
                      )
                    : "-"}
                </span>
              </div>
            </div>
          </div>
          {/* <div className="flex items-center justify-between mb-6 bg-white px-[24px] py-[15px]">
        <div className="flex items-center gap-4">
          <span className="text-[20px] font-medium text-[#404040]">
            Request ID
          </span>
          <Input
            value={
              detailsData?.ticket_number
                ? `# ${detailsData.ticket_number}`
                : "# -"
            }
            className="w-[155px] h-[35px] p-[10px] bg-white"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center gap-2 hover:bg-gray-100 rounded p-1">
            <Button className="bg-primary w-[162px] h-[44px] px-[20px] flex justify-between">
              <span className="flex-1">Action</span>

              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation(); // 👈 Prevent parent click
                navigate(`/add-ticket?id=${id}`);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
          <Card className="pb-[20px] border-none rounded-none shadow-none">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              {/* <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="detail">Detail</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
          </TabsList> */}

              <TabsList className="text-[#333333] mb-[20px] mt-[20px] justify-start bg-transparent bg-white rounded-none h-auto p-0 border-b w-full">
                <TabsTrigger
                  value="detail"
                  className="max-w-[110px] font-semibold flex-1 rounded-none data-[state=active]:bg-[#ffffff] data-[state=active]:text-[#458af1] data-[state=active]:shadow-none border-b-2 data-[state=active]:border-[#458af1] data-[state=inactive]:border-[white] data-[state=inactive]:bg-white px-[20px] py-2"
                >
                  Detail
                </TabsTrigger>
                <TabsTrigger
                  value="conversations"
                  className="max-w-[110px] font-semibold flex-1 rounded-none data-[state=active]:bg-[#ffffff] data-[state=active]:text-[#458af1] data-[state=active]:shadow-none border-b-2 data-[state=active]:border-[#458af1] data-[state=inactive]:border-[white] data-[state=inactive]:bg-white px-[20px] py-2"
                >
                  Conversations
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="max-w-[110px] font-semibold flex-1 rounded-none data-[state=active]:bg-[#ffffff] data-[state=active]:text-[#458af1] data-[state=active]:shadow-none border-b-2 data-[state=active]:border-[#458af1] data-[state=inactive]:border-[white] data-[state=inactive]:bg-white px-[20px] py-2"
                >
                  History
                </TabsTrigger>
                <TabsTrigger
                  value="checklists"
                  className="max-w-[100px] font-semibold flex-1 rounded-none data-[state=active]:bg-[#ffffff] data-[state=active]:text-[#458af1] data-[state=active]:shadow-none border-b-2 data-[state=active]:border-[#458af1] data-[state=inactive]:border-[white] data-[state=inactive]:bg-white px-[20px] py-2"
                >
                  Checklists
                </TabsTrigger>
                <TabsTrigger
                  value="resolution"
                  className="max-w-[100px] font-semibold flex-1 rounded-none data-[state=active]:bg-[#ffffff] data-[state=active]:text-[#458af1] data-[state=active]:shadow-none border-b-2 data-[state=active]:border-[#458af1] data-[state=inactive]:border-[white] data-[state=inactive]:bg-white px-[20px] py-2"
                >
                  Resolution
                </TabsTrigger>
                <TabsTrigger
                 onClick={() => {
                        setSubmitApp(false);
                      }}
                  value="approvals"
                  className="max-w-[100px] font-semibold flex-1 rounded-none data-[state=active]:bg-[#ffffff] data-[state=active]:text-[#458af1] data-[state=active]:shadow-none border-b-2 data-[state=active]:border-[#458af1] data-[state=inactive]:border-[white] data-[state=inactive]:bg-white px-[20px] py-2"
                >
                  Approvals
                </TabsTrigger>
              </TabsList>

              <TabsContent value="detail" className="">
                {/* <div className="flex items-center gap-4 pb-4 border-b">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {detailsData?.subject || "-"}
                </h3>
              </div>
              <Select>
                <SelectTrigger className="w-[155px] h-[30px] bg-[#687CFF] text-white border-none focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Unassigned">Unassigned</SelectItem>
                  <SelectItem value="Assigned">Assigned</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Stagging">Stagging</SelectItem>

                  <SelectItem value="Verification">Verification</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

                <div className="bg-white">
                  {/* Requester Details */}
                  <div>
                    <div className=" font-semibold mb-4">Details</div>
                    <div className="grid grid-cols-3 gap-6 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Company</p>
                        <p className="text-sm font-medium">
                          {detailsData?.company?.name || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Requester</p>
                        <p className="text-sm font-medium">
                          {detailsData?.requester
                            ? `${detailsData?.requester?.firstname || ""} ${detailsData?.requester?.lastname || ""}`
                            : "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Employee ID
                        </p>
                        <p className="text-sm font-medium">
                          {detailsData?.requester?.employee_id || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <p className="text-sm font-medium">
                          {detailsData?.requester?.email || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Phone</p>
                        <p className="text-sm font-medium">
                          {detailsData?.requester?.phonenumber || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Site</p>
                        <p className="text-sm font-medium">
                          {detailsData?.requester?.site?.name || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Department</p>
                        <p className="text-sm font-medium">
                          {detailsData?.requester?.department?.name || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Job Title</p>
                        <p className="text-sm font-medium">
                          {detailsData?.requester?.job_title || "-"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Details */}
                  <div>
                    <div className="py-2 font-semibold mb-4 border-t">
                      Ticket Details
                    </div>
                    <div className="grid grid-cols-3 gap-6 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Request Type
                        </p>
                        <p className="text-sm font-medium">
                          {detailsData?.requestType?.name || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Impact</p>
                        <p className="text-sm font-medium">
                          {detailsData?.impact?.name || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Mode</p>
                        <p className="text-sm font-medium">
                          {" "}
                          {detailsData?.mode?.name || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Level</p>
                        <p className="text-sm font-medium">
                          {detailsData?.level?.name || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Site</p>
                        <p className="text-sm font-medium">
                          {detailsData?.site?.name || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Group</p>
                        <p className="text-sm font-medium">
                          {detailsData?.group?.name || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Category</p>
                        <p className="text-sm font-medium">
                          {detailsData?.category?.category || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Sub-Category
                        </p>
                        <p className="text-sm font-medium">
                          {detailsData?.subCategory?.name || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Asset</p>
                        <p className="text-sm font-medium">
                          {detailsData?.asset?.name || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Technician</p>
                        <p className="text-sm font-medium">
                          {detailsData?.assignee
                            ? `${detailsData?.assignee?.firstname} ${detailsData?.assignee?.lastname}`
                            : "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Due Date</p>
                        <p className="text-sm font-medium">
                          {detailsData?.due_date || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Time Lapse</p>
                        <p className="text-sm font-medium">-</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          % Completed
                        </p>
                        <p className="text-sm font-medium text-blue-600">
                          {detailsData?.completed || "-"}% Completed
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Priority</p>
                        <Badge variant="destructive">
                          {detailsData?.priority?.name
                            ? `● ${detailsData.priority.name}`
                            : "-"}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Notify By</p>
                        <p className="text-sm font-medium">
                          {detailsData?.notify_by == "1" ? "Email" : "-"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Description</p>
                    <p className="text-sm text-gray-700">
                      {detailsData?.description || "-"}
                    </p>
                  </div>

                  {/* Attachments */}
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Attachments</p>
                    {/* {detailsData?.attachments?.length > 0 &&
                  detailsData?.attachments?.map((item) => {
                    return <img alt={item?.file_name} src={item.file_url} />;
                  })} */}
                    {detailsData?.attachments?.length > 0
                      ? detailsData?.attachments?.map((item, index) => {
                          return (
                            <div
                              className="inline-block border rounded p-2 me-3"
                              key={index}
                            >
                              <img
                                className="w-20 h-20 rounded mb-1 mx-auto"
                                alt=""
                                src={item.file_url}
                              />
                              <p className="text-xs text-center">
                                {item?.file_name}
                              </p>
                            </div>
                          );
                        })
                      : "-"}
                  </div>

                  {/* <div className="text-right text-xs text-gray-500 mt-8 mb-4">
                Created By{" "}
                {detailsData?.addedByUser
                  ? `${detailsData?.addedByUser?.firstname} ${detailsData?.addedByUser?.lastname}`
                  : "-"}
                <br />
                {detailsData?.createdAt
                  ? format(
                      new Date(detailsData?.createdAt),
                      "dd MMMM yyyy 'at' hh:mm a"
                    )
                  : "-"}
              </div> */}
                  {/* <hr /> */}

                  {/* Images */}
                  {/* <div>
                <p className="text-sm text-gray-500 mb-2">Images</p>
                <div className="flex gap-2">
                  <div className="w-20 h-20 bg-gray-200 rounded"></div>
                  <div className="w-20 h-20 bg-gray-200 rounded"></div>
                </div>
              </div> */}
                </div>
              </TabsContent>

              <TabsContent value="history" className="p-[16px] bg-muted">
                {/* <div className="flex items-center gap-4 pb-4 border-b">
              <div className="w-12 h-12 bg-[var(--status-unassigned)] rounded-full flex items-center justify-center">
                <img
                  alt="ticketIcon"
                  className="h-[30px] w-[30px] my-auto mx-auto"
                  src={ticketIcon}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {detailsData?.subject || "-"}
                </h3>
                <p className="text-sm text-gray-500">
                  Requested By:{" "}
                  <span className="text-[var(--status-unassigned)]">
                    {detailsData?.requester
                      ? `${detailsData?.requester?.firstname} ${detailsData?.requester?.lastname}`
                      : "-"}
                  </span>
                </p>
              </div>
            </div> */}

                <div className="space-y-4">
                  {historyData?.length > 0 ? (
                    historyData?.map((item, index) => (
                      <div key={index} className="bg-white p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center w-9/12">
                            <div>
                              <p className="text-xs text-[#687CFF] mb-1 w-[70px] text-center">
                                {item.date}
                              </p>
                              <p className="text-xs text-[#687CFF] mb-1 w-[70px] text-center">
                                {item.time}
                              </p>
                            </div>
                            {/* Vertical Separator */}
                            <div className="h-[45px] w-[1px] bg-[#8C8C8C] mx-3" />
                            {/* <p className="text-sm text-[#404040] ">{item.description}</p> */}
                            <p className="text-sm text-[#404040] line-clamp-3">
                              {item.description}
                            </p>
                          </div>
                          <div className="w-1/4">
                            <p className="text-xs text-gray-500 mb-2">
                              Operations{" "}
                              <span className="font-medium text-gray-900">
                                {item.operation}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500">
                              Performed By{" "}
                              <span className="font-medium text-gray-900">
                                {item?.performedBy
                                  ? `${item?.performedBy?.firstname} ${item?.performedBy?.lastname}`
                                  : "-"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center">
                      <p className="text-muted-foreground">No history found</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="conversations" className="px-[16px]">
                <div className="flex items-center justify-between pb-4">
                  {/* <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--status-unassigned)] rounded-full flex items-center justify-center">
                  <img
                    alt="ticketIcon"
                    className="h-[30px] w-[30px] my-auto mx-auto"
                    src={ticketIcon}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {detailsData?.subject || "-"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Requested By:
                    <span className="text-[var(--status-unassigned)]">
                      {detailsData?.requester
                        ? `${detailsData?.requester?.firstname} ${detailsData?.requester?.lastname}`
                        : "-"}
                    </span>
                  </p>
                </div>
              </div> */}

                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary flex items-center gap-2 ms-auto">
                        Add Note <Plus className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] bg-white">
                      <DialogHeader>
                        <DialogTitle className="text-[20px] font-bold">
                          Add Note
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
                          <div className="space-y-1">
                            <Label htmlFor="description">
                              Note *
                              {errors.description && (
                                <span className="text-sm text-destructive mt-1 font-normal">
                                  &nbsp;{errors.description.message}
                                </span>
                              )}
                            </Label>
                            {/* <Input id="note" placeholder="Enter" /> */}
                            <Textarea
                              placeholder="Enter your note here..."
                              className="min-h-[100px]"
                              {...register("description")}
                              id="description"
                              // placeholder="Enter Email"
                            />
                            {/* <RichTextEditor value={note} onChange={setNote} /> */}
                          </div>
                          {/* <div className="flex items-center space-x-2 mt-2">
                        <Label htmlFor="note2" className="mb-0">
                          Show this note to requester
                        </Label>
                        <Switch id="note2" />
                      </div> */}
                          <div className="flex items-end">
                            <Controller
                              name="is_private"
                              control={control}
                              defaultValue={true} // or false
                              render={({ field }) => (
                                <div className="flex items-center">
                                  <Label htmlFor="is_private" className="me-4">
                                    Show this note to requester
                                  </Label>
                                  <Switch
                                    id="is_private"
                                    checked={field.value} // ✅ boolean value
                                    onCheckedChange={field.onChange} // ✅ updates boolean
                                  />
                                </div>
                              )}
                            />
                          </div>
                          <div className="flex justify-end gap-4 pt-4">
                            <Button
                              variant="outline"
                              className="bg-white w-[140px] h-[44px]"
                              onClick={() => {
                                setIsOpen(false);
                                reset();
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
                              {loading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              )}
                              Add
                            </Button>
                          </div>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-4">
                  {noteData?.length > 0 ? (
                    noteData?.map((comment, index) => (
                      <div
                        key={comment.id}
                        className={`flex gap-4 bg-white p-4 border-[4px] rounded-[10px] ${
                          index === comments.length - 1
                            ? "border-[#BEE4FF]" // ✅ last comment color
                            : "border-[#F9E8A6]" // others
                        }`}
                      >
                        {/* <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.avatar}`}
                      />
                      <AvatarFallback>{comment.initials}</AvatarFallback>
                    </Avatar> */}
                        <div className="bg-[#f3f1f9] rounded-full w-8 h-8 my-auto flex items-center justify-center">
                          <Mail className="rounded-full text-[#9f95fc] w-5 h-5" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-sm text-gray-900">
                              {comment?.addedBy
                                ? `${comment?.addedBy?.firstname} ${comment?.addedBy?.lastname}`
                                : "-"}
                              {/* {comment.addedBy} */}
                            </span>
                          </div>
                          {/* <p className="text-sm text-gray-700">
                        {comment.description}
                      </p> */}
                          <p
                            className="text-sm text-gray-700"
                            dangerouslySetInnerHTML={{
                              __html: comment.description,
                            }}
                          />
                          <span className="text-xs text-gray-500">
                            {/* {comment.createdAt} */}
                            {comment?.createdAt
                              ? `${formatDistanceToNow(
                                  new Date(comment.createdAt),
                                  { addSuffix: true }
                                )}`
                              : "-"}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center">
                      <p className="text-muted-foreground">
                        No conversation found
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="checklists" className="">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center justify-center rounded">
                    <div className="flex items-center cursor-pointer">
                      <span className="text-[20px]">All Checklists</span>
                      <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="rounded-none px-0 py-1"
                  >
                    <DropdownMenuItem className="text-[12px] min-w-[170px] rounded-none cursor-pointer focus:bg-[#f1faff] focus:text-[#5f99f2]">
                      All Checklists
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-[12px] min-w-[170px] rounded-none cursor-pointer focus:bg-[#f1faff] focus:text-[#5f99f2]">
                      Completed Checklists
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-[12px] min-w-[170px] rounded-none cursor-pointer focus:bg-[#f1faff] focus:text-[#5f99f2]">
                      Pending Checklists
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div
                  onClick={() => {
                    // e.stopPropagation();
                    // e.preventDefault();
                    setIsOpen2(true);
                    console.log("adadd");
                  }}
                  className="flex items-center justify-between"
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger className="ps-[10px] my-[10px] font-normal text-[12px] rounded-sm hover:bg-[#ececec] border bg-white text-[#333333] h-auto flex items-center justify-center">
                      <div className=" flex items-center cursor-pointer">
                        <span className="py-[3px] pe-[10px] border-r">
                          All Checklists
                        </span>
                        <ChevronDown className="w-3 h-3 text-gray-500 mx-1 flex-shrink-0" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="rounded-none px-0 py-1"
                    >
                      <DropdownMenuItem className="text-[12px] min-w-[170px] rounded-none cursor-pointer focus:bg-[#f1faff] focus:text-[#5f99f2]">
                        Add Existing Checklists
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="relative flex-1 min-w-[190px] lg:flex-none lg:w-[400px]">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search checklists"
                      className="pl-9 bg-white"
                      // value={searchTerm}
                      // onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-center text-gray-500 py-12">
                    No checklists available
                  </p>
                </div>

                <ChecklistModal isOpen={isOpen2} onClose={setIsOpen2} />

                {/* <div className="bg-white border">Checklists Content</div> */}
              </TabsContent>
              <TabsContent value="resolution" className="">
                <p className="text-[18px] mb-[15px]">Resolution</p>
                <div className="flex items-center mb-[10px] justify-between">
                  <Button className="px-[10px] py-[5px] font-normal text-[12px] rounded-sm hover:bg-[#ececec] border bg-[#f5f5f5] text-[#333333] h-auto">
                    Search Resolutions
                  </Button>
                  <div className="flex item-center justify-end ">
                    <p className="text-[13px] me-2 my-auto">
                      Use Resolution Template :
                    </p>
                    <CustomSelect
                      // {...field}
                      options={[]}
                      placeholder="-- Select Templeate --"
                      defaultValue={
                        // dropDown?.sites?.find((r) => r.id == field.value)
                        // ||
                        null
                      }
                      // onChange={(option) =>
                      //   field.onChange(option?.id.toString())
                      // }
                      className="min-w-[200px]"
                      showNoneOption
                    />
                  </div>
                </div>
                <MyEditor />
                <div className="bg-[#f5f5f5] px-[15px] py-1 flex items-center justify-start border mb-1 rounded-sm">
                  <p className="text-[13px] text-gray-500 me-7">
                    Request Status
                  </p>
                  <CustomSelect
                    // {...field}
                    options={dropDown?.statuses || []}
                    placeholder=""
                    defaultValue={
                      dropDown?.statuses?.find((r) => r.id == status) || null
                    }
                    // onChange={(option) =>
                    //   field.onChange(option?.id.toString())
                    // }
                    className="min-w-[135px]"
                    showNoneOption={false}
                  />
                </div>
                <div>
                  <p className="mt-[24px] text-[14px] mb-[12px] border-b border-dotted">
                    Attachments
                  </p>
                  <InputFile
                    id="attachments"
                    label="Choose file to upload"
                    buttonText="Attach File"
                    button={false}
                    className="text-center"
                    // icon={attachmentIcons}
                    // value={field.value}
                    // onChange={field.onChange}
                  />
                </div>

                <div className="flex justify-center gap-2 py-3 mt-3">
                  <Button className="px-[16px] my-[10px] py-[6px] font-normal text-[12px] rounded-full bg-[#4588f0] hover:bg-[#4588f0]/90 text-[white] h-auto">
                    Save
                  </Button>
                  <Button
                    type="button"
                    // onClick={() => {
                    //   onClose(false);
                    // }}
                    className="px-[16px] my-[10px] py-[6px] font-normal text-[12px] rounded-full bg-[#f5f5f5] hover:bg-[#ececec] border text-[#333333] h-auto"
                  >
                    Cancel
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="approvals" className="">
                <Tabs defaultValue="approval-details">
                  {/* Child Tabs */}
                  <TabsList className="mb-[24px] justify-start bg-transparent bg-white rounded-none h-auto p-0 border-b w-full">
                    <TabsTrigger
                      onClick={() => {
                        setSubmitApp(false);
                      }}
                      value="approval-details"
                      className="max-w-[110px] font-normal flex-1 rounded-none data-[state=active]:bg-[#ffffff] data-[state=active]:text-[#458af1] data-[state=active]:shadow-none border-b-2 data-[state=active]:border-[#458af1] data-[state=inactive]:border-[white] data-[state=inactive]:bg-white px-[20px] py-2"
                    >
                      Approval Details
                    </TabsTrigger>
                    <TabsTrigger
                      onClick={() => {
                        setSubmitApp(false);
                      }}
                      value="approval-comments"
                      className="max-w-[150px] font-normal flex-1 rounded-none data-[state=active]:bg-[#ffffff] data-[state=active]:text-[#458af1] data-[state=active]:shadow-none border-b-2 data-[state=active]:border-[#458af1] data-[state=inactive]:border-[white] data-[state=inactive]:bg-white px-[20px] py-2"
                    >
                      Approval Comments
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="approval-details">
                    {submitApp ? (
                      <div className="py-[22px]">
                        <p className="text-[18px] font-semibold">
                          Send Approval
                        </p>

                        <form
                          onSubmit={(e) => {
                            e.stopPropagation();
                            handleSubmit(onSubmit)(e);
                          }}
                          className="space-y-3 pb-2"
                        >
                          {/* ---------- FORM ROWS START ---------- */}

                          {/* Requester Acknowledged Resolution */}

                          {/* Closing Comments */}
                          <div className="grid grid-cols-[120px_1fr] items-start gap-4 mt-4">
                            <Label
                              htmlFor="to"
                              className="font-normal text-[14px]"
                            >
                              To *
                            </Label>

                            <Input
                              // {...register("closing_comment")}
                              id="to"
                              placeholder=""
                              className="w-full"
                            />
                          </div>

                          {/* Closure Code */}
                          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                            <Label className="font-normal text-[14px]">
                              Subject *
                            </Label>
                            <Input
                              // {...register("comment")}
                              id="comment"
                              placeholder="Approval required for a Request"
                              className="w-full"
                            />
                          </div>

                          {/* Closure Comments / Status Change Comments */}
                          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                            <Label
                              htmlFor="comment"
                              className="font-normal text-[14px]"
                            >
                              Description
                            </Label>

                            {/* <Input
                              // {...register("comment")}
                              id="comment"
                              placeholder="Enter comments"
                              className="w-full"
                            /> */}
                            <MyEditor />
                          </div>

                          {/* ---------- FORM ROWS END ---------- */}

                          {/* Footer buttons */}
                          <div className="flex justify-center gap-2 py-3 mt-3">
                            <Button className="px-[16px] my-[10px] py-[6px] font-normal text-[12px] rounded-full bg-[#4588f0] hover:bg-[#4588f0]/90 text-[white] h-auto">
                              Send
                            </Button>
                            <Button
                              type="button"
                              onClick={() => {
                                setSubmitApp(false);
                              }}
                              className="px-[16px] my-[10px] py-[6px] font-normal text-[12px] rounded-full bg-[#f5f5f5] hover:bg-[#ececec] border text-[#333333] h-auto"
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-end items-center">
                                     
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              setSubmitApp(true);
                            }}
                            type="button"
                            className="px-[10px] py-[3px] font-normal text-[13px] rounded-sm hover:bg-[#ececec] border bg-white text-[#333333] h-auto"
                          >
                            <span
                              className="before:content-[''] before:inline-block 
         before:bg-[url('@/assets/images/all.png')] 
         before:bg-[length:auto] 
         before:bg-no-repeat
         before:bg-[-321px_-633px]
         before:w-[20px] 
         before:h-[16px] 
         before:align-middle"
                            ></span>
                            Submit for Approval
                          </Button>
                        </div>
                        <p className="text-[18px]">Approval Details</p>
                        <p className="text-[16px] text-[#888] text-center py-10">
                          No approval configured
                        </p>
                      </>
                    )}
                  </TabsContent>
                  <TabsContent value="approval-comments">
                    <p className="text-[16px] text-[#888] text-center py-10">
                      No approval comments
                    </p>
                  </TabsContent>
                </Tabs>
                {/* <div className="border-b flex ps-4 mt-2">
                  <p className="bg-[4588f0]  py-[10px] px-[15px] text-[14px] cursor-pointer">Approval Details</p>
                  <p className=" py-[10px] px-[15px] text-[14px] cursor-pointer">Approval Comments</p>
                </div> */}
                {/* <p className="text-[16px] text-[#888] text-center">
                    No approval configured
                  </p> */}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        <div className="bg-white border p-[20px] rounded-xl w-full">
          <h2 className="font-semibold text-[16px] mb-3">Properties</h2>

          <div className="flex flex-col">
            <Row
              label="Request ID"
              value={
                <span>
                  {detailsData?.ticket_number
                    ? `# ${detailsData.ticket_number}`
                    : "# -"}
                </span>
              }
            />

            <Row
              label="Status"
              value={
                <span className="font-medium">
                  {detailsData?.status?.name || "-"}
                </span>
              }
            />

            <Row
              label="Life cycle"
              value={<span className="font-medium">Not Assigned</span>}
            />

            <Row
              label="Workflow"
              value={<span className="font-medium">Not Assigned</span>}
            />

            <Row
              label="Priority"
              value={
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-gray-500 inline-block rounded-sm"></span>
                  <span>
                    {detailsData?.priority?.name
                      ? `${detailsData.priority.name}`
                      : "-"}
                  </span>
                </div>
              }
            />

            <Row
              label="Technician"
              value={
                <div className="flex items-center space-x-2">
                  {/* <span className="w-2 h-2 bg-gray-500 rounded-full inline-block"></span> */}
                  <span>
                    {detailsData?.assignee
                      ? `${detailsData?.assignee?.firstname} ${detailsData?.assignee?.lastname}`
                      : "-"}
                  </span>
                </div>
              }
            />

            <Row
              label="Group & Site"
              value={
                <span>
                  {detailsData?.group?.name || "-"} ,{" "}
                  {detailsData?.site?.name || "-"}
                </span>
              }
            />

            {/* <Row
              label="Tasks"
              value={<span className="border px-2 rounded">0/0</span>}
            /> */}

            <Row
              label="Checklists"
              value={<span className="border px-2 rounded">0/0</span>}
            />

            {/* <Row
              label="Reminders"
              value={<span className="border px-2 rounded">0</span>}
            /> */}

            <Row
              label="Approval Status"
              value={
                <div className="flex items-center space-x-2 font-medium">
                  <span className="w-3 h-3 bg-gray-500 inline-block rounded-sm"></span>
                  <span>Not Configured</span>
                </div>
              }
            />

            <Row
              label="Attachments"
              value={
                <div className="flex items-center space-x-2">
                  <span className="border px-2 rounded">0</span>
                  <span className="cursor-pointer">📎</span>
                </div>
              }
            />

            <Row
              label="Due Date"
              value={
                <span className="text-blue-600 font-medium">
                  {detailsData?.due_date || "-"}
                </span>
              }
            />

            {/* <Row
              label="Worklog Timer"
              value={<span className="text-xl cursor-pointer">⏱️</span>}
            /> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RequestDetail;
