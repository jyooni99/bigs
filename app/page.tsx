"use client";

import BoardList from "@/src/components/board/board-list";
import Button from "@/src/components/ui/button";
import FloatingActionButton from "@/src/components/ui/floating-button";
import StatusView from "@/src/components/ui/status-view";
import { useAuthStore } from "@/src/stores/auth-store";
import { PenLine } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { isAuthenticated, hasHydrated } = useAuthStore();

  if (!hasHydrated) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {isAuthenticated ? <AuthenticatedView /> : <UnauthenticatedView />}
    </div>
  );
}

function AuthenticatedView() {
  return (
    <>
      <BoardList />
      <FloatingActionButton />
    </>
  );
}

function UnauthenticatedView() {
  return (
    <div className="pt-10">
      <StatusView
        title="당신의 이야기를 기록해보세요"
        description="회원가입 또는 로그인 후 게시글을 자유롭게 작성할 수 있어요"
        icon={<PenLine className="size-8" />}
      >
        <Button
          asChild
          variant="primaryOutline"
          size="lg"
          className="w-[140px] font-semibold"
        >
          <Link href="/auth/login">로그인</Link>
        </Button>
        <Button
          asChild
          variant="primaryOutline"
          size="lg"
          className="w-[140px] font-semibold"
        >
          <Link href="/auth/signup">회원가입</Link>
        </Button>
      </StatusView>
    </div>
  );
}
