import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersTable } from "@/pages/roles-permissions/UsersTable";
import { UserDialog } from "@/pages/roles-permissions/UserDialog";
import { RolesTable } from "@/pages/roles-permissions/RolesTable";
import { RoleDialog } from "@/pages/roles-permissions/RoleDialog";
import { User, Role, Permission } from "@/pages/roles-permissions/rbac";
import { MoreVertical, Plus } from "lucide-react";
import { toast } from "sonner";
import { MainLayout } from "@/components/Layout/MainLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import plusIcon from "@/assets/svg-icons/plus-icon.svg";

const defaultPermissions: Permission[] = [
  {
    id: "p1",
    module: "Dashboard",
    parentId: null,
    allAccess: true,
    readOnly: true,
    write: true,
    delete: true,
  },
  {
    id: "p2",
    module: "Task",
    parentId: null,
    allAccess: false,
    readOnly: false,
    write: true,
    delete: false,
  },
  {
    id: "p3",
    module: "Agent",
    parentId: null,
    allAccess: true,
    readOnly: true,
    write: true,
    delete: true,
  },
  {
    id: "p4",
    module: "Agent Duty Log",
    parentId: null,
    allAccess: true,
    readOnly: false,
    write: false,
    delete: true,
  },
  {
    id: "p5",
    module: "Manager",
    parentId: null,
    allAccess: false,
    readOnly: true,
    write: false,
    delete: true,
  },
  {
    id: "p6",
    module: "Zone",
    parentId: null,
    allAccess: true,
    readOnly: true,
    write: false,
    delete: false,
  },
  {
    id: "p7",
    module: "Schedule",
    parentId: null,
    allAccess: false,
    readOnly: true,
    write: true,
    delete: true,
  },
  {
    id: "p8",
    module: "Client",
    parentId: null,
    allAccess: true,
    readOnly: true,
    write: false,
    delete: false,
  },
];

