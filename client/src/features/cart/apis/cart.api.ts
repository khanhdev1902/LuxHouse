import { apiHandler } from "@/helper/api.help";
import http from "@/lib/http";
import { API_ENDPOINTS } from "@/shared/constant/api-endpoints";

const getMyCart = async () => apiHandler(http.get(API_ENDPOINTS.CART));

const addToCart = async (productVariantId: number, quantity: number) =>
  apiHandler(http.post(API_ENDPOINTS.CART, { productVariantId, quantity }));

const updateCartItemQuantity = async (productVariantId: number, quantity: number) =>
  apiHandler(http.patch(API_ENDPOINTS.CART, { productVariantId, quantity }));

const removeCartItem = async (productVariantId: number) =>
  apiHandler(http.delete(API_ENDPOINTS.CART_ITEMS(productVariantId)));

export const cartApi = {
  getMyCart,
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
};
