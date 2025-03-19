import { ReactElement } from 'react';
import useAuth from '@hooks/state/useAuth';
import OrdersList from '../orders/OrdersList';
import { useGetOrdersForUserQuery } from '@features/apiSlices/ordersApiSlice';
import UserSettings from '../user/UserSettings';

const Account = (): ReactElement => {
  const { username } = useAuth();
  const { data: orders } = useGetOrdersForUserQuery();

  const sortedOrders = [...orders ?? []].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <article className="checkout-main">
      <h2 className="header-wraper">{username}'s Account</h2>
      <OrdersList orders={sortedOrders}/>
      <h2 className="header-wraper">User Settings</h2>
      <UserSettings />
    </article>
  );
};

export default Account;
