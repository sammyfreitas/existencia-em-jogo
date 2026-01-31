import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { loadPosts } from "../lib/posts.js"; // ajuste o caminho conforme seu projeto

import TopBar from "../components/TopBar.jsx";
import SideMenu from "../components/SideMenu.jsx";

import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Post from "../pages/Post.jsx";
import Topic from "../pages/Topic.jsx";
import Brasileirao from "../pages/Brasileirao.jsx";
import Search from "../pages/Search.jsx";

import { loadPosts } from "../lib/posts.js";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const nav = useNavigate();
  
  console.log("POSTS:", posts, "isArray?", Array.isArray(posts));


  useEffect(() => {
  let alive = true;

  async function run() {
    try {
      const data = await loadPosts();
      if (alive) setPosts(data);
    } catch (err) {
      console.error("Erro ao carregar posts:", err);
      if (alive) setPosts([]);
    } finally {
      if (alive) setLoadingPosts(false);
    }
  }

  run();
  return () => { alive = false; };
 }, []);

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
          // 
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/buscar" element={<Search posts={posts} />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/post/:slug" element={<Post posts={posts} />} />
          <Route path="/tema/:topic" element={<Topic posts={posts} />} />
          <Route path="/brasileirao" element={<Brasileirao />} />
        </Routes>
      </main>

      {/* footer */}
    </div>
  );
}
