import axios, { type AxiosResponse } from "axios";

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
      throw {
        code: error.response?.data?.code,
        error: error.response?.data?.error,
        message: error.response?.data?.message,
      };
    }
    throw error;
  }
}
