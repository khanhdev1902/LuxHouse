export const API_ENDPOINTS = {
  PRODUCT: "/products",
  PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,
  CATEGORY: "/categories",
  AUTH: "/auth",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",
  ME: "/auth/me",
  CART: "/cart",
  CART_ITEMS: (productVariantId: number) => `/cart/items/${productVariantId}`,
  CHECKOUT: "/checkout",
  REFRESH_DATA: "/auth/refresh",
} as const;
