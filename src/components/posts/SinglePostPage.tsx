import { MouseEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../features/posts/postsSlice';
import { useDateFormatter } from '../../hooks/useDateFormatter';

const SinglePostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const {
    data: post,
    isLoading,
    isSuccess,
    isError
  } = useGetPostByIdQuery(postId || '');

  const onEditPostClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`edit/${post?.id}`);
  };

  const onBackClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/posts');
  };

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  if (isSuccess) {
    content = (
      <article className='single-post'>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p>{useDateFormatter(post.date)}</p>
        <button type="button" className="addButton" onClick={onEditPostClicked}>
          Edit Post
        </button>
        <button type="button" className="addButton" onClick={onBackClicked}>
          back to Post List
        </button>
      </article>
    );
  }

  return content;
};

export default SinglePostPage;
