import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import TopBar from "../components/TopBar.jsx";
import SideMenu from "../components/SideMenu.jsx";
import SearchModal from "../components/SearchModal.jsx";

import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Post from "../pages/Post.jsx";
import Topic from "../pages/Topic.jsx";
import Brasileirao from "../pages/Brasileirao.jsx";
import Search from "../pages/Search.jsx";

import { loadPosts } from "../lib/posts.js";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const nav = useNavigate();

  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        const data = await loadPosts();
        if (alive) setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao carregar posts:", err);
        if (alive) setPosts([]);
      } finally {
        if (alive) setLoadingPosts(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="appShell">
      <TopBar
        onMenu={() => setMenuOpen(true)}
        onSearch={() => setSearchOpen(true)}
        onSearchSubmit={(q) => nav(`/buscar?q=${encodeURIComponent(q)}`)}
        title="Existência em Jogo"
        tagline="crônicas sobre o que me move."
      />

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} posts={posts} />

      <main className="main">
        {loadingPosts && (
          <div className="muted" style={{ padding: 10 }}>
            Carregando crônicas…
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/buscar" element={<Search posts={posts} />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/post/:slug" element={<Post posts={posts} />} />
          <Route path="/tema/:topic" element={<Topic posts={posts} />} />
          <Route path="/brasileirao" element={<Brasileirao />} />
        </Routes>
      </main>

      <footer className="footer">
        <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          <img
            src={`${import.meta.env.BASE_URL}images/teclabs.svg`}
            alt="TecLabs"
            style={{ height: 28 }}
          />
          <div>
            <strong>Existência em Jogo</strong>
            <br />
            Desenvolvido por <strong>Anthony Samuel Sobral De Freitas</strong>, jornalista, escritor, engenheiro, professor frontend e backend, 2026.
          </div>
        </div>
      </footer>
    </div>
  );
}
