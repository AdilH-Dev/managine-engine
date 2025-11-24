import { toast } from "@/hooks/use-toast";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
apiClient.interceptors.response.use(
  // (response) => response,
  (response) => {
    // console.log(response,"reponse in intercentoper")
    if (response?.data?.success === false) {
      toast({
        title: "Error",
        description: response?.data?.message || "-",
        variant: "destructive",
      });
      // toast.error(response?.data?.message);
    } else {
      return response;
    }
  },
  (error) => {
    console.log(error.response, "errrrreponse in intercentoper");
    toast({
      title: "Error",
      description: error.response?.data?.message || "-",
      variant: "destructive",
    });
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
