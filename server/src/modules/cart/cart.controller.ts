import {
  UseGuards,
  Req,
  Get,
  Controller,
  Post,
  Body,
  Patch,
  ValidationPipe,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthRequest } from 'src/common/interfaces/auth-request.interface';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './add-to-cart.dto';
import {
  ApiResponse,
  type ApiResponseType,
} from 'src/common/base/api-response';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getMyCart(@Req() req: AuthRequest): Promise<ApiResponseType<unknown>> {
    const result = await this.cartService.getMyCart(req.user.userId);
    return ApiResponse.success(result, 'Lấy giỏ hàng thành công');
  }

  @Post()
  async addToCart(
    @Req() req: AuthRequest,
    @Body(new ValidationPipe()) dto: AddToCartDto,
  ): Promise<ApiResponseType<unknown>> {
    const result = await this.cartService.addToCart(
      req.user.userId,
      dto.productVariantId,
      dto.quantity,
    );
    return ApiResponse.success(result, 'Thêm sản phẩm vào giỏ hàng thành công');
  }

  @Patch()
  async updateCartItem(
    @Req() req: AuthRequest,
    @Body(new ValidationPipe()) dto: UpdateCartItemDto,
  ): Promise<ApiResponseType<unknown>> {
    const result = await this.cartService.updateCartItemQuantity(
      req.user.userId,
      dto.productVariantId,
      dto.quantity,
    );
    return ApiResponse.success(
      result,
      'Cập nhật số lượng sản phẩm trong giỏ hàng thành công',
    );
  }

  @Delete('items/:productVariantId')
  async removeItem(
    @Req() req: AuthRequest,
    @Param('productVariantId', ParseIntPipe) productVariantId: number,
  ): Promise<ApiResponseType<unknown>> {
    console.log('Called removing item from cart:', {
      userId: req.user.userId,
      productVariantId,
    });
    const result = await this.cartService.removeItemFromCart(
      req.user.userId,
      productVariantId,
    );
    return ApiResponse.success(result, 'Xóa sản phẩm khỏi giỏ hàng thành công');
  }
}
