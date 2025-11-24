import apiClient from "@/lib/api";
import { NotificationListResponse } from "@/types/notification";

  
  
  export const notificationService = {
  // Get all notification with optional filters
  async getNotification(params?: {
    search?: string;
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }): Promise<NotificationListResponse> {
    const response = await apiClient.get("notifications/settings?company_id=1", { params });
    return response.data;
  },
}