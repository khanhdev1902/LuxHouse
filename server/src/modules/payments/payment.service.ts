/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async handleSepay(data: any) {
    // SePay dùng transferAmount, không phải amount
    const { transferAmount, content } = data;

    if (!content) return;

    // 1. Extract orderCode (Ví dụ: OD2603217548)
    const orderCode = this.extractOrderCode(content);
    console.log(orderCode);

    if (!orderCode) {
      return console.log(
        'Không tìm thấy mã đơn hàng (OrderCode) trong nội dung chuyển khoản',
      );
    }

    // 2. Tìm đơn hàng theo orderCode (Dùng findFirst vì orderCode thường là Unique)
    const order = await this.prisma.order.findUnique({
      where: { orderCode: orderCode },
    });

    if (!order) {
      console.warn(`Không tìm thấy đơn hàng với mã: ${orderCode}`);
      return;
    }

    // 3. Kiểm tra trạng thái và số tiền
    // Lưu ý: So sánh transferAmount (từ webhook) với totalAmount (từ DB)
    if (order.status !== 'PENDING') {
      console.warn(
        `Đơn hàng ${orderCode} đã được xử lý trước đó hoặc không ở trạng thái PENDING`,
      );
      return;
    }

    if (Number(transferAmount) < Number(order.totalAmount)) {
      console.warn(
        `Đơn hàng ${orderCode}: Số tiền chuyển (${transferAmount}) nhỏ hơn tổng tiền (${Number(order.totalAmount)})`,
      );
      return;
    }

    // 4. Update trạng thái
    // Thường thanh toán xong thì là PAID hoặc PROCESSING, bạn đang để DELIVERED (Giao thành công) thì tùy logic app nhé
    await this.prisma.order.update({
      where: { orderCode: orderCode },
      data: {
        status: 'CONFIRMED',
        paymentStatus: 'SUCCESS', // Đổi thành trạng thái thanh toán thành công
        // paymentStatus: 'PAID' // Nếu bạn có trường riêng cho payment
      },
    });

    console.log(
      `✅ Đơn hàng ${orderCode} thanh toán thành công ${transferAmount}đ`,
    );
  }

  // Tách mã đơn hàng dựa trên data thực tế bạn gửi
  private extractOrderCode(content: string): string | null {
    // Regex tìm chuỗi bắt đầu bằng OD và theo sau là 10 chữ số (khớp với OD2603217548)
    // Hoặc linh hoạt hơn: /OD\d+/
    const match = content.match(/OD\d+/);
    return match ? match[0] : null;
  }

  async getOrderByCode(orderCode: string) {
    const order = await this.prisma.order.findUnique({
      where: { orderCode },
      select: { orderCode: true, totalAmount: true, paymentStatus: true },
    });
    if (!order) return;
    // Tạo nội dung nội dung chuyển khoản trước
    const description = `Thanh toan don hang tai LuxHouse ${order.orderCode}`;

    // Encode nó để đưa vào URL
    const encodedDes = encodeURIComponent(description);
    return {
      QRCODE_URL: `${process.env.QRCODE_URL}&amount=${Number(order.totalAmount)}&des=${encodedDes}`,
      orderCode: order.orderCode,
      totalPrice: order.totalAmount,
      status: order.paymentStatus, // 'PENDING' hoặc 'PAID'
    };
  }
}
