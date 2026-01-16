"use client";

import Button from "@/src/components/ui/button";
import Link from "next/link";
import { User } from "../types/auth";

export default function Header() {
  const user: User | null = null;

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-black">
          BigsBoard
        </Link>

        <nav className="flex items-center gap-4">
          {user ? <UserInfo user={user} /> : <LoginButton />}
        </nav>
      </div>
    </header>
  );
}

const UserInfo = ({ user }: { user: User }) => {
  return (
    <>
      <div className="flex flex-col text-right">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {user.name}님
        </span>
        <span className="text-xs text-gray-600 dark:text-gray-400">
          ({user.username})
        </span>
      </div>
      <Button variant="secondary" size="sm">
        로그아웃
      </Button>
    </>
  );
};

const LoginButton = () => {
  return (
    <Button variant="primary" size="sm" className="font-semibold" asChild>
      <Link href="/login">로그인</Link>
    </Button>
  );
};
