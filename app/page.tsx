"use client";

import BoardList from "@/src/components/board-list";
import StatusView from "@/src/components/status-view";
import Button from "@/src/components/ui/button";
import { useAuthStore } from "@/src/stores/auth-store";
import { PenBox, PenLine } from "lucide-react";
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

function FloatingActionButton() {
  return (
    <Button
      asChild
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-10 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full"
      variant="primary"
      size="icon"
    >
      <Link href="/boards/create">
        <PenBox className="md:w-7 md:h-7 w-5 h-5" strokeWidth={1.5} />
      </Link>
    </Button>
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
