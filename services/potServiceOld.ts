import { ApiDefaultResponse } from '@/types/ApiDefaultResponse';
import { fetchClient } from './http/fetchClient';
import { Pot } from '@/types/Pot';
import { PotRequest } from '@/types/requests/PotRequest';

export const potServiceOld = {
  getAll: async (): Promise<ApiDefaultResponse<Pot[]>> => {
    try {
      const res = await fetchClient("/pots", {
        method: "GET",
        credentials: 'include',
      });

      const data = await res.json() as ApiDefaultResponse<Pot[]>;

      if (!res.ok) {
        return {
          success: false,
          data: [],
          message: data?.message || 'Failed to fetch pots',
        };
      }

      return data;
    } catch (error) {
      return {
        success: false,
        data: [],
        message: 'Unexpected error while fetching pots',
      };
    }
  },

  getById: async (id: number): Promise<ApiDefaultResponse<Pot>> => {
    try {
      const res = await fetchClient(`/pots/${id}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json() as ApiDefaultResponse<Pot>;

      if (!res.ok) {
        return {
          success: false,
          data: {} as Pot,
          message: data?.message || 'Failed to fetch pot details',
        };
      }

      return data;
    } catch (error) {
      return {
        success: false,
        data: {} as Pot,
        message: 'Unexpected error while fetching pot details',
      };
    }
  },

  create: async (data: PotRequest): Promise<ApiDefaultResponse<Pot>> => {
    try {
      const res = await fetchClient("/pots", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json() as ApiDefaultResponse<Pot>;

      if (!res.ok) {
        return {
          success: false,
          data: {} as Pot,
          message: result?.message || 'Failed to create pot',
        };
      }

      return result;
    } catch (error) {
      return {
        success: false,
        data: {} as Pot,
        message: 'Unexpected error while creating pot',
      };
    }
  },

  update: async (id: number, data: PotRequest): Promise<ApiDefaultResponse<Pot>> => {
    try {
      const res = await fetchClient(`/pots/${id}`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json() as ApiDefaultResponse<Pot>;

      if (!res.ok) {
        return {
          success: false,
          data: {} as Pot,
          message: result?.message || 'Failed to update pot',
        };
      }

      return result;
    } catch (error) {
      return {
        success: false,
        data: {} as Pot,
        message: 'Unexpected error while updating pot',
      };
    }
  },

  delete: async (id: number): Promise<ApiDefaultResponse<string>> => {
    try {
      const res = await fetchClient(`/pots/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json() as ApiDefaultResponse<string>;

      if (!res.ok) {
        return {
          success: false,
          data: '',
          message: result?.message || 'Failed to delete pot',
        };
      }

      return result;
    } catch (error) {
      return {
        success: false,
        data: '',
        message: 'Unexpected error while deleting pot',
      };
    }
  },
};
