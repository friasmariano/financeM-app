
import { z, ZodType } from 'zod';

export const apiResponseSchema = <T extends ZodType<any>>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    message: z.string(),
});
