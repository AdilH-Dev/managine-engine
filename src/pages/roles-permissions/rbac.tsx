export interface Permission {
  id: string;
  module: string;
  parentId: string | null;
  allAccess: boolean;
  readOnly: boolean;
  write: boolean;
  delete: boolean;
  children?: Permission[];
}

export interface Role {
  id: string;
  name: string;
  parentId: string | null;
  active: boolean;
  children?: Role[];
  permissions: Permission[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  roleId: string;
  roleName: string;
}
