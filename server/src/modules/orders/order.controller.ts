import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthRequest } from 'src/common/interfaces/auth-request.interface';
import { OrderService } from './order.service';
import { ApiResponse } from 'src/common/base/api-response';
import { ValidationPipe } from 'src/common/pipes/vadilation.pipe';
import { CreateOrderDto } from './oder.dto';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get()
  async getMyOrder(@Req() req: AuthRequest) {
    const result = await this.orderService.getMyOrder(req.user);
    return ApiResponse.success(
      result,
      'Lấy danh sách đơn hàng của bạn thành công',
      200,
    );
  }
  @Post('cart')
  async createOrderFormCart(
    @Req() req: AuthRequest,
    @Body(new ValidationPipe()) dto: CreateOrderDto,
  ) {
    const result = await this.orderService.createOrderFromCart(req.user, dto);
    return ApiResponse.success(result, 'Tạo đơn hàng thành công', 201);
  }

  @Post('buynow')
  async createOrderBuyNow(
    @Req() req: AuthRequest,
    @Body() dto: CreateOrderDto,
  ) {
    const result = await this.orderService.createOrderBuyNow(req.user, dto);
    console.log('haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    return ApiResponse.success(result, 'Tạo đơn hàng thành công', 201);
  }

  @Patch()
  updateOrder(@Req() req: AuthRequest) {
    return req.user;
  }
  @Delete()
  deleteOrder(@Req() req: AuthRequest) {
    return req.user;
  }
}
