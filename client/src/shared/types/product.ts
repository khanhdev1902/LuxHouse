export interface ProductCategory {
  name: string;
  slug: string;
}

export interface variantImage {
  url: string;
  isMain: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  stock: number;
  defaultVariant: boolean;
  discount?: {
    value?: string,
  };
  attributes: {
    name: string;
    value: string;
  }[];
  images: variantImage[];
}

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  originalPrice?: number;
  price?: number;
  discountPercent?: number;
  images?: string[];
  averageRating: number;
  reviewCount: number;
  sold: number;
}

export interface ProductDetail extends ProductListItem {
  productCode: string | null;
  description: string | null;
  isActive: boolean;
  options: {
    name: string;
    values: string[];
  }[];
  defaultVariantId: string | null;
  categories: ProductCategory[];
  variants: ProductVariant[];
  createdAt: string;
}
