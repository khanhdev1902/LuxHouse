export const API_ENDPOINTS = {
  PRODUCT: "/products",
  PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,
  CATEGORY: "/categories",
  AUTH: "/auth",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ME: "/auth/me",
  CART: "/cart",
} as const;
