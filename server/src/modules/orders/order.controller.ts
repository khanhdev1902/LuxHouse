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
  @Post()
  async createOrder(@Req() req: AuthRequest, @Body() data: object) {
    const result = await this.orderService.createOrder(req.user, data);
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
