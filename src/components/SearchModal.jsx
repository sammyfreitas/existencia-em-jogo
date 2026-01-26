import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { searchPosts } from "../lib/search.js";

export default function SearchModal({ open, onClose, posts }) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return searchPosts(posts, q).slice(0, 10);
  }, [posts, q]);

  if (!open) return null;

  return (
    <div className="modalWrap" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <strong>Buscar no site</strong>
          <button className="iconBtn" onClick={onClose} aria-label="Fechar busca">✕</button>
        </div>

        <input
          className="searchInput"
          placeholder="Digite: Flamengo, professor, autismo…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoFocus
        />

        <div className="searchResults">
          {results.length === 0 && q.trim() && <div className="muted">Nada ainda. Tenta outro termo.</div>}

          {results.map((p) => (
            <Link key={p.id} to={`/post/${p.slug}`} onClick={onClose} className="searchItem">
              <div className="searchTitle">{p.title}</div>
              <div className="searchMeta">{p.date} · {p.categories?.join(" / ")}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
