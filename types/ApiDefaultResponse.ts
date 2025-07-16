
export interface ApiDefaultResponse<T> {
    success: boolean;
    data: T;
    message: string | Record<string, string>;
    status?: number;
}