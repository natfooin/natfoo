import React, { useState, useEffect, useMemo } from "react";
import "./FunTime.css";
import { ageCategories, subCategories, gameInfo } from "./funTimeData";
import { GameRouter, Stars } from "./FunTimeGames";

const STORAGE_KEY = "funtime-progress-v1";

const loadProgress = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const FLOATERS = ["⭐", "🎈", "🧩", "💡", "🎯", "✨", "🎲", "🚀", "🧠", "🎉"];

function BackgroundFX() {
  return (
    <div className="bg-fx" aria-hidden="true">
      <span className="orb orb-1" />
      <span className="orb orb-2" />
      <span className="orb orb-3" />
      {FLOATERS.map((f, i) => (
        <span
          key={i}
          className="floater"
          style={{
            left: `${(i * 37 + 8) % 96}%`,
            animationDelay: `${-i * 2.3}s`,
            animationDuration: `${16 + (i % 5) * 3}s`,
            fontSize: `${1.2 + (i % 4) * 0.5}rem`,
          }}
        >
          {f}
        </span>
      ))}
    </div>
  );
}

function Topbar({ onBack, title, subtitle, right }) {
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

function FunTime() {
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [progress, setProgress] = useState(loadProgress);
  const [shakeId, setShakeId] = useState(null);

  useEffect(() => {
    document.title = "Natfoo | Fun Time";
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      /* storage unavailable – progress just won't persist */
    }
  }, [progress]);

  const playable = useMemo(() => subCategories.filter((s) => s.ready), []);
  const getAge = (id) => ageCategories.find((a) => a.id === id);
  const getSub = (id) => subCategories.find((s) => s.id === id);
  const entry = (age, sub) => progress[`${age}:${sub}`] || { stars: 0, best: 0 };

  const starsForAge = (age) => playable.reduce((sum, s) => sum + entry(age, s.id).stars, 0);
  const maxPerAge = playable.length * 3;
  const totalStars = ageCategories.reduce((sum, a) => sum + starsForAge(a.id), 0);
  const maxStars = maxPerAge * ageCategories.length;

  const handleComplete = ({ stars, score }) => {
    const key = `${selectedAge}:${selectedSub}`;
    setProgress((prev) => {
      const old = prev[key] || { stars: 0, best: 0 };
      return { ...prev, [key]: { stars: Math.max(old.stars, stars), best: Math.max(old.best, score) } };
    });
  };

  const gameMeta = (age, sub) => (sub === "puzzle" ? gameInfo.puzzle[age] : gameInfo[sub]);

  const lockedClick = (id) => {
    setShakeId(id);
    setTimeout(() => setShakeId(null), 550);
  };

  /* ---------- HOME: pick age ---------- */
  if (!selectedAge) {
    return (
      <div className="funtime-container">
        <BackgroundFX />
        <div className="funtime-shell" key="home">
          <header className="hero">
            <span className="hero-badge">🎮 Play · Learn · Repeat</span>
            <h1 className="funtime-title hero-title">Fun Time</h1>
            <p className="funtime-subtitle">Pick your age group and start playing</p>
            <div className="hero-stats">
              <Stars value={totalStars === 0 ? 0 : Math.min(3, Math.ceil((totalStars / maxStars) * 3))} />
              <span>{totalStars} / {maxStars} stars collected</span>
            </div>
          </header>
          <div className="card-grid">
            {ageCategories.map((a) => (
              <button key={a.id} className="pick-card" data-age={a.id} onClick={() => setSelectedAge(a.id)}>
                <span className="pick-icon">{a.icon}</span>
                <h3 className="pick-label">{a.label}</h3>
                <span className="pick-range">{a.range}</span>
                <p className="pick-desc">{a.tagline}</p>
                <span className="pick-foot">
                  <span>⭐ {starsForAge(a.id)}/{maxPerAge}</span>
                  <span className="dot-sep" />
                  <span>Play →</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const age = getAge(selectedAge);

  /* ---------- PICK GAME ---------- */
  if (!selectedSub) {
    return (
      <div className="funtime-container">
        <BackgroundFX />
        <div className="funtime-shell" key={`age-${selectedAge}`}>
          <Topbar
            onBack={() => setSelectedAge(null)}
            title={age.label}
            subtitle={`${age.range} · choose a game`}
            right={<span className="chip">⭐ {starsForAge(selectedAge)}/{maxPerAge}</span>}
          />
          <div className="card-grid">
            {subCategories.map((s) => {
              const e = entry(selectedAge, s.id);
              if (!s.ready) {
                return (
                  <button
                    key={s.id}
                    className={`pick-card is-locked ${shakeId === s.id ? "shake" : ""}`}
                    data-sub={s.id}
                    aria-disabled="true"
                    onClick={() => lockedClick(s.id)}
                  >
                    <span className="pick-icon">{s.icon}</span>
                    <h3 className="pick-label">{s.label}</h3>
                    <p className="pick-desc">{s.description}</p>
                    <span className="pick-foot soon">🔒 Coming Soon</span>
                  </button>
                );
              }
              const meta = gameMeta(selectedAge, s.id);
              return (
                <button key={s.id} className="pick-card" data-sub={s.id} onClick={() => setSelectedSub(s.id)}>
                  <span className="pick-icon">{s.icon}</span>
                  <h3 className="pick-label">{s.label}</h3>
                  <span className="pick-range">{meta.title}</span>
                  <p className="pick-desc">{s.description}</p>
                  <span className="pick-foot">
                    <Stars value={e.stars} />
                    <span className="dot-sep" />
                    <span>{e.best ? `Best ${e.best}` : "Play →"}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ---------- GAME ---------- */
  const sub = getSub(selectedSub);
  const meta = gameMeta(selectedAge, selectedSub);
  const e = entry(selectedAge, selectedSub);

  return (
    <div className="funtime-container">
      <BackgroundFX />
      <div className="funtime-shell" key={`game-${selectedAge}-${selectedSub}`}>
        <Topbar
          onBack={() => setSelectedSub(null)}
          title={meta.title}
          subtitle={`${age.label} · ${sub.label}`}
          right={<Stars value={e.stars} className="chip-stars" />}
        />
        <div className="game-card">
          <p className="how-to">{sub.icon} {meta.how}</p>
          <GameRouter
            age={selectedAge}
            sub={selectedSub}
            best={e.best}
            onComplete={handleComplete}
            onExit={() => setSelectedSub(null)}
          />
        </div>
      </div>
    </div>
  );
}

export default FunTime;
