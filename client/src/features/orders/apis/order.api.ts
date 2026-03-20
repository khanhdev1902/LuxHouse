import http from "@/lib/http";
import { apiHandler } from "@/helper/api.help";
import { API_ENDPOINTS } from "@/shared/constant/api-endpoints";

const getMyListOrder = () => apiHandler(http.get(API_ENDPOINTS.ORDER));
const createOrderFormCart = (data: object) => apiHandler(http.post(API_ENDPOINTS.ORDERCART, data));
const createOrderFormBuyNow = (data: object) =>
  apiHandler(http.post(API_ENDPOINTS.ORDERBUYNOW, data));

export const orderApi = {
  getMyListOrder,
  createOrderFormCart,
  createOrderFormBuyNow,
};
