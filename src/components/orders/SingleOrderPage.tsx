import { useParams } from 'react-router-dom';
import useOrder from '../../hooks/useOrder';
import OrderProducts from './OrderProducts';
import OrderSummary from './OrderSummary';
import OrderPriceSummary from './OrderPriceSummary';
import Address from './Address';
import OrderActions from '../admin/orders/OrderActions';

const SingleOrderPage = () => {
  const {order, isLoading, isError} = useOrder(useParams().orderId || "");

  if (isLoading) return <p>Loading Order...</p>;
  if (isError || !order) return <p>Order not found.</p>;
 
  return (
    <article className="checkout">
      <h2 className="header-wraper">Order No: {order.orderNo}</h2>
      <OrderSummary order={order}/>
      <OrderProducts products={order.products} />
      <div className="cart-bottom">
        <Address address={order.shippingAddress} />
        <OrderPriceSummary
          itemsPrice={order.itemsPrice}
          shippingPrice={order.shippingPrice}
        />
      </div>
      <OrderActions order={order} />
    </article>
  );
};

export default SingleOrderPage;
