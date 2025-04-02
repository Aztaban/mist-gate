import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import RequireAuth from '@components/features/auth/RequireAuth';
import PersistLogin from '@components/features/auth/PersistLogin';
import { ROLES } from '@config/roles';

import PublicRoutes from 'routes/PublicRoutes';
import PostRoutes from 'routes/PostRoutes';
import ShopRoutes from 'routes/ShopRoutes';
import CheckoutRoutes from 'routes/CheckoutRoutes';
import UserRoutes from 'routes/UserRoutes';
import AdminRoutes from 'routes/AdminRoutes';

function App() {
  const content = (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<PublicRoutes.Home />} />
          <Route path="about" element={<PublicRoutes.About />} />
          <Route path="login" element={<PublicRoutes.Login />} />
          <Route path="register" element={<PublicRoutes.Register />} />

          {/* Feature routes (some public) */}
          {PostRoutes()}
          {ShopRoutes()}
          {CheckoutRoutes()}

          {/* Protected for all logged-in users */}
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            {UserRoutes()}
          </Route>

          {/* Admin only */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />}>
            {AdminRoutes()}
          </Route>
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  );

  return content;
}

export default App;
