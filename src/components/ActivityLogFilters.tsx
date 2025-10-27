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

export const ActivityLogFilters = () => {
  return (
    <div className="bg-card p-4 rounded-lg border border-border mb-6">
      <h2 className="text-base font-semibold text-foreground mb-4">Activity Log</h2>
      
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by"
            className="pl-9 bg-background"
          />
        </div>

        <Select>
          <SelectTrigger className="w-[140px] bg-background">
            <SelectValue placeholder="Updated By" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="smith">Smith</SelectItem>
            <SelectItem value="jones">Jones</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[120px] bg-background">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[120px] bg-background">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          defaultValue="2025-01-01"
          className="w-[140px] bg-background"
        />

        <Button variant="ghost" size="icon" className="bg-muted hover:bg-muted/80">
          <Calendar className="h-4 w-4" />
        </Button>

        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};
