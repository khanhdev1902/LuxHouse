export interface ProductCategory {
  name: string;
  slug: string;
}

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
}

export interface ProductDetail extends ProductListItem {
  code: string;
  stock: number;
  categories: ProductCategory[];
  createdAt: string;
}
