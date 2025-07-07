
export interface ApiDefaultResponse<T> {
    success: boolean;
    data: T;
    message: string;
}