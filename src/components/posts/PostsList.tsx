import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Post, useGetPostsQuery } from '../../features/apiSlices/postsApiSlice';
import useAuth from '../../hooks/useAuth';
import SinglePost from './SinglePost';
import { ReactElement, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';

const PostsList = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  const navigate = useNavigate();
  const { isAdmin, isEditor } = useAuth();

  const onAddPostClicked = (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    navigate('newPost');
  };

  let pageContent: ReactElement | ReactElement[] = <p>No news to show</p>;

  if (isLoading) {
    pageContent = <p>Loading...</p>;
  } else if (isSuccess && posts) {
    pageContent = posts.map((post: Post) => (
      <SinglePost
        key={post.id}
        post={post}
      />
    ));
  } else if (isError) {
    if ('status' in error) {
      const errMsg =
        'error' in error ? error.error : JSON.stringify(error.data);
      pageContent = <p>{errMsg}</p>;
    } else {
      pageContent = <p>{error.message}</p>;
    }
  }

  const content: ReactElement = (
    <section className="news__section">
      <div className="news__header">
        <h3>Mist News</h3>
        {isAdmin || isEditor ? (
          <FontAwesomeIcon
            className="news__btn"
            icon={faFolderPlus}
            onClick={onAddPostClicked}
            role="button"
            aria-label="Add Post"
          />
        ) : null}
      </div>
      <div className="news__list">{pageContent}</div>
    </section>
  );

  return content;
};

export default PostsList;
