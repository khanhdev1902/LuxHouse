import { Toaster } from "@/shared/components/ui/sonner";
import AppRouter from "@/app/routes";
// import { tokenManager } from "@/lib/tokenManager";
// import { useEffect } from "react";
// import { authApi } from "@/features/auth/apis/auth.api";
// import { useQueryClient } from "@tanstack/react-query";

export default function App() {
  // const queryClient = useQueryClient();

  // useEffect(() => {
  //   const initAuth = async () => {
  //     try {
  //       const res = await authApi.refreshData();

  //       tokenManager.setAccessToken(res.data.accessToken);
  //       if (tokenManager.getAccessToken()) {
  //         const userRes = await authApi.getMe();
  //         console.log("User data on app init:", userRes);
  //         queryClient.setQueryData(["currentUser"], userRes.data);
  //       }
  //     } catch (error) {
  //       console.log("Chưa login hoặc refresh hết hạn", error);
  //     }
  //   };

  //   initAuth();
  // }, []);

  return (
    <>
      <AppRouter />
      <Toaster theme="light" position="top-right" richColors toastOptions={{ duration: 3000 }} />
    </>
  );
}
