export const API_ENDPOINTS = {
  PRODUCT: "/products",
  PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,
  CATEGORY: "/categories",
  AUTH: "/auth",
} as const;