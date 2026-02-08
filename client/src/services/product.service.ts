import { API_ENDPOINTS } from "@/constant/api-endpoints";
import http from "@/lib/http";
import type { ApiResponse } from "@/types/api-response";
import type { ListProduct, ProductDetail } from "@/types/product";

export async function getProducts(): Promise<ListProduct[]> {
  const res = await http.get<ApiResponse<ListProduct[]>>(API_ENDPOINTS.PRODUCT);
  const { data } = res.data;
  return data;
}

export async function getProductBySlug(slug: string): Promise<ProductDetail> {
  const res = await http.get<ApiResponse<ProductDetail>>(API_ENDPOINTS.PRODUCT_DETAIL(slug));
  const { data } = res.data;
  return data;
}
