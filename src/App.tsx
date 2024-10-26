import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Login from './components/auth/Login';
import Shop from './components/shop/Shop';
import Account from './components/auth/Account';
import PostsList from './components/posts/PostsList';
import AddPostForm from './components/posts/AddPostForm';
import EditPostForm from './components/posts/EditPostForm';
import SinglePostPage from './components/posts/SinglePostPage';
import SingleProductPage from './components/shop/SingleProductPage';
import Cart from './components/checkout/Cart';
import ShippingAndAddress from './components/checkout/ShippingAndAddress';
import Payment from './components/checkout/Payment';
import OrderSummary from './components/checkout/OrderSummary';
import Register from './components/auth/Register';
import RequireAuth from './components/auth/RequireAuth';
import PersistLogin from './components/auth/PersistLogin';
import Admin from './components/admin/Admin';
import AdminOrdersPage from './components/admin/AdminOrdersPage';
import AdminProductsPage from './components/admin/AdminProductsPage';
import SingleOrderPage from './components/checkout/SingleOrderPage';
import { ROLES } from './config/roles';

function App() {
  const content = (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          <Route path="posts">
            <Route index element={<PostsList />} />
            <Route path="newPost" element={<AddPostForm />} />
            <Route path=":postId" element={<SinglePostPage />} />
            <Route path="edit/:postId" element={<EditPostForm />} />
          </Route>

          <Route path="shop">
            <Route index element={<Shop />} />
            <Route path="product/:productId" element={<SingleProductPage />} />
            <Route path="checkout">
              <Route path="cart" element={<Cart />} />
              <Route path="shipping" element={<ShippingAndAddress />} />
              <Route path="payment" element={<Payment />} />
              <Route path="summary" element={<OrderSummary />} />
            </Route>
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route path="account" element={<Account />} />
            <Route path="order/:orderId" element={<SingleOrderPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin">
              <Route index element={<Admin />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  );

  return content;
}

export default App;
