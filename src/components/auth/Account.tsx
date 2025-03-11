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
      <UserSettings />
      <h2>Orders</h2>
      <OrdersList orders={orders}/>
    </article>
  );
};

export default Account;
