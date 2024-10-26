import { ReactElement, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useGetOrdersForUserQuery } from '../../features/shop/ordersSlice';
import OrderLineItem from '../checkout/OrderLineItem';

const Account = (): ReactElement => {
  const { username } = useAuth();
  const { data, refetch } = useGetOrdersForUserQuery();

  useEffect(() => {
    refetch(); // Ensures data is up-to-date when navigating to Account
  }, [refetch]);

  return (
    <article className='account'>
      <header className='orders-header'>
        <h2>{username}'s Account</h2>
      </header>
      <main className='orders-box'>
        <h3>Your Orders</h3>
        <div className='orders-list'>
          {data && data.length > 0 ? (
            data.map((order) => (
              <OrderLineItem key={order.id} order={order} />
            ))
          ) : (
            <p>No order found.</p>
          )}
        </div>
      </main>
    </article>
  );
};

export default Account;
