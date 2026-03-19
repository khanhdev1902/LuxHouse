import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { AddressType } from 'src/generated/prisma/enums';

export class CreateAddressDto {
  @IsEnum(AddressType, {
    message: 'Loại địa chỉ phải là HOME, OFFICE hoặc OTHER',
  })
  @IsNotEmpty()
  addressType: AddressType;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @Matches(/^(0|\+84)[0-9]{9}$/, {
    message: 'Số điện thoại không hợp lệ',
  })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  ward: string;

  @IsString()
  @IsNotEmpty()
  streetAddress: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
