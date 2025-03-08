import { ReactElement } from 'react';
import { Order } from '../../../features/apiSlices/ordersApiSlice';
import AdminOrderLineItem from './AdminOrderLineItem';
import { useSorting } from '../../../hooks/useSorting';
import SortableHeader from '../SortableHeader';
import usePagination from '../../../hooks/usePagination';

interface AdminOrderListProps {
  orders: Order[];
}

const AdminOrderList = ({ orders }: AdminOrderListProps): ReactElement => {
  const { sortedData, sortConfig, handleSort } = useSorting(orders);
  const { paginatedData, paginationControls } = usePagination<Order>({
    data: sortedData,
    itemsPerPage: 15,
  })

  if (!orders || orders.length === 0) {
    return <p>No orders to found.</p>;
  }

  return (
    <>
    <table className="admin-products-list">
      <thead>
        <tr>
          <th>Order Number</th>
          <SortableHeader
            label="created"
            sortKey="created_at"
            currentSortKey={sortConfig.key}
            currentSortDirection={sortConfig.direction}
            onSort={handleSort}
          />
          <th>User</th>
          <th>Shipping</th>
          <th>Status</th>
          <th>Paid status</th>
          <SortableHeader
            label="total"
            sortKey="totalPrice"
            currentSortKey={sortConfig.key}
            currentSortDirection={sortConfig.direction}
            onSort={handleSort}
          />
        </tr>
      </thead>
      <tbody>
        {paginatedData.map((order) => (
          <AdminOrderLineItem key={order.id} order={order} />
        ))}
      </tbody>
    </table>
    {paginationControls}
    </>
  );
};

export default AdminOrderList;
