import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../apis/auth.api";
import { tokenManager } from "@/lib/tokenManager";

export function useLogin() {
  console.log("Called useLogin");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (res) => {
      console.log(res.data.data);
      tokenManager.setAccessToken(res.data.data.accessToken);
      console.log("accessToken", tokenManager.getAccessToken());

      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
  });
}
