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

    const isGuestRoute = pathname.startsWith("/auth");

    if (isGuestRoute && isAuthenticated) {
      router.replace("/");
    } else if (!isGuestRoute && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [pathname, isAuthenticated, hasHydrated, router]);

  return <>{children}</>;
};

export default AuthGuard;
