import apiClient from "@/lib/api";
import {
  Ticket,
  TicketFormData,
  DropdownOption,
  TicketListResponse,
} from "@/types/ticket";

function cleanPayload(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  );
}

export const ticketService = {
  // Get single ticket
  async getDropdown(id: string): Promise<any> {
    const response = await apiClient.get(`/dropdowns?company_id=1`);
    return response.data;
  },

  // Get single ticket
  async getSubCatDropdown(id: any): Promise<any> {
    const response = await apiClient.get(
      `sub-categories/dropdown?category_id=${id}`
    );
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
    const response = await apiClient.get("requests?company_id=1", { params });
    return response.data;
  },

  // Get single ticket
  async getTicket(id: string): Promise<any> {
    const response = await apiClient.get(`requests/${id}`);
    return response.data;
  },

  // Get all tickets history with optional filters
  async getTicketHistory(params?: {
    ticket_id?: string;
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }): Promise<any> {
    const response = await apiClient.get("histories", { params });
    return response.data;
  },

  // Get all tickets notes with optional filters
  async getTicketNotes(params?: {
    ticket_id?: string;
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }): Promise<any> {
    const response = await apiClient.get("notes", { params });
    return response.data;
  },

  // Create new ticket
  async createTicket(data: TicketFormData): Promise<any> {
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
  async updateTicket(id: string, data: Partial<TicketFormData>): Promise<any> {
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
  async assignTicket(data: any): Promise<any> {
    const response = await apiClient.patch(`requests/bulk-assign`, data);
    return response.data;
  },

  // Bulk delete tickets
  async deleteTickets(data: any): Promise<any> {
    const response = await apiClient.delete("requests/bulk-delete", { data });
    return response.data;
  },

  // Bulk close tickets
  async closeTickets(data: any): Promise<any> {
    const response = await apiClient.patch("requests/bulk-close", data);
    return response.data;
  },

  // Create new ticket
  async createNote(data: any): Promise<any> {
    // const formData = new FormData();
    // const dataArr = {
    //   ...data,
    //   associated_departments:[data?.associated_departments],
    //   associated_sites:[data?.associated_sites]};

    const response = await apiClient.post("notes", data);
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

  // Create new ticket
  async createRequester(data: any): Promise<any> {
    const cleaned = cleanPayload(data);

    const response = await apiClient.post("requesters", cleaned);
    return response.data;
  },

  // Get single ticket
  async getSingleRequester(id: string): Promise<any> {
    const response = await apiClient.get(`requesters/${id}`);
    return response.data;
  },

  async getRequester(params?: {
    search?: string;
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }): Promise<any> {
    const response = await apiClient.get("requesters?company_id=1", { params });
    return response.data;
  },

  // Update ticket
  async updateRequester(id: string, data: Partial<any>): Promise<any> {
    // const formData = new FormData();

    const cleaned = cleanPayload(data);

    const response = await apiClient.put(`requesters/${id}`, cleaned);
    return response.data;
  },

  async deleteRequester(id: string): Promise<any> {
    const response = await apiClient.delete(`requesters/${id}`);
    return response.data;
  },

  // Create new ticket
  async createTechnician(data: any): Promise<any> {
    // const formData = new FormData();
    const dataArr = {
      ...data,
      associated_departments: data?.associated_departments
        ? [data?.associated_departments]
        : [],
      associated_sites: data?.associated_sites ? [data?.associated_sites] : [],
    };
    const cleaned = cleanPayload(dataArr);


    const response = await apiClient.post("technicians", cleaned);
    return response.data;
  },

  // Update ticket
  async updateTechnician(id: string, data: Partial<any>): Promise<any> {
    const dataArr = {
      ...data,
      associated_departments: data?.associated_departments
        ? [data?.associated_departments]
        : [],
      associated_sites: data?.associated_sites ? [data?.associated_sites] : [],
    };
    const cleaned = cleanPayload(dataArr);

    const response = await apiClient.put(`technicians/${id}`, cleaned);
    return response.data;
  },

  // Get single ticket
  async getSingleTechnician(id: string): Promise<any> {
    const response = await apiClient.get(`technicians/${id}`);
    return response.data;
  },

  async getTechnician(params?: {
    search?: string;
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }): Promise<any> {
    const response = await apiClient.get("technicians?company_id=1", {
      params,
    });
    return response.data;
  },

  async deleteTechnician(id: string): Promise<any> {
    const response = await apiClient.delete(`technicians/${id}`);
    return response.data;
  },
};
