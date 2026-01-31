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

function withBase(path) {
  if (!path) return path;

  // se já veio absoluto (http...) não mexe
  if (/^https?:\/\//i.test(path)) return path;

  // se já começa com a BASE_URL, não duplica
  const base = import.meta.env.BASE_URL || "/";
  if (path.startsWith(base)) return path;

  // se começar com "/" (raiz), remove a "/" pra evitar fugir da base
  const clean = path.startsWith("/") ? path.slice(1) : path;

  return `${base}${clean}`;
}

export function resolveCover(post) {
  // 1) se o post já tem capa definida, usa ela (mas garante BASE_URL)
  if (post.cover) return `${import.meta.env.BASE_URL}${post.cover}`;

  // 2) tenta achar um “tema” pela primeira categoria ou tag
  const key =
    (post.categories?.[0] || post.tags?.[0] || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

  // 3) fallback
  return `${import.meta.env.BASE_URL}${BY_TOPIC[key] || "images/placeholder.svg"}`;
}
