import { ApiDefaultResponse } from '@/types/ApiDefaultResponse';
import { ErrorHandlerOptions } from '@/types/ErrorHandlerOptions';
import { formatErrorMessages } from './formatErrorMessages';
import hasErrorMessages from './hasErrorMessages';
import { toast } from 'react-toastify';

export const apiErrorHandler = <T extends Record<string, any>> (result: ApiDefaultResponse<T>,
                                    { router, setErrors, setIsModalOpen } : ErrorHandlerOptions): boolean =>{
    if (!result.success) {
        if (result.status === 401) {
            setIsModalOpen?.(false);
            toast.error(result.message.toString());

            setTimeout(() => { router.push('/login') }, 3000);
            return true;
        }

        if (!hasErrorMessages(result.data)) {
            setErrors([result.message.toString()]);

            setTimeout(() => {setErrors([])}, 5000);
            return true;
        }

        formatErrorMessages(result.data, setErrors);
        setTimeout(() => {setErrors([])}, 5000);
        return true;
    }

    return false;
}