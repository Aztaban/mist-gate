import { ShippingMethod, ShippingPrices } from '../config/shippingConfig';
import { OrderItem } from '../features/shop/ordersApiSlice';

export const calculateOrderPrices = (
  products: OrderItem[],
  shipping: ShippingMethod
) => {
  const itemsPrices = calculateItemsPrice(products);
  const shippingPrice = calculateShippingPrice(shipping);

  return { itemsPrices, shippingPrice };
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

export function countTaxFree(value: number): number {
  return value / 1.21;
}

export function dateFormat(initialDate: string): string {
  return new Date(initialDate).toLocaleString('cs-CZ', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}

export function eurFormat(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'code',
  })
    .format(value)
    .replace('EUR', '€ ');
}

export const setPersistState = (value: boolean) => {
  localStorage.setItem('persist', JSON.stringify(value));
};
