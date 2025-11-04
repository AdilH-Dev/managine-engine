import { MainLayout } from "@/components/Layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Plus } from "lucide-react";
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
import { useState } from "react";
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

  return (
    <MainLayout title="Requests">
      <div className="flex items-center justify-between mb-6 bg-white px-[24px] py-[15px]">
        <div className="flex items-center gap-4">
          <span className="text-[20px] font-medium text-[#404040]">
            Request ID
          </span>
          <Input
            defaultValue={`#${id}`}
            className="w-[155px] h-[35px] p-[10px] bg-white"
            readOnly
          />
        </div>
        {/* <div className="flex items-center gap-2"> */}
        {/* <Button className="bg-primary w-[162px] h-[44px] px-[20px] flex justify-between">
          <span className="flex-1">Action</span>

          <MoreVertical className="w-4 h-4" />
        </Button> */}

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
                navigate(`/add-ticket?${id}`);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <Button variant="outline" size="icon">
            </Button> */}
        {/* </div> */}
      </div>
      <Card className="px-[20px] pb-[20px] border-none rounded-none shadow-none">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="detail">Detail</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
          </TabsList> */}

          <TabsList className="mb-[24px] w-full justify-center bg-transparent bg-white rounded-none h-auto p-0">
            <TabsTrigger
              value="detail"
              className="max-w-[300px] flex-1 rounded-none border border-primary data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted/50 data-[state=inactive]:bg-white py-3"
            >
              Detail
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="max-w-[300px] flex-1 rounded-none border border-primary data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted/50 data-[state=inactive]:bg-white py-3"
            >
              History
            </TabsTrigger>
            <TabsTrigger
              value="conversations"
              className="max-w-[300px] flex-1 rounded-none border border-primary data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted/50 data-[state=inactive]:bg-white py-3"
            >
              Conversations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="detail" className="p-[16px] bg-muted">
            <div className="flex items-center gap-4 pb-4 border-b">
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
                  Internet Not Working
                </h3>
                {/* <p className="text-sm text-gray-500">Requested By: Machine</p> */}
              </div>
              {/* <Badge className="bg-blue-500 text-white">Unassigned</Badge> */}
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
                  {/* <SelectItem value="low">Stagging</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
            <div className="bg-white px-[10px] py-[20px]">
              {/* Requester Details */}
              <div>
                <div className="bg-[#31456C] text-white px-4 py-2 font-semibold mb-4">
                  Requester Details
                </div>
                <div className="grid grid-cols-3 gap-6 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Company</p>
                    <p className="text-sm font-medium">Summit Innovations</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Requester</p>
                    <p className="text-sm font-medium">James Smith</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Employee ID</p>
                    <p className="text-sm font-medium">1005</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-sm font-medium">Roy453@hotmail.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="text-sm font-medium">03508464247</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Site</p>
                    <p className="text-sm font-medium">IDC</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Department</p>
                    <p className="text-sm font-medium">Hardware</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Job Title</p>
                    <p className="text-sm font-medium">Branch Manager</p>
                  </div>
                </div>
              </div>

              {/* Ticket Details */}
              <div>
                <div className="bg-[#31456C] text-white px-4 py-2 font-semibold mb-4">
                  Ticket Details
                </div>
                <div className="grid grid-cols-3 gap-6 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Request Type</p>
                    <p className="text-sm font-medium">Service Request</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Impact</p>
                    <p className="text-sm font-medium">Affects User</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Mode</p>
                    <p className="text-sm font-medium">Phone</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Level</p>
                    <p className="text-sm font-medium">Tier 1</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Site</p>
                    <p className="text-sm font-medium">Base Site</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Group</p>
                    <p className="text-sm font-medium">Maintenance</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <p className="text-sm font-medium">Hardware</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Sub-Category</p>
                    <p className="text-sm font-medium">Production Servers</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Asset</p>
                    <p className="text-sm font-medium">
                      Laptop, Mouse, Printer
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Technician</p>
                    <p className="text-sm font-medium">James Edward</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Due Date</p>
                    <p className="text-sm font-medium">11 Sep 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Time Lapse</p>
                    <p className="text-sm font-medium">48 hrs</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">% Completed</p>
                    <p className="text-sm font-medium text-blue-600">
                      60% Completed
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Priority</p>
                    <Badge variant="destructive">● Critical</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Notify By</p>
                    <p className="text-sm font-medium">Email</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Description</p>
                <p className="text-sm text-gray-700">
                  Lorem ipsum dolor sit amet consectetur. Libero nam risus
                  egestas at facilisis nibh iaculis.
                </p>
              </div>

              {/* Attachments */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Attachments</p>
                <div className="inline-block border rounded p-2">
                  <div className="w-20 h-20 bg-gray-200 rounded mb-1"></div>
                  <p className="text-xs text-center">image.png</p>
                </div>
              </div>

              <div className="text-right text-xs text-gray-500 mt-8 mb-4">
                Created By Shahroz Malik
                <br />
                {/* <br /> */}
                21 November 2024 at 03:20 PM
              </div>
              <hr />

              {/* Images */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Images</p>
                <div className="flex gap-2">
                  <div className="w-20 h-20 bg-gray-200 rounded"></div>
                  <div className="w-20 h-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="p-[16px] bg-muted">
            <div className="flex items-center gap-4 pb-4 border-b">
              <div className="w-12 h-12 bg-[var(--status-unassigned)] rounded-full flex items-center justify-center">
                <img
                  alt="ticketIcon"
                  className="h-[30px] w-[30px] my-auto mx-auto"
                  src={ticketIcon}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  Internet Not Working
                </h3>
                <p className="text-sm text-gray-500">
                  Requested By:{" "}
                  <span className="text-[var(--status-unassigned)]">
                    Machine
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  date: "11 Nov 2023 10:58 PM",
                  action: "Request Created",
                  user: "Adam",
                },
                {
                  date: "11 Nov 2023 10:58 PM",
                  action: "Site updated from Base Site to IDC",
                  user: "Adam",
                },
                {
                  date: "11 Nov 2023 10:58 PM",
                  action: "Category updated from Internet to Firewall",
                  user: "Smith",
                },
                {
                  date: "11 Nov 2023 10:58 PM",
                  action: "Request Created By Adam James",
                  user: "Adam",
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center w-1/2">
                      <p className="text-xs text-[#687CFF] mb-1 w-[70px] text-center">
                        {item.date}
                      </p>
                      {/* Vertical Separator */}
                      <div className="h-[45px] w-[1px] bg-[#8C8C8C] mx-3" />
                      <p className="text-sm text-[#404040]">{item.action}</p>
                    </div>
                    <p className="text-xs text-gray-500 w-1/2">
                      Performed By{" "}
                      <span className="font-medium text-gray-900">
                        {item.user}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="conversations" className="p-[16px] bg-muted">
            <div className="flex items-center justify-between pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--status-unassigned)] rounded-full flex items-center justify-center">
                  <img
                    alt="ticketIcon"
                    className="h-[30px] w-[30px] my-auto mx-auto"
                    src={ticketIcon}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Internet Not Working
                  </h3>
                  <p className="text-sm text-gray-500">Requested By: Machine</p>
                </div>
              </div>

              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary flex items-center gap-2">
                    Add Note <Plus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-[20px] font-bold">
                      Add Note
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-1">
                      <Label htmlFor="note">Note *</Label>
                      {/* <Input id="note" placeholder="Enter" /> */}
                      <Textarea
                        id="note"
                        placeholder="Enter your note here..."
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Label htmlFor="note2" className="mb-0">
                        Show this note to requester
                      </Label>
                      <Switch id="note2" />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                      <Button
                        variant="outline"
                        className="bg-white w-[140px] h-[44px]"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-primary w-[140px] h-[44px]"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {/* {[1, 2, 3, 4].map((index) => (
                <div key={index} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=James${index}`} />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-sm text-gray-900">James Smith</span>
                      <span className="text-xs text-gray-500">8 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      The hardware issue has been identified and reported for immediate attention. Further diagnostics are required to determine the root cause and resolve it efficiently.
                    </p>
                  </div>
                </div>
              ))} */}
              {/* <> */}
              {comments.map((comment, index) => (
                <div
                  key={comment.id}
                  className={`flex gap-4 bg-white p-4 border-[4px] rounded-[10px] ${
                    index === comments.length - 1
                      ? "border-[#BEE4FF]" // ✅ last comment color
                      : "border-[#F9E8A6]" // others
                  }`}
                >
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.avatar}`}
                    />
                    <AvatarFallback>{comment.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-sm text-gray-900">
                        {comment.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.text}</p>
                    <span className="text-xs text-gray-500">
                      {comment.time}
                    </span>
                  </div>
                </div>
              ))}
              {/* </> */}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </MainLayout>
  );
};

export default RequestDetail;
