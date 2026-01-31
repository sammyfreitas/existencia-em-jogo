import { Link } from "react-router-dom";

export default function BrasileiraoWidget({ compact = false}) {
  const height = compact ? 420 : 900;

  return (
    <div className="widget">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div className="widgetTitle" style={{ marginBottom: 0 }}>Brasileirão</div>

        <Link className="smallBtn" to="brasileirao" title="Abrir em tela cheia">
          Abrir
        </Link>
      </div>

      <iframe
        src="https://widget.api-futebol.com.br/render/widget_99eeafcd28a0f55c"
        title="API Futebol - Widget"
        style={{
          border: "2px solid #E5E7EB",
          borderRadius: "0.5rem",
          background: "transparent",
          width: "100%",
          height: `${height}px`,
          marginTop: 10,
        }}
        loading="lazy"
        referrerPolicy="unsafe-url"
        sandbox="allow-scripts allow-forms allow-popups allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox"
      />

      <div className="muted" style={{ marginTop: 10 }}>
        ⚽ Dados fornecidos pela API Futebol | Projeto: <strong>Anthony Freitas</strong> | 2026
      </div>
    </div>
  );
}
