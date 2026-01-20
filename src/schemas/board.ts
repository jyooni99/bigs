import { category, content, file, title } from "@/src/schemas/schema";
import z from "zod";

export const createBoardSchema = z.object({
  title: title,
  content: content,
  category: category,
  file: file,
});

export const updateBoardSchema = z.object({
  title: title,
  content: content,
  category: category,
  file: file,
});

export type CreateBoardRequest = z.infer<typeof createBoardSchema>;
export type UpdateBoardRequest = z.infer<typeof updateBoardSchema>;
