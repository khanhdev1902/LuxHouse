import { useEffect, useRef, useState } from "react";
import { authApi } from "../apis/auth.api";
import { tokenManager } from "@/lib/tokenManager";

export const useAuthInit = () => {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const hasRun = useRef(false); // 👈 chặn chạy 2 lần

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const initAuth = async () => {
      try {
        await authApi.getMe();
      } catch (error) {
        console.error("Failed to fetch useAuthInit:", error);
        tokenManager.clearTokens();
      } finally {
        setIsAuthLoading(false);
      }
    };

    initAuth();
  }, []);

  return { isAuthLoading };
};
