import { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostByIdQuery,
} from '../../features/posts/postsSlice';
import useAuth from '../../hooks/useAuth';

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const { isAdmin } = useAuth();

  const {
    data: post,
    isLoading: isLoadingPost,
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

  if (isLoadingPost) return <p>Loading...</p>;

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
          id: postId,
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
      await deletePost({ id: postId || '' }).unwrap();

      setTitle('');
      setContent('');
      navigate('/posts');
    } catch (err) {
      console.error('Failed to delete the post', err);
    }
  };

  const onBackBtnClicked = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <section className="edit-post">
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
            className="btn save-btn"
            onClick={onSavePostClicked}
            disabled={!canSave}
          >
            Save Post
          </button>
          <button
            type="button"
            className="btn back-btn"
            onClick={onBackBtnClicked}
          >
            back to posts
          </button>
          {isAdmin ? (
            <button
              className="btn del-btn"
              type="button"
              onClick={onDeletePostClicked}
            >
              Delete Post
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
};

export default EditPostForm;
