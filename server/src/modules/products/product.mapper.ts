import { Prisma } from 'src/generated/prisma/client';
import { productDetailSelect, productListSelect } from './product.select';

type ProductListDb = Prisma.ProductGetPayload<{
  select: typeof productListSelect;
}>;
type ProductDetailDb = Prisma.ProductGetPayload<{
  select: typeof productDetailSelect;
}>;
export const mapProductListItem = (product: ProductListDb) => ({
  id: product.id.toString(),
  name: product.name,
  slug: product.slug,
  price: Number(product.price),
  images: product.images.map((i) => i.url),
});

export const mapProductDetail = (product: ProductDetailDb) => ({
  id: product.id.toString(),
  code: product.code,
  name: product.name,
  slug: product.slug,
  price: Number(product.price),
  stock: product.stock,
  images: product.images.map((i) => i.url),
  categories: product.categories.map((c) => c.category),
  createdAt: product.createdAt.toISOString(),
});
