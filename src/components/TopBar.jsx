import { useState } from "react";
import SocialLinks from "./SocialLinks.jsx";
import TodayBadge from "./TodayBadge.jsx"; 
import { Link } from "react-router-dom";

export default function TopBar({ onMenu, onSearchSubmit, title, tagline }) {
    const [q, setQ] = useState("");

    function submit(e) {
        e.preventDefault();
        if (!q.trim()) return;
        onSearchSubmit(q.trim());
    }

    return (
        <header className="topbar">
            <button className="iconBtn" onClick={onMenu} aria-label="Abrir menu">
                ☰
            </button>

            <div className="brand">
                <Link to="/" className="brandLink" aria-label="Voltar ao início">
                    <div className="brandTitle">{title}</div>
                    <div className="brandTag">{tagline}</div>
                </Link>
            </div>
            <TodayBadge />
            <form className="topSearch" onSubmit={submit} role="search">
                <input
                    className="topSearchInput"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Buscar: Flamengo, professor, autismo…"
                    aria-label="Buscar no site"
                />
                <button className="iconBtn" type="submit" aria-label="Pesquisar">🔎</button>
            </form>

            <SocialLinks />
        </header>
    );
}
