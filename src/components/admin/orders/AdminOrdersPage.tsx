import { useState, useMemo, ChangeEvent} from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../features/shop/ordersSlice';
import { Order } from '../../../features/shop/ordersApiSlice';
import AdminOrderList from './AdminOrderList';
import Pagination from '../../common/Pagination';

const AdminOrdersPage = () => {
  const orders = useSelector(selectOrders);

  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 15;

  // Filter orders based on search input
  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.orderNo.toString().toLowerCase().includes(search.toLowerCase()) ||
      order.user.username.toLowerCase().includes(search.toLowerCase())
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
    <article className="orders-main-page">
      <h2 className="header-wraper">
        Admin Orders{' '}
        <input
          type="text"
          placeholder="username or order ID"
          value={search}
          onChange={handleSearch}
          className="search-bar"
        />
      </h2>
      <AdminOrderList orders={paginatedOrders} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </article>
  );
};

export default AdminOrdersPage;
