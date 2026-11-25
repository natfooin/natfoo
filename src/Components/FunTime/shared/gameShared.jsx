import React, { useEffect, useMemo, useState } from "react";
import "../FunTime.css";

export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function useStopwatch(running) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    if (!running) return undefined;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);
  return [secs, setSecs];
}

export function Stars({ value, className = "" }) {
  return (
    <span className={`stars ${className}`} aria-label={`${value} of 3 stars`}>
      {[1, 2, 3].map((n) => (
        <span key={n} className={n <= value ? "on" : ""}>★</span>
      ))}
    </span>
  );
}

const CONFETTI_COLORS = ["#ffd24a", "#ff5f6d", "#43e97b", "#4facfe", "#c471ed", "#ff9a3d"];

export function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.9,
        dur: 2 + Math.random() * 1.8,
        size: 7 + Math.random() * 7,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      })),
    []
  );
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <i
          key={i}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.6,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Hud({ items }) {
  return (
    <div className="hud">
      {items.map(([label, value]) => (
        <div className="hud-chip" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

export function ResultCard({ stars, score, stats = [], best, onReplay, onExit }) {
  const headline = stars === 3 ? "Legendary! 🏆" : stars === 2 ? "Great job! 🎉" : "Nice try! 💪";
  const isNewBest = score > (best || 0);
  return (
    <div className="result">
      {stars >= 2 && <Confetti />}
      <div className="result-stars">
        <Stars value={stars} />
      </div>
      <h3>{headline}</h3>
      <p className="result-score">
        <strong>{score}</strong> points
      </p>
      {isNewBest && <span className="new-best">🔥 New personal best!</span>}
      <div className="result-stats">
        {stats.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="result-actions">
        <button className="btn btn-primary" onClick={onReplay}>↻ Play Again</button>
        <button className="btn btn-ghost" onClick={onExit}>More Games</button>
      </div>
    </div>
  );
}

export function Topbar({ onBack, title, subtitle, right }) {
  return (
    <div className="topbar">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="topbar-title">
        <h1 className="funtime-title">{title}</h1>
        <p className="funtime-subtitle">{subtitle}</p>
      </div>
      <div className="topbar-right">{right}</div>
    </div>
  );
}