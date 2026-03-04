import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../apis/auth.api";
import { tokenManager } from "@/lib/tokenManager";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useLogin() {
  console.log("Called useLogin");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (res) => {
      console.log("response useLogin:", res);
      tokenManager.setAccessToken(res.data.accessToken);
      console.log("accessToken", tokenManager.getAccessToken());

      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
      toast.success(res.message ?? "Đăng nhập thành công !");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: (e) => {
      console.log("loi login", e);
      toast.error(e.message ?? "Lỗi đăng nhập!");
    },
  });
}
