"use client";

import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";
import { LoginRequest } from "@/src/types/auth";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginRequest>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginRequest) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요."
            {...register("username")}
          />
        </div>

        <div>
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            showPasswordToggle
            {...register("password")}
          />
        </div>

        <Button
          type="submit"
          aria-label="로그인"
          variant="primary"
          size="full"
          className="mt-3 font-bold"
          disabled={!isValid}
        >
          로그인
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">계정이 없으신가요? </span>
        <Link href="/signup" className="text-sky-600 dark:text-sky-400 hover:underline">
          회원가입
        </Link>
      </div>
    </div>
  );
}
