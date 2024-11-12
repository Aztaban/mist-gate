import { useGetAllOrdersQuery } from '../../features/shop/ordersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrders, setOrders } from '../../features/shop/ordersSlice';
import { useEffect } from 'react';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { data: ordersData, isError, isLoading } = useGetAllOrdersQuery();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    if (ordersData) {
      dispatch(setOrders(ordersData));
    }
  }, [ordersData, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <article className="account">
      <h2 className="orders-header">Admin Dashboard</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.orderNo} - Total: {order.totalPrice}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default AdminDashboard;
