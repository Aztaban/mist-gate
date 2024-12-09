import { CreateOrder } from '../../features/shop/ordersApiSlice';
import OrderProducts from '../orders/OrderProducts';
import Address from '../orders/Address';
import OrderPriceSummary from '../orders/OrderPriceSummary';

interface OrderSummaryProps {
  order: CreateOrder;
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const totalPrice = order.itemsPrice + order.shippingPrice;

  return (
    <>
      <article className="order-summary">
        <Address address={order.shippingAddress} />
        <OrderProducts products={order.products} />
        <OrderPriceSummary
          itemsPrice={order.itemsPrice}
          shippingPrice={order.shippingPrice}
          totalPrice={totalPrice}
        />
      </article>
    </>
  );
};

export default OrderSummary;
