import { z } from "zod";

export const tagSchema = z.object({
  title: z.string().min(2, "Tag title must be at least 2 characters"),
});

export type TagInput = z.infer<typeof tagSchema>;
