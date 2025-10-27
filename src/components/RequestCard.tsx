import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import plusIcon from "@/assets/svg-icons/plus-add.svg";
import createdAtIcon from "@/assets/svg-icons/created-at.svg";
import Requestor from "@/assets/svg-icons/requestor.svg";
import Category from "@/assets/svg-icons/category.svg";
import SubjectIcon from "@/assets/svg-icons/subject.svg";
import PriorityIcon from "@/assets/svg-icons/priority.svg";
import { useNavigate } from "react-router-dom";
import ticketIcon from "@/assets/svg-icons/ticket-icon.svg";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import dumy from "@/assets/images/dumy.jpg";

interface RequestCardProps {
  id: string;
  createdAt: string;
  requestor: string;
  category: string;
  subject: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  completion: string;
  assign: string;
  status: "Unassigned" | "Assigned" | "In Progress" | "Completed";
}

export const RequestCard = ({
  id,
  createdAt,
  requestor,
  category,
  subject,
  priority,
  completion,
  assign,
  status
}: RequestCardProps) => {
  const navigate = useNavigate();
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "text-[#E22D1F]";
      case "high":
        return "text-orange-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="bg-muted p-4 hover:shadow-sm transition-shadow">
      {/* Request ID */}
      <div className="text-[14px] font-medium mb-4">Request ID : {id}</div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {/* Action Button */}
          <div className="relative flex-shrink-0 mt-3 ">
            {status != "Unassigned" ? <img alt="dumy" className="w-[50px] h-[50px] rounded-full" src={dumy} /> :
            <img alt="plusIcon" src={plusIcon} />}
            <p className="text-center text-sm mt-1">{status != "Unassigned" ? assign:"--"}</p>
          </div>
          <div className="relative flex flex-col items-center justify-between h-20">
            {/* 🔵 Top circle */}
            <div className="absolute -top-1 right-1/2 translate-x-1/2 flex items-center justify-center">
              <Avatar
                className={cn(
                  "h-[15px] w-[15px] rounded-full",
                  "bg-[var(--status-unassigned)]"
                )}
              >
                <img
                  src={ticketIcon}
                  alt="Ticket Icon"
                  className="h-[9px] w-[9px] my-auto mx-auto"
                />
              </Avatar>
            </div>

            {/* 🟣 Vertical connecting line */}
            <div className="absolute top-[14px] bottom-[6px] left-1/2 -translate-x-1/2 w-[1px] bg-primary" />

            {/* 🟢 Bottom circle */}
            <div className="absolute -bottom-1 right-1/2 translate-x-1/2 h-2 w-2 rounded-full bg-primary" />
          </div>

          {/* Request Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 flex-1 cursor-pointer"
           onClick={() => {
                  navigate(`/request/${id}`);
                }}
          >
            {/* Created At */}
            <div className="flex items-start gap-2 flex-col">
              <div className="flex items-start gap-2">
                <img alt="createdAtIcon" src={createdAtIcon} />
                <p className="text-xs text-muted-foreground mb-1">Created At</p>
              </div>
              <p className="text-sm">{createdAt}</p>
            </div>

            {/* Requester */}
            <div className="flex items-start gap-2 flex-col">
              <div className="flex items-start gap-2">
                <img alt="requestorIcon" src={Requestor} />
                <p className="text-xs text-muted-foreground mb-1">Requester</p>
              </div>
              <p className="text-sm">{requestor}</p>
            </div>

            {/* Category */}
            <div className="flex items-start gap-2 flex-col">
              <div className="flex items-start gap-2">
                <img alt="categoryIcon" src={Category} />
                <p className="text-xs text-muted-foreground mb-1">Category</p>
              </div>
              <p className="text-sm">{category}</p>
            </div>

            {/* Subject */}
            <div className="flex items-start gap-2 flex-col">
              <div className="flex items-start gap-2">
                <img alt="subjectIcon" src={SubjectIcon} />
                <p className="text-xs text-muted-foreground mb-1">Subject</p>
              </div>
              {/* <p className="text-sm">{subject}</p> */}
              <p className="text-sm line-clamp-2 break-words">{subject}</p>
            </div>

            {/* Priority */}
            <div className="flex items-start gap-2 flex-col">
              <div className="flex items-start gap-2">
                <img alt="priorityIcon" src={PriorityIcon} />
                <p className="text-xs text-muted-foreground mb-1">Priority</p>
              </div>
              <div className="flex items-start gap-1">
                <span className={`text-sm ${getPriorityColor(priority)}`}>
                  ●
                </span>
                <p
                  className={`text-sm ${getPriorityColor(priority)} capitalize`}
                >
                  {priority}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex justify-between gap-3 flex-shrink-0 flex-col">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[var(--status-completed)] hover:bg-[var(--status-completed)] gap-2 w-[110px] h-7 px-[10px] text-[12px] rounded-none">
                View Details
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/request/${id}`);
                }}
              >
                View Full Details
              </DropdownMenuItem>
              <DropdownMenuItem 
              onClick={() => {
                  navigate(`/add-ticket?id=${id}`);
                }}
              >Edit</DropdownMenuItem>
              <DropdownMenuItem>Add Comments</DropdownMenuItem>
              <DropdownMenuItem>Worklog</DropdownMenuItem>
              <DropdownMenuItem>Request History</DropdownMenuItem>
              {/* <DropdownMenuItem className="text-destructive">
                Delete Request
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="mt-[30px]">
            {/* 🔹 Progress Bar */}
  <div className="w-full h-[6px] bg-[#D9D9D9] rounded-full overflow-hidden border">
    <div
      className="h-full transition-all duration-500"
      style={{ width: `${status != "Unassigned"? completion || 0 :0}%`,backgroundColor: `var(--status-${status.toLowerCase()})` }}
    />
  </div>

          <p className="text-sm text-muted-foreground whitespace-nowrap text-center">
            {status != "Unassigned"? completion || 0 :"0"}% completed
          </p>
          </div>

        </div>
      </div>
    </div>
  );
};
