import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import "./FunTime.css";
import { ageCategories, subCategories } from "./funTimeData";
import { Stars } from "./shared/gameShared";

const KidsCategory = lazy(() => import("./kids/KidsCategory"));
const TeensCategory = lazy(() => import("./teens/TeensCategory"));
const AdultsCategory = lazy(() => import("./adults/AdultsCategory"));
const EldersCategory = lazy(() => import("./elders/EldersCategory"));

const AGE_COMPONENTS = {
  kids: KidsCategory,
  teens: TeensCategory,
  adults: AdultsCategory,
  elders: EldersCategory,
};

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

function FunTime() {
  const [selectedAge, setSelectedAge] = useState(null);
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => {
    document.title = "Natfoo | Fun Time";
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      /* storage unavailable */
    }
  }, [progress]);

  const playable = useMemo(() => subCategories.filter((s) => s.ready), []);
  const entry = useCallback((age, sub) => progress[`${age}:${sub}`] || { stars: 0, best: 0 }, [progress]);

  const starsForAge = (age) => playable.reduce((sum, s) => sum + entry(age, s.id).stars, 0);
  const maxPerAge = playable.length * 3;
  const totalStars = ageCategories.reduce((sum, a) => sum + starsForAge(a.id), 0);
  const maxStars = maxPerAge * ageCategories.length;

  const handleComplete = useCallback((ageId, subId, { stars, score }) => {
    const key = `${ageId}:${subId}`;
    setProgress((prev) => {
      const old = prev[key] || { stars: 0, best: 0 };
      return {
        ...prev,
        [key]: { stars: Math.max(old.stars, stars), best: Math.max(old.best, score) },
      };
    });
  }, []);

  const handleExitAge = useCallback(() => setSelectedAge(null), []);

  const ActiveAgeComponent = selectedAge ? AGE_COMPONENTS[selectedAge] : null;

  return (
    <div className="funtime-container">
      <BackgroundFX />
      {!ActiveAgeComponent ? (
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
      ) : (
        <Suspense fallback={<div className="funtime-shell"><p className="muted">Loading...</p></div>}>
          <ActiveAgeComponent
            progress={progress}
            onComplete={handleComplete}
            onBack={handleExitAge}
          />
        </Suspense>
      )}
    </div>
  );
}

export default FunTime;