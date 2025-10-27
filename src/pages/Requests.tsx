import { useState } from "react";
// import { AppHeader } from "@/components/AppHeader";
import { RequestFilters } from "@/components/RequestFilters";
import { RequestCard } from "@/components/RequestCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Calendar, ChevronDown, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Plus, HelpCircle } from "lucide-react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { useNavigate } from "react-router-dom";
import plusIcon from "@/assets/svg-icons/plus-icon.svg";
import searchIcons from "@/assets/svg-icons/search-icons.svg";
import clearIcon from "@/assets/svg-icons/clear-icon.svg";
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
import tableBottomIcon from "@/assets/svg-icons/table-bottom-icon.svg";

const assets = [
  {
    id: 1,
    subject: "Laptop not booting",
    requester: "Ali Raza",
    technician: "Bilal Ahmed",
    group: "IT Support",
    status: "Open",
    dueBy: "2025-10-28",
    createdAt: "2025-10-20",
  },
  {
    id: 2,
    subject: "Printer not responding",
    requester: "Sara Khan",
    technician: "Hassan Malik",
    group: "Hardware Team",
    status: "In Progress",
    dueBy: "2025-10-26",
    createdAt: "2025-10-19",
  },
  {
    id: 3,
    subject: "Email access issue",
    requester: "Usman Tariq",
    technician: "Zeeshan Ali",
    group: "Network Team",
    status: "Resolved",
    dueBy: "2025-10-22",
    createdAt: "2025-10-18",
  },
  {
    id: 4,
    subject: "Monitor flickering issue",
    requester: "Fatima Noor",
    technician: "Imran Saeed",
    group: "IT Support",
    status: "Pending",
    dueBy: "2025-10-29",
    createdAt: "2025-10-21",
  },
  {
    id: 5,
    subject: "Software installation request",
    requester: "Ahmed Khan",
    technician: "Asad Iqbal",
    group: "Application Team",
    status: "Closed",
    dueBy: "2025-10-24",
    createdAt: "2025-10-17",
  },
];

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

