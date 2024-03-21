import { Post } from '../../features/posts/postsSlice';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  post: Post;
};

const SinglePost = ({ post }: PropsType) => {
  const navigate = useNavigate();

  const postDate = new Date(post.date).toLocaleString();

  const onEditPostClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`edit/${post.id}`);
  };

  let content = (
    <article className='single-post'>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>{postDate}</p>
      <button type="button" className="addButton" onClick={onEditPostClicked}>
        Edit Post
      </button>
    </article>
  );

  return content;
};

export default SinglePost;
