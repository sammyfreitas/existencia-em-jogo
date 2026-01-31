export async function loadPosts() {
  const base = import.meta.env.BASE_URL; // /existencia-em-jogo/
  const res = await fetch(`${base}posts/index.json`);

  if (!res.ok) {
    throw new Error("Não foi possível carregar posts/index.json");
  }

  const posts = await res.json();

  // ordena por data (mais recente primeiro)
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
