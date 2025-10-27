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
import searchIcons from "@/assets/svg-icons/search-icons.svg";
import clearIcon from "@/assets/svg-icons/clear-icon.svg";
import { MoreVertical, Search } from "lucide-react";
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

const Company = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const navigate = useNavigate();

  return (
    <MainLayout title="Setup">
      <div className="mb-6 bg-white px-[24px] py-[15px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-semibold text-foreground flex-shrink-0">
          Company
        </h2>

        {/* Filter Section */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[190px] lg:flex-none lg:w-[125px]">
            <Input placeholder="Search" className="pr-9 bg-white" />
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
                Add Company <Plus className="w-4 h-4" />
              </Button> */}
            <Button className="w-[160px] rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
              Add Company
              <span className="h-[18px] w-[18px] mr-2 rounded-full bg-white text-primary flex items-center justify-center">
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b hover:bg-gray-50">
              <tr>
                <th className="px-5 py-[14px] text-left text-[16px] font-medium text-[#2B2B2B] tracking-wider">
                  Sr
                </th>
                <th className="px-5 py-[14px] text-left text-[16px] font-medium text-[#2B2B2B] tracking-wider">
                  Company
                </th>
                <th className="px-5 py-[14px] text-left text-[16px] font-medium text-[#2B2B2B] tracking-wider">
                  Email
                </th>
                <th className="px-5 py-[14px] text-left text-[16px] font-medium text-[#2B2B2B] tracking-wider">
                  Description
                </th>
                <th className="px-5 py-[14px] text-left text-[16px] font-medium text-[#2B2B2B] tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-5 py-[14px] whitespace-nowrap text-sm text-[#404040]">
                    {company.id}
                  </td>
                  <td className="px-5 py-[14px] whitespace-nowrap text-sm text-[#404040]">
                    {company.name}
                  </td>
                  <td className="px-5 py-[14px] whitespace-nowrap text-sm text-[#404040]">
                    {company.email}
                  </td>
                  <td className="px-5 py-[14px] text-sm text-[#404040]">
                    {company.description}
                  </td>
                  <td className="px-5 py-[14px] whitespace-nowrap text-sm text-[#404040] text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center justify-center gap-2 hover:bg-gray-100 rounded p-1 w-full">
                        <MoreVertical className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select className="border rounded px-2 py-1 text-sm">
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </select>
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

export default Company;
