import { useQuery } from "@tanstack/react-query";
import { CART_QUERY_KEY } from "../types/cart.query";
import { cartApi } from "../apis/cart.api";
import type { Cart } from "../types/cart.type";
import { tokenManager } from "@/lib/tokenManager";

export const useCart = () => {
  const accessToken = tokenManager.getAccessToken();
  return useQuery<Cart>({
    queryKey: CART_QUERY_KEY,
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const res = await cartApi.getMyCart();
      console.log("Cart data:", res.data);
      return res.data.data;
    },
  });
};
