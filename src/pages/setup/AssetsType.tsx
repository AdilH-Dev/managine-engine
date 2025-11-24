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
import { Plus, MoreVertical, Calendar } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import clearIcon from "@/assets/svg-icons/clear-icon.svg";

import { Search } from "lucide-react";

import searchIcons from "@/assets/svg-icons/search-icons.svg";
import plusIcon from "@/assets/svg-icons/plus-icon.svg";

// const assets = [
//   {
//     id: 1,
//     company: "Summit Innovations",
//     assetType: "Laptop",
//     assetName: "HP EliteBook",
//     assetId: "22-03-0001",
//     price: "Rs 60,000",
//     warranty: "28-08-2024",
//   },
//   {
//     id: 2,
//     company: "BlueWave Technologies",
//     assetType: "Tablet",
//     assetName: "HP LaserJet Printer",
//     assetId: "22-03-0001",
//     price: "Rs 60,000",
//     warranty: "28-08-2024",
//   },
//   {
//     id: 3,
//     company: "PrimeCore Systems",
//     assetType: "Desktop",
//     assetName: "Lenovo ThinkPad",
//     assetId: "22-03-0001",
//     price: "Rs 60,000",
//     warranty: "28-08-2024",
//   },
//   {
//     id: 4,
//     company: "NextGen Solutions",
//     assetType: "Monitor",
//     assetName: "HP EliteBook",
//     assetId: "22-03-0001",
//     price: "Rs 60,000",
//     warranty: "28-08-2024",
//   },
//   {
//     id: 5,
//     company: "Elevate Enterprises",
//     assetType: "Laptop",
//     assetName: "HP EliteBook",
//     assetId: "22-03-0001",
//     price: "Rs 60,000",
//     warranty: "28-08-2024",
//   },
// ];
const assets = [
  {
    id: 1,
    name: "HP EliteBook",
    category: "Laptop",
    description: "Issued by Summit Innovations",
  },
  {
    id: 2,
    name: "HP LaserJet Printer",
    category: "Tablet",
    description: "Provided by BlueWave Technologies",
  },
  {
    id: 3,
    name: "Lenovo ThinkPad",
    category: "Desktop",
    description: "Assigned to PrimeCore Systems",
  },
  {
    id: 4,
    name: "HP EliteBook Monitor",
    category: "Monitor",
    description: "Used by NextGen Solutions",
  },
  {
    id: 5,
    name: "HP EliteBook",
    category: "Laptop",
    description: "Allocated to Elevate Enterprises",
  },
];

const AssetsType = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MainLayout title="Setup">
      <div className="mb-6 bg-white px-[24px] py-[15px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-semibold text-foreground flex-shrink-0">
          Asset Type
        </h2>

        {/* Filter Section */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[125x] lg:flex-none lg:w-[190px]">
            <Input placeholder="Search" className="pe-9 bg-white" />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>

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
                Add Asset <Plus className="w-4 h-4" />
              </Button> */}
            <Button className="w-[160px] rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
              Add Asset Type
              <span className="h-[18px] w-[18px] rounded-full bg-white text-primary flex items-center justify-center flex-shrink-0">
                <img alt="plusIcon" src={plusIcon} />
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] bg-white">
            <DialogHeader>
              <DialogTitle>Add Asset Type</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="assetName">Name*</Label>
                  <Input id="assetName" placeholder="Enter Name" />
                </div>
                <div>
                  <Label htmlFor="category">Category*</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="network">Network</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Enter" />
                </div>
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
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.id}</TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.category}</TableCell>
                <TableCell>{asset.description}</TableCell>
                {/* <TableCell>{asset.assetId}</TableCell>
                <TableCell>{asset.price}</TableCell>
                <TableCell>{asset.warranty}</TableCell> */}
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
      </Card>
    </MainLayout>
  );
};

export default AssetsType;
