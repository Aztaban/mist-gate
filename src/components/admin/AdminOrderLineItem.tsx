import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Order } from '../../features/shop/ordersApiSlice';
import { eurFormat } from '../../utils/utils';

interface AdminOrderLineItemProps {
  order: Order;
}

const AdminOrderLineItem = ({ order }: AdminOrderLineItemProps): ReactElement => {
  return (
    <tr className="admin-order-line-item">
      <td><NavLink to={`/order/${order.id}`}>{order.orderNo}</NavLink></td>
      <td>{new Date(order.created_at).toLocaleDateString()}</td>
      <td className='green'>{order.user.username}</td>
      <td>{order.shippingMethod}</td>

      <td className={`order-status ${order.paidAt ? 'paid' : 'not-paid'}`}>
        {order.paidAt ? 'Paid' : 'Not Paid'}
      </td>

      <td className="order-price">{eurFormat(order.totalPrice)}</td>
    </tr>
  );
};

export default AdminOrderLineItem;
