import { useEffect, useRef } from "react";

export default function BrasileiraoTabelaWidget() {
  const ref = useRef(null);

  useEffect(() => {
    // 1) cria a div do widget
    if (!ref.current) return;
    ref.current.innerHTML = `<div class="apifutebol-tabela" data-client-id="3CUJSJFPERJ2"></div>`;

    // 2) injeta o script do provedor (troque a URL quando você me mandar)
    const s = document.createElement("script");
    s.src = "https://widget.api-futebol.com.br/render/widget_99eeafcd28a0f55c";
    s.async = true;
    document.body.appendChild(s);

    return () => {
      document.body.removeChild(s);
    };
  }, []);

  return (
    <div className="widget">
      <div className="widgetTitle">Tabela</div>
      <div ref={ref} />
      <div className="muted" style={{ marginTop: 10 }}>
        ⚽ Dados fornecidos pela API Futebol | Projeto: <strong>Anthony Freitas</strong> | 2026
      </div>
    </div>
  );
}
