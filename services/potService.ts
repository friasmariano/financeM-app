
import { ApiDefaultResponse } from '@/types/ApiDefaultResponse'
import { fetchClient } from './http/fetchClient'
import { Pot } from '@/types/Pot'
import { PotRequest } from '@/types/requests/potRequest';

export const potService = {
    getAll: async(): Promise<ApiDefaultResponse<Pot[]>> => {
        const res = await fetchClient<ApiDefaultResponse<Pot[]>>("/api/pots", {
            method: "GET",
            credentials: 'include'
        });

        if (!res) {
            return {
                success: false,
                data: [],
                message: "Failed to fetch pots"
            }
        }

        return res;
    },

    getById: async (id: number): Promise<ApiDefaultResponse<Pot>> => {
        const res = await fetchClient<ApiDefaultResponse<Pot>>(`/api/pots/${id}`, {
            method: "GET",
            credentials: "include"
        });

        if (!res) {
            return {
                success: false,
                data: {} as Pot,
                message: "Failed to fetch pot details"
            }
        }

        return res;
    },

    create: async (data: PotRequest): Promise<ApiDefaultResponse<Pot>> => {
        const res = await fetchClient<ApiDefaultResponse<Pot>>("/api/pots", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data)
        });

        if (!res) {
            return {
                success: false,
                data: {} as Pot,
                message: "Failed to create pot",
            };
        }

        return res;
    },

    update: async (id: number, data: PotRequest): Promise<ApiDefaultResponse<Pot>> => {
        const res = await fetchClient<ApiDefaultResponse<Pot>>(`/api/pots/${id}`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(data),
        });

        if (!res) {
            return {
                success: false,
                data: {} as Pot,
                message: "Failed to update pot"
            };
        }

        return res;
    },

    delete: async (id: number): Promise<ApiDefaultResponse<string>> => {
        const res = await fetchClient<ApiDefaultResponse<string>>(`/api/pots/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        if (!res) {
            return {
                success: false,
                data: "",
                message: "Failed to delete pot"
            };
        }

        return res;
    }
}