import { useState, useMemo, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../features/shop/ordersSlice';
import { Order } from '../../features/shop/ordersApiSlice';
import AdminOrderList from './AdminOrderList';
import Pagination from '../common/Pagination';

const AdminOrdersPage = () => {
  const orders = useSelector(selectOrders);

  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Filter orders based on search input
  const filteredOrders = useMemo<Order[]>(() => {
    return orders.filter(
      (order) =>
        order.user.username.toLowerCase().includes(search.toLowerCase()) ||
        order.orderNo.toString().includes(search)
    );
  }, [orders, search]);

  // Calculate paginated order from current page
  const paginatedOrders = useMemo<Order[]>(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, page, itemsPerPage]);

  // Calculate total pages based on filtered orders
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Update search and reset to page 1 when search input changes
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <article className="order">
      <h2 className="orders-header">Admin Orders</h2>
      <input
        type="text"
        placeholder="Search by username or order ID"
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />
      <AdminOrderList orders={paginatedOrders} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </article>
  );
};

export default AdminOrdersPage;
