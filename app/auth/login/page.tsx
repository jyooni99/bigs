"use client";

import { authAPI } from "@/src/apis/auth";
import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";
import { getUser } from "@/src/lib/get-user";
import { parseServerMessage } from "@/src/lib/parse-server-error";
import { LoginRequest, LoginSchema } from "@/src/schemas/auth";
import { useAuthStore } from "@/src/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginRequest) => {
    setServerError("");

    try {
      const response = await authAPI.login(data);

      if (response.data) {
        const user = getUser(response.data.accessToken);
        setAuth(user, response.data.accessToken, response.data.refreshToken);
        router.push("/");
      }
    } catch (error) {
      const message = parseServerMessage(
        error,
        "로그인에 실패했습니다. 다시 시도해주세요."
      );
      setServerError(message);
    }
  };

  return (
    <div className="max-w-md mx-auto sm:pt-10 pt-8">
      <h2 className="sm:text-2xl text-xl font-bold mb-6 text-center">로그인</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {serverError && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-600 dark:text-red-400">
            {serverError}
          </div>
        )}
        <div>
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요."
            errorMessage={errors.username?.message}
            {...register("username")}
          />
        </div>

        <div>
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            showPasswordToggle
            errorMessage={errors.password?.message}
            helperText="8~20자, 영문자, 숫자, 특수문자(!%*#?&)를 각각 1개 이상 포함"
            {...register("password")}
          />
        </div>

        <Button
          type="submit"
          aria-label="로그인"
          variant="primary"
          size="full"
          className="mt-7 font-bold"
          disabled={!isValid}
        >
          로그인
        </Button>
      </form>

      <div className="mt-4 text-center sm:text-sm text-xs">
        <span className="text-gray-600 dark:text-gray-400">계정이 없으신가요? </span>
        <Link
          href="/auth/signup"
          className="text-sky-600 dark:text-sky-400 hover:underline"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
}
