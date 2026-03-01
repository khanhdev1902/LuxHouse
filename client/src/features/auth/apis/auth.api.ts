import { API_ENDPOINTS } from "@/shared/constant/api-endpoints";
import type { LoginRequest } from "../types/login-request.type";
import http from "@/lib/http";

const login = (data: LoginRequest) => http.post(API_ENDPOINTS.LOGIN, data);
const getProfile = () => http.get(API_ENDPOINTS.PROFILE);

export const authApi = { login, getProfile };
