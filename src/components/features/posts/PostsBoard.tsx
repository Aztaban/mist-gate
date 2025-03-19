import { useGetPostsQuery } from '@features/apiSlices/postsApiSlice';
import PostExcerpt from './PostExcerpt';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Post } from '@types';

const PostsBoard = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  let pageContent: ReactElement | ReactElement[] = <p>No news to show</p>;
  if (isLoading) {
    pageContent = <p>Loading...</p>;
  } else if (isSuccess && posts) {
    pageContent = posts
      .slice(0, 2)
      .map((post: Post) => <PostExcerpt key={post.id} post={post} />);
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
    <>
      <h2>
        <NavLink to="/posts">Mist News</NavLink>
      </h2>
      <div className="news__home">{pageContent}</div>
    </>
  );

  return content;
};

export default PostsBoard;
