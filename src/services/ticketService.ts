import apiClient from "@/lib/api";
import {
  Ticket,
  TicketFormData,
  DropdownOption,
  TicketListResponse,
} from "@/types/ticket";

export const ticketService = {
  // Get single ticket
  async getDropdown(id: string): Promise<any> {
    const response = await apiClient.get(`/dropdowns?company_id=1`);
    return response.data;
  },
  // Get all tickets with optional filters
  async getTickets(params?: {
    search?: string;
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }): Promise<TicketListResponse> {
    const response = await apiClient.get("requests", { params });
    return response.data;
  },

  // Get single ticket
  async getTicket(id: string): Promise<any> {
    const response = await apiClient.get(`requests/${id}`);
    return response.data;
  },

  // Create new ticket
  async createTicket(data: TicketFormData): Promise<Ticket> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "attachments" && Array.isArray(value)) {
        value.forEach((file) => formData.append("attachments", file));
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    const response = await apiClient.post("/requests", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Update ticket
  async updateTicket(
    id: string,
    data: Partial<TicketFormData>
  ): Promise<Ticket> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "attachments" && Array.isArray(value)) {
        value.forEach((file) => formData.append("attachments", file));
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    const response = await apiClient.put(`requests/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Delete ticket
  async deleteTicket(id: string): Promise<void> {
    await apiClient.delete(`/api/tickets/${id}`);
  },

  // Bulk delete tickets
  async deleteTickets(ids: string[]): Promise<void> {
    await apiClient.post("/api/tickets/bulk-delete", { ids });
  },

  // Get dropdown options
  async getRequesters(): Promise<DropdownOption[]> {
    const response = await apiClient.get("/api/users/requesters");
    return response.data;
  },

  async getTechnicians(): Promise<DropdownOption[]> {
    const response = await apiClient.get("/api/users/technicians");
    return response.data;
  },

  async getGroups(): Promise<DropdownOption[]> {
    const response = await apiClient.get("/api/groups");
    return response.data;
  },
};
