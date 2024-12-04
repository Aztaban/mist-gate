import { Post } from '../../features/posts/postsSlice';

type PropsType = {
  post: Post;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  return date.toLocaleDateString('en-GB', options)
};

const PostExcerpt = ({ post }: PropsType) => {
  const postDate = formatDate(post.date);

  let content = (
    <article className="post__home">
      <p className='post__home-date'>{postDate}</p>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </article>
  );

  return content;
};

export default PostExcerpt;
