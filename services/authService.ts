import { ApiDefaultResponse } from "@/types/ApiDefaultResponse";
import { fetchClient } from "./http/fetchClient";
import UserResponse from "@/types/responses/UserResponse";
import LogoutResponse from "@/types/responses/LogoutResponse";

export const authService = {
  login: async (credentials: { email: string; password: string }): Promise<UserResponse> => {
    const res = await fetchClient("/auth/authenticate", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    const apiResponse: ApiDefaultResponse<UserResponse> = await res.json();

    if (!res.ok || !apiResponse.success || !apiResponse.data) {
      const error = new Error(apiResponse?.message || "Login failed.");
      (error as any).response = apiResponse;
      throw error;
    }

    return apiResponse.data;
  },

  register: async (data: any): Promise<ApiDefaultResponse<any>> => {
    const res = await fetchClient("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const responseBody: ApiDefaultResponse<any> = await res.json();

    if (!res.ok || !responseBody.success) {
      const message = responseBody?.message || "Registration failed.";
      const error = new Error(message);
      (error as any).response = responseBody;
      throw error;
    }

    return responseBody;
  },

  logout: async (): Promise<boolean> => {
    const res = await fetchClient("/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.status === 204) return true;

    const data: ApiDefaultResponse<LogoutResponse> = await res.json();
    return data?.success ?? false;
  },
};
