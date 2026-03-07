import { CartDbType } from './cart.select';
import type { Cart } from './cart.interface';

export const cartMapper = (cart: CartDbType): Cart => {
  return {
    //return Cart
    cartItems: cart.cartItems.map((item) => {
      const originalPrice = Number(item.productVariant.price);

      const discount =
        item.productVariant.discounts.length > 0
          ? item.productVariant.discounts[0].discount.value.toNumber()
          : 0;

      const finalPrice = originalPrice * (1 - discount / 100);

      return {
        //return CartItem
        id: item.id,
        productVariantId: item.productVariantId,
        quantity: item.quantity,
        stock: item.productVariant.stock,
        name: item.productVariant.product.name,
        slug: item.productVariant.product.slug,
        originalPrice,
        price: finalPrice,
        imageUrl:
          item.productVariant.images.length > 0
            ? item.productVariant.images[0].url
            : '',
        attributes: item.productVariant.attributeValues
          .map((av) => av.attributeValue.value)
          .reverse()
          .join(' / '),
        discount,
      };
    }),
  };
};