const requestsData = [
  // 🔴 Critical + Unassigned
  {
    assign: "James",
    completion: "20",
    id: "30",
    createdAt: "14-10-2025 at 10:22 AM",
    requestor: "Alice Johnson",
    category: "Firewall",
    subject: "Unblock port 443 for web access",
    priority: "Critical" as const,
    status: "Unassigned" as const,
  },
  {
    assign: "James",
    completion: "20",
    id: "29",
    createdAt: "14-10-2025 at 09:58 AM",
    requestor: "Robert King",
    category: "Network",
    subject: "Major outage in branch router",
    priority: "Critical" as const,
    status: "Unassigned" as const,
  },
  {
    assign: "James",
    completion: "20",
    id: "28",
    createdAt: "13-10-2025 at 07:11 PM",
    requestor: "Sophia Patel",
    category: "Database",
    subject: "Production DB not responding",
    priority: "Critical" as const,
    status: "Unassigned" as const,
  },
  {
    assign: "James",
    completion: "20",
    id: "27",
    createdAt: "13-10-2025 at 06:45 PM",
    requestor: "Liam Carter",
    category: "Server",
    subject: "Critical CPU overload on node-5",
    priority: "Critical" as const,
    status: "Unassigned" as const,
  },
  {
    assign: "James",
    completion: "20",
    id: "26",
    createdAt: "13-10-2025 at 05:28 PM",
    requestor: "Isabella Brown",
    category: "Firewall",
    subject: "Multiple failed login attempts",
    priority: "Critical" as const,
    status: "Unassigned" as const,
  },
  {
    assign: "James",
    completion: "20",
    id: "25",
    createdAt: "13-10-2025 at 03:19 PM",
    requestor: "James Parker",
    category: "Security",
    subject: "Malware detected on gateway",
    priority: "Critical" as const,
    status: "Unassigned" as const,
  },

  // 🟠 High + Assigned
  {
    assign: "James",
    completion: "20",
    id: "24",
    createdAt: "13-10-2025 at 11:10 AM",
    requestor: "Olivia Wilson",
    category: "Network",
    subject: "Slow VPN connectivity for remote staff",
    priority: "High" as const,
    status: "Assigned" as const,
  },
  {
    assign: "James",
    completion: "20",
    id: "23",
    createdAt: "12-10-2025 at 09:32 PM",
    requestor: "Ethan Miller",
    category: "Firewall",
    subject: "Access rule request for external vendor",
    priority: "High" as const,
    status: "Assigned" as const,
  },
  {
    assign: "James",
    completion: "20",
    id: "22",
    createdAt: "12-10-2025 at 08:59 PM",
    requestor: "Charlotte Evans",
    category: "Email",
    subject: "Spam filtering not working properly",
    priority: "High" as const,
    status: "Assigned" as const,
  },
  {
    assign: "James",
    completion: "20",
    id: "21",
    createdAt: "12-10-2025 at 05:18 PM",
    requestor: "Daniel White",
    category: "Network",
    subject: "DNS resolving delay on main server",
    priority: "High" as const,
    status: "Assigned" as const,
  },
  {
    assign: "James",
    completion: "20",
    id: "20",
    createdAt: "12-10-2025 at 03:25 PM",
    requestor: "Mia Green",
    category: "Server",
    subject: "SSL certificate renewal pending",
    priority: "High" as const,
    status: "Assigned" as const,
  },
  {
    assign: "James",
    completion: "20",
    id: "19",
    createdAt: "12-10-2025 at 02:18 PM",
    requestor: "Lucas Scott",
    category: "Security",
    subject: "New user access review required",
    priority: "High" as const,
    status: "Assigned" as const,
  },

  // 🟡 Medium + In Progress
  {
    assign: "James",
    completion: "20",
    id: "18",
    createdAt: "11-10-2025 at 11:43 AM",
    requestor: "Ella Adams",
    category: "Email",
    subject: "Mailbox quota upgrade requested",
    priority: "Medium" as const,
    status: "In Progress" as const,
  },
  {
    assign: "James",
    completion: "20",
    id: "17",
    createdAt: "11-10-2025 at 09:18 AM",
    requestor: "Henry Turner",
    category: "Database",
    subject: "Scheduled backup validation",
    priority: "Medium" as const,
    status: "In Progress" as const,
  },
  {
    assign: "James",
    completion: "20",
    id: "16",
    createdAt: "10-10-2025 at 08:55 PM",
    requestor: "Ava Martinez",
    category: "Network",
    subject: "LAN cabling inspection ongoing",
    priority: "Medium" as const,
    status: "In Progress" as const,
  },
  {
    assign: "James",
    completion: "20",
    id: "15",
    createdAt: "10-10-2025 at 07:21 PM",
    requestor: "Noah Walker",
    category: "Firewall",
    subject: "Reviewing inactive access rules",
    priority: "Medium" as const,
    status: "In Progress" as const,
  },
  {
    assign: "James",
    completion: "20",
    id: "14",
    createdAt: "10-10-2025 at 04:49 PM",
    requestor: "Grace Lewis",
    category: "Hardware",
    subject: "Replacing faulty switch unit",
    priority: "Medium" as const,
    status: "In Progress" as const,
  },
  {
    assign: "James",
    completion: "20",
    id: "13",
    createdAt: "09-10-2025 at 11:15 AM",
    requestor: "Jacob Brooks",
    category: "Server",
    subject: "Disk cleanup and optimization",
    priority: "Medium" as const,
    status: "In Progress" as const,
  },

  // 🟢 Low + Completed
  {
    assign: "James",
    completion: "100",
    id: "12",
    createdAt: "09-10-2025 at 09:42 AM",
    requestor: "Zoe Harris",
    category: "Network",
    subject: "Routine patch update applied",
    priority: "Low" as const,
    status: "Completed" as const,
  },
  {
    assign: "James",
    completion: "100",
    id: "11",
    createdAt: "09-10-2025 at 08:38 AM",
    requestor: "William Thompson",
    category: "Hardware",
    subject: "Printer setup completed in Room 302",
    priority: "Low" as const,
    status: "Completed" as const,
  },
  {
    assign: "James",
    completion: "100",
    id: "10",
    createdAt: "08-10-2025 at 04:17 PM",
    requestor: "Amelia Hall",
    category: "Software",
    subject: "Installed VPN client update",
    priority: "Low" as const,
    status: "Completed" as const,
  },
  {
    assign: "James",
    completion: "100",
    id: "9",
    createdAt: "08-10-2025 at 02:58 PM",
    requestor: "Matthew Young",
    category: "Email",
    subject: "Configured auto-archive for HR mailbox",
    priority: "Low" as const,
    status: "Completed" as const,
  },
  {
    assign: "James",
    completion: "100",
    id: "8",
    createdAt: "08-10-2025 at 11:45 AM",
    requestor: "Lily Morgan",
    category: "Network",
    subject: "Network printer successfully tested",
    priority: "Low" as const,
    status: "Completed" as const,
  },
  {
    assign: "James",
    completion: "100",
    id: "7",
    createdAt: "07-10-2025 at 10:09 AM",
    requestor: "Benjamin Reed",
    category: "Hardware",
    subject: "Desktop memory upgraded",
    priority: "Low" as const,
    status: "Completed" as const,
  },
];

