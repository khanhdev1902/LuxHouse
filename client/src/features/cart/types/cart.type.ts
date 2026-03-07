export type CartItem = {
  id: number;
  productVariantId: number;
  name: string;
  slug: string;
  originalPrice: number;
  price: number;
  quantity: number;
  stock: number;
  imageUrl: string;
  attributes: string;
  discount?: number;
};

export type Cart = {
  cartItems: CartItem[];
};
