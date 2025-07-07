import User from "./User";

export interface Pot {
    id: number;
    name: string;
    goalAmount: string;
    currentAmount: string;
    user: User;
}