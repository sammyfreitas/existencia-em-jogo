import { Link } from "react-router-dom";

export default function SideMenu({ open, onClose }) {
  return (
    <div className={`sideWrap ${open ? "open" : ""}`} onClick={onClose}>
      <nav className="sideMenu" onClick={(e) => e.stopPropagation()}>
        <div className="sideHeader">
          <strong>Temas</strong>
          <button className="iconBtn" onClick={onClose} aria-label="Fechar menu">
            ✕
          </button>
        </div>

        <Link to="/" onClick={onClose}>Início</Link>
        <Link to="/tema/futebol" onClick={onClose}>Futebol</Link>
        <Link to="/tema/brasileirao" onClick={onClose}>Tabela do Brasileirão</Link>
        <Link to="/tema/esportes" onClick={onClose}>Esportes</Link>
        <Link to="/tema/cotidiano" onClick={onClose}>Cotidiano</Link>
        <Link to="/tema/cultura" onClick={onClose}>Cultura</Link>
        <Link to="/tema/politica" onClick={onClose}>Política</Link>
        <Link to="/tema/gestao" onClick={onClose}>Gestão</Link>
        <Link to="/sobre" onClick={onClose}>Sobre</Link>
      </nav>
    </div>
  );
}
