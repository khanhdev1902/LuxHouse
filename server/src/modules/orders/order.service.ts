/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { UserRequest } from 'src/common/interfaces/auth-request.interface';
import { PrismaService } from 'src/prisma.service';
import { OrderInterface, OrderResponse } from './order.interface';
import { orderInclude } from './order.select';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

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

  async createOrder(user: UserRequest, requestData: OrderInterface) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId: user.userId },
      select: {
        cartItems: {
          select: {
            quantity: true,
            productVariant: {
              select: {
                id: true,
                price: true,
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
      throw new Error('Cart is empty');
    }

    const newOrder = await this.prisma.$transaction(async (tx) => {
      const createOrder = await tx.order.create({
        data: {
          userId: user.userId,
          shippingName: requestData.shippingName,
          shippingPhone: requestData.shippingPhone,
          shippingCountry: requestData.shippingCountry,
          shippingCity: requestData.shippingCity,
          shippingAddress: requestData.shippingAddress,
          voucherCode: requestData.voucherCode,
          paymentMethod: requestData.paymentMethod,
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
      }

      await tx.order.update({
        where: { id: createOrder.id },
        data: {
          totalAmount: orderTotal,
        },
      });

      return createOrder;
    });

    return newOrder;
  }
}
