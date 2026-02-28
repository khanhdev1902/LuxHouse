import { UseGuards, Req, Get, Controller } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthRequest } from 'src/common/interfaces/auth-request.interface';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  @Get()
  getMyCart(@Req() req: AuthRequest) {
    console.log('called cart sucess!');
    return req.user; // đã có userId từ strategy
  }
}
