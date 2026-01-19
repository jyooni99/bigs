import { confirmPassword, username } from "@/src/schemas/schema";
import z from "zod";

export const LoginSchema = z.object({
  username: username,
  password: confirmPassword,
});

export type LoginForm = z.infer<typeof LoginSchema>;
