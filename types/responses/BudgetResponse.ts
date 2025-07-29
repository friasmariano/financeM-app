
export default interface BudgetResponse {
    id: number;
    name: string;
    categoryId: number;
    categoryName: string;
    limitAmount: number;
    userId: number;
}