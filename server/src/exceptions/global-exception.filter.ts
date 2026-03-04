import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from 'src/common/base/api-response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.error('Global Exception Caught:', exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error: unknown;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const responseObj = exceptionResponse as {
          message?: string;
          error?: unknown;
        };

        error = responseObj.error;
        message = responseObj.message ?? message;
      }

      switch (status) {
        case HttpStatus.BAD_REQUEST:
          message ||= 'Dữ liệu không hợp lệ!';
          break;
        case HttpStatus.UNAUTHORIZED:
          message ||= 'Bạn cần đăng nhập để thực hiện hành động này!';
          break;
      }
    } else if (exception instanceof Error) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else {
      message = 'Lỗi hệ thống!';
    }

    return response
      .status(status)
      .json(ApiResponse.error(error, message, status));
  }
}
