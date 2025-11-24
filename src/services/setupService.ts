import apiClient from "../lib/api";

export interface Setup {
  id: string;
  name: string;
  description?: string;
  color?: string;
  region?: any;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  company_id?: number;
  message?: string;
}
//requesttypes services strt
export const requestTypeService = {
  getAll: async ({
    page = 1,
    limit = 10,
    sort_by = "name",
    sort_order = "asc",
    search = "",
  }: {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    search?: string;
  }) => {
    const authUserString = localStorage.getItem("auth_user");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;

    const res = await apiClient.get(`request-types`, {
      params: { page, limit, sort_by, sort_order, search, company_id },
    });

    return {
      data: res.data.data.requestTypes || [],
      pagination: res.data.data.pagination || null,
      message: res.data.message,
    };
  },

  getById: async (id: string): Promise<Setup> => {
    const res = await apiClient.get<Setup>(`request-types/${id}`);
    return res.data;
  },

  create: async (data) => {
    const authUserString = localStorage.getItem("auth_user");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;
    const res = await apiClient.post(`request-types`, { ...data, company_id });
    return {
      data: res.data.data || null,
      message: res.data.message,
    };
  },

  update: async (id, data) => {
    const authUserString = localStorage.getItem("auth_user");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;
    const res = await apiClient.put(`request-types/${id}`, {
      ...data,
      company_id,
    });
    return {
      data: res.data.data || null,
      message: res.data.message,
    };
  },

  delete: async (id) => {
    const res = await apiClient.delete(`request-types/${id}`);
    return {
      message: res.data?.message,
    };
  },
};
// requesttypeservice end

// Tasktype services api strt

export const taskTypeServices = {
  getAll: async ({
    page = 1,
    limit = 10,
    sort_by = "name",
    sort_order = "asc",
    search = "",
  }: {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    search?: string;
  }) => {
    const authUserString = localStorage.getItem("auth_user");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;

    const res = await apiClient.get(`request-types`, {
      params: { page, limit, sort_by, sort_order, search, company_id },
    });

    return {
      data: res.data.data.requestTypes || [],
      pagination: res.data.data.pagination || null,
      message: res.data.message,
    };
  },

  getById: async (id: string): Promise<Setup> => {
    const res = await apiClient.get<Setup>(`request-types/${id}`);
    return res.data;
  },

  create: async (data) => {
    const authUserString = localStorage.getItem("auth_user");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;
    const res = await apiClient.post(`request-types`, { ...data, company_id });
    return {
      data: res.data.data || null,
      message: res.data.message,
    }
  },

  update: async (id, data) => {
    const authUserString = localStorage.getItem("auth_user"); // or the correct key
    const authUser = authUserString ? JSON.parse(authUserString) : null;

    const company_id = authUser?.company_id;
    const res = await apiClient.put<Setup>(`request-types/${id}`, {
      ...data,
      company_id,
    });
    return res.data;
  },


  delete: async (id) => {
    const res = await apiClient.delete(`request-types/${id}`);
    return {
      message: res.data?.message,
    };
  },
};
// tasktype services api end

//worklogtype service api start

export const worklogTypeservices = {
  getAll: async ({
    page = 1,
    limit = 10,
    sort_by = "name",
    sort_order = "asc",
    search = "",
  }: {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    search?: string;
  }) => {
    const authUserString = localStorage.getItem("auth_user");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;

    const res = await apiClient.get(`request-types`, {
      params: { page, limit, sort_by, sort_order, search, company_id },
    });

    return {
      data: res.data.data.requestTypes || [],
      pagination: res.data.data.pagination || null,
      message: res.data.message,
    };
  },

  getById: async (id: string): Promise<Setup> => {
    const res = await apiClient.get<Setup>(`request-types/${id}`);
    return res.data;
  },

  create: async (data) => {
    const authUserString = localStorage.getItem("auth_user"); // or the correct key
    const authUser = authUserString ? JSON.parse(authUserString) : null;

    const company_id = authUser?.company_id;
    const res = await apiClient.post(`request-types`, { ...data, company_id });
    return {
      data: res.data.data || null,
      message: res.data.message,
    }
  },

  update: async (id, data) => {
    const authUserString = localStorage.getItem("auth_user"); // or the correct key
    const authUser = authUserString ? JSON.parse(authUserString) : null;

    const company_id = authUser?.company_id;
    const res = await apiClient.put<Setup>(`request-types/${id}`, {
      ...data,
      company_id,
    });
    return {
      message: res.data?.message,
    }
  },

  delete: async (id) => {
    const res = await apiClient.delete(`request-types/${id}`);
    return res.data;
  },
};

//worklog services end

//CLosurecode services strt

