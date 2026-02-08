export interface ListProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  images: string[];
  discount?: number;
  sold?: number;
  rating?: number;
  rating_users?: number;
}

export interface ProductDetail extends ListProduct {
  code: string;
  stock: number;
  categories: {
    name: string;
    slug: string;
  }[];
  createdAt: string;
  description: string;
  specifications: Record<string, string>;
}
