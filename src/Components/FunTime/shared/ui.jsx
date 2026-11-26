import React from "react";
import "../FunTime.css";
import { ageArt, gameArt } from "../funTimeData";
import { Stars } from "./gameShared";

/* ---------- tiny inline icon set (no icon library needed) ---------- */
const PATHS = {
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  gamepad: "M6 11h4M8 9v4M15 12h.01M18 10h.01M17.3 5H6.7a4 4 0 0 0-3.9 3.1L1.5 15a3 3 0 0 0 5.2 2.2L8 16h8l1.3 1.2A3 3 0 0 0 22.5 15l-1.3-6.9A4 4 0 0 0 17.3 5z",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  trophy: "M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3",
  reset: "M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5",
  search: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM21 21l-4.3-4.3",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  lock: "M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4",
  left: "M15 18l-6-6 6-6",
  right: "M9 18l6-6-6-6",
  play: "M6 4l14 8-14 8z",
  star: "M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16v-4M12 8h.01",
  menu: "M4 6h16M4 12h16M4 18h16",
};

export function Icon({ name, size = 16, stroke = 2, fill = "none", className = "" }) {
  return (
    <svg
      className={`ico ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

/* ---------- key art ---------- */
const POS = [
  { left: "50%", top: "46%", size: 1, rot: -4 },
  { left: "20%", top: "64%", size: 0.55, rot: -14 },
  { left: "80%", top: "36%", size: 0.5, rot: 12 },
];

/** Painted-with-CSS "key art" used on game cards. */
export function GameArt({ sub, locked = false, children }) {
  const art = gameArt[sub];
  return (
    <div
      className={`art ${locked ? "is-locked" : ""}`}
      style={{ "--a": art.a, "--b": art.b }}
      data-sub={sub}
    >
      <span className="art-glow" />
      <span className="art-grid" />
      {art.emojis.map((e, i) => (
        <span
          key={i}
          className="art-emoji"
          style={{
            left: POS[i].left,
            top: POS[i].top,
            "--s": POS[i].size,
            "--rot": `${POS[i].rot}deg`,
            animationDelay: `${-i * 1.3}s`,
          }}
        >
          {e}
        </span>
      ))}
      {children}
    </div>
  );
}

/** Portrait "box cover" (like the game cover in the reference). */
export function Cover({ emoji, line1, line2, a, b, size = "md" }) {
  return (
    <div className={`cover cover-${size}`} style={{ "--a": a, "--b": b }}>
      <span className="cover-emoji">{emoji}</span>
      <span className="cover-title">
        <b>{line1}</b>
        <i>{line2}</i>
      </span>
    </div>
  );
}

export function AgeCover({ age, size }) {
  const art = ageArt[age.id];
  return <Cover emoji={age.icon} line1="FUN TIME" line2={age.label.toUpperCase()} a={art.a} b={art.b} size={size} />;
}

/* ---------- hero banner ---------- */
export function Hero({ cover, badge, extraBadges, titleTop, title, text, stats, scene, a = "#7a2bd6", b = "#c026d3" }) {
  return (
    <section className="hero" style={{ "--a": a, "--b": b }}>
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-stripe s1" />
        <span className="hero-stripe s2" />
        <span className="hero-stripe s3" />
        <div className="hero-scene">{scene}</div>
      </div>
      <div className="hero-inner">
        <div className="hero-cover">{cover}</div>
        <div className="hero-copy">
          <div className="hero-badges">
            {badge && <span className="badge">{badge}</span>}
            {extraBadges}
          </div>
          <h1 className="hero-title">
            {titleTop && <span>{titleTop}</span>}
            {title}
          </h1>
          <p className="hero-text">{text}</p>
        </div>
        <div className="hero-stats">
          {stats.map(([value, label]) => (
            <div className="hero-stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHead({ title, sub, right }) {
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {right}
    </div>
  );
}

/* ---------- standard card: used for every game and every arena ---------- */
export function ArenaCard({
  art,
  pill,
  chip,
  overline,
  title,
  text,
  points,
  cta,
  onClick,
  footLeft,
  footRight,
  locked = false,
  shake = false,
}) {
  return (
    <article className={`card ${locked ? "card-locked" : ""} ${shake ? "shake" : ""}`}>
      <div className="card-art">
        {art}
        {pill && (
          <span className="time-pill">
            <Icon name={locked ? "lock" : "clock"} size={11} /> {pill}
          </span>
        )}
        {chip && <span className="card-chip">{chip}</span>}
        {locked && <span className="soon-ribbon">Coming Soon</span>}
      </div>
      <div className="card-body">
        <p className="overline">{overline}</p>
        <h3>{title}</h3>
        <p className="card-text">{text}</p>
        <div className="card-actions">
          <span className="pts-pill">{points}</span>
          <button
            type="button"
            className="join-btn"
            onClick={onClick}
            aria-disabled={locked}
            disabled={false}
          >
            {locked && <Icon name="lock" size={12} />} {cta}
          </button>
        </div>
      </div>
      <div className="card-foot">
        {footLeft}
        <span className="foot-right">{footRight}</span>
      </div>
    </article>
  );
}

export function StarFoot({ value }) {
  return <Stars value={value} className="mini" />;
}
