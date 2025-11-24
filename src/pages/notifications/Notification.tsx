import { useEffect, useState } from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
// import plusIcon from "@/assets/svg-icons/plus-icon.svg";
import { CampaignDialog } from "@/pages/notifications/CampaignDialog"; // adjust path
import { useNavigate } from "react-router-dom";
import { ticketService } from "@/services/ticketService";
import { toast } from "@/hooks/use-toast";
import { notificationService } from "@/services/notificationService";
// import type { CampaignFormData } from "./CampaignDialog";

const initialNotifications = [
  { id: 1, name: "New Task Added", email: true, sms: true, mobileApp: true },
  { id: 2, name: "Task#1 Deleted", email: false, sms: false, mobileApp: false },
  { id: 3, name: "Reset Password", email: true, sms: true, mobileApp: true },
  { id: 4, name: "New Task Added", email: true, sms: true, mobileApp: true },
  { id: 5, name: "New Task Added", email: true, sms: true, mobileApp: true },
];

const Notification = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleToggle = (id: number, channel: "email" | "sms" | "mobileApp") => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [channel]: !item[channel] } : item
      )
    );
  };

  const handleSaveCampaign = (data: any & { channel: string }) => {
    console.log("Campaign Saved:", data);
    setIsDialogOpen(false);
  };


  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [requesterFilter, setRequesterFilter] = useState<string>("all");
  const [technicianFilter, setTechnicianFilter] = useState<string>("all");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState("5");
    const navigate = useNavigate();
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
      loadTickets();
    }, [searchTerm,technicianFilter,requesterFilter, statusFilter, priorityFilter,itemsPerPage,currentPage]);
  
    const loadTickets = async () => {
      setLoading(true);
      try {
        const params: any = {};
        if (searchTerm) params.search = searchTerm;
        if (statusFilter !== "all") params.status_id = statusFilter;
        if (priorityFilter !== "all") params.priority = priorityFilter;
        if (requesterFilter !== "all") params.requested_by = requesterFilter;
        if (technicianFilter !== "all") params.assigned_to = technicianFilter;
        if (currentPage) params.page = currentPage;
        if (itemsPerPage) params.limit = itemsPerPage;
        
  
        const response = await notificationService.getNotification(params);
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

  return (
    <MainLayout title="Setup">
      {/* Header + Create Campaign Button */}
      <div className="mb-6 bg-white px-[24px] py-[15px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-semibold text-foreground flex-shrink-0">
          Notification
        </h2>

        {/* <Button
          className="w-[162px] rounded-none bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2"
          onClick={() => setIsDialogOpen(true)}
        >
          Create Campaign
          <img alt="plusIcon" src={plusIcon} className="h-4 w-4" />
        </Button> */}

        <CampaignDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSave={handleSaveCampaign}
        />
      </div>

      {/* Table */}
      <Card className="px-6 rounded-none border-none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr</TableHead>
              <TableHead>Template Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>SMS</TableHead>
              <TableHead>Mobile App</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Switch
                    checked={item.email}
                    onCheckedChange={() => handleToggle(item.id, "email")}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={item.sms}
                    onCheckedChange={() => handleToggle(item.id, "sms")}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={item.mobileApp}
                    onCheckedChange={() => handleToggle(item.id, "mobileApp")}
                  />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-center gap-2 hover:bg-gray-100 rounded p-1 w-full">
                      <MoreVertical className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination + Rows per page */}
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
      </Card>
    </MainLayout>
  );
};

export default Notification;
