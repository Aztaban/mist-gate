import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { useGetPostsQuery } from '@features/apiSlices/postsApiSlice';
import useAuth from '@hooks/state/useAuth';
import SinglePost from './SinglePost';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '@types';

const PostsList = () => {
  const { data: posts, isLoading, isSuccess, isError, error } = useGetPostsQuery();
  const navigate = useNavigate();
  const { isAdmin, isEditor } = useAuth();
  const canEdit = isAdmin || isEditor;

  const onAddPostClicked = () => navigate('newPost');

  let pageContent: ReactElement;

  if (isLoading) {
    pageContent = (
      <p className="news__empty" aria-live="polite">
        Loading…
      </p>
    );
  } else if (isError) {
    const errMsg =
      'status' in error ? ('error' in error ? error.error : JSON.stringify(error.data)) : (error as any).message;
    pageContent = (
      <p className="news__empty" role="alert">
        {errMsg}
      </p>
    );
  } else if (isSuccess && posts && posts.length > 0) {
    // (optional) newest first
    const ordered = [...posts].sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime());
    pageContent = (
      <ul className="news__list" role="list">
        {ordered.map((post: Post) => (
          <li key={post.id}>
            <SinglePost post={post} />
          </li>
        ))}
      </ul>
    );
  } else {
    pageContent = <p className="news__empty">No news to show</p>;
  }

  return (
    <section className="news">
      <header className="news__header section-bar surface-dark">
        <h1 className="section-bar__title">Mist News</h1>
        {canEdit && (
          <button
            type="button"
            className="news__btn icon-btn"
            onClick={onAddPostClicked}
            aria-label="Add Post"
            title="Add Post">
            <FontAwesomeIcon icon={faFolderPlus} />
          </button>
        )}
      </header>

      {pageContent}
    </section>
  );
};

export default PostsList;
