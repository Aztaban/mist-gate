import { useParams, useNavigate } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../features/shop/ordersApiSlice';
import OrderProducts from './OrderProducts';
import OrderPriceSummary from './OrderPriceSummary';
import Address from './Address';

const SingleOrderPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(orderId ? orderId : '');

  if (isLoading) return <p>Loading Order...</p>;
  if (isError || !order) return <p>Order not found.</p>;

  const handleBackBtn = () => {
    navigate(-1);
  };

  return (
    <article className="order">
      <h2 className="orders-header">Order Details</h2>
      <main>
        <h3>Order No: {order.orderNo}</h3>
        <div className="order-field">
          <p>Created on:</p>
          <p>{new Date(order.created_at).toLocaleDateString()}</p>
          <p>Order status:</p>
          <p>{order.status.toUpperCase()}</p>
          <p>Shipping Method:</p>
          <p>
            {order.shippingMethod
              ? order.shippingMethod.toUpperCase()
              : 'NO DATA'}
          </p>
          <p>Paid status:</p>
          <p
            className={
              order.isPaid ? 'order-status.paid' : 'order-status.not-paid'
            }
          >
            {order.isPaid ? 'Paid' : 'Not Paid'}
          </p>
        </div>
        <h3>Order Details</h3>

        <OrderProducts products={order.products} />
        <OrderPriceSummary
          itemsPrice={order.itemsPrice}
          shippingPrice={order.shippingPrice}
          totalPrice={order.totalPrice}
        />
        <Address address={order.shippingAddress} />
      </main>
      <div className="buttons-box">
        {' '}
        <button className="btn back-btn" onClick={handleBackBtn}>
          Go Back
        </button>
      </div>
    </article>
  );
};

export default SingleOrderPage;
