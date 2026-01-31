export default function ShowsRJWidget() {
  return (
    <div className="widget">
      <div className="widgetTitle">Agenda · RJ</div>
      <iframe
        title="Agenda de eventos RJ"
        src="https://www.eventbrite.com.br/d/brazil--rio-de-janeiro/events/"
        style={{ width: "100%", height: 520, border: 0, borderRadius: 12 }}
        loading="lazy"
      />
      <div className="muted" style={{ marginTop: 8 }}>
        Fonte: Eventbrite (embed via iframe)
      </div>
    </div>
  );
}
