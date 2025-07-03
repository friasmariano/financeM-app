import { TokenResponse } from "@/types/TokenResponse";
import { fetchClient } from "./http/fetchClient";

export const authService = {
    login: async (credentials: { email: string; password: string }): Promise<TokenResponse | null> => {
        return await fetchClient<TokenResponse>("auth/authenticate", {
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