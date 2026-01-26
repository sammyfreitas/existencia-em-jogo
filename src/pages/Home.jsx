import CardGrid from "../components/CardGrid.jsx";
import PostCard from "../components/PostCard.jsx";
import WeatherWidget from "../components/WeatherWidget.jsx";
import HoroscopeWidget from "../components/HoroscopeWidget.jsx";
import AgendaWidget from "../components/AgendaWidget.jsx";
import { Link } from "react-router-dom";

export default function Home({ posts }) {
  const featured = posts[0];
  const secondary = posts.slice(1, 4);
  const latest = posts.slice(4, 10);

  return (
    <div className="page">
      <section className="hero">
        <div className="heroEyebrow">Projeto</div>
        <h2>Existência em Jogo</h2>
        <p>
          Crônicas sobre o que me move: do Maracanã à sala de aula, do código à arquibancada, do noticiário ao gato em cima do teclado.
        </p>
      </section>

      <section className="portalTop">
        <div className="portalLeft">
          {featured && <PostCard post={featured} variant="featured" />}
          <div className="secondaryRow">
            {secondary.map((p) => <PostCard key={p.id} post={p} variant="compact" />)}
          </div>
        </div>

        <aside className="portalRight">
          <WeatherWidget />
          <HoroscopeWidget />
          <AgendaWidget />
        </aside>
      </section>

      <section className="themes">
        <div className="sectionTitleRow">
          <h2>Explorar por temas</h2>
        </div>

        <div className="topicsGrid">
          <div className="topicCard topicFutebol">
            <div className="topicTitle">Futebol</div>
            <div className="topicSub">O futebol que me move.</div>
            <div className="chipRow">
              <Link className="chip" to="/tema/flamengo">Flamengo</Link>
              <Link className="chip" to="/tema/cariocas">Times cariocas</Link>
              <Link className="chip" to="/tema/jogo">Crônicas de jogo</Link>
            </div>
          </div>

          <div className="topicCard topicEsportes">
            <div className="topicTitle">Esportes</div>
            <div className="topicSub">Existência em jogo além das quatro linhas.</div>
            <div className="chipRow">
              <Link className="chip" to="/tema/f1">F1</Link>
              <Link className="chip" to="/tema/skate">Skate</Link>
              <Link className="chip" to="/tema/lutas">Lutas</Link>
            </div>
          </div>

          <div className="topicCard topicCotidiano">
            <div className="topicTitle">Cotidiano</div>
            <div className="topicSub">O dia a dia que insiste em virar crônica.</div>
            <div className="chipRow">
              <Link className="chip" to="/tema/professor">Professor</Link>
              <Link className="chip" to="/tema/engenheiro">Engenheiro</Link>
              <Link className="chip" to="/tema/programador">Programador</Link>
              <Link className="chip" to="/tema/autista">Autista</Link>
              <Link className="chip" to="/tema/homem-trans">Homem trans</Link>
            </div>
          </div>

          <div className="topicCard topicCultura">
            <div className="topicTitle">Cultura</div>
            <div className="topicSub">Shows, teatro e filmes — o palco que me atravessa.</div>
            <div className="chipRow">
              <Link className="chip" to="/tema/shows">Shows</Link>
              <Link className="chip" to="/tema/teatro">Teatro</Link>
              <Link className="chip" to="/tema/filmes">Filmes</Link>
            </div>
          </div>

          <div className="topicCard topicPolitica">
            <div className="topicTitle">Política & Atualidades</div>
            <div className="topicSub">Existência em debate.</div>
            <div className="chipRow">
              <Link className="chip" to="/tema/leis">Leis</Link>
              <Link className="chip" to="/tema/noticiario">Noticiário</Link>
              <Link className="chip" to="/tema/situacoes">Situações</Link>
            </div>
          </div>

          <div className="topicCard topicGestao">
            <div className="topicTitle">Gestão & Liderança</div>
            <div className="topicSub">Crônicas adaptadas pro LinkedIn.</div>
            <div className="chipRow">
              <Link className="chip" to="/tema/trabalho">Trabalho</Link>
              <Link className="chip" to="/tema/lideranca">Liderança</Link>
              <Link className="chip" to="/tema/rotina">Rotina</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="latest">
        <h2>Últimas crônicas</h2>
        <CardGrid posts={latest} />
      </section>
    </div>
  );
}
