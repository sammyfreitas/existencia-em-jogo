import { useEffect, useState } from "react";

export default function HoroscopeWidget() {
  const [data, setData] = useState({ loading: true, err: null, sign: "aries", text: null });

  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        // TODO: ligar numa API de horóscopo (sem key ou proxy)
        // const res = await fetch("SUA_API_HOROSCOPO?sign=aries");
        // const json = await res.json();

        if (!alive) return;
        setData((d) => ({ ...d, loading: false, text: "Placeholder: horóscopo do dia (API em breve)." }));
      } catch (e) {
        if (!alive) return;
        setData((d) => ({ ...d, loading: false, err: "Falha ao carregar horóscopo" }));
      }
    }

    run();
    return () => { alive = false; };
  }, []);

  return (
    <div className="widget">
      <div className="widgetTitle">Horóscopo do dia</div>
      {data.loading && <div className="muted">Carregando…</div>}
      {data.err && <div className="muted">{data.err}</div>}
      {!data.loading && !data.err && <div className="muted">{data.text}</div>}
    </div>
  );
}
