import { MainLayout } from "@/components/Layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// import { Plus } from "lucide-react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import plusIcon from "@/assets/svg-icons/plus-icon.svg";
import tableBottomIcon from "@/assets/svg-icons/table-bottom-icon.svg";

const companies = [
  {
    id: 1,
    name: "Summit Innovations",
    email: "Fredrick43@yahoo.com",
    description: "--",
  },
  {
    id: 2,
    name: "BlueWave Technologies",
    email: "Cynthia58@yahoo.com",
    description: "240 Arvilla Road, Bellflower 56827",
  },
  {
    id: 3,
    name: "PrimeCore Systems",
    email: "Joey988@gmail.com",
    description: "28080 Medhurst Falls, Merritvew 75082",
  },
  {
    id: 4,
    name: "NextGen Solutions",
    email: "Felix72@yahoo.com",
    description: "584 Gisselle Garden, Bossier City 69701-4867",
  },
  {
    id: 5,
    name: "Elevate Enterprises",
    email: "Elsie53@gmail.com",
    description: "12684 N Poplar Street, South Darren 13411-3013",
  },
];

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const navigate = useNavigate();

  return (
    <MainLayout title="Setup">
      <div className="mb-6 bg-white px-[24px] py-[15px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-semibold text-foreground flex-shrink-0">
          Notification
        </h2>

        {/* Filter Section */}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            {/* <Button className="bg-primary flex items-center gap-2">
                Add Company <Plus className="w-4 h-4" />
              </Button> */}
            <Button className="w-[162px] rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
              Create Campaign
              <span className="h-[18px] w-[18px] flex-shrink-0 rounded-full bg-white text-primary flex items-center justify-center">
                <img alt="plusIcon" src={plusIcon} />
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] bg-white">
            <DialogHeader>
              <DialogTitle>Add Company</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Company Name*</Label>
                  <Input id="name" placeholder="Enter Company Name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter Email" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-logo">Company Logo</Label>
                  <Input
                    id="company-logo"
                    type="file"
                    placeholder="Enter Company Name"
                  />
                </div>
                {/* <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter Email" />
                  </div> */}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter" />
              </div>
              <div>
                <Label htmlFor="services-affected">Services Affected</Label>
                <Input id="services-affected" placeholder="Enter" />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  variant="outline"
                  className="bg-white w-[140px] h-[44px]"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primary w-[140px] h-[44px]"
                  onClick={() => setIsOpen(false)}
                >
                  Add
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
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
            {companies.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
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
            <Button variant="outline" size="sm">&lt;</Button>
            <Button size="sm" className="bg-primary">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">4</Button>
            <Button variant="outline" size="sm">&gt;</Button>
          </div>
        </div>

       <div className="flex items-center justify-end gap-2 text-sm font-medium text-[#5C71B6] pt-8 pb-6">
          <span>© 2025 Vertex. All Rights Reserved.</span>
          <img alt="tableBottomIcon" src={tableBottomIcon} />
        </div>
      </Card>
    </MainLayout>
  );
};

export default Notification;
