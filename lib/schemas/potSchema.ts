
import { z } from 'zod'
import { apiResponseSchema } from './apiResponseSchema'

export const potSchema = z.object({
    id: z.number(),
    name: z.string(),
    goalAmount: z.number(),
    currentAmount: z.number(),
    userId: z.number().optional(),
});

export const potResponseSchema = apiResponseSchema(potSchema);