import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import type { Response } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('sepay')
  async handleSepayWebhook(@Body() body: any, @Res() res: Response) {
    try {
      await this.paymentService.handleSepay(body);

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Webhook error:', error);

      return res.status(500).json({ success: false });
    }
  }
  @Get('sepay')
  hello() {
    return { hi: 'chào bro:))' };
  }

  @Get(':orderCode')
  async getOrderByCode(@Param('orderCode') orderCode: string) {
    // Trả về info đơn hàng + status (PAID/PENDING) + link QR
    return await this.paymentService.getOrderByCode(orderCode);
  }
}
