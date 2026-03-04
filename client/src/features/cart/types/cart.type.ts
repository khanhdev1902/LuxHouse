export type CartItem = {
  id: number;
  productVariantId: number;
  name: string;
  originalPrice: number;
  price: number;
  quantity: number;
  imageUrl: string;
  attributes: string;
  discount?: number;
};

export type Cart = {
  cartItems: CartItem[];
};
