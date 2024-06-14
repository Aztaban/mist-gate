import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartProvider';

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
import Cart from './components/shop/Cart';
import Register from './components/auth/Register';
import RequireAuth from './components/auth/RequireAuth';
import PersistLogin from './components/auth/PersistLogin';
import { ROLES } from './config/roles';
import { useDispatch } from 'react-redux';
import { useRefreshMutation } from './features/auth/authApiSlice';
import { useEffect } from 'react';
import { setCredentials } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  const [refresh, { isLoading, isError }] = useRefreshMutation();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const { accessToken } = await refresh().unwrap();
        dispatch(setCredentials({ accessToken }));
      } catch (err) {
        console.error('Failed to refresh access token', err);
      }
    };

    refreshToken();
  }, [dispatch, refresh]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error('Failed to refresh access token');
  }

  const content = (
    <CartProvider>
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
              <Route
                path="product/:productId"
                element={<SingleProductPage />}
              />
              <Route path="cart" element={<Cart />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              <Route path="account" element={<Account />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </CartProvider>
  );

  return content;
}

export default App;
