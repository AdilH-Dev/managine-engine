import apiClient from "@/lib/api";

// ✅ Define Level type
export interface level {
  id: string;
  name: string;
  description?: string;
}

export const levelService = {
  // Get all levels
  async getLevels(): Promise<level[]> {
    const response = await apiClient.get<level[]>("/levels");
    return response.data;
  },

  // Create a new level
  async createLevel(data: level): Promise<level> {
    const response = await apiClient.post("/levels", data);
    return response.data;
  },

  // Update an existing level
  async updateLevel(id: string, data: level): Promise<level> {
    const response = await apiClient.put<level>(`/levels/${id}`, data);
    return response.data;
  },

  // Delete a level
  async deleteLevel(id: string): Promise<void> {
    await apiClient.delete(`/levels/${id}`);
  },
};
