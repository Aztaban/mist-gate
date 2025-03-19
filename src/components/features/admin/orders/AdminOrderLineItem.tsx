import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Order } from '@types';
import { eurFormat } from 'utils';

interface AdminOrderLineItemProps {
  order: Order;
}

const AdminOrderLineItem = ({ order }: AdminOrderLineItemProps): ReactElement => {
  return (
    <tr className="admin-order-line-item">
      <td><NavLink to={`/order/${order.id}`}>{order.orderNo}</NavLink></td>
      <td>{new Date(order.created_at).toLocaleDateString()}</td>
      <td>{order.user.username}</td>
      <td>{order.shippingMethod}</td>

      <td className="order-status">{order.status.toUpperCase()}</td>
      <td className={`order-status ${order.paidAt ? 'paid' : 'not-paid'}`}>
        {order.paidAt ? 'Paid' : 'Not Paid'}
      </td>

      <td className="order-price">{eurFormat(order.totalPrice)}</td>
    </tr>
  );
};

export default AdminOrderLineItem;
