import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { tokenManager } from "@/lib/tokenManager";

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/v1/",
  timeout: 10000,
  withCredentials: true,
});

if (import.meta.env.DEV) {
  console.log("HTTP Client Base URL:", http.defaults.baseURL);
}
// ================= REQUEST =================
http.interceptors.request.use(
  (config) => {
    const accessToken = tokenManager.getAccessToken();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE =================
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401) {
      throw error;
    }

    if (originalRequest.url?.includes("/auth/refresh")) {
      handleLogout();
      throw error;
    }

    if (originalRequest._retry) {
      throw error;
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(http(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const res = await http.post("/auth/refresh");
      const newAccessToken = res.data.data.accessToken;

      tokenManager.setAccessToken(newAccessToken);

      onRefreshed(newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return http(originalRequest);
    } catch (err) {
      handleLogout();
      throw err;
    } finally {
      isRefreshing = false;
    }
  }
);
function handleLogout() {
  tokenManager.clearTokens();
  // window.location.href = "/login";
  // setTimeout(() => {}, 10000);
  // toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
  console.log("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
}

export default http;
