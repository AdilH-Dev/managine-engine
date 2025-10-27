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
import { MoreVertical } from "lucide-react";
import { useState } from "react";

import clearIcon from "@/assets/svg-icons/clear-icon.svg";

import { Search } from "lucide-react";

import searchIcons from "@/assets/svg-icons/search-icons.svg";
import plusIcon from "@/assets/svg-icons/plus-icon.svg";
import tableBottomIcon from "@/assets/svg-icons/table-bottom-icon.svg";

const requesters = [
  {
    id: 1,
    name: "Neil Dibbert",
    employeeId: "1004",
    email: "Fredrick43@yahoo.com",
    department: "IT Department",
    site: "Head Office, Branch A",
  },
  {
    id: 2,
    name: "Keith Bashirian",
    employeeId: "1004",
    email: "Cynthia55@yahoo.com",
    department: "Administration",
    site: "Head Office",
  },
  {
    id: 3,
    name: "Rachael Block",
    employeeId: "1004",
    email: "Joey88@gmail.com",
    department: "Human Resources (HR)",
    site: "Branch A",
  },
  {
    id: 4,
    name: "Jesse Mraz",
    employeeId: "1004",
    email: "Felix22@yahoo.com",
    department: "Finance",
    site: "Head Office",
  },
  {
    id: 5,
    name: "Norma Schmeler",
    employeeId: "1004",
    email: "Elsie53@gmail.com",
    department: "Operations",
    site: "Branch A",
  },
];

const Requester = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MainLayout title="Setup">
      <div className="mb-6 bg-white px-[24px] py-[15px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-semibold text-foreground flex-shrink-0">
          Requester
        </h2>

        {/* Filter Section */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[125px] lg:flex-none lg:w-[125px]">
            <Input placeholder="Search" className="pe-9 bg-white" />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>

          <Select>
            <SelectTrigger className="w-[125px] bg-white">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="hardware">Hardware</SelectItem>
              <SelectItem value="software">Software</SelectItem>
              <SelectItem value="network">Network</SelectItem>
              <SelectItem value="firewall">Firewall</SelectItem>
              <SelectItem value="communication">Communication</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[125px] bg-white">
              <SelectValue placeholder="Sites" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="hardware">Hardware</SelectItem>
              <SelectItem value="software">Software</SelectItem>
              <SelectItem value="network">Network</SelectItem>
              <SelectItem value="firewall">Firewall</SelectItem>
              <SelectItem value="communication">Communication</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            className="bg-[#DEDEDE] hover:bg-[#DEDEDE]/90"
          >
            <img alt="clearIcon" src={clearIcon} />
          </Button>

          <Button
            variant="default"
            size="icon"
            className="bg-primary hover:bg-primary/90"
          >
            <img alt="searchIcons" src={searchIcons} />
          </Button>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            {/* <Button className="bg-primary flex items-center gap-2">
                Add Requester <Plus className="w-4 h-4" />
              </Button> */}
            <Button className="w-[160px] rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
              Add Requester
              <span className="h-[18px] w-[18px] rounded-full bg-white text-primary flex items-center justify-center flex-shrink-0">
                <img alt="plusIcon" src={plusIcon} />
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] bg-white">
            <DialogHeader>
              <DialogTitle>Add Requester</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name*</Label>
                  <Input id="firstName" placeholder="Enter First Name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter Last Name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input id="employeeId" placeholder="Enter Employee ID" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter Email" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter Phone" />
                </div>
                <div>
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
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="site">Site</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Site" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="site1">Head Office</SelectItem>
                      <SelectItem value="site2">Branch A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">IT Department</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" placeholder="Enter Job Title" />
              </div>
              <div>
                  <Label htmlFor="company-logo">Upload Image</Label>
                  <Input
                    id="company-logo"
                    type="file"
                    placeholder="Enter Company Name"
                  />
                </div>
              </div>
                <div>
                  <Label htmlFor="site">Assign Site</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Site" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="site1">Head Office</SelectItem>
                      <SelectItem value="site2">Branch A</SelectItem>
                    </SelectContent>
                  </Select>
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
      <Card className="px-6 rounded-none border-none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr</TableHead>
              <TableHead>Requester</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Site</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requesters.map((requester) => (
              <TableRow key={requester.id}>
                <TableCell>{requester.id}</TableCell>
                <TableCell>{requester.name}</TableCell>
                <TableCell>{requester.employeeId}</TableCell>
                <TableCell>{requester.email}</TableCell>
                <TableCell>{requester.department}</TableCell>
                <TableCell>{requester.site}</TableCell>
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
      </Card>
    </MainLayout>
  );
};

export default Requester;
