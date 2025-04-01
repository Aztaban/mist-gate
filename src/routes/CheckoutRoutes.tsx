import { Route } from 'react-router-dom';
import Checkout from '@components/features/checkout/Checkout';
import Payment from '@components/features/checkout/payment/Payment';
import RequireAuth from '@components/features/auth/RequireAuth';
import { ROLES } from '@config';

export default function CheckoutRoutes() {
  return (
    <>
      <Route path="checkout">
        <Route index element={<Checkout />} />
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="payment/:orderId" element={<Payment />} />
        </Route>
      </Route>
    </>
  );
}
