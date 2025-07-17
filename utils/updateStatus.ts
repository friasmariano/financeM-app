import { AppDispatch } from "@/lib/store";
import { setHttpStatus } from "@/lib/features/auth/store/auth-slice";

export function updateStatus (response: any, dispatch: AppDispatch) {
    dispatch(setHttpStatus({
        statusCode: response.status,
        errorMessage: response.message
    }))
}
