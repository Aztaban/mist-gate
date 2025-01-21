import { ReactElement } from 'react';
import { Order } from '../../../features/shop/ordersApiSlice';
import AdminOrderLineItem from './AdminOrderLineItem';

interface AdminOrderListProps {
  orders: Order[];
}

const AdminOrderList = ({ orders }: AdminOrderListProps): ReactElement => {
  if (!orders || orders.length === 0) {
    return <p>No orders to found.</p>;
  }

  return (
    <table className="admin-orders-list">
      <thead>
        <tr className="admin-order-line-header">
          <th>Order Number</th>
          <th>Created</th>
          <th>User</th>
          <th>Shipping Method</th>
          <th>Paid status</th>
          <th className="order-price">Total Price</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <AdminOrderLineItem key={order.id} order={order} />
        ))}
      </tbody>
    </table>
  );
};

export default AdminOrderList;
