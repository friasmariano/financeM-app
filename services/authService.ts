import { fetchClient } from "./http/fetchClient";
import UserResponse from "@/types/UserResponse";

export const authService = {
    login: async (credentials: { email: string; password: string }): Promise<UserResponse | null> => {
        return await fetchClient<UserResponse>("auth/authenticate", {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(credentials),
        });
  },

    register: async (data: any) => {
        return fetchClient("auth/register", {
            method: "POST",
            body: JSON.stringify(data)
        });
    },

    logout: async() => {
        return fetchClient("/auth/logout", {
            method: "POST",
            credentials: 'include'
        })
    }
}