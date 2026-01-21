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

export const confirmPassword = z.string().min(1, "비밀번호를 입력해주세요.");

export const title = z
  .string()
  .min(1, "제목을 입력해주세요.")
  .max(100, "제목은 100자 이하여야 합니다.");

export const content = z
  .string()
  .min(1, "내용을 입력해주세요.")
  .max(1000, "내용은 1000자 이하여야 합니다.");

export const category = z.enum(["NOTICE", "FREE", "QNA", "ETC"]);

export const file = z
  z.file()
  .optional()
  .refine(
    (file) => !file || (file instanceof File && file.size <= 10 * 1024 * 1024),
    "이미지 파일 크기는 10MB 이하여야 합니다."
  );
