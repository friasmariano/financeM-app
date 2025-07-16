import User from "./User";

export interface Pot {
    id: number;
    name: string;
    goalAmount: number;
    currentAmount: number;
    user: User;
}