"use client";

import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";
import { SignupRequest } from "@/src/types/auth";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignupRequest>({
    defaultValues: {
      username: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignupRequest) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>

      <form className="space-y-4">
        <Input
          label="이메일"
          placeholder="이메일을 입력해주세요."
          {...register("username")}
        />
        <Input label="이름" placeholder="이름을 입력해주세요." {...register("name")} />
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          showPasswordToggle
          {...register("password")}
        />
        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 확인해주세요."
          showPasswordToggle
          {...register("confirmPassword")}
        />

        <Button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          aria-label="회원가입"
          variant="primary"
          size="full"
          className="mt-3 font-bold"
          disabled={!isValid}
        >
          회원가입
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">이미 계정이 있으신가요? </span>
        <Link href="/login" className="text-sky-600 dark:text-sky-400 hover:underline">
          로그인
        </Link>
      </div>
    </div>
  );
}
