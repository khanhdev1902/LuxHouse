export interface Cart {
  id: string;
  userId: string;
  cartItems: CartItem[]
}

export interface CartItem {
  id: string;
  cartId: string;
  productVariantId: string;
  name: string;
  image:string;
  quantity: number;
  originPrice: number;
  price: number;
  attribute: string;
}
