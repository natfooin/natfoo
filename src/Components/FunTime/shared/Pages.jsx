import React from "react";
import "../FunTime.css";
import { ageArt, ageCategories, gameArt, gameFacts, gameInfo, subCategories } from "../funTimeData";
import { Stars } from "./gameShared";
import { ArenaCard, Cover, Hero, Icon, SectionHead } from "./ui";

const metaFor = (sub, ageId) => (sub === "puzzle" ? gameInfo.puzzle[ageId] : gameInfo[sub]);

/* ---------------- Dashboard ---------------- */
export function Dashboard({ progress, totals, onOpenAge }) {
  const live = subCategories.filter((s) => s.ready);
  const reading = subCategories.find((s) => !s.ready);
  const entry = (age, sub) => progress[`${age}:${sub}`] || { stars: 0, best: 0 };

  return (
    <>
      <Hero
        a="#7a2bd6"
        b="#c026d3"
        cover={<Cover emoji="🎮" line1="NATFOO" line2="FUN TIME" a="#ffb020" b="#ff3d81" />}
        badge="4 arenas"
        extraBadges={<span className="badge ghost">{live.length} games each</span>}
        titleTop="Welcome to"
        title="Fun Time"
        text="Riddles, meme rushes and puzzles for every age. Pick an arena, beat your best score and collect stars."
        stats={[
          [`${totals.stars}/${totals.max}`, "Stars collected"],
          [totals.best, "Total best score"],
        ]}
        scene={["🧒", "🧑‍🎓", "👨‍💼", "🧓"].map((e, i) => (
          <span key={i} className={`scene-emoji e${i}`}>{e}</span>
        ))}
      />

      <SectionHead title="Featured arenas" sub="Choose your age group to start playing" />
      <div className="grid">
        {ageCategories.map((a) => {
          const art = ageArt[a.id];
          const stars = live.reduce((n, s) => n + entry(a.id, s.id).stars, 0);
          const best = live.reduce((n, s) => n + entry(a.id, s.id).best, 0);
          return (
            <ArenaCard
              key={a.id}
              art={
                <div className="art" style={{ "--a": art.a, "--b": art.b }}>
                  <span className="art-glow" />
                  <span className="art-grid" />
                  {art.hero.slice(0, 3).map((e, i) => (
                    <span
                      key={i}
                      className="art-emoji"
                      style={{
                        left: ["50%", "20%", "80%"][i],
                        top: ["46%", "64%", "36%"][i],
                        "--s": [1, 0.55, 0.5][i],
                        "--rot": ["-4deg", "-14deg", "12deg"][i],
                        animationDelay: `${-i * 1.3}s`,
                      }}
                    >
                      {e}
                    </span>
                  ))}
                </div>
              }
              pill={`${live.length} games`}
              chip={a.range}
              overline={`Ages ${a.range.replace("Ages ", "")}`}
              title={`${a.label} Arena`}
              text={a.tagline}
              points={`${best} pts`}
              cta="Enter Arena"
              onClick={() => onOpenAge(a.id)}
              footLeft={<Stars value={Math.min(3, Math.ceil((stars / (live.length * 3)) * 3))} className="mini" />}
              footRight={`${stars}/${live.length * 3} stars`}
            />
          );
        })}
      </div>

      <SectionHead title="Upcoming" sub="Discover what is arriving next" />
      <div className="upcoming">
        <div className="up-card">
          <div className="up-art" style={{ "--a": gameArt.reading.a, "--b": gameArt.reading.b }}>
            <span>📖</span>
            <span>✏️</span>
          </div>
          <div className="up-copy">
            <span className="soon-tag">Coming Soon</span>
            <h3>{reading.label}</h3>
            <p>{reading.description}. Reading Comprehension will be listed for every age group soon.</p>
          </div>
          <Icon name="lock" size={18} className="up-lock" />
        </div>
      </div>
    </>
  );
}

/* ---------------- Progress ---------------- */
export function ProgressPage({ progress, totals, onOpenGame }) {
  const live = subCategories.filter((s) => s.ready);
  const entry = (age, sub) => progress[`${age}:${sub}`] || { stars: 0, best: 0 };

  return (
    <>
      <Hero
        a="#2f6bff"
        b="#19c2f0"
        cover={<Cover emoji="🏆" line1="FUN TIME" line2="PROGRESS" a="#2f6bff" b="#19c2f0" />}
        badge="Your stats"
        titleTop="Your"
        title="Progress"
        text="Every star you earn and your best score in each game, across all age groups."
        stats={[
          [`${totals.stars}/${totals.max}`, "Stars collected"],
          [totals.best, "Total best score"],
        ]}
        scene={["🏆", "⭐", "🎯"].map((e, i) => (
          <span key={i} className={`scene-emoji e${i}`}>{e}</span>
        ))}
      />

      <SectionHead title="All games" sub="Tap a row to play it" />
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Arena</th>
              {live.map((s) => (
                <th key={s.id}>{s.label}</th>
              ))}
              <th className="reading-col">Reading</th>
            </tr>
          </thead>
          <tbody>
            {ageCategories.map((a) => (
              <tr key={a.id}>
                <td>
                  <span className="t-age">
                    <span>{a.icon}</span>
                    <b>{a.label}</b>
                    <i>{a.range}</i>
                  </span>
                </td>
                {live.map((s) => {
                  const e = entry(a.id, s.id);
                  return (
                    <td key={s.id}>
                      <button className="t-cell" onClick={() => onOpenGame(a.id, s.id)}>
                        <span className="t-title">{metaFor(s.id, a.id).title}</span>
                        <Stars value={e.stars} className="mini" />
                        <span className="t-best">{e.best ? `${e.best} pts` : "Not played"}</span>
                      </button>
                    </td>
                  );
                })}
                <td className="reading-col">
                  <span className="soon-tag">Coming Soon</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="table-note">
        Pills like “{gameFacts("brainrot", "kids").pill}” show each game's format. Reading Comprehension will be added soon.
      </p>
    </>
  );
}
