import { MouseEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../features/posts/postsSlice';
import { dateFormat } from '../../utils/utils';

const SinglePostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const {
    data: post,
    isLoading,
    isSuccess,
    isError,
  } = useGetPostByIdQuery(postId || '');

  const onEditPostClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(postId);
    console.log(post);
    navigate(`/posts/edit/${postId}`);
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
      <>
        <section className='login'>
          <article className="single-post">
            <p>{dateFormat(post.date)}</p>
            <div>
              <h3>{post.title}</h3>
            </div>
            <p>{post.body}</p>
            <button
              type="button"
              className="btn back-btn"
              onClick={onEditPostClicked}
            >
              Edit Post
            </button>
            <button
              type="button"
              className="btn back-btn"
              onClick={onBackClicked}
            >
              back to Post List
            </button>
          </article>
        </section>
      </>
    );
  }

  return content;
};

export default SinglePostPage;
