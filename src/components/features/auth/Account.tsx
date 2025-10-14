// Account.tsx
import { ReactElement } from 'react';
import useAuth from '@hooks/state/useAuth';
import OrdersList from '../orders/OrdersList';
import { useGetOrdersForUserQuery } from '@features/apiSlices/ordersApiSlice';
import UserSettings from '../user/UserSettings';

const Account = (): ReactElement => {
  const { username, isAdmin, isEditor } = useAuth();
  const { data: orders } = useGetOrdersForUserQuery();

  const sortedOrders = [...(orders ?? [])].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <article className="checkout-main page-stack">
      {/* Top header (same look as other pages) */}
      <header className="section-bar surface-dark" aria-labelledby="acc-title">
        <h1 id="acc-title" className="section-bar__title">
          {username}&apos;s Account
        </h1>
      </header>

      {!isAdmin && !isEditor && (
        <>
          <OrdersList orders={sortedOrders} />

          {/* User settings header */}
          <header className="section-bar surface-dark" aria-labelledby="settings-title">
            <h2 id="settings-title" className="section-bar__title">
              User Settings
            </h2>
          </header>
        </>
      )}

      <UserSettings />
    </article>
  );
};

export default Account;
