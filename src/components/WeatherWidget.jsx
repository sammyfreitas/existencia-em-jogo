import { useEffect, useMemo, useState } from "react";

const LAT = -22.9068;
const LON = -43.1729;

function pickTheme(code) {
  // paleta simples por “famílias”
  if (code === 0) return { label: "Céu limpo", cls: "sun", icon: "☀️" };
  if ([1, 2, 3].includes(code)) return { label: "Parcialmente nublado", cls: "cloud-sun", icon: "⛅" };
  if ([45, 48].includes(code)) return { label: "Neblina", cls: "fog", icon: "🌫️" };
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return { label: "Chuva", cls: "rain", icon: "🌧️" };
  if ([95, 96, 99].includes(code)) return { label: "Tempestade", cls: "storm", icon: "⛈️" };
  return { label: "Tempo indefinido", cls: "neutral", icon: "🌤️" };
}

export default function WeatherWidget() {
  const [state, setState] = useState({ loading: true, err: null, t: null, feels: null, code: null });

  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${LAT}&longitude=${LON}` +
          `&current=temperature_2m,apparent_temperature,weather_code` +
          `&timezone=America%2FSao_Paulo`;

        const res = await fetch(url);
        const json = await res.json();

        if (!alive) return;

        setState({
          loading: false,
          err: null,
          t: json?.current?.temperature_2m ?? null,
          feels: json?.current?.apparent_temperature ?? null,
          code: json?.current?.weather_code ?? null,
        });
      } catch (e) {
        if (!alive) return;
        setState({ loading: false, err: "Falha ao carregar clima", t: null, feels: null, code: null });
      }
    }

    run();
    return () => { alive = false; };
  }, []);

  const theme = useMemo(() => pickTheme(state.code), [state.code]);

  return (
    <div className={`widget weather ${theme.cls}`}>
      <div className="widgetTitle">Clima · Rio</div>

      {state.loading && <div className="muted">Carregando…</div>}
      {state.err && <div className="muted">{state.err}</div>}

      {!state.loading && !state.err && (
        <div className="weatherBody">
          <div className="weatherIcon" aria-hidden="true">{theme.icon}</div>

          <div className="weatherMain">
            <div className="weatherTemp">
              {state.t !== null ? `${Math.round(state.t)}°C` : "—"}
            </div>
            <div className="weatherDesc">{theme.label}</div>
            <div className="weatherFeels">
              Sensação: {state.feels !== null ? `${Math.round(state.feels)}°C` : "—"}
            </div>
          </div>
        </div>
      )}

      <div className="weatherFoot">Fonte: Open-Meteo</div>
    </div>
  );
}
