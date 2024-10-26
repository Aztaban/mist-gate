import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { Order } from "../../features/shop/ordersSlice";
import { eurFormat } from "../../utils/utils";

interface OrderLineItemProps {
  order: Order;
}

const OrderLineItem = ({ order }: OrderLineItemProps): ReactElement => {
  return (
    <div className="order-line-item">
      <NavLink to="/order">{order.orderNo}</NavLink>

      <span className="order-date">
        Created on: {new Date(order.created_at).toLocaleDateString()}
      </span>

      <span className="order-price">
        {eurFormat(order.totalPrice)}
      </span>

      <span className={`order-status ${order.paidAt ? 'paid' : 'not-paid'}`}>
        {order.paidAt ? 'Paid' : 'Not Paid'}
      </span>
    </div>
  )
}

export default OrderLineItem;