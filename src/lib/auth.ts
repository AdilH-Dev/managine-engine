import { AuthUser } from "@/services/authService";

export const hasRole = (user: AuthUser | null, role: string): boolean => {
  return user?.roles?.includes(role) ?? false;
};

export const hasAnyRole = (user: AuthUser | null, roles: string[]): boolean => {
  return roles.some(role => hasRole(user, role));
};

export const hasAllRoles = (user: AuthUser | null, roles: string[]): boolean => {
  return roles.every(role => hasRole(user, role));
};

export const hasPermission = (user: AuthUser | null, permission: string): boolean => {
  return user?.permissions?.includes(permission) ?? false;
};

export const isAdmin = (user: AuthUser | null): boolean => {
  return hasRole(user, "admin");
};

export const isModerator = (user: AuthUser | null): boolean => {
  return hasRole(user, "moderator");
};
