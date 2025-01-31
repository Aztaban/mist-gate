import { useState, useMemo, ChangeEvent} from 'react';
import { useGetAllOrdersQuery } from '../../../features/shop/ordersApiSlice';
import AdminOrderList from './AdminOrderList';
import Pagination from '../../common/Pagination';

const AdminOrdersPage = () => {
  const { data: orders  = [], isError, isLoading } = useGetAllOrdersQuery();

  const [search, setSearch] = useState<string>('');
  const itemsPerPage = 15;

  // Filter orders based on search input
  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.orderNo.toString().toLowerCase().includes(search.toLowerCase()) ||
      order.user.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [orders, search]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Error loading orders.</p>;

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
      <Pagination
        data={filteredOrders}
        itemsPerPage={itemsPerPage}
        render={(paginatedData) => <AdminOrderList orders={paginatedData} />}
      />
    </article>
  );
};

export default AdminOrdersPage;
