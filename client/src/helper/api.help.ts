import axios, { type AxiosResponse } from "axios";
export interface ApiErrorResponse {
  code: number;
  message: string;
  error: {
    name?: string[];
    email?: string[];
    password?: string[];
    [key: string]: string[] | undefined; // Cho phép các field khác
  };
}

export async function apiHandler<T>(promise: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    console.log("API Request:", promise);
    const res = await promise;
    console.log("API Response:", res);
    return res.data;
  } catch (error) {
    console.log("API Error1:", error);
    if (axios.isAxiosError(error)) {
      console.log("API Error:", error.response ?? error);
      const customError: ApiErrorResponse = {
        code: error.response?.data?.code || 500,
        error: error.response?.data?.error || {},
        message: error.response?.data?.message || "Something went wrong",
      };
      throw customError;
    }
    throw error;
  }
}
