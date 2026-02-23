import { Prisma } from 'src/generated/prisma/client';

export const productListSelect = {
  id: true,
  name: true,
  slug: true,
  averageRating: true,
  reviewCount: true,

  images: {
    where: { isMain: true },
    select: { url: true },
    take: 2,
  },

  variants: {
    select: {
      id: true,
      price: true,

      discountProductVariants: {
        where: {
          discount: {
            isActive: true,
            startDate: { lte: new Date() },
            endDate: { gte: new Date() },
          },
        },
        orderBy: {
          discount: {
            priority: Prisma.SortOrder.asc,
          },
        },
        take: 1,
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
} satisfies Prisma.ProductSelect;

export const productDetailSelect = {
  id: true,
  name: true,
  slug: true,
  productCode: true,
  averageRating: true,
  reviewCount: true,
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
      price: true,
      stock: true,
      defaultVariant: true,

      images: {
        orderBy: { isMain: 'desc' }, // main lên trước
        select: {
          url: true,
          isMain: true,
        },
      },

      discountProductVariants: {
        where: {
          discount: {
            isActive: true,
            startDate: { lte: new Date() },
            endDate: { gte: new Date() },
          },
        },
        orderBy: {
          discount: {
            priority: Prisma.SortOrder.asc,
          },
        },
        take: 1,
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
} satisfies Prisma.ProductSelect;
