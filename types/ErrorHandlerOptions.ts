import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type ErrorHandlerOptions = {
    router: AppRouterInstance;
    setErrors: React.Dispatch<React.SetStateAction<string[]>>;
    setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};