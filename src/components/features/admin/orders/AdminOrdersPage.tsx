import { useState, useMemo, ChangeEvent } from 'react';
import { useGetAllOrdersQuery } from '@features/apiSlices/ordersApiSlice';
import AdminOrderList from './AdminOrderList';

const AdminOrdersPage = () => {
  const { data: orders = [], isError, isLoading } = useGetAllOrdersQuery();
  const [search, setSearch] = useState<string>('');

  // Filter orders based on search input
  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    return orders.filter(
      (order) =>
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
    <section className="orders-admin">
      <header className="section-bar surface-dark">
        <h1 className="section-bar__title">Admin Orders</h1>
        <div className="section-bar__actions">
          <input
            type="text"
            placeholder="username or order ID"
            value={search}
            onChange={handleSearch}
            className="search-bar btn--sm"
          />
        </div>
      </header>
      <AdminOrderList orders={filteredOrders} />
    </section>
  );
};

export default AdminOrdersPage;
