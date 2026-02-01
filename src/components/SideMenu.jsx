import { Link } from "react-router-dom";

export default function SideMenu({ open, onClose }) {
  const itemsAtoZ = [
    { label: "Astrologia", to: "/tema/astrologia" },
    { label: "Autismo / Neurodivergência", to: "/tema/autismo" },
    { label: "Cotidiano", to: "/tema/cotidiano" },
    { label: "Cultura", to: "/tema/cultura" },
    { label: "Engenharia / TI", to: "/tema/engenharia-ti" },
    { label: "Esportes", to: "/tema/esportes" },
    { label: "Futebol", to: "/tema/futebol" },
    { label: "Gestão", to: "/tema/gestao" },
    { label: "Namoro / Tinder", to: "/tema/namoro" },
    { label: "Pets", to: "/tema/pets" },
    { label: "Política", to: "/tema/politica" },
    { label: "Religiosidade", to: "/tema/religiosidade" },
    { label: "RJ", to: "/tema/rj" },
  ].sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));
  return (
    <div className={`sideWrap ${open ? "open" : ""}`} onClick={onClose}>
      <nav className="sideMenu" onClick={(e) => e.stopPropagation()}>
        <div className="sideHeader">
          <strong>Temas</strong>
          <button className="iconBtn" onClick={onClose} aria-label="Fechar menu">
            ✕
          </button>
        </div>
        {/* 1) Início */}
        <Link to="/" onClick={onClose}>Início</Link>
         
         {/* 2) Flamengo fixo */}
        <Link to="/tema/flamengo" onClick={onClose}>Flamengo</Link>
        <hr className="menuHr" />
        {/* 3) Demais em ordem alfabética */}
        {itemsAtoZ.map((it) => (
          <Link key={it.to} to={it.to} onClick={onClose}>
            {it.label}
          </Link>
        ))}
       {/* 4) Sobre por último */}
        <hr className="menuHr" />
        <Link to="/sobre" onClick={onClose}>Sobre</Link>
      </nav>
    </div>
  );
}
