import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOrderId } from '@features/slices/checkoutSlice';
import { useNavigate } from 'react-router-dom';
import { useMarkOrderPaidMutation } from '@features/apiSlices/ordersApiSlice';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const orderId = useSelector(selectOrderId) || '';

  const [markOrderPaid] = useMarkOrderPaidMutation();
  const handlePay = async () => {
    if (!confirm('Are you sure you want to pay for this order? PAYMENT FORMS NOT ACTIVE. ORDER WILL BE SET AS PAID!')) {
      return;
    }
    try {
      await markOrderPaid(orderId).unwrap();
      navigate(`/order/${orderId}`);
    } catch (err) {
      console.error('Failed to mark order as paid:', err);
    }
  };

  if (!orderId) return <p>Loading...</p>;

  return (
    <section className="checkout page-stack">
      <header className="section-bar surface-dark">
        <h1 className="section-bar__title">4. Payment</h1>
      </header>
      <article className="section surface-dark">
        <p>Your order has been successfully created!</p>
        <p className="btn btn--ghost">
          <NavLink to={`/order/${orderId}`}>View Order</NavLink>
        </p>
      </article>
      <div className="checkout-actions checkout-actions--split">
        <button className="btn btn--brand" onClick={handlePay}>
          Pay Order
        </button>
        <button className="btn btn--brand">
          <NavLink to={`/order/${orderId}`}>View Order</NavLink>
        </button>
      </div>
    </section>
  );
};

export default OrderConfirmation;
