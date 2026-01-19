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
