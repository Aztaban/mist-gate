import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Login from './components/auth/Login';
import Shop from './components/Shop';
import Account from './components/Account';
import PostsList from './components/posts/PostsList';
import AddPostForm from './components/posts/AddPostForm';
import EditPostForm from './components/posts/EditPostForm';
import SinglePostPage from './components/posts/SinglePostPage';

function App() {
  const content = (
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

        <Route path="login" element={<Login />} />
        <Route path="shop" element={<Shop />} />
        <Route path="account" element={<Account />} />
        
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );

  return content;
}

export default App;