export const closureCodeServices = {
  getAll: async ({
    page = 1,
    limit = 10,
    sort_by = "name",
    sort_order = "asc",
    search = "",
  }: {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    search?: string;
  }) => {
    const authUserString = localStorage.getItem("auth_user");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;

    const res = await apiClient.get(`closure-codes`, {
      params: { page, limit, sort_by, sort_order, search, company_id },
    });

    return {
      data: res.data.data.closureCodes || [],
      pagination: res.data.data.pagination || null,
      message: res.data.message,
    };
  },
  getById: async (id: string): Promise<Setup> => {
    const res = await apiClient.get<Setup>(`closure-codes/${id}`);
    return res.data;
  },
  create: async (data) => {
    const authUserString = localStorage.getItem("auth_user"); // or the correct key
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;
    const res = await apiClient.post(`closure-codes`, { ...data, company_id });
    return {
      data: res.data.data || null,
      message: res.data.message,
    }
  },
  update: async (id, data) => {
    const authUserString = localStorage.getItem("auth_user"); // or the correct key
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;
    const res = await apiClient.put(`closure-codes/${id}`, {
      ...data,
      company_id,
    });
    return {
      message: res.data?.message,
    }

  },
  delete: async (id) => {
    const res = await apiClient.delete(`closure-codes/${id}`);
    return res.data;
  },
};
//closurecode services end
//imapct services str
export const impactService = {
  getAll: async ({
    page = 1,
    limit = 10,
    sort_by = "name",
    sort_order = "asc",
    search = "",
  }: {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    search?: string;
  }) => {
    const authUserString = localStorage.getItem("auth_user");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;

    const res = await apiClient.get("impacts", {
      params: { page, limit, sort_by, sort_order, search, company_id },
    });

    return {
      data: res.data.data?.impacts || [],
      pagination: res.data.data.pagination || null,
      message: res.data.message || "",
    };
  },

  create: async (data: Setup): Promise<Setup> => {
    const authUserString = localStorage.getItem("auth_user");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;

    const res = await apiClient.post(`impacts`, { ...data, company_id });
    return res.data.data || res.data;
  },

  update: async (id: string, data: Setup): Promise<Setup> => {
    const authUserString = localStorage.getItem("auth_user");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;

    const res = await apiClient.put(`impacts/${id}`, { ...data, company_id });
    return res.data.data || res.data;
  },

  delete: async (id: string): Promise<any> => {
    await apiClient.delete(`impacts/${id}`);
  },
};

//impact services end

//priorty services strt

export const priorityService = {
  getAll: async ({
    page = 1,
    limit = 10,
    sort_by = "name",
    sort_order = "asc",
    search = "",
  }: {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    search?: string;
  }) => {
    const authUserString = localStorage.getItem("auth_user");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;

    const res = await apiClient.get(`priorities`, {
      params: { page, limit, sort_by, sort_order, search, company_id },
    });

    return {
      data: res.data.data?.priorities || [],
      pagination: res.data.data?.pagination || null,
      message: res.data.message || "",
    };
  },

  create: async (data) => {
    const authUserString = localStorage.getItem("auth_user");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;

    const res = await apiClient.post(`priorities`, { ...data, company_id });
    return {
      data: res.data.data || null,
      message: res.data.message || "Priority created successfully",
    };
  },

  update: async (id, data) => {
    const authUserString = localStorage.getItem("auth_user");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;

    const res = await apiClient.put(`priorities/${id}`, {
      ...data,
      company_id,
    });
    return {
      data: res.data.data || null,
      message: res.data.message || "Priority updated successfully",
    };
  },

  delete: async (id) => {
    const res = await apiClient.delete(`priorities/${id}`);
    return {
      message: res.data?.message || "Priority deleted successfully",
    };
  },
};

//priroty services end

//site services strt

export const siteServices = {
  getAll: async ({
    page = 1,
    limit = 10,
    sort_by = "name",
    sort_order = "asc",
    search = "",
  }: {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    search?: string;
    status?: string;
  }) => {
    const authUserString = localStorage.getItem("auth_user");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;

    const res = await apiClient.get(`sites`, {
      params: { page, limit, sort_by, sort_order, search, company_id },
    });

    return {
      data: res.data.data.sites || [],
      pagination: res.data.data.pagination || null,
      message: res.data.message || "",
    };
  },

  getById: async (id: string): Promise<any> => {
    const res = await apiClient.get(`sites/${id}`);
    return res.data;
  },

  create: async (data) => {
    const authUserString = localStorage.getItem("auth_user");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;
    const res = await apiClient.post(`sites`, { ...data, company_id });
    return res.data;
  },

  update: async (id, data) => {
    const authUserString = localStorage.getItem("auth_user");
    const authUser = authUserString ? JSON.parse(authUserString) : null;
    const company_id = authUser?.company_id;
    const res = await apiClient.put(`sites/${id}`, { ...data, company_id });
    return res.data;
  },

  delete: async (id) => {
    const res = await apiClient.delete(`sites/${id}`);
    return {
      message: res.data?.message || "Site deleted successfully",
    };
  },
};

//site services end

//region dropdown

export const regionService = {
  getRegionDropdown: async () => {
    const response = await apiClient.get("/regions/dropdown?company_id=1");
    return response.data.data;
  },
};

//region dropdown ended
//country dropdown strt
export const countryServices = {
  getCountryDropdown: async () => {
    const response = await apiClient.get(`/countries/dropdown`);
    return response.data.data;
  },
};
//country dropdown end
//city dropdown strt

export const cityServices = {
  getCityDropdown: async (countryId: string | number) => {
    const response = await apiClient.get(
      `cities/country/${countryId}/dropdown`
    );
    return response.data.data;
  },
};
//city dropdown end
