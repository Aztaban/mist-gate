import { Post } from "../../features/posts/postsSlice"

type PropsType = {
  post: Post; 
}

const SinglePostPage = ({ post }: PropsType) => {
  const postDate = new Date(post.date).toLocaleString();

  let content = (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>{postDate}</p>
    </article>
  )
  
  return content;
}

export default SinglePostPage