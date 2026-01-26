import { useLocation, Link } from "react-router-dom";
import { searchPosts } from "../lib/search.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search({ posts }) {
  const qp = useQuery();
  const q = (qp.get("q") || "").trim();
  const results = q ? searchPosts(posts, q) : [];

  return (
    <div className="page">
      <h1>Busca</h1>
      {q ? <p className="muted">Resultados para: <strong>{q}</strong></p> : <p className="muted">Digite no campo de busca acima.</p>}

      <div className="searchResults">
        {results.length === 0 && q && <div className="muted">Nada encontrado ainda.</div>}
        {results.map((p) => (
          <Link key={p.id} to={`/post/${p.slug}`} className="searchItem">
            <div className="searchTitle">{p.title}</div>
            <div className="searchMeta">{p.date} · {(p.categories || []).join(" / ")}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