const Roles = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Neil Dibbert",
      email: "neil@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
      roleId: "r1",
      roleName: "Admin",
    },
    {
      id: "2",
      name: "Keith Bashirian",
      email: "keith@example.com",
      phone: "123-456-7891",
      address: "456 Oak Ave",
      roleId: "r2",
      roleName: "Manager",
    },
    {
      id: "3",
      name: "Rachael Block",
      email: "rachael@example.com",
      phone: "123-456-7892",
      address: "789 Pine Rd",
      roleId: "r1",
      roleName: "Admin",
    },
    {
      id: "4",
      name: "Jesse Mraz",
      email: "jesse@example.com",
      phone: "123-456-7893",
      address: "321 Elm St",
      roleId: "r1",
      roleName: "Admin",
    },
    {
      id: "5",
      name: "Norma Schmeler",
      email: "norma@example.com",
      phone: "123-456-7894",
      address: "654 Maple Dr",
      roleId: "r1",
      roleName: "Admin",
    },
  ]);

  const [roles, setRoles] = useState<Role[]>([
    {
      id: "r1",
      name: "Admin",
      parentId: null,
      active: true,
      permissions: [...defaultPermissions],
    },
    {
      id: "r2",
      name: "Manager",
      parentId: null,
      active: true,
      permissions: [...defaultPermissions],
    },
    {
      id: "r3",
      name: "User",
      parentId: null,
      active: false,
      permissions: [...defaultPermissions],
    },
  ]);

  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [parentRoleId, setParentRoleId] = useState<string | null>(null);

  const handleSaveUser = (userData: Omit<User, "id"> & { id?: string }) => {
    if (userData.id) {
      setUsers(
        users.map((u) =>
          u.id === userData.id ? { ...userData, id: userData.id } : u
        )
      );
      toast.success("User updated successfully");
    } else {
      const newUser = { ...userData, id: `u${Date.now()}` };
      setUsers([...users, newUser]);
      toast.success("User created successfully");
    }
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId));
    toast.success("User deleted successfully");
  };

  const handleSaveRole = (
    roleData: Omit<Role, "id" | "children"> & { id?: string }
  ) => {
    if (roleData.id) {
      const updateRoleInTree = (roleList: Role[]): Role[] => {
        return roleList.map((role) => {
          if (role.id === roleData.id) {
            return {
              ...role,
              name: roleData.name,
              permissions: roleData.permissions,
            };
          }
          if (role.children) {
            return { ...role, children: updateRoleInTree(role.children) };
          }
          return role;
        });
      };
      setRoles(updateRoleInTree(roles));
      toast.success("Role updated successfully");
    } else {
      const newRole: Role = {
        id: `r${Date.now()}`,
        name: roleData.name,
        parentId: parentRoleId,
        active: true,
        permissions: roleData.permissions,
      };

      if (parentRoleId) {
        const addChildToTree = (roleList: Role[]): Role[] => {
          return roleList.map((role) => {
            if (role.id === parentRoleId) {
              return {
                ...role,
                children: [...(role.children || []), newRole],
              };
            }
            if (role.children) {
              return { ...role, children: addChildToTree(role.children) };
            }
            return role;
          });
        };
        setRoles(addChildToTree(roles));
      } else {
        setRoles([...roles, newRole]);
      }
      toast.success("Role created successfully");
    }
    setSelectedRole(null);
    setParentRoleId(null);
  };

  const handleDeleteRole = (roleId: string) => {
    const deleteFromTree = (roleList: Role[]): Role[] => {
      return roleList
        .filter((role) => role.id !== roleId)
        .map((role) => ({
          ...role,
          children: role.children ? deleteFromTree(role.children) : undefined,
        }));
    };
    setRoles(deleteFromTree(roles));
    toast.success("Role deleted successfully");
  };

  const flattenRoles = (roleList: Role[]): Role[] => {
    const result: Role[] = [];
    const flatten = (roles: Role[]) => {
      roles.forEach((role) => {
        result.push(role);
        if (role.children) {
          flatten(role.children);
        }
      });
    };
    flatten(roleList);
    return result;
  };

  return (
    <>
      {/* <MainLayout title="Setup"> */}
        {/* Header + Create Campaign Button */}
        <div className="mb-6 bg-white px-[24px] py-[15px] flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-xl font-semibold text-foreground flex-shrink-0">
            {activeTab === "users" ? "Users" : "Roles And Permissions"}
          </h2>

          <Button
            onClick={() => {
              if (activeTab === "users") {
                setSelectedUser(null);
                setUserDialogOpen(true);
              } else {
                setSelectedRole(null);
                setParentRoleId(null);
                setRoleDialogOpen(true);
              }
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none"
          >
            {activeTab === "users" ? "Create User" : "Create Role"}
            <span className="h-[18px] w-[18px] mr-2 rounded-full bg-white text-primary flex items-center justify-center">
              <img alt="plusIcon" src={plusIcon} />
            </span>
          </Button>

          <UserDialog
            open={userDialogOpen}
            onOpenChange={setUserDialogOpen}
            user={selectedUser}
            roles={flattenRoles(roles)}
            onSave={handleSaveUser}
          />

          <RoleDialog
            open={roleDialogOpen}
            onOpenChange={(open) => {
              setRoleDialogOpen(open);
              if (!open) {
                setParentRoleId(null);
              }
            }}
            role={selectedRole}
            onSave={handleSaveRole}
          />
        </div>

        {/* Table */}
        <Card className="px-6 rounded-none border-none">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-[600px] grid-cols-2  rounded-none mx-auto p-0 bg-white">
              {/* <TabsTrigger value="users" className="bg-[#1D84C6] text-white">Users</TabsTrigger>
              <TabsTrigger value="roles">Roles And Permissions</TabsTrigger> */}

              <TabsTrigger
    value="users"
    className={`px-4 py-2 font-medium text-sm transition-all duration-200 rounded-none ${
      activeTab === "users"
        ? "!bg-[#1D84C6] !text-white !border !border-[#1D84C6] z-10"
        : "!bg-white !text-[#1D84C6] hover:!bg-[#E5F3FA] !border !border-[#1D84C6]"
    }`}
  >
    Users
  </TabsTrigger>

  <TabsTrigger
    value="roles"
    className={`px-4 py-2 font-medium text-sm transition-all duration-200 rounded-none ${
      activeTab === "roles"
        ? "!bg-[#1D84C6] !text-white !border !border-[#1D84C6] z-10"
        : "!bg-white !text-[#1D84C6] hover:!bg-[#E5F3FA] !border !border-[#1D84C6]"
    }`}
  >
    Roles And Permissions
  </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="w-24 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.roleName}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center justify-center gap-2 hover:bg-gray-100 rounded p-1 w-full">
                            <MoreVertical className="w-4 h-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(item);
                                setUserDialogOpen(true);
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteUser(item.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="roles" className="">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr</TableHead>
                    {/* <TableHead>User</TableHead> */}
                    <TableHead>Role</TableHead>
                    <TableHead className="w-24 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      {/* <TableCell>{item.roleName}</TableCell> */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center justify-center gap-2 hover:bg-gray-100 rounded p-1 w-full">
                            <MoreVertical className="w-4 h-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedRole(item);
                                setRoleDialogOpen(true);
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteRole(item.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>

          {/* Pagination + Rows per page */}
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
      {/* </MainLayout> */}

      {/* <MainLayout title="Setup">
        <div className="min-h-screen bg-background p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">
                  {activeTab === "users" ? "Users" : "Roles And Permissions"}
                </h1>
                <Button
                  onClick={() => {
                    if (activeTab === "users") {
                      setSelectedUser(null);
                      setUserDialogOpen(true);
                    } else {
                      setSelectedRole(null);
                      setParentRoleId(null);
                      setRoleDialogOpen(true);
                    }
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {activeTab === "users" ? "Create User" : "Create Role"}
                </Button>
              </div>

              <TabsList className="grid w-full max-w-[600px] grid-cols-2">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="roles">Roles And Permissions</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="mt-6">
                <UsersTable
                  users={users}
                  onEdit={(user) => {
                    setSelectedUser(user);
                    setUserDialogOpen(true);
                  }}
                  onDelete={handleDeleteUser}
                />
              </TabsContent>

              <TabsContent value="roles" className="mt-6">
                <RolesTable
                  roles={roles}
                  onEdit={(role) => {
                    setSelectedRole(role);
                    setRoleDialogOpen(true);
                  }}
                  onDelete={handleDeleteRole}
                  onAddChild={handleAddChildRole}
                  onToggle={handleToggleRole}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </MainLayout> */}
    </>
  );
};

export default Roles;
