import { category, content, image, title } from "@/src/schemas/schema";
import z from "zod";

export const createBoardSchema = z.object({
  title: title,
  content: content,
  category: category,
  image: image,
});

export type CreateBoardRequest = z.infer<typeof createBoardSchema>;
