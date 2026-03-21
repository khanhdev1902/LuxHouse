import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRequest } from 'src/common/interfaces/auth-request.interface';
import { PrismaService } from 'src/prisma.service';
import { OrderInterface, OrderResponse } from './order.interface';
import { orderInclude } from './order.select';
import { Cron } from '@nestjs/schedule';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  @Cron('* * * * *') //mỗi phút
  async handleExpiredOrders(): Promise<void> {
    type OrderWithItems = Prisma.OrderGetPayload<{
      include: {
        orderItems: { select: { productVariantId: true; quantity: true } };
      };
    }>;
    // 1. Tìm đơn hàng hết hạn
    const expiredOrders: OrderWithItems[] = await this.prisma.order.findMany({
      where: {
        paymentStatus: 'PENDING',
        expiresAt: { lt: new Date() },
      },
      include: {
        orderItems: {
          select: { productVariantId: true, quantity: true },
        },
      },
    });

    if (expiredOrders.length === 0) return;

    // 2. Gom tất cả các thao tác vào 1 Transaction
    // await this.prisma.$transaction(async (tx) => {
    //   for (const order of expiredOrders) {
    //     // Hoàn lại kho cho từng sản phẩm trong đơn hàng
    //     const updateStockPromises = order.orderItems.map((item) =>
    //       tx.productVariant.update({
    //         where: { id: item.productVariantId },
    //         data: { stock: { increment: Number(item.quantity) } },
    //       }),
    //     );

    //     await Promise.all(updateStockPromises);

    //     // Cập nhật trạng thái đơn hàng
    //     await tx.order.update({
    //       where: { id: order.id },
    //       data: { paymentStatus: 'EXPIRED' },
    //     });
    //   }
    // });

    // 2. Gom tất cả các thao tác vào 1 Transaction
    await this.prisma.$transaction(async (tx) => {
      const tasks = expiredOrders.map(async (order) => {
        // 1. Hoàn kho tất cả item trong 1 đơn hàng cùng lúc
        await Promise.all(
          order.orderItems.map((item) =>
            tx.productVariant.update({
              where: { id: item.productVariantId },
              data: { stock: { increment: Number(item.quantity) } },
            }),
          ),
        );

        // 2. Cập nhật trạng thái đơn hàng
        return tx.order.update({
          where: { id: order.id },
          data: { paymentStatus: 'EXPIRED' },
        });
      });

      await Promise.all(tasks);
    });

    console.log(`Đã xử lý ${expiredOrders.length} đơn hàng hết hạn.`);
  }

  private generateOrderCode() {
    const date = new Date();

    const y = date.getFullYear().toString().slice(-2);
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');

    const random = Math.floor(1000 + Math.random() * 9000);

    return `OD${y}${m}${d}${random}`;
  }

  async getMyOrder(user: UserRequest) {
    const where = user.role === 'CUSTOMMER' ? { userId: user.userId } : {};
    const myListOrders = await this.prisma.order.findMany({
      where,
      include: orderInclude,
      orderBy: {
        createdAt: 'desc',
      },
    });
    const mapData: OrderResponse[] = myListOrders.map((order) => ({
      id: order.id,
      userId: order.userId,
      orderCode: order.orderCode,
      shippingFee: Number(order.shippingFee),
      totalAmount: Number(order.totalAmount ?? 0),
      status: order.status,
      shippingName: order.shippingName,
      shippingPhone: order.shippingPhone,
      shippingCountry: order.shippingCountry,
      shippingCity: order.shippingCity,
      shippingAddress: order.shippingAddress,
      voucherCode: order.voucherCode,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt.toLocaleDateString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
      }),
      updatedAt: order.updatedAt.toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
      }),
      orderItems: order.orderItems.map((item) => ({
        id: item.id,
        name: item.productVariant.product.name,
        slug: item.productVariant.product.slug,
        imageUrl: item.productVariant.images[0]?.url ?? '',
        attribute: item.productVariant.attributeValues
          .map((at) => at.attributeValue.value)
          .reverse()
          .join(' / '),
        unitPrice: Number(item.unitPrice),
        quantity: item.quantity,
        totalDiscountAmount: Number(item.totalDiscountedAmount),
        finalPrice: Number(item.finalPrice),
      })),
    }));
    return mapData;
  }

  async createOrderFromCart(user: UserRequest, requestData: OrderInterface) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId: user.userId },
      select: {
        cartItems: {
          select: {
            id: true,
            quantity: true,
            productVariant: {
              select: {
                id: true,
                price: true,
                stock: true,
                discounts: {
                  select: {
                    discount: {
                      select: {
                        value: true,
                        type: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!cart || cart.cartItems.length === 0) {
      throw new Error('Giỏ hàng trống!');
    }

    const newOrder = await this.prisma.$transaction(async (tx) => {
      const createOrder = await tx.order.create({
        data: {
          userId: user.userId,
          orderCode: this.generateOrderCode(),
          shippingName: requestData.shippingName,
          shippingPhone: requestData.shippingPhone,
          shippingCountry: requestData.shippingCountry,
          shippingCity: requestData.shippingCity,
          shippingAddress: requestData.shippingAddress,
          voucherCode: requestData.voucherCode,
          paymentMethod: requestData.paymentMethod,
          paymentStatus: 'PENDING',
          expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 phút
        },
      });

      let orderTotal = 0;

      for (const item of cart.cartItems) {
        const price = Number(item.productVariant.price);
        const quantity = Number(item.quantity);

        const discountPercent =
          item.productVariant.discounts?.[0]?.discount?.value ?? 0;
        const discountAmount = price * (Number(discountPercent ?? 0) / 100);

        const unitPrice = price - discountAmount;
        const finalPrice = unitPrice * quantity;

        orderTotal += finalPrice;

        await tx.orderItem.create({
          data: {
            orderId: createOrder.id,
            productVariantId: item.productVariant.id,
            unitPrice,
            quantity,
            totalDiscountedAmount: quantity * discountAmount,
            finalPrice,
          },
        });

        await tx.cartItem.delete({
          where: { id: item.id },
        });

        const updated = await tx.productVariant.updateMany({
          where: {
            id: item.productVariant.id,
            stock: { gte: quantity },
          },
          data: {
            stock: { decrement: quantity },
          },
        });

        if (updated.count === 0) {
          throw new Error('Hết hàng');
        }
      }

      const updatedOrder = await tx.order.update({
        where: { id: createOrder.id },
        data: { totalAmount: orderTotal },
      });

      return updatedOrder;
    });

    if (newOrder.paymentMethod === 'QRCODE') {
      // Tạo nội dung nội dung chuyển khoản trước
      const description = `Thanh toan don hang tai LuxHouse ${newOrder.orderCode}`;

      // Encode nó để đưa vào URL
      const encodedDes = encodeURIComponent(description);

      return {
        QRCODE_URL: `${process.env.QRCODE_URL}&amount=${Number(newOrder.totalAmount)}&des=${encodedDes}`,
        newOrder,
      };
    }

    return newOrder;
  }

  async createOrderBuyNow(user: UserRequest, requestData: OrderInterface) {
    console.log('data', requestData);
    const productVariant = await this.prisma.productVariant.findUnique({
      where: { id: requestData.productVariantId },
      select: {
        id: true,
        price: true,
        stock: true,
        discounts: {
          select: {
            discount: {
              select: {
                value: true,
              },
            },
          },
        },
      },
    });
    if (!productVariant)
      throw new NotFoundException('Không tìm thấy sản phẩm này trong kho!');

    if (productVariant.stock < Number(requestData.quantity))
      throw new BadRequestException('Số lượng vượt quá số lượng tồn kho!');

    console.log(productVariant);
    const discount =
      (productVariant?.discounts[0] &&
        productVariant?.discounts[0].discount.value) ||
      0;
    console.log(discount);
    const newOrder = await this.prisma.$transaction(async (tx) => {
      const createOrder = await tx.order.create({
        data: {
          totalAmount:
            Number(requestData.quantity) *
            Number(productVariant.price) *
            ((100 - Number(discount)) / 100),
          userId: user.userId,
          orderCode: this.generateOrderCode(),
          shippingName: requestData.shippingName,
          shippingPhone: requestData.shippingPhone,
          shippingCountry: requestData.shippingCountry,
          shippingCity: requestData.shippingCity,
          shippingAddress: requestData.shippingAddress,
          voucherCode: requestData.voucherCode,
          paymentMethod: requestData.paymentMethod,
          paymentStatus: 'PENDING',
          expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 phút
        },
      });

      await tx.orderItem.create({
        data: {
          orderId: createOrder.id,
          productVariantId: productVariant.id,
          quantity: Number(requestData.quantity),
          unitPrice: productVariant.price,
          totalDiscountedAmount:
            Number(requestData.quantity) *
            Number(productVariant.price) *
            (Number(discount) / 100),
          finalPrice:
            Number(requestData.quantity) *
            Number(productVariant.price) *
            ((100 - Number(discount)) / 100),
        },
      });
      const updated = await tx.productVariant.updateMany({
        where: {
          id: productVariant.id,
          stock: { gte: Number(requestData.quantity) },
        },
        data: {
          stock: { decrement: Number(requestData.quantity) },
        },
      });

      if (updated.count === 0) {
        throw new BadRequestException('Hết hàng');
      }

      return createOrder;
    });

    if (newOrder.paymentMethod === 'QRCODE') {
      // Tạo nội dung nội dung chuyển khoản trước
      const description = `Thanh toan don hang tai LuxHouse ${newOrder.orderCode}`;

      // Encode nó để đưa vào URL
      const encodedDes = encodeURIComponent(description);

      return {
        QRCODE_URL: `${process.env.QRCODE_URL}&amount=${Number(newOrder.totalAmount)}&des=${encodedDes}`,
        newOrder,
      };
    }

    return newOrder;
  }
}
