import apiClient from "@/lib/api";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions?: string[];
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

export const authService = {
  login: async (email: string, password: string): Promise<any> => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await apiClient.post("/auth/register", { name, email, password });
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },
};
