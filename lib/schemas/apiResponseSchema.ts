
import { z, ZodType } from 'zod';

export const apiResponseSchema = <T extends ZodType<any>>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    message: z.string(),
    timestamp: z
      .string()
      .refine(val => !isNaN(Date.parse(val)), {
        message: 'Invalid datetime format'
      })
      .optional()
}).catchall(z.any());
