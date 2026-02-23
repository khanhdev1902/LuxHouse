import { Prisma } from 'src/generated/prisma/client';
import { productDetailSelect, productListSelect } from './product.select';

export type ProductListDb = Prisma.ProductGetPayload<{
  select: typeof productListSelect;
}>;

export type ProductDetailDb = Prisma.ProductGetPayload<{
  select: typeof productDetailSelect;
}>;
export const mapProductListItem = (product: ProductListDb) => {
  if (!product.variants.length) {
    return {
      id: product.id.toString(),
      name: product.name,
      slug: product.slug,
      originalPrice: 0,
      price: 0,
      discountPercent: 0,
      defaultVariantId: null,
      images: product.images.map((i) => i.url),
      reviewCount: product.reviewCount ?? 0,
      averageRating: product.averageRating ?? 0,
    };
  }

  let selectedVariant = product.variants[0];
  let maxDiscountPercent = 0;

  for (const variant of product.variants) {
    const discountObj = variant.discountProductVariants[0]?.discount;

    const percent =
      discountObj?.type === 'percent' ? Number(discountObj.value) : 0;

    if (percent > maxDiscountPercent) {
      maxDiscountPercent = percent;
      selectedVariant = variant;
    }
  }

  const originalPrice = Number(selectedVariant.price);

  const price =
    maxDiscountPercent > 0
      ? originalPrice - (originalPrice * maxDiscountPercent) / 100
      : originalPrice;

  return {
    id: product.id.toString(),
    name: product.name,
    slug: product.slug,
    originalPrice,
    price,
    discountPercent: maxDiscountPercent,
    defaultVariantId: selectedVariant.id,
    images: product.images.map((i) => i.url),
    reviewCount: product.reviewCount ?? 0,
    averageRating: product.averageRating ?? 0,
  };
};

// export const mapProductDetail = (product: ProductDetailDb) => ({
//   id: product.id.toString(),
//   code: product.code,
//   name: product.name,
//   slug: product.slug,
//   // price: Number(product.price),
//   stock: product.stock,
//   images: product.images.map((i) => i.url),
//   categories: product.categories.map((c) => c.category),
//   createdAt: product.createdAt.toISOString(),
// });
