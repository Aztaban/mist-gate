import { useState, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewPostMutation, useGetPostsQuery } from '@features/apiSlices/postsApiSlice';

const AddPostForm = () => {
  const { refetch } = useGetPostsQuery();
  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const canSave = [title.trim(), content.trim()].every(Boolean) && !isLoading;

  const onSavePostClicked = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSave) return;

    try {
      await addNewPost({ title: title.trim(), body: content.trim() }).unwrap();
      setTitle('');
      setContent('');
      await refetch();
      navigate('/posts');
    } catch (err) {
      setError('Failed to save the post. Please try again.');
      console.error(err);
    }
  };

  const onBackBtnClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <section className="posts-editor">
      <header className="section-bar surface-dark">
        <h1 className="section-bar__title">Add a New Post</h1>
      </header>

      <form className="surface-dark posts-editor__form" onSubmit={onSavePostClicked} noValidate>
        {error && (
          <p className="form__error" role="alert">
            {error}
          </p>
        )}

        <div className="form__field">
          <label htmlFor="postTitle">Post Title</label>
          <input
            id="postTitle"
            name="postTitle"
            type="text"
            className="form__control"
            value={title}
            onChange={onTitleChanged}
            disabled={isLoading}
            placeholder="Enter a concise, catchy title"
          />
        </div>

        <div className="form__field">
          <label htmlFor="postContent">Content</label>
          <textarea
            id="postContent"
            name="postContent"
            className="form__control"
            value={content}
            onChange={onContentChanged}
            disabled={isLoading}
            rows={8}
            placeholder="Write your post content…"
          />
        </div>

        <div className="form__actions posts-editor__actions">
          <button type="submit" className="btn btn--brand" disabled={!canSave} aria-disabled={!canSave}>
            {isLoading ? 'Saving…' : 'Save Post'}
          </button>

          <button type="button" className="btn btn--ghost" onClick={onBackBtnClicked} disabled={isLoading}>
            Back to posts
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddPostForm;
