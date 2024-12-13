import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Order } from '../../features/shop/ordersApiSlice';
import { eurFormat } from '../../utils/utils';

interface OrderLineItemProps {
  order: Order;
}

const OrderLineItem = ({ order }: OrderLineItemProps): ReactElement => {
  return (
    <li className="order-line-item">
      <span>{new Date(order.created_at).toLocaleDateString()}</span>
      <NavLink to={`/order/${order.id}`}>{order.orderNo}</NavLink>
      <span className="green-color">{eurFormat(order.totalPrice)}</span>
      <span>{order.status.toUpperCase()}</span>
    </li>
  );
};

export default OrderLineItem;
