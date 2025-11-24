import apiClient from "@/lib/api";

export interface level {
  id?: number;
  name: string;
  description?: string;
}

// ✅ Helper to get company_id dynamically
const getCompanyId = () => {
  const user = localStorage.getItem("auth_user");
  const parsedUser = user ? JSON.parse(user) : null;
  return parsedUser?.company_id;
};

export const levelService = {
  // ✅ Get all levels with pagination
  getLevels: async (params: {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: string;
    search?: string;
  }) => {
    const companyId = getCompanyId();
    const res = await apiClient.get("/levels", {
      params: { ...params, company_id: companyId },
    });
    return res.data; // return full data object
  },

  createLevel: async (data: level) => {
    const companyId = getCompanyId();
    const res = await apiClient.post("/levels", {
      ...data,
      company_id: companyId,
    });
    return res.data;
  },

  updateLevel: async (id: number, data: level) => {
    const companyId = getCompanyId();
    const res = await apiClient.put(`/levels/${id}`, {
      ...data,
      company_id: companyId,
    });
    return res.data;
  },

  deleteLevel: async (id: number) => {
    const res = await apiClient.delete(`/levels/${id}`);
    return res.data;
  },
};

//Mode

// ✅ Mode interface
export interface mode {
  id?: string; // optional for creation
  name: string;
  description?: string;
}

// ✅ Helper to get company_id dynamically
// ✅ Mode service
export const modeService = {
  // ✅ GET modes (with pagination, sorting, and search)
  getModes: async (params: {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: string;
    search?: string;
  }) => {
    const companyId = getCompanyId();
    const queryParams = { ...params, company_id: companyId };
    const res = await apiClient.get("/modes", { params: queryParams });

    return {
      success: res.data?.success || false,
      message: res.data?.message || "",
      data: {
        modes: res.data?.data?.modes || [],
        pagination: res.data?.data?.pagination || {
          currentPage: params.page || 1,
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: params.limit || 5,
        },
      },
    };
  },

  // ✅ CREATE mode
  createMode: async (data: mode) => {
    const companyId = getCompanyId();
    const payload = { ...data, company_id: companyId };
    const res = await apiClient.post("/modes", payload);
    return res.data;
  },

  // ✅ UPDATE mode
  updateMode: async (id: string, data: mode) => {
    const companyId = getCompanyId();
    const payload = { ...data, company_id: companyId };
    const res = await apiClient.put(`/modes/${id}`, payload);
    return res.data;
  },

  // ✅ DELETE mode
  deleteMode: async (id: string) => {
    const res = await apiClient.delete(`/modes/${id}`);
    return res.data;
  },
};

//
// Status

export interface status {
  id?: string; // optional for creation
  name: string;
  description?: string;
  type: number; // 1 = In Progress, 2 = Completed
  search: string;
}

// ✅ Helper to get company_id dynamically each time

export const statusService = {
  getStatuses: async (params: {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: string;
    search?: string;
  }) => {
    const companyId = getCompanyId();
    const queryParams = { ...params, company_id: companyId };
    const res = await apiClient.get("/statuses", { params: queryParams });

    return {
      statuses: res.data.data.statuses || [],
      pagination: res.data.data.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
      },
    };
  },

  createStatus: async (data) => {
    const companyId = getCompanyId();
    const payload = { ...data, company_id: companyId };
    const res = await apiClient.post("/statuses", payload);
    return res.data;
  },

  updateStatus: async (id, data) => {
    const companyId = getCompanyId();
    const payload = { ...data, company_id: companyId };
    const res = await apiClient.put(`/statuses/${id}`, payload);
    return res.data;
  },

  deleteStatus: async (id) => {
    const res = await apiClient.delete(`/statuses/${id}`);
    return res.data;
  },
};
export interface SubCategory {
  id?: number;
  name: string;
  description?: string;
  parent_category_id?: number;
}

