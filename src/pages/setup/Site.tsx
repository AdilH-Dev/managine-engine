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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import plusIcon from "@/assets/svg-icons/plus-icon.svg";
import tableBottomIcon from "@/assets/svg-icons/table-bottom-icon.svg";
import clearIcon from "@/assets/svg-icons/clear-icon.svg";
import { Search } from "lucide-react";
import searchIcons from "@/assets/svg-icons/search-icons.svg";

const sites = [
  {
    id: 1,
    company: "Summit Innovations",
    siteName: "Head Office",
    country: "Pakistan",
    city: "Wilson",
    address: "45409 Schimmel Lodge...",
  },
  {
    id: 2,
    company: "BlueWave Technologies",
    siteName: "Head Office",
    country: "United States",
    city: "Brooklyn Park",
    address: "240 Arvilla Road, Bellflower 56927",
  },
  {
    id: 3,
    company: "PrimeCore Systems",
    siteName: "Branch A",
    country: "United Kingdom",
    city: "Lake Charlotte",
    address: "28080 Medhurst Falls, Merritview 75082",
  },
  {
    id: 4,
    company: "NextGen Solutions",
    siteName: "Head Office",
    country: "Canada",
    city: "Marquardttown",
    address: "584 Gisselle Garden, Bossier City",
  },
  {
    id: 5,
    company: "Elevate Enterprises",
    siteName: "Branch A",
    country: "United Arab Emirates (UAE)",
    city: "Methurstborough",
    address: "12684 N Poplar Street, South Darren...",
  },
];

const Site = () => {
  const [isOpen, setIsOpen] = useState(false);

  const countryCityMap = {
    Pakistan: [
      "Karachi",
      "Lahore",
      "Islamabad",
      "Rawalpindi",
      "Faisalabad",
      "Multan",
      "Peshawar",
      "Quetta",
      "Sialkot",
      "Hyderabad",
    ],
    India: [
      "Delhi",
      "Mumbai",
      "Bangalore",
      "Chennai",
      "Kolkata",
      "Hyderabad",
      "Pune",
      "Ahmedabad",
    ],
    USA: [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "San Francisco",
      "Miami",
    ],
    UK: ["London", "Manchester", "Birmingham", "Liverpool", "Leeds"],
    UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah"],
  };

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const handleCountryChange = (value) => {
    setCountry(value);
    setCity(""); // reset city when country changes
  };

  return (
    <MainLayout title="Setup">
      <div className="mb-6 bg-white px-[24px] py-[15px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-semibold text-foreground flex-shrink-0">
          Site
        </h2>

        {/* Filter Section */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[125px] lg:flex-none lg:w-[125px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search" className="pl-9 bg-white" />
          </div>

          <Select>
            <SelectTrigger className="w-[125px] bg-white">
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="summit">Summit Innovations</SelectItem>
              <SelectItem value="bluewave">BlueWave Technologies</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[125px] bg-white">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="karachi">Karachi</SelectItem>
              <SelectItem value="lahore">Lahore</SelectItem>
              <SelectItem value="islamabad">Islamabad</SelectItem>
              <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
              <SelectItem value="faisalabad">Faisalabad</SelectItem>
              <SelectItem value="multan">Multan</SelectItem>
              <SelectItem value="quetta">Quetta</SelectItem>
              <SelectItem value="peshawar">Peshawar</SelectItem>
              <SelectItem value="sialkot">Sialkot</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
              <SelectItem value="karachi">Karachi</SelectItem>
              <SelectItem value="lahore">Lahore</SelectItem>
              <SelectItem value="islamabad">Islamabad</SelectItem>
              <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
              <SelectItem value="faisalabad">Faisalabad</SelectItem>
              <SelectItem value="multan">Multan</SelectItem>
              <SelectItem value="quetta">Quetta</SelectItem>
              <SelectItem value="peshawar">Peshawar</SelectItem>
              <SelectItem value="sialkot">Sialkot</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
              <SelectItem value="karachi">Karachi</SelectItem>
              <SelectItem value="lahore">Lahore</SelectItem>
              <SelectItem value="islamabad">Islamabad</SelectItem>
              <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
              <SelectItem value="faisalabad">Faisalabad</SelectItem>
              <SelectItem value="multan">Multan</SelectItem>
              <SelectItem value="quetta">Quetta</SelectItem>
              <SelectItem value="peshawar">Peshawar</SelectItem>
              <SelectItem value="sialkot">Sialkot</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
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
                Add Site <Plus className="w-4 h-4" />
              </Button> */}
            <Button className="w-[160px] rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
              Add Site
              <span className="h-[18px] w-[18px] mr-2 rounded-full bg-white text-primary flex items-center justify-center">
                <img alt="plusIcon" src={plusIcon} />
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-[20px] font-bold">
                Add Site
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company*</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summit">Summit Innovations</SelectItem>
                      <SelectItem value="bluewave">
                        BlueWave Technologies
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="siteName">Site Name*</Label>
                  <Input id="siteName" placeholder="Enter Site Name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country*</Label>
                  <Select onValueChange={handleCountryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {Object.keys(countryCityMap).map((countryName) => (
                        <SelectItem key={countryName} value={countryName}>
                          {countryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="city">City*</Label>
                  <Select
                    disabled={!country}
                    onValueChange={setCity}
                    value={city}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          country ? "Select City" : "Select Country First"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {country &&
                        countryCityMap[country].map((cityName) => (
                          <SelectItem key={cityName} value={cityName}>
                            {cityName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address*</Label>
                <Input id="address" placeholder="Enter" />
              </div>
              <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                Map Preview
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  variant="outline"
                  className="bg-white w-[140px] h-[44px]"
                  onClick={() => {
                    setIsOpen(false);
                    setCountry("");
                    setCity("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primary w-[140px] h-[44px]"
                  onClick={() => {
                    setIsOpen(false);
                    setCountry("");
                    setCity("");
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
              <TableHead >Sr</TableHead>
              <TableHead >Company</TableHead>
              <TableHead >Site Name</TableHead>
              <TableHead >Country</TableHead>
              <TableHead >City</TableHead>
              <TableHead >Address</TableHead>
              <TableHead >Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sites.map((site) => (
              <TableRow key={site.id}>
                <TableCell>{site.id}</TableCell>
                <TableCell>{site.company}</TableCell>
                <TableCell>{site.siteName}</TableCell>
                <TableCell>{site.country}</TableCell>
                <TableCell>{site.city}</TableCell>
                <TableCell>{site.address}</TableCell>
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

export default Site;
