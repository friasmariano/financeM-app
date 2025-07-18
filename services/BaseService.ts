
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

    protected unSuccessfullResponse<T> (response: Response,
                                        json: Partial<ApiDefaultResponse<T>> | null,
                                        fallback: T) {
        if (!response.ok) {
            return {
                success: false,
                data: json?.data || fallback,
                message: json?.message ?? "Request failed!",
                status: json?.status ?? response.status
            }
        }

        return null;
    }

    protected errorHandler<T>(response: Response,
                              jsonResponse: { success: boolean; fallback?: ApiDefaultResponse<T>; json: any },
                              schema: any,
                              defaultData: T): ApiDefaultResponse<T> | null {

        if (!jsonResponse.success && jsonResponse.fallback) {
            return jsonResponse.fallback;
        }

        const json = jsonResponse.json;

        const errorResponse = this.unSuccessfullResponse<T>(response, json, defaultData);
        if (errorResponse) {
            return errorResponse;
        }

        const result = schema.safeParse(json);
        if (!result.success) {
            return {
                success: false,
                data: defaultData,
                message: json.data || "Server response couln't be translated.",
                status: response.status
            };
        }

        return null;
    }
}