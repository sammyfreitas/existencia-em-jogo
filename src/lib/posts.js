import postsIndex from "../../public/posts/index.json";

export function loadPosts() {
  // ordena por data desc
  return [...postsIndex].sort((a, b) => (a.date < b.date ? 1 : -1));
}
