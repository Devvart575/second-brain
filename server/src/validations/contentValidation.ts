import { z } from "zod";

export const contentTypes = ["image", "video", "article", "audio"] as const;

export const contentSchema = z.object({
  link: z.url("Must be a valid URL"),
  type: z.enum(contentTypes),
  title: z.string().min(3, "Title must be at least 3 characters"),
  tags: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid tag ObjectId")).optional(),
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ObjectId"),
});

export type ContentInput = z.infer<typeof contentSchema>;
