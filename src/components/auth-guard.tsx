"use client";

import { useAuthStore } from "@/src/stores/auth-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return;

    const isGuestOnlyRoute = pathname.startsWith("/auth");
    const isProtectedRoute = pathname.startsWith("/boards");

    if (isGuestOnlyRoute && isAuthenticated) {
      router.replace("/");
    } else if (isProtectedRoute && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [pathname, isAuthenticated, hasHydrated, router]);

  return <>{children}</>;
};

export default AuthGuard;

/**
 * Auth Guard의 hydration 처리가 필요한 이유?
 *
 * zustand persist를 사용해서 인증 상태를 로컬 스토리지에서 복원하기 때문에
 * 서버에서 HTML을 생성하는 시점 ~ 하이드레이션 이전 시점에는 isAuthenticated가 기본값인 false로 설정되어있음
 * 이후 하이드레이션이 완료되면서 로컬 스토리지에서 값을 가져오게 되고, 실제 인증 상태가 반영됨
 *
 * 이때, 값을 가져오기 전에 auth guard 로직이 실행되면 로그인한 사용자가 게스트로 판단되어 로그인 페이지로 리다이렉트 되는 문제가 발생할 수 있음
 * 이를 방지하기 위해 hasHydrated를 추가하여 값을 가져온 이후에 auth guard 로직이 실행되도록 함
 */
