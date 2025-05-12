import { useState, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewPostMutation, useGetPostsQuery } from '@features/apiSlices/postsApiSlice';

const AddPostForm = () => {
  const { refetch } = useGetPostsQuery();
  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const canSave = [title, content].every(Boolean) && !isLoading;

  const onSavePostClicked = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSave) {
      try {
        await addNewPost({ title, body: content }).unwrap();
        setTitle('');
        setContent('');
        refetch();
        navigate('/posts');
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError('Failed to save the post. Please try again.');
          console.error('Failed to save the post', err.message);
        }
      }
    }
  };

  const onBackBtnClicked = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <section className="edit__post">
      <h2>Add a New Post</h2>
      <form onSubmit={onSavePostClicked}>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          disabled={isLoading}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
          disabled={isLoading}
        />
        <div className="edit__post-btns">
          <button type="submit" className="btn save-btn" disabled={!canSave} aria-disabled={!canSave}>
            {isLoading ? 'Saving...' : 'Save Post'}
          </button>
          <button type="button" className="btn back-btn" onClick={onBackBtnClicked} disabled={isLoading}>
            back to posts
          </button>
        </div>
      </form>
    </section>
  );
};
export default AddPostForm;
