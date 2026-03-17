import { useMutation } from "@tanstack/react-query";
import { authApi } from "../apis/auth.api";
import type { ApiErrorResponse } from "@/helper/api.help";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (res: any) => {
      toast.success(res.message || "Đăng ký thành công!", {
        description: "Bạn sẽ được chuyển đến trang đăng nhập sau 2 giây.",
        duration: 2000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
    onError: (e: ApiErrorResponse) => {
      toast.error(e.message || "Có lỗi xảy ra, vui lòng thử lại");
    },
  });
}
