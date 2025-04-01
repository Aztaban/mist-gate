import { Route } from 'react-router-dom';
import PostsList from '@components/features/posts/PostsList';
import AddPostForm from '@components/features/posts/AddPostForm';
import EditPostForm from '@components/features/posts/EditPostForm';

export default function PostRoutes() {
  return (
    <Route path="posts">
      <Route index element={<PostsList />} />
      <Route path="newPost" element={<AddPostForm />} />
      <Route path="edit/:postId" element={<EditPostForm />} />
    </Route>
  );
}
