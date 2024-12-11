import { NavLink } from "react-router-dom";

interface OrderConfirmationProps {
  orderId: string;
}

const OrderConfirmation = ({ orderId} : OrderConfirmationProps) => {
  if (!orderId) return <p>Loading...</p>
  
  return (
    <div>
      <p>Your order has been successfully created!</p>
      <NavLink to={`/order/${orderId}`}>View Order</NavLink>View Order
    </div>
  )
}

export default OrderConfirmation
