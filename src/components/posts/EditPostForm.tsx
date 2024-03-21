import { useEffect, useState, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostByIdQuery,
} from '../../features/posts/postsSlice';

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const {
    data: post,
    isLoading: isLoadingPosts,
    isSuccess,
  } = useGetPostByIdQuery(postId || '');

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);

  useEffect(() => {
    if (isSuccess) {
      setTitle(post.title);
      setContent(post.body);
    }
  }, [isSuccess, post?.title, post?.body]);

  if (isLoadingPosts) return <p>Loading...</p>;

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const canSave = [title, content].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await updatePost({
          id: post.id,
          title: title!,
          body: content!,
        }).unwrap();

        setTitle('');
        setContent('');
        navigate(`/posts/${postId}`);
      } catch (err) {
        console.error('Failed to save the post', err);
      }
    }
  };

  const onDeletePostClicked = async () => {
    try {
      await deletePost({ id: post.id }).unwrap();

      setTitle('');
      setContent('');
      navigate('/posts');
    } catch (err) {
      console.error('Failed to delete the post', err);
    }
  };

  return (
    <section className="edit-section">
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <div>
          <button
            type="button"
            className="addButton"
            onClick={onSavePostClicked}
            disabled={!canSave}
          >
            Save Post
          </button>
          <button
            className="deleteButton"
            type="button"
            onClick={onDeletePostClicked}
          >
            Delete Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditPostForm;
