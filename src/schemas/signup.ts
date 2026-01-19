import z from "zod";
import { confirmPassword, name, password, username } from "./schema";

export const SignupSchema = z
  .object({
    username: username,
    name: name,
    password: password,
    confirmPassword: confirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type SignupForm = z.infer<typeof SignupSchema>;
