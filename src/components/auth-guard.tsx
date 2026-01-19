"use client";

import { useAuthStore } from "@/src/stores/auth-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const isGuestRoute = pathname.startsWith("/auth");

    // 게스트 전용 페이지에 로그인한 사용자가 접근
    if (isGuestRoute && isAuthenticated) {
      router.push("/");
    }
    // 인증 필요 페이지에 비로그인 사용자가 접근
    else if (!isGuestRoute && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [pathname, isAuthenticated, router]);

  return <>{children}</>;
};

export default AuthGuard;
