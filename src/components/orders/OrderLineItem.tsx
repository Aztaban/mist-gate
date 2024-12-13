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
      <NavLink to={`/order/${order.id}`}>{order.orderNo}</NavLink>
      <span>{new Date(order.created_at).toLocaleDateString()}</span>

      <span className="green-color text-right">{eurFormat(order.totalPrice)}</span>
      <span className="hidden-ss-flex">{order.status.toUpperCase()}</span>
    </li>
  );
};

export default OrderLineItem;
