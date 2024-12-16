import {
  CreateOrder,
  ShippingAddress,
} from '../../../features/shop/ordersApiSlice';
import OrderProducts from '../../orders/OrderProducts';
import Address from '../../orders/Address';
import OrderPriceSummary from '../../orders/OrderPriceSummary';
import { calculateOrderPrices } from '../../../utils/utils';

interface OrderSummaryProps {
  order: CreateOrder;
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const { itemsPrice, shippingPrice } = calculateOrderPrices(
    order.products,
    order.shippingMethod
  );

  return (
    <>
      <article className="checkout checkout-spaced">
        <OrderProducts products={order.products} />
        <div className="cart-bottom">
          <Address address={order.shippingAddress as ShippingAddress} />

          <OrderPriceSummary
            itemsPrice={itemsPrice}
            shippingPrice={shippingPrice}
          />
        </div>
      </article>
    </>
  );
};

export default OrderSummary;
