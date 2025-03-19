import { useParams, NavLink } from 'react-router-dom';
import useOrder from '@hooks/api/useOrder';
import OrderProducts from './OrderProducts';
import OrderSummary from './OrderSummary';
import OrderPriceSummary from './OrderPriceSummary';
import Address from './Address';
import OrderActions from '../admin/orders/OrderActions';
import useAuth from '@hooks/state/useAuth';

const SingleOrderPage = () => {
  const orderId = useParams().orderId  || '';
  const { order, isLoading, isError } = useOrder(orderId);
  const { isAdmin } = useAuth();

  if (isLoading) return <p>Loading Order...</p>;
  if (isError || !order) return <p>Order not found.</p>;

  return (
    <article className="checkout">
      <h2 className="header-wraper">
        <p>Order No: {order.orderNo}</p>
        {!isAdmin && !order.isPaid && (
          <button className="btn back-btn"><NavLink to={`/checkout/payment/${orderId}`}>Pay now</NavLink></button>
        )}
      </h2>

      <OrderSummary order={order} />
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
