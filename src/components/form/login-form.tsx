"use client";

import { useLogin } from "@/app/api/mutation";
import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";
import { LoginRequest, LoginSchema } from "@/src/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginRequest) => {
    loginMutation.mutate(data);
  };

  return (
    
    <div className="max-w-md mx-auto sm:pt-10 pt-8">
      <h2 className="sm:text-2xl text-xl font-bold mb-6 text-center">로그인</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            id="username"
            label="이메일"
            placeholder="이메일을 입력해주세요."
            errorMessage={errors.username?.message}
            autoFocus
            inputMode="email"
            {...register("username")}
          />
        </div>

        <div>
          <Input
            id="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            showPasswordToggle
            errorMessage={errors.password?.message}
            helperText="8~20자, 영문자, 숫자, 특수문자(!%*#?&)를 각각 1개 이상 포함"
            autoComplete="off"
            {...register("password")}
          />
        </div>

        <Button
          id="login-button"
          type="submit"
          aria-label="로그인"
          variant="primary"
          size="full"
          className="mt-7 font-bold"
          disabled={!isValid || loginMutation.isPending}
        >
          {loginMutation.isPending ? "로그인 중..." : "로그인"}
        </Button>
      </form>

      <div className="mt-4 text-center sm:text-sm text-xs">
        <span className="text-zinc-600 dark:text-zinc-400">계정이 없으신가요? </span>
        <Link
          href="/auth/signup"
          className="text-sky-600 dark:text-sky-400 hover:underline"
          onMouseDown={(e) => {
            e.preventDefault();
            router.push('/auth/signup');
          }}
        >
          회원가입
        </Link>
      </div>
    </div>
  );
}

