"use client";

import { authAPI } from "@/src/apis/auth";
import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";
import { parseServerError } from "@/src/lib/parse-server-error";
import { SignupRequest, SignupSchema } from "@/src/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SignupPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    trigger,
    getValues,
    formState: { errors, isValid, touchedFields },
  } = useForm<SignupRequest>({
    resolver: zodResolver(SignupSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: SignupRequest) => {
    try {
      const response = await authAPI.signup(data);

      if (response.status === 200) {
        router.push("/auth/login");
      }
    } catch (error) {
      const fieldErrors = parseServerError(error);

      if (fieldErrors) {
        const [field, message] = Object.entries(fieldErrors)[0];
        setError(field as keyof SignupRequest, { type: "server", message });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto sm:pt-10 pt-8">
      <h2 className="sm:text-2xl text-xl font-bold mb-6 text-center">회원가입</h2>

      <form className="space-y-4">
        <Input
          label="이메일"
          placeholder="이메일을 입력해주세요."
          errorMessage={errors.username?.message}
          {...register("username")}
        />
        <Input
          label="이름"
          placeholder="이름을 입력해주세요."
          errorMessage={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          showPasswordToggle
          errorMessage={errors.password?.message}
          helperText="8~20자 / 영문, 숫자, 특수문자(!%*#?&)를 각각 1개 이상 포함"
          {...register("password", {
            onChange: () => {
              if (touchedFields.confirmPassword || getValues("confirmPassword")) {
                trigger("confirmPassword");
              }
            },
          })}
        />
        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 확인해주세요."
          showPasswordToggle
          errorMessage={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          aria-label="회원가입"
          variant="primary"
          size="full"
          className="mt-7 font-bold"
          disabled={!isValid}
        >
          회원가입
        </Button>
      </form>

      <div className="mt-4 text-center sm:text-sm text-xs">
        <span className="text-gray-600 dark:text-gray-400">이미 계정이 있으신가요? </span>
        <Link
          href="/auth/login"
          className="text-sky-600 dark:text-sky-400 hover:underline"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
