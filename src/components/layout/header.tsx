"use client";

import Button from "@/src/components/ui/button";
import { useAuthStore } from "@/src/stores/auth-store";
import { User } from "@/src/types/auth";
import Link from "next/link";

export default function Header() {
  const { user, logout, hasHydrated } = useAuthStore();

  return (
    <header className="bg-white dark:bg-zinc-900 w-full border-b border-zinc-200 dark:border-zinc-800 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl sm:text-2xl font-black hover:text-sky-500 dark:hover:text-sky-700 transition-all">
          BigsBoard
        </Link>

        <nav className="flex items-center gap-4">
          {!hasHydrated ? (
            <div className="w-20 h-9 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
          ) : user ? (
            <UserInfo user={user} logout={logout} />
          ) : (
            <LoginButton />
          )}
        </nav>
      </div>
    </header>
  );
}

const UserInfo = ({ user, logout }: { user: User; logout: () => void }) => {
  return (
    <>
      <div className="flex flex-col text-right">
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {user.name}님
        </span>
        <span className="text-xs text-zinc-600 dark:text-zinc-400">
          ({user.username})
        </span>
      </div>
      <Button variant="secondary" size="sm" onClick={logout}>
        로그아웃
      </Button>
    </>
  );
};

const LoginButton = () => {
  return (
    <Button variant="primary" size="sm" className="font-semibold" asChild>
      <Link href="/auth/login">로그인</Link>
    </Button>
  );
};
