import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Type,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ApiResponse } from '../base/api-response';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    console.log('ValidationPipe called');
    if (value === undefined || value === null) {
      throw new BadRequestException(
        ApiResponse.error(
          'No data provided',
          'Validation failed',
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype as Type<unknown>, value);
    const errors = await validate(object as object);
    if (errors.length > 0) {
      const formattedErrors = this.formatErrors(errors);
      throw new BadRequestException(
        ApiResponse.error(
          formattedErrors,
          'Validation failed',
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
    return object;
  }

  private toValidate(metatype: Type<unknown>): boolean {
    const types: Type<unknown>[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: ValidationError[]) {
    const result = {};
    errors.forEach((error) => {
      if (error.constraints) {
        result[error.property] = Object.values(error.constraints);
      }
    });
    return result;
  }
}
