import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { marked } from "marked";
import { resolveCover } from "../lib/cover.js";

export default function Post({ posts }) {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  const [html, setHtml] = useState("");

  // src/pages/Post.jsx (apenas o useEffect + helpers)

function stripFrontmatter(md) {
  // remove bloco --- ... --- do início do arquivo
  if (md.startsWith("---")) {
    const end = md.indexOf("\n---", 3);
    if (end !== -1) return md.slice(end + 4).trim();
  }
  return md;
}

useEffect(() => {
  let alive = true;

  async function run() {
    if (!post) return;

    const base = import.meta.env.BASE_URL; // "/existencia-em-jogo/"
    const filePath = String(post.file || "").replace(/^\/+/, ""); // "posts/....md" (sem barra no começo)
    const url = `${base}${filePath}`; // "/existencia-em-jogo/posts/....md"

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Falha ao carregar MD: ${res.status} ${res.statusText} (${url})`);
      }

      const mdRaw = await res.text();
      const md = stripFrontmatter(mdRaw);
      const rendered = marked.parse(md);

      if (alive) setHtml(rendered);
    } catch (err) {
      console.error(err);
      if (alive) setHtml(`<p><strong>Erro:</strong> não foi possível carregar esta crônica.</p>`);
    }
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
