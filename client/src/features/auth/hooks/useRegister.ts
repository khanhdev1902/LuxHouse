import { useMutation } from "@tanstack/react-query";
import { authApi } from "../apis/auth.api";

export function useRegister() {
  console.log("called useRegister");

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (res) => {
      console.log("data res", res);
    },
    onError: (e) => console.log(e),
  });
}
