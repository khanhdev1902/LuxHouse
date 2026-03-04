import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../apis/cart.api";
import { CART_QUERY_KEY } from "../types/cart.query";
import type { Cart } from "../types/cart.type";
import { tokenManager } from "@/lib/tokenManager";
import { toast } from "sonner";

interface AddToCartPayload {
  productVariantId: number;
  quantity: number;
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productVariantId, quantity }: AddToCartPayload) => {
      const accessToken = tokenManager.getAccessToken();

      if (!accessToken) {
        toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
        throw new Error("Unauthenticated");
      }

      const res = await cartApi.addToCart(productVariantId, quantity);
      return res.data.data;
    },

    //Optimistic Update
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });

      const previousCart = queryClient.getQueryData<Cart>(CART_QUERY_KEY);

      if (previousCart) {
        const existingItem = previousCart.cartItems.find(
          (item) => item.productVariantId === variables.productVariantId
        );

        let updatedCart: Cart;

        if (existingItem) {
          updatedCart = {
            ...previousCart,
            cartItems: previousCart.cartItems.map((item) =>
              item.productVariantId === variables.productVariantId
                ? {
                    ...item,
                    quantity: item.quantity + variables.quantity,
                  }
                : item
            ),
          };
        } else {
          //nếu chưa tồn tại, có thể push tạm 1 item placeholder
          updatedCart = {
            ...previousCart,
            cartItems: [
              ...previousCart.cartItems,
              {
                id: Date.now(), // temp id
                productVariantId: variables.productVariantId,
                name: "",
                originalPrice: 0,
                price: 0,
                quantity: variables.quantity,
                imageUrl: "",
                attributes: "",
                discount: 0,
              },
            ],
          };
        }

        queryClient.setQueryData(CART_QUERY_KEY, updatedCart);
      }

      return { previousCart };
    },

    //rollback nếu lỗi
    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);
      }
    },

    // sync lại với server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
}
