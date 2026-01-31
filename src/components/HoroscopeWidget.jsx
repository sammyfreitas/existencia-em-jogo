import { useMemo, useState } from "react";

const SIGNS = [
  { key: "aries", name: "Áries", icon: "♈" },
  { key: "taurus", name: "Touro", icon: "♉" },
  { key: "gemini", name: "Gêmeos", icon: "♊" },
  { key: "cancer", name: "Câncer", icon: "♋" },
  { key: "leo", name: "Leão", icon: "♌" },
  { key: "virgo", name: "Virgem", icon: "♍" },
  { key: "libra", name: "Libra", icon: "♎" },
  { key: "scorpio", name: "Escorpião", icon: "♏" },
  { key: "sagittarius", name: "Sagitário", icon: "♐" },
  { key: "capricorn", name: "Capricórnio", icon: "♑" },
  { key: "aquarius", name: "Aquário", icon: "♒" },
  { key: "pisces", name: "Peixes", icon: "♓" },
];

const PROXY_BASE = "https://ej-horoscopo-proxy.sammyfreitas.workers.dev/";

function vibePt(text) {
  const t = (text || "").toLowerCase();

  const tags = [];
  if (t.includes("creative") || t.includes("visions") || t.includes("dream")) tags.push("criatividade");
  if (t.includes("change") || t.includes("shift") || t.includes("brace")) tags.push("mudanças");
  if (t.includes("friends") || t.includes("company")) tags.push("amizades");
  if (t.includes("work") || t.includes("routines") || t.includes("strategize")) tags.push("rotina e foco");
  if (t.includes("money") || t.includes("financial")) tags.push("dinheiro");
  if (t.includes("love") || t.includes("romance")) tags.push("afetos");
  if (t.includes("conflict") || t.includes("drama") || t.includes("resent")) tags.push("atenção a atritos");
  if (t.includes("heal") || t.includes("healing") || t.includes("chiron")) tags.push("cura emocional");
  if (t.includes("devices") || t.includes("screen")) tags.push("detox digital");

  const unique = [...new Set(tags)].slice(0, 4);

  if (unique.length === 0) return "Vibe do dia: observe o ritmo e faça ajustes pequenos.";
  return `Vibe do dia: ${unique.join(" • ")}.`;
}


export default function HoroscopeWidget() {
  const [open, setOpen] = useState(null);
  const [cache, setCache] = useState({}); // { sign: {loading, err, text} }

  async function load(signKey) {
    setCache((c) => ({ ...c, [signKey]: { loading: true, err: null, text: null } }));

    try {

      const res = await fetch(`${PROXY_BASE}?sign=${encodeURIComponent(signKey)}&day=today`);
      const json = await res.json();

      if (!json.ok) {
        setCache((c) => ({ ...c, [signKey]: { loading: false, err: json.error || "Indisponível", text: null } }));
        return;
      }

      setCache((c) => ({
        ...c,
        [signKey]: { loading: false, err: null, text: json.horoscope || json.description || "Sem previsão." },
      }));
    } catch (e) {
      setCache((c) => ({ ...c, [signKey]: { loading: false, err: "Falha ao carregar", text: null } }));
    }
  }

  function toggle(signKey) {
    setOpen((prev) => (prev === signKey ? null : signKey));
    if (!cache[signKey]) load(signKey);
  }

  const opened = useMemo(() => cache[open], [cache, open]);

  return (
    <div className="widget">
      <div className="widgetTitle">Horóscopo do dia</div>

      <div className="signGrid">
        {SIGNS.map((s) => (
          <button key={s.key} className={`signBtn ${open === s.key ? "active" : ""}`} onClick={() => toggle(s.key)}>
            <span className="signIcon" aria-hidden="true">{s.icon}</span>
            <span className="signName">{s.name}</span>
          </button>
        ))}
      </div>

      {open && (
        <div className="signTooltip">
          <div className="signTooltipTitle">
            {SIGNS.find((x) => x.key === open)?.name}
            <button className="iconBtn" onClick={() => setOpen(null)} aria-label="Fechar">✕</button>
          </div>

        {!opened && <div className="muted">Carregando…</div>}
        {opened?.loading && <div className="muted">Carregando…</div>}
        {opened?.err && <div className="muted">{opened.err}</div>}
        {opened?.text && (  
        <>
            <div className="vibeLine">
                Resumo: hoje tende a ser um dia de ajustes e escolhas — cuide do seu ritmo e evite decisões no impulso.
            </div>

            <details style={{ marginTop: 10 }}>
                <summary className="muted" style={{ cursor: "pointer" }}>
                    Ver texto original (EN)
                    <div className="actionsRow">
                        <button
                            className="smallBtn"
                            onClick={() => navigator.clipboard.writeText(opened.text)}
                        >
                            Copiar
                        </button>

                        <a
                            className="smallBtn"
                            target="_blank"
                            rel="noreferrer"
                            href={`https://translate.google.com/?sl=en&tl=pt&text=${encodeURIComponent(opened.text)}&op=translate`}
                        >
                            Traduzir (Google)
                        </a>
                    </div>

                </summary>
                <div className="muted" style={{ marginTop: 8, lineHeight: 1.5 }}>
                    {opened.text}
                </div>

                <div className="translateHint">
                    Dica: para ler em português, selecione o texto e use <strong>botão direito → Traduzir</strong>
                    (ou a opção de tradução do seu navegador).
                </div>
            </details>
        </>
)}

        </div>
      )}
    </div>
  );
}
