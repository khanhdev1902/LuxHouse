import { API_ENDPOINTS } from "@/shared/constant/api-endpoints";
import http from "@/lib/http";
import type { ApiResponse } from "@/shared/types/api-response";
import type { ProductDetail, ProductListItem } from "@/shared/types/product";

export async function getProducts(): Promise<ProductListItem[]> {
  const res = await http.get<ApiResponse<ProductListItem[]>>(API_ENDPOINTS.PRODUCT);
  const { data } = res.data;
  return data;
}

export async function getProductBySlug(slug: string): Promise<ProductDetail> {
  const res = await http.get<ApiResponse<ProductDetail>>(API_ENDPOINTS.PRODUCT_DETAIL(slug));
  const { data } = res.data;
  return data;
}
