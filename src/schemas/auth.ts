import { confirmPassword, name, password, username } from "@/src/schemas/schema";
import z from "zod";

export const LoginSchema = z.object({
  username: username,
  password: confirmPassword,
});

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

export type LoginRequest = z.infer<typeof LoginSchema>;
export type SignupRequest = z.infer<typeof SignupSchema>;
