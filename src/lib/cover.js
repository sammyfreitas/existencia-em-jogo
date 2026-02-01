// src/lib/cover.js

const BY_TOPIC = {
  autismo: "images/placeholders/autismo.svg",
  cotidiano: "images/placeholders/cotidiano.svg",
  cultura: "images/placeholders/cultura.svg",
  engenheiro: "images/placeholders/engenheiro.svg",
  esportes: "images/placeholders/esportes.svg",
  flamengo: "images/placeholders/flamengo.svg",
  futebol: "images/placeholders/futebol.svg",
  gestao: "images/placeholders/gestao.svg",
  politica: "images/placeholders/politica.svg",
  professor: "images/placeholders/professor.svg",
  programacao: "images/placeholders/programacao.svg",
};

function toPublicUrl(path) {
  const base = import.meta.env.BASE_URL; // "/existencia-em-jogo/" em prod, "/" em dev se você mudar depois

  if (!path) return `${base}images/placeholder.svg`;
  if (/^https?:\/\//i.test(path)) return path;               // externa
  if (path.startsWith(base)) return path;                    // já vem com base certinho
  if (path.startsWith("/")) return `${base}${path.slice(1)}`; // "/images/.." -> "/existencia-em-jogo/images/.."
  return `${base}${path}`;                                   // "images/.." -> "/existencia-em-jogo/images/.."
}

export function resolveCover(post) {
  // 1) se o post já tem capa definida, usa ela (normalizada)
  if (post?.cover) return toPublicUrl(post.cover);

  // 2) tenta achar um “tema” pela primeira categoria ou tag
  const key =
    (post?.categories?.[0] || post?.tags?.[0] || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

  // 3) fallback por tema (normalizado)
  return toPublicUrl(BY_TOPIC[key] || "images/placeholder.svg");
}
