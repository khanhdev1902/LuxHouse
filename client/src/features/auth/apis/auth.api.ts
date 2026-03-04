import { API_ENDPOINTS } from "@/shared/constant/api-endpoints";
import type { LoginRequest, RegisterRequest } from "../types/auth-request.type";
import http from "@/lib/http";
import { apiHandler } from "../../../helper/api.help";

export const login = (data: LoginRequest) => apiHandler(http.post(API_ENDPOINTS.LOGIN, data));
export const logout = () => apiHandler(http.post(API_ENDPOINTS.LOGOUT));
const register = (data: RegisterRequest) => apiHandler(http.post(API_ENDPOINTS.REGISTER, data));
const getMe = () => apiHandler(http.get(API_ENDPOINTS.ME));
const refreshData = () => apiHandler(http.post(API_ENDPOINTS.REFRESH_DATA));

export const authApi = { login, register, getMe, refreshData, logout };
