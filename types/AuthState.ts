import User from "@/types/User";

export default interface AuthState {
    data: {
        loggedIn: boolean;
        user: User | null;
    }
}