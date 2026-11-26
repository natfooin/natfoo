import React, { useCallback, useMemo, useState } from "react";
import "../FunTime.css";
import {
  ageArt,
  ageCategories,
  gameArt,
  gameFacts,
  gameInfo,
  gameRules,
  subCategories,
} from "../funTimeData";
import { Stars } from "./gameShared";
import { AgeCover, ArenaCard, Cover, GameArt, Hero, Icon, SectionHead, StarFoot } from "./ui";

const gameMeta = (sub, ageId) => (sub === "puzzle" ? gameInfo.puzzle[ageId] : gameInfo[sub]);
const rulesFor = (sub, ageId) => (sub === "puzzle" ? gameRules.puzzle[ageId] : gameRules[sub]);

/* =====================================================================
   Games page (list of games for one age group)
   ===================================================================== */
function GamesPage({ ageId, progress, onSelectSub, onSwitchAge }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");
  const [shakeId, setShakeId] = useState(null);

  const age = ageCategories.find((a) => a.id === ageId);
  const art = ageArt[ageId];
  const entry = useCallback((sub, id = ageId) => progress[`${id}:${sub}`] || { stars: 0, best: 0 }, [progress, ageId]);

  const live = subCategories.filter((s) => s.ready);
  const stars = live.reduce((n, s) => n + entry(s.id).stars, 0);
  const bestTotal = live.reduce((n, s) => n + entry(s.id).best, 0);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const items = subCategories.filter((s) => {
      if (!q) return true;
      const meta = s.ready ? gameMeta(s.id, ageId) : { title: s.label };
      return `${s.label} ${meta.title} ${s.description}`.toLowerCase().includes(q);
    });
    const rank = (s) => (s.ready ? 0 : 1); // "coming soon" always stays last
    const cmp = {
      default: () => 0,
      name: (a, b) => a.label.localeCompare(b.label),
      stars: (a, b) => entry(b.id).stars - entry(a.id).stars,
      best: (a, b) => entry(b.id).best - entry(a.id).best,
    }[sort];
    return [...items].sort((a, b) => rank(a) - rank(b) || cmp(a, b));
  }, [query, sort, ageId, entry]);

  const lockedClick = (id) => {
    setShakeId(id);
    setTimeout(() => setShakeId(null), 550);
  };

  return (
    <>
      <Hero
        a={art.a}
        b={art.b}
        cover={<AgeCover age={age} />}
        badge={`${live.length} games live`}
        extraBadges={<span className="badge ghost">{age.range}</span>}
        titleTop="Play the"
        title={`${age.label} Arena`}
        text={`${age.tagline}. Pick a game, beat your best score and collect stars.`}
        stats={[
          [`${stars}/${live.length * 3}`, "Stars earned"],
          [bestTotal, "Total best score"],
        ]}
        scene={art.hero.map((e, i) => (
          <span key={i} className={`scene-emoji e${i}`}>{e}</span>
        ))}
      />

      <div className="filters">
        <label className="select">
          <span>Order by:</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Default</option>
            <option value="name">Name</option>
            <option value="stars">Most stars</option>
            <option value="best">Best score</option>
          </select>
        </label>
        <label className="select">
          <span>Age:</span>
          <select value={ageId} onChange={(e) => onSwitchAge(e.target.value)}>
            {ageCategories.map((a) => (
              <option key={a.id} value={a.id}>{a.label} · {a.range}</option>
            ))}
          </select>
        </label>
        <label className="search">
          <Icon name="search" size={14} />
          <input
            type="search"
            placeholder={`Search in ${age.label}…`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      <SectionHead title="Featured games" sub="Play, score and win stars" />
      {list.length === 0 ? (
        <p className="empty">No games match “{query}”.</p>
      ) : (
        <div className="grid">
          {list.map((s) => {
            if (!s.ready) {
              return (
                <ArenaCard
                  key={s.id}
                  locked
                  shake={shakeId === s.id}
                  art={<GameArt sub={s.id} locked />}
                  pill="Coming soon"
                  chip={age.label}
                  overline={`${age.label} · ${age.range}`}
                  title={s.label}
                  text={s.description}
                  points="Listing soon"
                  cta="Locked"
                  onClick={() => lockedClick(s.id)}
                  footLeft={<span className="foot-note">Stories & questions</span>}
                  footRight="Soon"
                />
              );
            }
            const meta = gameMeta(s.id, ageId);
            const facts = gameFacts(s.id, ageId);
            const e = entry(s.id);
            return (
              <ArenaCard
                key={s.id}
                art={<GameArt sub={s.id} />}
                pill={facts.pill}
                chip={age.label}
                overline={`${s.label} · ${facts.mode}`}
                title={meta.title}
                text={s.description}
                points={e.best ? `${e.best} pts` : "0 pts"}
                cta="Play Game"
                onClick={() => onSelectSub(s.id)}
                footLeft={<StarFoot value={e.stars} />}
                footRight={`${e.stars}/3 stars`}
              />
            );
          })}
        </div>
      )}

      <SectionHead title="Other arenas" sub="Switch to another age group" />
      <div className="arena-list">
        {ageCategories
          .filter((a) => a.id !== ageId)
          .map((a) => {
            const st = live.reduce((n, s) => n + entry(s.id, a.id).stars, 0);
            return (
              <button key={a.id} className="arena-row" onClick={() => onSwitchAge(a.id)} style={{ "--a": ageArt[a.id].a, "--b": ageArt[a.id].b }}>
                <span className="arena-emoji">{a.icon}</span>
                <span className="arena-copy">
                  <b>{a.label}</b>
                  <i>{a.range}</i>
                </span>
                <span className="arena-stars">★ {st}/{live.length * 3}</span>
                <Icon name="right" size={16} />
              </button>
            );
          })}
      </div>
    </>
  );
}

