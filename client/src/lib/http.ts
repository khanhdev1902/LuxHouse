import axios, { type AxiosInstance } from "axios";
import { tokenManager } from "@/lib/tokenManager";

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/v1/",
  timeout: 10000,
  withCredentials: true,
});

if (import.meta.env.DEV) {
  console.log("HTTP Client Base URL:", http.defaults.baseURL);
}

http.interceptors.request.use(
  (config) => {
    const accessToken = tokenManager.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("lỗi nè hehe:))", error);
    console.log("data lỗi nè hehe:))", error.response);
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && tokenManager.getAccessToken()) {
      originalRequest._retry = true;

      try {
        const res = await http.post("/auth/refresh");
        const newAccessToken = res.data.data.accessToken;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return http(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    if (axios.isAxiosError(error)) {
      return Promise.reject({
        code: error.response?.data?.code,
        error: error.response?.data?.error,
        message: error.response?.data?.message ?? error.message,
      });
    }

    return Promise.reject({ message: "Unknown error" });
  }
);

export default http;
