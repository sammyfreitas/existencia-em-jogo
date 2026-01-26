import PostCard from "./PostCard.jsx";

export default function CardGrid({ posts }) {
  return (
    <section className="grid">
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </section>
  );
}
