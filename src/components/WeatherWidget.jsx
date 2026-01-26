import { useEffect, useState } from "react";

export default function WeatherWidget() {
  const [data, setData] = useState({ loading: true, err: null, temp: null, desc: null });

  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        // TODO: trocar pela sua API escolhida
        // Exemplo: buscar de um endpoint seu / worker / api sem key
        // const res = await fetch("SUA_URL_AQUI");
        // const json = await res.json();

        if (!alive) return;
        setData({ loading: false, err: null, temp: "—", desc: "Configurar API" });
      } catch (e) {
        if (!alive) return;
        setData({ loading: false, err: "Falha ao carregar clima", temp: null, desc: null });
      }
    }

    run();
    return () => { alive = false; };
  }, []);

  return (
    <div className="widget">
      <div className="widgetTitle">Clima (RJ)</div>
      {data.loading && <div className="muted">Carregando…</div>}
      {data.err && <div className="muted">{data.err}</div>}
      {!data.loading && !data.err && (
        <div>
          <div style={{ fontSize: "1.2rem", fontWeight: 800 }}>{data.temp}°C</div>
          <div className="muted">{data.desc}</div>
        </div>
      )}
    </div>
  );
}