const Requests = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [activeTab, setActiveTab] = useState("unassigned");
  const navigate = useNavigate();

  // Filter requests based on active tab
  const filteredRequests = requestsData.filter((req) => {
    if (activeTab === "unassigned") return req.status === "Unassigned";
    if (activeTab === "assigned") return req.status === "Assigned";
    if (activeTab === "completed") return req.status === "Completed";
    return true;
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredRequests.slice(startIndex, endIndex);

  return (
    <MainLayout title="Requests">
      <div className="space-y-6">
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
        <div className="mb-6 bg-white px-[24px] py-[15px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-xl font-semibold text-foreground flex-shrink-0">
            Request List
          </h2>

          {/* Filter Section */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[125px] lg:flex-none lg:w-[125px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search By" className="pl-9 bg-white" />
            </div>

            <Select>
              <SelectTrigger className="w-[125px] bg-white">
                <SelectValue placeholder="Requester" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Requesters</SelectItem>
                <SelectItem value="smith">Smith</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[125px] bg-white">
                <SelectValue placeholder="Technician" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Technician</SelectItem>
                <SelectItem value="smith">Smith</SelectItem>
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

            <Select>
              <SelectTrigger className="w-[125px] bg-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="pending-verification">
                  Pending Verification
                </SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
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
          <Button
            onClick={() => {
              navigate("/add-ticket");
            }}
            className="w-[160px] rounded-none bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Add Request
            {/* <span className="h-[18px] w-[18px] mr-2 rounded-full bg-white text-primary"> */}
            {/* <span/> */}
            <span className="h-[18px] w-[18px] mr-2 rounded-full bg-white text-primary flex items-center justify-center">
              <img alt="plusIcon" src={plusIcon} />
            </span>
            {/* <Plus className="h-[18px] w-[18px] mr-2 rounded-full bg-white text-primary" /> */}
            {/* <HelpCircle className="h-4 w-4 ml-2" /> */}
          </Button>
        </div>
        {/* Filters */}
        {/* <RequestFilters /> */}


        {/* Tabs */}

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="bg-white px-[24px] pb-[15px]"
        >
        <div className="bg-white py-[15px] flex  gap-4  lg:items-center lg:justify-between">
          <h2 className="text-xl font-semibold text-foreground flex-shrink-0">
            All Requests
          </h2>

          {/* Filter Section */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-[125px] cursor-pointer h-[40px] border font-normal flex items-center justify-center rounded-[8px] text-[#344256] text-[15px]">
              Edit
            </div>

            <div className="relative w-[125px] cursor-pointer h-[40px] border font-normal flex items-center justify-center rounded-[8px] text-[#344256] text-[15px]">
              Close
            </div>

            <Select>
              <SelectTrigger className="w-[125px] bg-white">
                <SelectValue placeholder="Assign" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Technician</SelectItem>
                <SelectItem value="smith">Smith</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative w-[125px] cursor-pointer h-[40px] border font-normal flex items-center justify-center rounded-[8px] text-[#344256] text-[15px]">
              Delete
            </div>

            <div className="relative">
              <input
                type="date"
                placeholder="Date"
                className="bg-white border-input border rounded-md px-2 py-2 text-sm w-[125px]"
              />
            </div>
          </div>
        </div>
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

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due By</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.id}</TableCell>
                  <TableCell>{asset.subject}</TableCell>
                  <TableCell>{asset.requester}</TableCell>
                  <TableCell>{asset.technician}</TableCell>
                  <TableCell>{asset.group}</TableCell>
                  <TableCell>{asset.status}</TableCell>
                  <TableCell>{asset.dueBy}</TableCell>
                  <TableCell>{asset.createdAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center justify-center gap-2 hover:bg-gray-100 rounded p-1 w-full">
                        <MoreVertical className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <Select defaultValue="5">
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
            <div className="flex gap-2">
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
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 text-sm font-medium text-[#5C71B6] pt-8 pb-6">
            <span>© 2025 Vertex. All Rights Reserved.</span>
            <img alt="tableBottomIcon" src={tableBottomIcon} />
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
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
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
        </Tabs>

        {/* </main> */}
      </div>
    </MainLayout>
  );
};

export default Requests;
