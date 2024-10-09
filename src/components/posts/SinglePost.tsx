import { Post } from '../../features/posts/postsSlice';
import { MouseEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { dateFormat } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


type PropsType = {
  post: Post;
  isAdmin: boolean;
  isEditor: boolean;
};

const SinglePost = ({ post, isAdmin, isEditor }: PropsType) => {
  const navigate = useNavigate();

  const onEditPostClicked = (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    navigate(`edit/${post.id}`);
  };

  let content = (
    <article className="single-post">
      <p>{dateFormat(post.date)}</p>
      <div>
        <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3>
        {isEditor || isAdmin ? (
          <FontAwesomeIcon
            className='news-link'
            icon={faPenToSquare}
            onClick={onEditPostClicked}
            role="button"
            aria-label="Add Post"
            tabIndex={0}
          />
        ) : null}
      </div>

      <p>{post.body}</p>
    </article>
  );

  return content;
};

export default SinglePost;
