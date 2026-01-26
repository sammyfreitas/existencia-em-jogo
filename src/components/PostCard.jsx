import { Link } from "react-router-dom";

export default function PostCard({ post, variant = "normal" }) {
  return (
    <article className={`postCard ${variant}`}>
      <Link to={`/post/${post.slug}`}>
        <img src={post.cover} alt={post.title} />
        <div className="postCardBody">
          {post.series && <span className="badge">{post.series}</span>}
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <div className="meta">{post.date} · {post.categories?.join(" / ")}</div>
        </div>
      </Link>
    </article>
  );
}
