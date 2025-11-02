import OrderLineItem from './OrderLineItem';
import usePagination from '@hooks/ui/usePagination';
import { Order } from '@types';
import { ReactElement } from 'react';

interface OrdersListProps {
  orders: Order[] | null;
}

const OrdersList = ({ orders }: OrdersListProps): ReactElement => {
  if (!orders || orders.length === 0) {
    return (
      <table className="surface-dark table table--compact">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Date</th>
            <th className="u-text-right">Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table__empty-row">
            <td colSpan={4} className="u-text-center">
              No Orders Found.
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  const { paginatedData, paginationControls } = usePagination<Order>({
    data: orders,
    itemsPerPage: 10,
  });

  return (
    <>
      <table className="surface-dark table table--compact">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((order) => (
            <OrderLineItem key={order.id} order={order} />
          ))}
        </tbody>
      </table>
      {paginationControls}
    </>
  );
};

export default OrdersList;
