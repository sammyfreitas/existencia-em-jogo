import { useParams } from "react-router-dom";
import CardGrid from "../components/CardGrid.jsx";

export default function Topic({ posts }) {
  const { topic } = useParams();

  const filtered = posts.filter((p) => {
    const inCats = (p.categories || []).map(s => s.toLowerCase()).includes(topic.toLowerCase());
    const inTags = (p.tags || []).map(s => s.toLowerCase()).includes(topic.toLowerCase());
    return inCats || inTags;
  });

  return (
    <div className="page">
      <h1>Tema: {topic}</h1>
      {filtered.length === 0 ? (
        <div className="muted">Ainda não tem crônica aqui. Já já a gente enche isso.</div>
      ) : (
        <CardGrid posts={filtered} />
      )}
    </div>
  );
}
