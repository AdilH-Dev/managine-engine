import { useState } from "react";
// import { AppHeader } from "@/components/AppHeader";
// import { ActivityLogFilters } from "@/components/ActivityLogFilters";
import { ActivityLogItem } from "@/components/ActivityLogItem";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MainLayout } from "@/components/Layout/MainLayout";

import searchIcons from "@/assets/svg-icons/search-icons.svg";
import clearIcon from "@/assets/svg-icons/clear-icon.svg";
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input";

// const activityData = [
//   {
//     id: "1",
//     action: "Request added",
//     description: "Internet Not Working",
//     updatedBy: "Smith",
//     date: "Sep 25, 2025 03:16 PM",
//     priority: "critical" as const,
//     status: "Unassigned" as const,
//     avatarColor: "bg-[hsl(var(--status-blue))]",
//   },
//   {
//     id: "2",
//     action: "Request added",
//     description: "Internet Not Working",
//     updatedBy: "Smith",
//     date: "Sep 25, 2025 03:16 PM",
//     priority: "high" as const,
//     status: "Unassigned" as const,
//     avatarColor: "bg-[hsl(var(--status-purple))]",
//   },
//   {
//     id: "3",
//     action: "Request added",
//     description: "Internet Not Working",
//     updatedBy: "Smith",
//     date: "Sep 25, 2025 03:16 PM",
//     priority: "critical" as const,
//     status: "Unassigned" as const,
//     avatarColor: "bg-[hsl(var(--status-brown))]",
//   },
//   {
//     id: "4",
//     action: "Request added",
//     description: "Internet Not Working",
//     updatedBy: "Smith",
//     date: "Sep 25, 2025 03:16 PM",
//     priority: "medium" as const,
//     status: "Unassigned" as const,
//     avatarColor: "bg-[hsl(var(--status-green))]",
//   },
//   {
//     id: "5",
//     action: "Request added",
//     description: "Internet Not Working",
//     updatedBy: "Smith",
//     date: "Sep 25, 2025 03:16 PM",
//     priority: "low" as const,
//     status: "Unassigned" as const,
//     avatarColor: "bg-[hsl(var(--status-orange))]",
//   },
//   {
//     id: "6",
//     action: "Request added",
//     description: "Internet Not Working",
//     updatedBy: "Smith",
//     date: "Sep 25, 2025 03:16 PM",
//     priority: "low" as const,
//     status: "Unassigned" as const,
//     avatarColor: "bg-[hsl(var(--status-red))]",
//   },
  
// ];

const activityData = [
  {
    id: "1",
    action: "Request created",
    description: "Firewall rule update required for new branch network",
    updatedBy: "Smith",
    date: "Oct 12, 2025 09:15 AM",
    priority: "critical" as const,
    status: "Unassigned" as const,
    avatarColor: "bg-[var(--status-unassigned)]",
  },
  {
    id: "2",
    action: "Assigned to technician",
    description: "Email server not responding, needs reboot",
    updatedBy: "Johnson",
    date: "Oct 12, 2025 10:42 AM",
    priority: "high" as const,
    status: "Assigned" as const,
    avatarColor: "bg-[var(--status-assigned)]",
  },
  {
    id: "3",
    action: "Request in progress",
    description: "VPN configuration setup for remote team access",
    updatedBy: "Davis",
    date: "Oct 12, 2025 11:05 AM",
    priority: "medium" as const,
    status: "In Progress" as const,
    avatarColor: "bg-[var(--status-in-progress)]",
  },
  {
    id: "4",
    action: "Request updated",
    description: "System audit logs reviewed and cleaned",
    updatedBy: "Taylor",
    date: "Oct 12, 2025 12:18 PM",
    priority: "low" as const,
    status: "In Progress" as const,
    avatarColor: "bg-[var(--status-in-progress)]",
  },
  {
    id: "5",
    action: "Task completed",
    description: "Internet connectivity issue resolved at HQ",
    updatedBy: "Anderson",
    date: "Oct 12, 2025 01:45 PM",
    priority: "medium" as const,
    status: "Completed" as const,
    avatarColor: "bg-[var(--status-completed)]",
  },
  {
    id: "6",
    action: "Request verified",
    description: "New user account created and verified in Active Directory",
    updatedBy: "Brown",
    date: "Oct 12, 2025 02:22 PM",
    priority: "low" as const,
    status: "Completed" as const,
    avatarColor: "bg-[var(--status-completed)]",
  },
];

const ActivityLog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(activityData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = activityData.slice(startIndex, endIndex);

  return (
    <MainLayout title="Activity Log">
    <div className="space-y-6">
      {/* <AppHeader 
        title="Activity Log" 
        onBack={() => window.history.back()}
      /> */}

      {/* <main className="max-w-7xl mx-auto p-6"> */}
        {/* <ActivityLogFilters /> */}

         <div className="mb-6 bg-white px-[24px] py-[15px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <h2 className="text-xl font-semibold text-foreground flex-shrink-0">
                      Activity Log
                    </h2>
        
                  {/* Filter Section */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative flex-1 min-w-[125px] lg:flex-none lg:w-[125px]">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search By"
                        className="pl-9 bg-white"
                      />
                    </div>
        
                    <Select>
                      <SelectTrigger className="w-[125px] bg-white">
                        <SelectValue placeholder="Updated By" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {/* <SelectItem value="all">All Requesters</SelectItem> */}
                        <SelectItem value="smith">Smith</SelectItem>
                      </SelectContent>
                    </Select>
        
                    <Select>
                      <SelectTrigger className="w-[125px] bg-white">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {/* <SelectItem value="all">All Categories</SelectItem> */}
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
        
                    <Select>
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
                    </Select>
        
                     <div className="relative">
                            {/* <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /> */}
                            {/* <Input
                              type="date"
                              placeholder="Date"
                              className="w-[140px] bg-white border-input"
                            /> */}
                             <input type="date" placeholder="Date" className="bg-white border-input border rounded-md px-2 py-2 text-sm w-[125px]" />
                          </div>
        
                    <Button variant="outline" size="icon" className="bg-[#DEDEDE] hover:bg-[#DEDEDE]/90 rounded-none">
                      <img alt="clearIcon" src={clearIcon}/>
                    </Button>
        
                    <Button variant="default" size="icon" className="bg-primary hover:bg-primary/90 rounded-none ">
                      <img alt="searchIcons" src={searchIcons}/>
                    </Button>
                  </div>
                </div>

        <div className="space-y-3 mb-6 bg-white p-6">
          {currentItems.map((item) => (
            <ActivityLogItem key={item.id} {...item} />
          ))}
        <div className="flex items-center justify-between pt-3">
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        </div>

      {/* </main> */}
    </div>
    </MainLayout>
  );
};

export default ActivityLog;