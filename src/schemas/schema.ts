import z from "zod";

export const username = z
  .email("유효한 이메일 주소를 입력해주세요.")
  .min(1, "이메일을 입력해주세요.")
  .max(20, "이메일은 20자 이하여야 합니다.");

export const name = z
  .string()
  .min(1, "이름을 입력해주세요.")
  .max(20, "이름은 20자 이하여야 합니다.");

export const password = z
  .string()
  .min(1, "비밀번호를 입력해주세요.")
  .min(8, "8자 이상 입력해주세요.")
  .max(20, "20자 이하로 입력해주세요.")
  .refine((pw) => /[a-zA-Z]/.test(pw), "영문자를 포함해주세요.")
  .refine((pw) => /[0-9]/.test(pw), "숫자를 포함해주세요.")
  .refine((pw) => /[!%*#?&]/.test(pw), "특수문자(!%*#?&)를 포함해주세요.");
