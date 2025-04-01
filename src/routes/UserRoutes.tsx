import { Route } from 'react-router-dom';
import Account from '@components/features/auth/Account';
import SingleOrderPage from '@components/features/orders/SingleOrderPage';

export default function UserRoutes() {
  return (
    <>
      <Route path="account" element={<Account />} />
      <Route path="order/:orderId" element={<SingleOrderPage />} />
    </>
  );
}
