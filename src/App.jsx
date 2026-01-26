import { useMemo, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// ...
import Search from "../pages/Search.jsx";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const posts = useMemo(() => loadPosts(), []);
  const nav = useNavigate();

  return (
    <div className="appShell">
      <TopBar
        onMenu={() => setMenuOpen(true)}
        onSearchSubmit={(q) => nav(`/buscar?q=${encodeURIComponent(q)}`)}
        title="Existência em Jogo"
        tagline="crônicas sobre o que me move."
      />

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="main">
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/buscar" element={<Search posts={posts} />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/post/:slug" element={<Post posts={posts} />} />
          <Route path="/tema/:topic" element={<Topic posts={posts} />} />
        </Routes>
      </main>

      {/* footer ajustado abaixo */}
    </div>
  );
}
