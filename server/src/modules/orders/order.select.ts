import { Prisma } from 'src/generated/prisma/client';

export const orderInclude = {
  orderItems: {
    select: {
      id: true,
      productVariant: {
        select: {
          product: {
            select: {
              name: true,
              slug: true,
            },
          },
          images: {
            select: { url: true },
            where: { isMain: true },
          },
          attributeValues: {
            select: {
              attributeValue: {
                select: {
                  value: true,
                },
              },
            },
          },
        },
      },
      unitPrice: true,
      quantity: true,
      totalDiscountedAmount: true,
      finalPrice: true,
    },
  },
} satisfies Prisma.OrderInclude;

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: typeof orderInclude;
}>;
