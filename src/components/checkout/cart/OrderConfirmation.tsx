import { NavLink } from "react-router-dom";

interface OrderConfirmationProps {
  orderId: string;
}

const OrderConfirmation = ({ orderId} : OrderConfirmationProps) => {
  if (!orderId) return <p>Loading...</p>
  
  return (
    <article className="checkout checkout-spaced-se">
      <p>Your order has been successfully created!</p>
      <NavLink to={`/order/${orderId}`}>View Order</NavLink>
      <NavLink to={`/checkout/payment/${orderId}`}>Go to Payment</NavLink>
    </article>
  )
}

export default OrderConfirmation
