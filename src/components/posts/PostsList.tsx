import { Post, useGetPostsQuery } from '../../features/posts/postsSlice';
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

  const onAddPostClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('newPost');
  };

  let pageContent: ReactElement | ReactElement[] = <p>No news to show</p>;

  if (isLoading) {
    pageContent = <p>Loading...</p>;
  } else if (isSuccess && posts) {
    pageContent = posts.map((post: Post) => (
      <>
        <SinglePost key={post.id} post={post} />
      </>
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
        <button type="button" onClick={onAddPostClicked} className="addButton">
          Add Post
        </button>
      </div>
      {pageContent}
    </section>
  );

  return content;
};

export default PostsList;
