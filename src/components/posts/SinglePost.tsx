import { Post } from '../../types';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { dateFormat } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/state/useAuth';

type PropsType = {
  post: Post;
};

const SinglePost = ({ post }: PropsType) => {
  const navigate = useNavigate();
  const { isAdmin, isEditor } = useAuth();

  const onEditPostClicked = (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    navigate(`edit/${post.id}`);
  };

  let content = (
    <article className="post__home">
      <div className="post__header">
        <h3>{post.title}</h3>
        {isEditor || isAdmin ? (
          <FontAwesomeIcon
            className="news__btn"
            icon={faPenToSquare}
            onClick={onEditPostClicked}
            role="button"
            aria-label="Add Post"
            tabIndex={0}
          />
        ) : null}
      </div>
      <p className="post__home-date">{dateFormat(post.date)}</p>
      <p>{post.body}</p>
    </article>
  );

  return content;
};

export default SinglePost;
