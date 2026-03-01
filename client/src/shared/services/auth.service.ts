import { API_ENDPOINTS } from "@/shared/constant/api-endpoints";
import http from "@/lib/http";

export const Login = async (data: object) => {
  const res = await http.post(API_ENDPOINTS.LOGIN, data);
  const accessToken = res.data.data.accessToken;
  http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};
