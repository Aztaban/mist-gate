import { ReactElement } from 'react';
import { Order } from '@types';
import AdminOrderLineItem from './AdminOrderLineItem';
import { useSorting } from '@hooks/state/useSorting';
import SortableHeader from '../SortableHeader';
import usePagination from '@hooks/ui/usePagination';

interface AdminOrderListProps {
  orders: Order[];
}

const AdminOrderList = ({ orders }: AdminOrderListProps): ReactElement => {
  const { sortedData, sortConfig, handleSort } = useSorting(orders);
  const { paginatedData, paginationControls } = usePagination<Order>({
    data: sortedData,
    itemsPerPage: 15,
  });

  if (!orders || orders.length === 0) {
    return (
      <div className="surface-dark section">
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <>
      <table className="table table--compact surface-dark">
        <thead>
          <tr>
            <th>Order Number</th>

            <SortableHeader
              label="created"
              sortKey="created_at"
              currentSortKey={sortConfig.key}
              currentSortDirection={sortConfig.direction}
              onSort={handleSort}
              className="th--sortable"
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
              className="th--sortable u-text-right"
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
