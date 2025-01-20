import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOrderId } from '../../../features/checkout/checkoutSlice';

const OrderConfirmation = () => {
  const orderId = useSelector(selectOrderId);

  if (!orderId) return <p>Loading...</p>;

  return (
    <>
      <h2>4. Payment</h2>
      <article className="checkout checkout-spaced-se">
        <p>Your order has been successfully created!</p>
        <NavLink to={`/order/${orderId}`}>View Order</NavLink>
        <NavLink to={`/checkout/payment/${orderId}`}>Go to Payment</NavLink>
      </article>
      <div className="checkout-buttons">
        <div></div>
        <button className="btn back-btn">
          <NavLink to={`/checkout/payment/${orderId}`}>Payment</NavLink>
        </button>
      </div>
    </>
  );
};

export default OrderConfirmation;
