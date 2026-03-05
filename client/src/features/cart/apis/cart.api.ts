import http from "@/lib/http";
import { API_ENDPOINTS } from "@/shared/constant/api-endpoints";

const getMyCart = async () => http.get(API_ENDPOINTS.CART);

const addToCart = async (productVariantId: number, quantity: number) =>
  http.post(API_ENDPOINTS.CART, { productVariantId, quantity });

const updateCartItemQuantity = async (productVariantId: number, quantity: number) =>
  http.patch(API_ENDPOINTS.CART, { productVariantId, quantity });

const removeCartItem = async (productVariantId: number) =>
  http.delete(API_ENDPOINTS.CART_ITEMS(productVariantId));

export const cartApi = {
  getMyCart,
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
};
