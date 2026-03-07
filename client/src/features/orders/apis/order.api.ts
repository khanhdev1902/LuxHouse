import http from "@/lib/http";
import { apiHandler } from "@/helper/api.help";
import { API_ENDPOINTS } from "@/shared/constant/api-endpoints";

const getMyListOrder = () => apiHandler(http.get(API_ENDPOINTS.ORDER));
const createOrder = (data: object) => apiHandler(http.post(API_ENDPOINTS.ORDER, data));

export const orderApi = {
  getMyListOrder,
  createOrder,
};
