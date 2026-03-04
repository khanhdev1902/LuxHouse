import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
// import { cartMapper } from './cart.mapper';
import type { Cart } from './cart.interface';
import { cartSelect } from './cart.select';
import { cartMapper } from './cart.mapper';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getMyCart(userId: number): Promise<Cart> {
    const cart = await this.prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
      select: cartSelect,
    });
    return cartMapper(cart);
  }

  async addToCart(userId: number, productVariantId: number, quantity: number) {
    if (quantity <= 0) throw new BadRequestException('Số lượng phải lớn hơn 0');

    const variant = await this.prisma.productVariant.findUnique({
      where: { id: productVariantId },
    });

    if (!variant)
      throw new NotFoundException('Biến thể sản phẩm không tồn tại');

    const cart = await this.prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productVariantId: { cartId: cart.id, productVariantId },
      },
    });

    const newTotalQuantity = (existingItem?.quantity || 0) + quantity;

    if (newTotalQuantity > variant.stock) {
      throw new BadRequestException(
        `Chỉ còn ${variant.stock} sản phẩm trong kho`,
      );
    }

    return this.prisma.cartItem.upsert({
      where: {
        cartId_productVariantId: { cartId: cart.id, productVariantId },
      },
      update: { quantity: { increment: quantity } },
      create: { cartId: cart.id, productVariantId, quantity },
    });
  }

  async updateCartItemQuantity(
    userId: number,
    productVariantId: number,
    quantity: number,
  ) {
    if (quantity <= 0) {
      return this.removeItemFromCart(userId, productVariantId);
    }

    return this.prisma.$transaction(async (tx) => {
      const variant = await tx.productVariant.findUnique({
        where: { id: productVariantId },
      });

      if (!variant) throw new NotFoundException('Sản phẩm không tồn tại');
      if (quantity > variant.stock)
        throw new BadRequestException('Vượt quá tồn kho');

      const cart = await tx.cart.findUnique({ where: { userId } });
      if (!cart) throw new NotFoundException('Giỏ hàng trống');

      return tx.cartItem.update({
        where: {
          cartId_productVariantId: { cartId: cart.id, productVariantId },
        },
        data: { quantity },
      });
    });
  }

  async removeItemFromCart(userId: number, productVariantId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) return;

    return this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productVariantId },
    });
  }
}
