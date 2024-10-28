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
      <main>
        <h3>Your Orders</h3>
        <ul className="orders-list">
          <li className='order-line-header'>
            <span>Date</span> 
            <span>Order Number</span> 
            <span>Paid</span>
            <span className='text-right'>Price</span>  
          </li>
          {data && data.length > 0 ? (
            data.map((order) => <OrderLineItem key={order.id} order={order} />)
          ) : (
            <p>No order found.</p>
          )}
        </ul>
      </main>
    </article>
  );
};

export default Account;
