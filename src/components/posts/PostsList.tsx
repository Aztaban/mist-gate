import { Post, useGetPostsQuery } from '../../features/posts/postsSlice';
import useAuth from '../../hooks/useAuth';
import SinglePost from './SinglePost';
import { ReactElement, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const onAddPostClicked = (e: MouseEvent<HTMLButtonElement>) => {
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
        isAdmin={isAdmin}
        isEditor={isEditor}
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
    <section className="posts_list">
      <div className="posts_lists__header">
        <h2>Mist News</h2>
        {isAdmin || isEditor ? (
          <button
            type="button"
            onClick={onAddPostClicked}
            className="addButton"
          >
            Add Post
          </button>
        ) : null}
      </div>
      {pageContent}
    </section>
  );

  return content;
};

export default PostsList;
