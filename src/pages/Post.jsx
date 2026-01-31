import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { marked } from "marked";
import { resolveCover } from "../lib/cover.js";

export default function Post({ posts }) {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  const [html, setHtml] = useState("");

  useEffect(() => {
    let alive = true;
    async function run() {
      if (!post) return;

      const url = `${import.meta.env.BASE_URL}${post.file}`;
      const res = await fetch(url);
      const md = await res.text();
      const rendered = marked.parse(md);
      if (alive) setHtml(rendered);
    }
    run();
    return () => { alive = false; };
  }, [post]);

  if (!post) {
    return (
      <div className="page">
        <h1>Não encontrei essa crônica.</h1>
      </div>
    );
  }

  return (
    <div className="page postPage">
      <div className="postHeader">
        {post.series && <span className="badge">{post.series}</span>}
        <h1>{post.title}</h1>
        <div className="meta">{post.date} · {post.categories?.join(" / ")}</div>
      </div>

      <img className="postCover" src={resolveCover(post)} alt={post.title} />

      <div className="postContent" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
