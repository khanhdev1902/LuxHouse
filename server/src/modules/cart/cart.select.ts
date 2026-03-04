import { Prisma } from 'src/generated/prisma/client';

export const cartSelect = {
  id: true,
  userId: true,
  cartItems: {
    select: {
      id: true,
      productVariantId: true,
      quantity: true,

      productVariant: {
        select: {
          id: true,
          price: true,
          images: {
            where: { isMain: true },
            select: {
              url: true,
            },
          },

          product: {
            select: {
              name: true,
            },
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

          discounts: {
            select: {
              discount: {
                select: {
                  type: true,
                  value: true,
                },
              },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.CartSelect;

export type CartDbType = Prisma.CartGetPayload<{
  select: typeof cartSelect;
}>;
