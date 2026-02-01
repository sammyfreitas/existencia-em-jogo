import BrasileiraoWidget from "../components/BrasileiraoWidget.jsx";

export default function Brasileirao() {
  return (
    <div className="page">
      <h1>Brasileirão</h1>
      <p className="muted" style={{ marginTop: 6 }}>
        Tabela completa (widget).
      </p>

      <div style={{ marginTop: 12 }}>
        <BrasileiraoWidget mode="full" />
      </div>
    </div>
  );
}
