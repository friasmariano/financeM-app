import { ApiDefaultResponse } from "@/types/ApiDefaultResponse";
import DeleteErrorHandlerOptions from "@/types/DeleteErrorHandlerOptions";
import hasErrorMessages from "./hasErrorMessages";

export const handleDeleteError = <T extends Record<string, any>> (
    result: ApiDefaultResponse<T>,
    { router, setIsModalOpen, toast }: DeleteErrorHandlerOptions
): boolean => {
    if (!result.success) {
        if (result.status === 401) {
            setIsModalOpen?.(false);
            toast.error(result.message.toString());

            setTimeout(() => router.push('/login'), 3000);

            return true;
        }

        if (!hasErrorMessages(result.data)) {
            toast.error(result.message?.toString() || 'Unexpected error on delete.');
            return true;
        }

        Object.entries(result.data).forEach(([_, message]) => {
            if (typeof message === 'string' ) {
                toast.error(message);
            }
        });

        if (process.env.NODE_ENV === 'development') {
            console.log(result);
        }

        return true;
    }

    return false;
}