import { useState, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewPostMutation } from '../../features/posts/postsSlice';
import { useGetPostsQuery } from '../../features/posts/postsSlice';

const AddPostForm = () => {
  const { refetch } = useGetPostsQuery();

  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const canSave = [title, content].every(Boolean) && !isLoading;

  const onSavePostClicked = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (canSave) {
      try {
        await addNewPost({ title, body: content }).unwrap();

        setTitle('');
        setContent('');
        refetch();
        navigate('/posts');
      } catch (err) {
        console.error('Failed to save the post', err);
      }
    }
  };

  return (
    <section className='edit-section'>
      <h2>Add a New Post</h2>
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
        <button type="button" className='addButton' onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
export default AddPostForm;
