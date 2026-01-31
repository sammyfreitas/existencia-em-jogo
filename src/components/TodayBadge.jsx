export default function TodayBadge() {
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return <div className="todayBadge">{today}</div>;
}
