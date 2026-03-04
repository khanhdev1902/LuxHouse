import { ApiResponseKey } from '../enums/api-response-key.enum';
import { HttpStatus } from '@nestjs/common';

interface ApiResponseData<T, E = unknown, M = unknown> {
  [ApiResponseKey.SUCCESS]: boolean;
  [ApiResponseKey.STATUS]: string;
  [ApiResponseKey.CODE]: HttpStatus;
  [ApiResponseKey.DATA]?: T;
  meta?: M;
  [ApiResponseKey.MESSAGE]: string;
  [ApiResponseKey.TIMESTAMP]: string;
  [ApiResponseKey.ERROR]?: E;
}
export type ApiResponseType<T, E = unknown, M = unknown> = ApiResponseData<
  T,
  E,
  M
>;

export class ApiResponse {
  private static getTimestamp(): string {
    return new Date().toISOString();
  }
  static success<T, M = unknown>(
    data: T,
    message: string = '',
    statusCode: HttpStatus = HttpStatus.OK,
    meta?: M,
  ): ApiResponseType<T, unknown, M> {
    return {
      [ApiResponseKey.SUCCESS]: true,
      [ApiResponseKey.STATUS]: HttpStatus[statusCode],
      [ApiResponseKey.CODE]: statusCode,
      [ApiResponseKey.DATA]: data,
      meta,
      [ApiResponseKey.MESSAGE]: message,
      [ApiResponseKey.TIMESTAMP]: this.getTimestamp(),
    };
  }
  static error<E>(
    error: E,
    message: string = '',
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ): ApiResponseType<E> {
    return {
      [ApiResponseKey.SUCCESS]: false,
      [ApiResponseKey.STATUS]: HttpStatus[statusCode],
      [ApiResponseKey.CODE]: statusCode,
      [ApiResponseKey.ERROR]: error,
      [ApiResponseKey.MESSAGE]: message,
      [ApiResponseKey.TIMESTAMP]: this.getTimestamp(),
    };
  }

  static message(
    message: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ): ApiResponseType<string> {
    return {
      [ApiResponseKey.SUCCESS]:
        statusCode === HttpStatus.OK || statusCode === HttpStatus.CREATED,
      [ApiResponseKey.STATUS]: HttpStatus[statusCode],
      [ApiResponseKey.CODE]: statusCode,
      [ApiResponseKey.MESSAGE]: message,
      [ApiResponseKey.TIMESTAMP]: this.getTimestamp(),
    };
  }
}
