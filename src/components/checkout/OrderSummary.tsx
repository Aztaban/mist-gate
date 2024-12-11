import { CreateOrder, ShippingAddress } from '../../features/shop/ordersApiSlice';
import OrderProducts from '../orders/OrderProducts';
import Address from '../orders/Address';
import OrderPriceSummary from '../orders/OrderPriceSummary';
import { calculateOrderPrices } from '../../utils/utils';

interface OrderSummaryProps {
  order: CreateOrder;
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const { itemsPrices, shippingPrice } = calculateOrderPrices( order.products, order.shippingMethod)

  return (
    <>
      <article className="order-summary">
        <Address address={order.shippingAddress as ShippingAddress} />
        <OrderProducts products={order.products} />
        <OrderPriceSummary
          itemsPrice={itemsPrices}
          shippingPrice={shippingPrice}
          totalPrice={itemsPrices + shippingPrice}
        />
      </article>
    </>
  );
};

export default OrderSummary;
