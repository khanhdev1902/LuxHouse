import { Injectable } from '@nestjs/common';
import { UserRequest } from 'src/common/interfaces/auth-request.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getMyOrder(user: UserRequest) {
    const where = user.role === 'customer' ? { userId: user.userId } : {};
    const result = this.prisma.order.findMany({ where });

    return result;
  }

  async createOrder(user: UserRequest, data: object) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId: user.userId },
      select: {
        cartItems: {
          select: {
            productVariant: {
              select: {
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
            quantity: true,
          },
        },
      },
    });
    return {
      cart,
      data,
    };
  }
}
