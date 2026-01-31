export default function BrasileiraoRodadasWidget() {
  return (
    <div className="widget">
      <div className="widgetTitle">Rodadas</div>
      <iframe
        title="Rodadas Brasileirão"
        src="https://api.api-futebol.com.br/v1/widgets/rodadas?client_id=KP6WTSMN5REL"
        style={{ width: "100%", height: 520, border: 0, borderRadius: 12 }}
        loading="lazy"
      />
      <div className="muted" style={{ marginTop: 10 }}>
        ⚽ Dados fornecidos pela API Futebol | Projeto: <strong>Anthony Freitas</strong> | 2026
      </div>
    </div>
  );
}
