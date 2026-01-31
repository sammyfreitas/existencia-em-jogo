import BrasileiraoWidget from "/BrasileiraoWidget.jsx";

export default function Brasileirao() {
  return (
    <div className="page">
      <section className="hero" style={{ marginBottom: 16 }}>
        <div className="heroEyebrow">Esportes</div>
        <h2>Brasileirão</h2>
        <p>Tabela e rodadas em tela cheia.</p>
      </section>

      <BrasileiraoWidget />
    </div>
  );
}
