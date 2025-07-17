
import { ApiDefaultResponse } from "@/types/ApiDefaultResponse";

export abstract class BaseService<T> {
    public API_BASE: string = process.env.NEXT_PUBLIC_API_BASE + '' || '';

    protected async composeResponse(path: string, method: string, values: any) {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        if (values && method !== 'GET') {
            options.body = JSON.stringify(values);
        }

        return await fetch(`${this.API_BASE}/${path}`, options);
    }

    protected async jsonResponseParsing<T>(response: Response, fallbackData: T):
                              Promise<{ success: boolean, json: any | null, fallback?: ApiDefaultResponse<T>}> {
        let json;

        try {
            if (response.status === 401) {
                return {
                    success: false,
                    json: null,
                    fallback: {
                        success: false,
                        data: fallbackData,
                        message: "The session has expired.",
                        status: response.status
                    }
                };
            }

            json = await response.json();

            return {
                success: true,
                json
            }

        } catch(error: any) {
            return {
                success: false,
                json: null,
                fallback: {
                    success: false,
                    data: fallbackData,
                    message: "Server error",
                    status: response.status
                }
            }
        }
    }

    protected unSuccessfullResponse<T> (response: Response, json: any, fallback: T) {
        if (!response.ok) {
            return {
                success: false,
                data: fallback,
                message: json?.message || "Request failed!",
                status: response.status
            }
        }

        return null as any;
    }
}