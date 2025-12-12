import z from "zod";

export const templateSchema = z.object({
  templateId: z.string(),
  templateData: z.string(),
  category: z.string(),
});

export const weddingInputSchema = z.object({
  categoryName: z.string().optional(),
  componentName: z.string(),
  price: z.number().min(0),
  width: z.number().min(0),
  imageUrl: z.string().min(4),
});
export const paginationSchema = z.object({
  categoryName: z.string().optional(),
  page: z.number().min(1),
  items: z.number().min(5).max(10),
});
