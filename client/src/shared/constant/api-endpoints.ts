export const API_ENDPOINTS = {
  PRODUCT: "/products",
  PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,
  CATEGORY: "/categories",
  AUTH: "/auth",
  LOGIN: "/auth/login",
  PROFILE: "/auth/me",
  CART: "/cart",
} as const;
