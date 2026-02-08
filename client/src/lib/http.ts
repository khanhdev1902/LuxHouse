import axios, { type AxiosInstance } from "axios";

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/v1/",
  timeout: 10000,
});

if (import.meta.env.DEV) {
  console.log("HTTP Client Base URL:", http.defaults.baseURL);
}

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      return Promise.reject({
        message: error.response?.data?.message ?? error.message,
        code: error.response?.data?.code,
      });
    }
    return Promise.reject({ message: "Unknown error" });
  }
);

export default http;
