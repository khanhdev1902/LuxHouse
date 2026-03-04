// features/auth/hooks/useCurrentUser.ts
import { useQuery } from "@tanstack/react-query";
import { authApi } from "../apis/auth.api";
// import { tokenManager } from "@/lib/tokenManager";

export function useCurrentUser() {
  console.log("called useCurrentUser");
  // const accessToken = tokenManager.getAccessToken();
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: authApi.getMe,
    // enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
    // retry: false,
    select: (res) => {
      console.log("API response useCurrentUser:", res);
      return res.data;
    },
  });
}
