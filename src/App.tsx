import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/layout/Home';
import About from './components/layout/About';
import Login from './components/auth/Login';
import Shop from './components/shop/Shop';
import Account from './components/auth/Account';
import PostsList from './components/posts/PostsList';
import AddPostForm from './components/posts/AddPostForm';
import EditPostForm from './components/posts/EditPostForm';
import SingleProductPage from './components/shop/SingleProductPage';
import Payment from './components/checkout/Payment';
import Register from './components/auth/Register';
import RequireAuth from './components/auth/RequireAuth';
import PersistLogin from './components/auth/PersistLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminOrdersPage from './components/admin/orders/AdminOrdersPage';
import AdminProductsPage from './components/admin/products/AdminProductsPage';
import SingleOrderPage from './components/orders/SingleOrderPage';
import CreateProduct from './components/admin/products/CreateProduct';
import { ROLES } from './config/roles';
import EditProduct from './components/admin/products/EditProduct';
import Checkout from './components/checkout/Checkout';

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
            <Route path="edit/:postId" element={<EditPostForm />} />
          </Route>

          <Route path="shop">
            <Route index element={<Shop />} />
            <Route path="product/:productId" element={<SingleProductPage />} />
            <Route path="checkout">
              <Route path="cart" element={<Checkout />} />
              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="payment" element={<Payment />} />           
              </Route>
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
              <Route index element={<AdminDashboard />} />
              <Route path="products" >
                <Route index element={<AdminProductsPage />} />
                <Route path="product" element={<CreateProduct />} />
                <Route path="edit/:productId" element={<EditProduct />}/>
              </Route>
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
