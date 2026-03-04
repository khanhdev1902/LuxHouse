import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  @IsInt()
  productVariantId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'Số lượng tối thiểu là 1' })
  quantity: number;
}

export class UpdateCartItemDto {
  @IsNotEmpty()
  @IsInt()
  productVariantId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0, { message: 'Số lượng không được âm' })
  quantity: number;
}
