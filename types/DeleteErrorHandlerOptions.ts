import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default interface DeleteErrorHandlerOptions {
    setIsModalOpen?: (value: boolean) => void;
    router: AppRouterInstance;
    toast: {
        error: (message: string) => void;
    }
}