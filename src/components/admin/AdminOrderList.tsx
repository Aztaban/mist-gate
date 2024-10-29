import { ReactElement } from 'react';
import { Order } from '../../features/shop/ordersApiSlice';
import AdminOrderLineItem from './AdminOrderLineItem';

interface AdminOrderListProps {
  orders: Order[];
}

const AdminOrderList = ({ orders }: AdminOrderListProps): ReactElement => {
  if (!orders || orders.length === 0) {
    return <p>No orders to found.</p>;
  }

  return (
    <ul className="admin-orders-list">
      <li className="admin-order-line-header bold green">
        <span>Order Number</span>
        <span>Created</span>
        <span>User</span>
        <span>Shipping Method</span>

        <span>Paid status</span>

        <span className="order-price">Total Price</span>
      </li>
      {orders.map((order) => (
        <AdminOrderLineItem key={order.id} order={order} />
      ))}
    </ul>
  );
};

export default AdminOrderList;
