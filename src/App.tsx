import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartProvider';

import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Login from './components/auth/Login';
import Shop from './components/shop/Shop';
import Account from './components/Account';
import PostsList from './components/posts/PostsList';
import AddPostForm from './components/posts/AddPostForm';
import EditPostForm from './components/posts/EditPostForm';
import SinglePostPage from './components/posts/SinglePostPage';
import SingleProductPage from './components/shop/SingleProductPage';
import Cart from './components/shop/Cart';

function App() {
  const content = (
    <CartProvider>
      <Routes>
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
            <Route path="cart" element={<Cart />}/>
          </Route>

          <Route path="login" element={<Login />} />

          <Route path="account" element={<Account />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </CartProvider>
  );

  return content;
}

export default App;
