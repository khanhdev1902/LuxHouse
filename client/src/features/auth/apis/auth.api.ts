import { API_ENDPOINTS } from "@/shared/constant/api-endpoints";
import type { LoginRequest, RegisterRequest } from "../types/auth-request.type";
import http from "@/lib/http";

const login = (data: LoginRequest) => http.post(API_ENDPOINTS.LOGIN, data);
const register = (data: RegisterRequest) => http.post(API_ENDPOINTS.REGISTER, data);
const getMe = () => http.get(API_ENDPOINTS.ME);

export const authApi = { login, register, getMe };
