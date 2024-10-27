import { ReactElement, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useGetOrdersForUserQuery } from '../../features/shop/ordersSlice';
import OrderLineItem from '../orders/OrderLineItem';

const Account = (): ReactElement => {
  const { username } = useAuth();
  const { data, refetch } = useGetOrdersForUserQuery();

  useEffect(() => {
    refetch(); // Ensures data is up-to-date when navigating to Account
  }, [refetch]);

  return (
    <article className="account">
      <h2 className="orders-header">{username}'s Account</h2>
      <main className="orders-box">
        <h3>Your Orders</h3>
        <div className="orders-list">
          {data && data.length > 0 ? (
            data.map((order) => <OrderLineItem key={order.id} order={order} />)
          ) : (
            <p>No order found.</p>
          )}
        </div>
      </main>
    </article>
  );
};

export default Account;
