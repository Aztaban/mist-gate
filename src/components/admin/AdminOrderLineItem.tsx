import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Order } from '../../features/shop/ordersApiSlice';
import { eurFormat } from '../../utils/utils';

interface AdminOrderLineItemProps {
  order: Order;
}

const AdminOrderLineItem = ({ order }: AdminOrderLineItemProps): ReactElement => {
  return (
    <li className="admin-order-line-item">
      <NavLink to={`/order/${order.id}`}>{order.orderNo}</NavLink>
      <span>{new Date(order.created_at).toLocaleDateString()}</span>
      <span>{order.user.username}</span>
      <span>{order.shippingMethod}</span>

      <span className={`order-status ${order.paidAt ? 'paid' : 'not-paid'}`}>
        {order.paidAt ? 'Paid' : 'Not Paid'}
      </span>

      <span className="order-price">{eurFormat(order.totalPrice)}</span>
    </li>
  );
};

export default AdminOrderLineItem;
