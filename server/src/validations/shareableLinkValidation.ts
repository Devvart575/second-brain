import { z } from "zod";

export const shareableLinkSchema = z.object({
  hash: z.string().min(6, "Hash must be at least 6 characters"),
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ObjectId"),
});

export type ShareableLinkInput = z.infer<typeof shareableLinkSchema>;
