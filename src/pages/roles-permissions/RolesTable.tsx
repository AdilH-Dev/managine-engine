import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/pages/roles-permissions/rbac";
import { Switch } from "@/components/ui/switch";
import { MoreVertical, ChevronLeft, ChevronRight, ChevronDown, ChevronRight as ChevronRightIcon, Plus } from "lucide-react";

interface RolesTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (roleId: string) => void;
  onAddChild: (parentId: string) => void;
  onToggle: (roleId: string, active: boolean) => void;
}

export const RolesTable = ({ roles, onEdit, onDelete, onAddChild, onToggle }: RolesTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [expandedRoles, setExpandedRoles] = useState<Set<string>>(new Set());

  const toggleExpanded = (roleId: string) => {
    const newExpanded = new Set(expandedRoles);
    if (newExpanded.has(roleId)) {
      newExpanded.delete(roleId);
    } else {
      newExpanded.add(roleId);
    }
    setExpandedRoles(newExpanded);
  };

  const renderRoleRow = (role: Role, level: number = 0, index: number) => {
    const hasChildren = role.children && role.children.length > 0;
    const isExpanded = expandedRoles.has(role.id);

    return (
      <>
        <TableRow key={role.id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>
            <div className="flex items-center gap-2" style={{ paddingLeft: `${level * 24}px` }}>
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => toggleExpanded(role.id)}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4" />
                  )}
                </Button>
              )}
              {!hasChildren && <div className="w-6" />}
              <span className="font-medium">{role.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-2"
                onClick={() => onAddChild(role.id)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center justify-center">
              <Switch
                checked={role.active}
                onCheckedChange={(checked) => onToggle(role.id, checked)}
              />
            </div>
          </TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(role)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(role.id)} className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        {hasChildren && isExpanded && role.children?.map((child, childIndex) => renderRoleRow(child, level + 1, childIndex))}
      </>
    );
  };

  const flattenRoles = (roles: Role[]): Role[] => {
    const result: Role[] = [];
    const flatten = (roleList: Role[]) => {
      roleList.forEach((role) => {
        result.push(role);
        if (role.children && role.children.length > 0) {
          flatten(role.children);
        }
      });
    };
    flatten(roles);
    return result;
  };

  const topLevelRoles = roles.filter((r) => !r.parentId);
  const totalPages = Math.ceil(topLevelRoles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRoles = topLevelRoles.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-16">Sr</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-32 text-center">Status</TableHead>
              <TableHead className="w-24 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRoles.map((role, index) => renderRoleRow(role, 0, startIndex + index))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(parseInt(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">Per Page</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: Math.min(4, totalPages) }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="icon"
              onClick={() => goToPage(page)}
              className="w-10"
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
