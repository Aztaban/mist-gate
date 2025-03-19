import { OrderItem } from "@types";
import { ShippingMethod, ShippingPrices } from "@config";

export const calculateOrderPrices = (
  products: OrderItem[],
  shipping: ShippingMethod
) => {
  const itemsPrice = calculateItemsPrice(products);
  const shippingPrice = calculateShippingPrice(shipping);

  return { itemsPrice, shippingPrice };
};

export const calculateItemsPrice = (cart: OrderItem[]): number => {
  return parseFloat(
    cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  );
};

export const calculateShippingPrice = (method: ShippingMethod): number => {
  return ShippingPrices[method] || 0;
};