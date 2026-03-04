import { Prisma } from 'src/generated/prisma/client';

export const productListSelect = {
  id: true,
  name: true,
  slug: true,
  averageRating: true,
  reviewCount: true,
  sold: true,

  images: {
    // where: { isMain: true },
    select: { url: true },
    take: 2,
  },

  variants: {
    select: {
      id: true,
      price: true,
      defaultVariant: true,

      discounts: {
        select: {
          discount: {
            select: {
              id: true,
              value: true,
              isActive: true,
              type: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.ProductSelect;

export const productDetailSelect = {
  id: true,
  productCode: true,
  slug: true,
  name: true,
  description: true,
  isActive: true,
  averageRating: true,
  reviewCount: true,
  sold: true,
  createdAt: true,

  categories: {
    select: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  },

  variants: {
    select: {
      id: true,
      sku: true,
      price: true,
      stock: true,
      defaultVariant: true,

      attributeValues: {
        select: {
          attributeValue: {
            select: {
              attribute: {
                select: {
                  name: true,
                },
              },
              value: true,
            },
          },
        },
      },

      images: {
        orderBy: { isMain: 'desc' }, // main lên trước
        select: {
          url: true,
          isMain: true,
        },
      },

      discounts: {
        select: {
          discount: {
            select: {
              id: true,
              value: true,
              isActive: true,
              type: true,
              startDate: true,
              endDate: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.ProductSelect;

export type ProductListDbType = Prisma.ProductGetPayload<{
  select: typeof productListSelect;
}>;

export type ProductDetailDbType = Prisma.ProductGetPayload<{
  select: typeof productDetailSelect;
}>;
