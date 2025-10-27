import { Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const RequestFilters = () => {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search By"
          className="pl-10 bg-background border-input"
        />
      </div>

      <Select>
        <SelectTrigger className="w-[140px] bg-background border-input">
          <SelectValue placeholder="Requestor" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="smith">Smith</SelectItem>
          <SelectItem value="john">John</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[140px] bg-background border-input">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="firewall">Firewall</SelectItem>
          <SelectItem value="network">Network</SelectItem>
          <SelectItem value="hardware">Hardware</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[140px] bg-background border-input">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="critical">Critical</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="date"
          placeholder="Date"
          className="pl-10 w-[160px] bg-background border-input"
        />
      </div>

      <Button size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};