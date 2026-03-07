import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';

export class CreateOrderDto {
  @IsEnum(['cart', 'product'], {
    message: 'checkoutType phải là "cart" hoặc "product"',
  })
  @IsNotEmpty()
  checkoutType: 'cart' | 'product';

  @IsNumber()
  @IsOptional()
  productVariantId?: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsNotEmpty()
  shippingName: string;

  @IsString()
  @IsPhoneNumber('VN', {
    message: 'Số điện thoại không đúng định dạng Việt Nam',
  })
  @IsNotEmpty()
  shippingPhone: string;

  @IsString()
  @IsNotEmpty()
  shippingCountry: string;

  @IsString()
  @IsNotEmpty()
  shippingCity: string;

  @IsString()
  @IsNotEmpty()
  shippingAddress: string;

  @IsString()
  @IsOptional()
  voucherCode?: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: 'COD' | 'ZALOPAY' | 'QRCODE';
}
