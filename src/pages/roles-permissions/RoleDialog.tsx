import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Role, Permission } from "@/pages/roles-permissions/rbac";
import { ChevronDown, ChevronRight as ChevronRightIcon, X } from "lucide-react";

interface RoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role?: Role | null;
  onSave: (role: Omit<Role, "id" | "children"> & { id?: string }) => void;
}

const defaultModules = [
  {
    id: "m1",
    module: "Dashboard",
    children: [
      { id: "m1-1", module: "Analytics" },
      { id: "m1-2", module: "Reports" },
    ],
  },
  {
    id: "m2",
    module: "Task",
    children: [
      { id: "m2-1", module: "Create Task" },
      { id: "m2-2", module: "View Tasks" },
      { id: "m2-3", module: "Assign Tasks" },
    ],
  },
  {
    id: "m3",
    module: "Agent",
    children: [
      { id: "m3-1", module: "Agent Profile" },
      { id: "m3-2", module: "Agent Performance" },
    ],
  },
  {
    id: "m4",
    module: "Agent Duty Log",
    children: [
      { id: "m4-1", module: "View Logs" },
      { id: "m4-2", module: "Export Logs" },
    ],
  },
  {
    id: "m5",
    module: "Manager",
    children: [
      { id: "m5-1", module: "Team Overview" },
      { id: "m5-2", module: "Approvals" },
    ],
  },
  {
    id: "m6",
    module: "Zone",
    children: [
      { id: "m6-1", module: "Zone Management" },
      { id: "m6-2", module: "Zone Assignment" },
    ],
  },
  {
    id: "m7",
    module: "Schedule",
    children: [
      { id: "m7-1", module: "Create Schedule" },
      { id: "m7-2", module: "View Schedule" },
    ],
  },
  {
    id: "m8",
    module: "Client",
    children: [
      { id: "m8-1", module: "Client Details" },
      { id: "m8-2", module: "Client Communication" },
    ],
  },
];

export const RoleDialog = ({ open, onOpenChange, role, onSave }: RoleDialogProps) => {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (role) {
      setRoleName(role.name);
      setPermissions(role.permissions);
    } else {
      setRoleName("");
      const initPermissions: Permission[] = defaultModules.map((module) => ({
        id: module.id,
        module: module.module,
        parentId: null,
        allAccess: false,
        readOnly: false,
        write: false,
        delete: false,
        children: module.children?.map((child) => ({
          id: child.id,
          module: child.module,
          parentId: module.id,
          allAccess: false,
          readOnly: false,
          write: false,
          delete: false,
        })),
      }));
      setPermissions(initPermissions);
      // Expand all modules by default
      setExpandedModules(new Set(defaultModules.map((m) => m.id)));
    }
  }, [role, open]);

  const handlePermissionChange = (permId: string, field: keyof Omit<Permission, "id" | "module" | "parentId" | "children">, value: boolean) => {
    const updatePermission = (perm: Permission): Permission => {
      if (perm.id === permId) {
        let updated = { ...perm };
        
        if (field === "allAccess" && value) {
          updated = {
            ...updated,
            allAccess: true,
            readOnly: true,
            write: true,
            delete: true,
          };
        } else if (field === "allAccess" && !value) {
          updated = {
            ...updated,
            allAccess: false,
            readOnly: false,
            write: false,
            delete: false,
          };
        } else {
          updated = {
            ...updated,
            [field]: value,
          };
        }

        // Cascade to children
        if (updated.children) {
          updated.children = updated.children.map((child) => ({
            ...child,
            [field]: value,
            ...(field === "allAccess" && value ? {
              allAccess: true,
              readOnly: true,
              write: true,
              delete: true,
            } : {}),
            ...(field === "allAccess" && !value ? {
              allAccess: false,
              readOnly: false,
              write: false,
              delete: false,
            } : {}),
          }));
        }

        return updated;
      }

      // Check children
      if (perm.children) {
        return {
          ...perm,
          children: perm.children.map(updatePermission),
        };
      }

      return perm;
    };

    setPermissions(permissions.map(updatePermission));
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(role && { id: role.id }),
      name: roleName,
      parentId: role?.parentId || null,
      active: role?.active ?? true,
      permissions,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-white ">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{role ? "Edit Role" : "Create Role"}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6"
            >
              {/* <X className="h-4 w-4" /> */}
            </Button>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="roleName">
              Role <span className="text-destructive">*</span>
            </Label>
            <Input
              id="roleName"
              placeholder="Enter Role Name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-semibold">Modules</h3>
              <h3 className="font-semibold">User Role Manager</h3>
            </div>

            <div className="border rounded-lg overflow-hidden max-h-[250px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-64">Modules</TableHead>
                    <TableHead className="text-center">All Access</TableHead>
                    <TableHead className="text-center">Read Only</TableHead>
                    <TableHead className="text-center">Write</TableHead>
                    <TableHead className="text-center">Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody >
                  {permissions.map((permission) => (
                    <>
                      <TableRow key={permission.id} className="bg-muted/30">
                        <TableCell className="font-semibold">
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => toggleModule(permission.id)}
                            >
                              {expandedModules.has(permission.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRightIcon className="h-4 w-4" />
                              )}
                            </Button>
                            {permission.module}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <Switch
                              checked={permission.allAccess}
                              onCheckedChange={(checked) => handlePermissionChange(permission.id, "allAccess", checked)}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <Switch
                              checked={permission.readOnly}
                              onCheckedChange={(checked) => handlePermissionChange(permission.id, "readOnly", checked)}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <Switch
                              checked={permission.write}
                              onCheckedChange={(checked) => handlePermissionChange(permission.id, "write", checked)}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <Switch
                              checked={permission.delete}
                              onCheckedChange={(checked) => handlePermissionChange(permission.id, "delete", checked)}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedModules.has(permission.id) && permission.children?.map((child) => (
                        <TableRow key={child.id}>
                          <TableCell className="font-medium pl-16">
                            {child.module}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center">
                              <Switch
                                checked={child.allAccess}
                                onCheckedChange={(checked) => handlePermissionChange(child.id, "allAccess", checked)}
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center">
                              <Switch
                                checked={child.readOnly}
                                onCheckedChange={(checked) => handlePermissionChange(child.id, "readOnly", checked)}
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center">
                              <Switch
                                checked={child.write}
                                onCheckedChange={(checked) => handlePermissionChange(child.id, "write", checked)}
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center">
                              <Switch
                                checked={child.delete}
                                onCheckedChange={(checked) => handlePermissionChange(child.id, "delete", checked)}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div> */}

          <div className="flex justify-end gap-4 pt-4">
                      <Button
                        variant="outline"
                         onClick={() => onOpenChange(false)}
                        className="w-[140px] h-[44px]"
                        // onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-primary w-[140px] h-[44px]"
                        // onClick={handleSave}
                      >
                        Save
                      </Button>
                    </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
