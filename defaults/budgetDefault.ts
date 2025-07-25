import type BudgetResponse from "@/types/responses/BudgetResponse"

const budgetDefault: BudgetResponse = {
    id: 0,
    categoryId: 0,
    categoryName: '',
    limitAmount: 0,
    userId: 0
}

export default budgetDefault;