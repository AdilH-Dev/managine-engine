import { Avatar } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ticketIcon from "@/assets/svg-icons/ticket-icon.svg";

interface ActivityLogItemProps {
  id: string;
  action: string;
  description: string;
  updatedBy: string;
  date: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "Unassigned" | "Assigned" | "In Progress" | "Completed";
  avatarColor: string;
}

// const priorityColors = {
//   Critical: "bg-[hsl(var(--priority-critical))]",
//   High: "bg-[hsl(var(--priority-high))]",
//   Medium: "bg-[hsl(var(--priority-medium))]",
//   Low: "bg-[hsl(var(--priority-low))]",
// };

export const ActivityLogItem = ({
  action,
  description,
  updatedBy,
  date,
  priority,
  status,
  avatarColor,
}: ActivityLogItemProps) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-background">
      <div className="flex flex-col items-center gap-1 min-w-[70px]">
        <Avatar className={cn("h-[20px] w-[20px] rounded-full", avatarColor)}>
          <img src={ticketIcon} alt="Ticket Icon" className="h-3 w-3 my-auto mx-auto" />
        </Avatar>
        <span className="text-xs text-foreground">{status}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-1">
          <p className="text-sm text-foreground">
            <span className="font-medium text-muted-foreground">{action}</span>{" "}
            <span className="font-semibold text-foreground">- {description}</span>
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
          <span>
            Updated By: <span className="font-medium text-foreground">{updatedBy}</span>
          </span>
          <span>On: <span className="font-medium text-foreground">{date}</span></span>
          <div className="flex items-center gap-1.5">
            <span>Priority:</span>
            {/* <div className="flex items-center gap-1">
              <span className={cn("h-2 w-2 rounded-full", priorityColors[priority])} />
              <Badge variant="outline" className="text-xs font-normal">
                {priority}
              </Badge>
            </div> */}
            <div className={`flex items-start gap-1`}
             style={{ color: `var(--priority-${priority.toLowerCase()})` }}
            >
                <span className={`text-sm`}>
                  ●
                </span>
                <p
                  className={`text-sm capitalize`}
                >
                  {priority}
                </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
