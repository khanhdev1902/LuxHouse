import { API_ENDPOINTS } from "@/shared/constant/api-endpoints";
import http from "@/lib/http";
import type { ProductDetail, ProductListItem } from "@/shared/types/product";
import { apiHandler } from "@/helper/api.help";
import type { ApiResponse } from "@/shared/types/api-response";
import type { ProductQuery } from "../types/productQuery.type";

const getProducts = async (params?: ProductQuery): Promise<ApiResponse<ProductListItem[]>> =>
  apiHandler(http.get(API_ENDPOINTS.PRODUCT, { params }));

const getProductBySlug = async (slug: string): Promise<ApiResponse<ProductDetail>> =>
  apiHandler(http.get(API_ENDPOINTS.PRODUCT_DETAIL(slug)));

export const productApi = {
  getProducts,
  getProductBySlug,
};
