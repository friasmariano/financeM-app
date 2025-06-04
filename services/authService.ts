import { fetchClient } from "./http/fetchClient";

export const authService = {
    login: async (credentials: { username: string; password: string; }) => {
        return fetchClient("/auth/authenticate", {
            method: "POST",
            body: JSON.stringify(credentials),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
    },

    register: async (data: any) => {
        return fetchClient("auth/register", {
            method: "POST",
            body: JSON.stringify(data)
        });
    },

    logout: async() => {
        return fetchClient("/auth/logout", {
            method: "POST"
        })
    }
}