export interface ProductCategory {
  name: string;
  slug: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  originalPrice?: number;
  price: number;
  discountPercent?: number;
  images: string[];
  averageRating: number;
  reviewCount: number;
}

export interface ProductDetail extends ProductListItem {
  productCode: string;
  categories: ProductCategory[];
  productVariants: ProductVariant[];
  createdAt: string;
}
