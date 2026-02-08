export interface ApiResponse<T> {
  success: boolean;
  status: string;
  code: number;
  message: string;
  timestamp: string;
  data: T;
}
