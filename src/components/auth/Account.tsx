import { ReactElement } from 'react';
import useAuth from '../../hooks/state/useAuth';
import OrdersList from '../orders/OrdersList';
import { useGetOrdersForUserQuery } from '../../features/apiSlices/ordersApiSlice';
import UserSettings from '../user/UserSettings';

const Account = (): ReactElement => {
  const { username } = useAuth();
  const { data: orders = [] } = useGetOrdersForUserQuery();

  return (
    <article className="checkout-main">
      <h2 className="header-wraper">{username}'s Account</h2>
      <OrdersList orders={orders}/>
      <h2>User Settings</h2>
      <UserSettings />
    </article>
  );
};

export default Account;
