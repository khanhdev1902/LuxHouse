export interface OrderRequest {
  checkoutType: "cart" | "product";
  productVariantId?: number;
  quantity?: number;

  shippingName: string;
  shippingPhone: string;
  shippingCountry: string;
  shippingCity: string;
  shippingAddress: string;
  voucherCode?: string;
  paymentMethod: "COD" | "ZALOPAY" | "QRCODE";
}

export interface OrderItemInterface {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  attribute: string;
  unitPrice: number;
  quantity: number;
  totalDiscountAmount: number;
  finalPrice: number;
}

export interface OrderResponse {
  id: number;
  orderCode: string;
  userId: number;
  shippingFee: number;
  totalAmount: number | null;
  status: string;
  shippingName: string;
  shippingPhone: string;
  shippingCountry: string;
  shippingCity: string;
  shippingAddress: string;
  voucherCode?: string | null;
  paymentMethod: "COD" | "ZALOPAY" | "QRCODE";
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItemInterface[];
}
