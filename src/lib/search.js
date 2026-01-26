export function searchPosts(posts, query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return posts
    .map((p) => {
      const hay = [
        p.title,
        p.excerpt,
        (p.categories || []).join(" "),
        (p.tags || []).join(" "),
        p.series || ""
      ]
        .join(" ")
        .toLowerCase();

      const score = hay.includes(q) ? 10 : 0;
      return { ...p, _score: score };
    })
    .filter((p) => p._score > 0)
    .sort((a, b) => b._score - a._score);
}