export interface category {
  id?: number;
  category: string;
  name: any;
  description?: string;
  subCategories?: SubCategory[];
}
export const CategoryService = {
  getCategories: async (params: {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: string;
    search?: string;
  }) => {
    const companyId = getCompanyId();
    const queryParams = { ...params, company_id: companyId };

    try {
      const res = await apiClient.get("/categories/with-subcategories", {
        params: queryParams,
      });

      // Standardize response like levelService
      return {
        success: res.data?.success || false,
        message: res.data?.message || "",
        data: {
          categories: res.data?.data?.categories || [],
          pagination: res.data?.data?.pagination || {
            currentPage: params.page || 1,
            totalPages: 1,
            totalItems: 0,
            itemsPerPage: params.limit || 5,
          },
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong",
        data: {
          categories: [],
          pagination: {
            currentPage: params.page || 1,
            totalPages: 1,
            totalItems: 0,
            itemsPerPage: params.limit || 5,
          },
        },
      };
    }
  },

  getCategoriesDropDown: async () => {
    const companyId = getCompanyId();

    try {
      const res = await apiClient.get("/categories/dropdown", {
        params: { company_id: companyId },
      });

      return {
        success: res.data?.success || false,
        message: res.data?.message || "",
        data: res.data?.data || [], // the dropdown list of categories
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch category dropdown",
        data: [],
      };
    }
  },
  //

  createCategory: async (data) => {
    const companyId = getCompanyId();
    const payload = { ...data, company_id: companyId };
    const res = await apiClient.post("/categories", payload);
    return res.data;
  },

  updateCategory: async (id: number, data) => {
    const companyId = getCompanyId();
    const payload = { ...data, company_id: companyId };
    const res = await apiClient.put(`/categories/${id}`, payload);
    return res.data;
  },

  deleteCategory: async (id: number) => {
    const res = await apiClient.delete(`/categories/${id}`);
    return res.data;
  },
  createSubCategory: async (data) => {
    const companyId = getCompanyId();
    const payload = { ...data, company_id: companyId };
    const res = await apiClient.post("/sub-categories", payload);

    return res.data;
  },
};

export const SubCategoryService = {
  // ✅ Get all sub-categories (with optional filters, pagination, search)
  getSubCategories: async (params: {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: string;
    search?: string;
    parent_category_id?: number;
  }) => {
    const companyId = getCompanyId();
    const res = await apiClient.get("/sub-categories", {
      params: { ...params, company_id: companyId },
    });
    return res.data;
  },

  // ✅ Create new sub-category
  createSubCategory: async (data: SubCategory) => {
    const companyId = getCompanyId();
    const payload = { ...data, company_id: companyId };
    const res = await apiClient.post("/sub-categories", payload);
    return res.data;
  },

  // ✅ Update existing sub-category
  updateSubCategory: async (id: number, data: SubCategory) => {
    const companyId = getCompanyId();
    const payload = { ...data, company_id: companyId };
    const res = await apiClient.put(`/sub-categories/${id}`, payload);
    return res.data;
  },

  // ✅ Delete sub-category
  deleteSubCategory: async (id: number) => {
    const res = await apiClient.delete(`/sub-categories/${id}`);
    return res.data;
  },
};

// Regions
export interface region {
  id?: number;
  name: string;
  description?: string;
}

export const regionService = {
  // ✅ Get all regions with pagination
  getRegions: async (params: {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: string;
    search?: string;
  }) => {
    const companyId = getCompanyId();
    const res = await apiClient.get("/regions", {
      params: { ...params, company_id: companyId },
    });
    return res.data; // return full data object
  },

  // ✅ Create a new region
  createRegion: async (data: region) => {
    const companyId = getCompanyId();
    const res = await apiClient.post("/regions", {
      ...data,
      company_id: companyId,
    });
    return res.data;
  },

  // ✅ Update existing region
  updateRegion: async (id: number, data: region) => {
    const companyId = getCompanyId();
    const res = await apiClient.put(`/regions/${id}`, {
      ...data,
      company_id: companyId,
    });
    return res.data;
  },

  // ✅ Delete region
  deleteRegion: async (id: number) => {
    const res = await apiClient.delete(`/regions/${id}`);
    return res.data;
  },
};

function cleanPayload(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  );
}

export const setupService = {
  // Get all Departments with optional filters
  async getDepartments(params?: {
    search?: string;
    status?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }): Promise<any> {
    const response = await apiClient.get("departments?company_id=1", {
      params,
    });
    return response.data;
  },

  // Get single Department
  async getDepartment(id: string): Promise<any> {
    const response = await apiClient.get(`departments/${id}`);
    return response.data;
  },

  // Create new department
  async createDepartment(data: any): Promise<any> {
    const cleaned = cleanPayload(data);
    const response = await apiClient.post("departments", cleaned);
    return response.data;
  },

  // Update department
  async updateDepartment(id: string, data: Partial<any>): Promise<any> {
    const cleaned = cleanPayload(data);
    const response = await apiClient.put(`departments/${id}`, cleaned);
    return response.data;
  },

  // Delete department
  async deleteDepartment(id: string): Promise<any> {
    const response = await apiClient.delete(`departments/${id}`);
    return response.data;
  },
};
