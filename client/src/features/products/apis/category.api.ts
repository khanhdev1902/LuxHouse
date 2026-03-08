import { apiHandler } from "@/helper/api.help";
import http from "@/lib/http";
import { API_ENDPOINTS } from "@/shared/constant/api-endpoints";
import type { CategoryType } from "../types/category.type";
import type { ApiResponse } from "@/shared/types/api-response";

const getLstCategories = async (): Promise<ApiResponse<CategoryType[]>> =>
  apiHandler(http.get(API_ENDPOINTS.CATEGORY));

export const categoryApi = {
  getLstCategories,
};
