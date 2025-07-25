import z from "zod";
import { apiResponseSchema } from "./apiResponseSchema";

export const budgetSchema = z.object({
    id: z.number(),
    categoryId: z.number(),
    categoryName: z.string(),
    limitAmount: z.number(),
    userId: z.number()
});

export const budgetResponseSchema = apiResponseSchema(budgetSchema);