/* =====================================================================
   Game frame: one layout for every game
   ===================================================================== */
function GameFrame({ ageId, sub, progress, Game, onComplete, onExitGame, onSelectSub }) {
  const [started, setStarted] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const age = ageCategories.find((a) => a.id === ageId);
  const subInfo = subCategories.find((s) => s.id === sub);
  const meta = gameMeta(sub, ageId);
  const facts = gameFacts(sub, ageId);
  const art = gameArt[sub];
  const e = progress[`${ageId}:${sub}`] || { stars: 0, best: 0 };
  const rules = rulesFor(sub, ageId);

  const handleComplete = useCallback((result) => onComplete(ageId, sub, result), [ageId, sub, onComplete]);
  const restart = () => {
    setRunKey((k) => k + 1);
    setStarted(true);
  };

  return (
    <>
      <Hero
        a={art.a}
        b={art.b}
        cover={<Cover emoji={art.emojis[0]} line1="FUN TIME" line2={art.cover} a={art.a} b={art.b} />}
        badge={`${age.label} · ${age.range}`}
        extraBadges={<span className="badge ghost">{facts.mode}</span>}
        titleTop="Play"
        title={meta.title}
        text={meta.how}
        stats={[
          [e.best || 0, "Best score"],
          [`${e.stars}/3`, "Stars"],
          [facts.level, "Challenge"],
        ]}
        scene={art.emojis.map((em, i) => (
          <span key={i} className={`scene-emoji e${i}`}>{em}</span>
        ))}
      />

      <div className="game-layout">
        <section className="play-panel" aria-label={meta.title}>
          <div className="play-head">
            <span className="play-title">
              <Icon name="gamepad" size={14} /> {meta.title}
            </span>
            <span className="play-actions">
              <button className="mini-btn" onClick={restart}>
                <Icon name="reset" size={13} /> {started ? "Restart" : "Reset"}
              </button>
              <button className="mini-btn" onClick={onExitGame}>
                <Icon name="left" size={13} /> All games
              </button>
            </span>
          </div>

          <div className="play-body">
            {!started ? (
              <div className="ready">
                <div className="ready-art">
                  {art.emojis.map((em, i) => (
                    <span key={i} style={{ animationDelay: `${-i * 0.7}s` }}>{em}</span>
                  ))}
                </div>
                <h3>Ready to play?</h3>
                <p>{meta.how}</p>
                <div className="ready-facts">
                  <span>{facts.pill}</span>
                  <span>{facts.level}</span>
                  <span>3 stars to win</span>
                </div>
                <button className="cta" onClick={() => setStarted(true)}>
                  <Icon name="play" size={14} fill="currentColor" stroke={0} /> Start Game
                </button>
              </div>
            ) : (
              <Game key={runKey} best={e.best} onComplete={handleComplete} onExit={onExitGame} />
            )}
          </div>
        </section>

        <aside className="game-side">
          <div className="panel">
            <h4>How to play</h4>
            <ol className="rules">
              {rules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ol>
          </div>

          <div className="panel">
            <h4>Your record</h4>
            <div className="record">
              <div>
                <span>Best score</span>
                <strong>{e.best || "—"}</strong>
              </div>
              <div>
                <span>Stars</span>
                <Stars value={e.stars} />
              </div>
            </div>
          </div>

          <div className="panel">
            <h4>More in {age.label}</h4>
            <ul className="more">
              {subCategories.map((s) => {
                const m = s.ready ? gameMeta(s.id, ageId) : { title: s.label };
                const sc = progress[`${ageId}:${s.id}`] || { stars: 0 };
                return (
                  <li key={s.id}>
                    <button
                      disabled={!s.ready}
                      className={s.id === sub ? "current" : ""}
                      onClick={() => s.ready && s.id !== sub && onSelectSub(s.id)}
                    >
                      <span className="more-ico">{s.icon}</span>
                      <span className="more-name">{m.title}</span>
                      {s.ready ? <Stars value={sc.stars} className="mini" /> : <em className="soon-tag">Soon</em>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

/* =====================================================================
   Public component (one per age group wraps this)
   ===================================================================== */
export default function CategoryShell({ ageId, games, progress, onComplete, sub, onSelectSub, onExitGame, onSwitchAge }) {
  if (!sub) {
    return <GamesPage ageId={ageId} progress={progress} onSelectSub={onSelectSub} onSwitchAge={onSwitchAge} />;
  }
  return (
    <GameFrame
      key={`${ageId}-${sub}`}
      ageId={ageId}
      sub={sub}
      progress={progress}
      Game={games[sub]}
      onComplete={onComplete}
      onExitGame={onExitGame}
      onSelectSub={onSelectSub}
    />
  );
}
