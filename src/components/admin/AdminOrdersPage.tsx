import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../features/shop/ordersSlice';
import { Order } from '../../features/shop/ordersApiSlice';
import SearchBar from './SearchBar';
import AdminOrderList from './AdminOrderList';

const AdminOrdersPage = () => {
  const orders = useSelector(selectOrders);

  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);

    const lowerCasedTerm = term.toLowerCase();
    const newFilteredOrders = orders.filter(
      (order: Order) =>
        order.id.toString().includes(lowerCasedTerm) ||
        order.user.username.toLowerCase().includes(lowerCasedTerm)
    );
    setFilteredOrders(newFilteredOrders);
  };

  return (
    <article className="order">
      <h2 className='orders-header'>Admin Orders</h2>
      <SearchBar  />
      <AdminOrderList orders={orders}/>

    </article>
  );
};

export default AdminOrdersPage;
