import { useParams } from 'react-router-dom';
import useOrder from '@hooks/api/useOrder';
import OrderProducts from './OrderProducts';
import OrderSummary from './OrderSummary';
import OrderPriceSummary from './OrderPriceSummary';
import Address from './Address';
import OrderActions from '../admin/orders/OrderActions';
import useAuth from '@hooks/state/useAuth';
import { useMarkOrderPaidMutation } from '@features/apiSlices/ordersApiSlice';

const SingleOrderPage = () => {
  const orderId = useParams().orderId || '';
  const { order, isLoading, isError } = useOrder(orderId);
  const { isAdmin, isEditor } = useAuth();

  const [markOrderPaid] = useMarkOrderPaidMutation();

  if (isLoading) return <p>Loading Order...</p>;
  if (isError || !order) return <p>Order not found.</p>;

  const handlePay = async () => {
    if (!confirm('Are you sure you want to pay for this order?')) {
      return;
    }
    try {
      await markOrderPaid(orderId).unwrap();
    } catch (err) {
      console.error('Failed to mark order as paid:', err);
    }
  };

  return (
    <section className="checkout">
      <header className="section-bar surface-dark">
        <h1 className="section-bar__title">
          <p>Order No: {order.orderNo}</p>
        </h1>
        {!isAdmin && !isEditor && !order.isPaid && (
          <button onClick={handlePay} className="btn btn--sm btn--brand">
            Pay now
          </button>
        )}
      </header>
      <OrderProducts products={order.products} />
      <div className="cart-bottom section order-detail-grid">
        <OrderSummary order={order} />
        <Address address={order.shippingAddress} />
        <OrderPriceSummary itemsPrice={order.itemsPrice} shippingPrice={order.shippingPrice} />
      </div>
      {(isAdmin || isEditor) && <OrderActions order={order} />}
    </section>
  );
};

export default SingleOrderPage;
