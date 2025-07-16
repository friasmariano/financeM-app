import User from "@/types/User";
import HttpStatus from "@/types/HttpStatus";

export default interface AuthState {
    data: {
        loggedIn: boolean;
        user: User | null;
        httpStatus: HttpStatus
    }
}