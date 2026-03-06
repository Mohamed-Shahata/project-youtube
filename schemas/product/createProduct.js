import * as z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(20),
  price: z.number().min(1),
  stock: z.number().min(1),
  category: z.string().min(2),
});
