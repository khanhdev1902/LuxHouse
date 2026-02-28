import { Prisma } from 'src/generated/prisma/client';
import { productDetailSelect, productListSelect } from './product.select';
import { buildOptions } from './product.utils';

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
      sold: product.sold ?? 0,
    };
  }

  const selectedVariant =
    product.variants.find((v) => v.defaultVariant) ?? product.variants[0];

  const activeDiscount = selectedVariant.discounts
    ?.filter((d) => d.discount?.isActive)
    ?.sort((a, b) => Number(b.discount.value) - Number(a.discount.value))[0];

  const originalPrice = Number(selectedVariant.price);

  const discountPercent = activeDiscount
    ? Number(activeDiscount.discount.value)
    : 0;

  const discountAmount = (discountPercent / 100) * originalPrice;

  const finalPrice = originalPrice - discountAmount;

  return {
    id: product.id.toString(),
    name: product.name,
    slug: product.slug,
    originalPrice,
    price: finalPrice,
    discountPercent,
    defaultVariantId: selectedVariant.id.toString(),
    images: product.images.map((i) => i.url),
    reviewCount: product.reviewCount ?? 0,
    averageRating: product.averageRating ?? 0,
    sold: product.sold ?? 0,
  };
};
export const normalizeVariants = (product: ProductDetailDb) =>
  product.variants.map((v) => ({
    id: v.id.toString(),
    sku: v.sku,
    price: Number(v.price),
    stock: v.stock,
    defaultVariant: v.defaultVariant,

    attributes: v.attributeValues.map((av) => ({
      name: av.attributeValue.attribute.name,
      value: av.attributeValue.value,
    })),

    images: v.images.map((i) => ({
      url: i.url,
      isMain: i.isMain,
    })),

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    discount: v.discounts[0]?.discount,
  }));

export const mapProductDetail = (product: ProductDetailDb) => {
  const nomalizedVariants = normalizeVariants(product);
  return {
    id: product.id.toString(),
    productCode: product.productCode,
    name: product.name,
    slug: product.slug,
    isActive: product.isActive,
    options: buildOptions(nomalizedVariants),
    averageRating: product.averageRating ?? 0,
    reviewCount: product.reviewCount ?? 0,
    sold: product.sold ?? 0,
    defaultVariantId:
      product.variants.find((v) => v.defaultVariant)?.id.toString() ?? null,
    categories: product.categories.map((c) => c.category),
    variants: nomalizedVariants,
    description: product.description,
    createdAt: product.createdAt.toISOString(),
  };
};
