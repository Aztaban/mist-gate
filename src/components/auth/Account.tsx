import { ReactElement } from 'react';
import useAuth from '../../hooks/useAuth';
import OrdersList from '../orders/OrdersList';

const Account = (): ReactElement => {
  const { username } = useAuth();

  return (
    <article className="checkout-main">
      <h2 className="header-wraper">{username}'s Account</h2>
      <OrdersList />
    </article>
  );
};

export default Account;
