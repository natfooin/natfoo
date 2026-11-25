import React, { useState, useCallback } from "react";
import "../FunTime.css";
import { ageCategories, subCategories, gameInfo } from "../funTimeData";
import { Stars, Topbar } from "./gameShared";

export default function CategoryShell({ ageId, games, progress, onComplete, onBack }) {
  const [selectedSub, setSelectedSub] = useState(null);
  const [shakeId, setShakeId] = useState(null);

  const age = ageCategories.find((a) => a.id === ageId);
  const entry = (sub) => progress[`${ageId}:${sub}`] || { stars: 0, best: 0 };
  const gameMeta = (sub) => (sub === "puzzle" ? gameInfo.puzzle[ageId] : gameInfo[sub]);

  const playable = subCategories.filter((s) => s.ready);
  const totalAgeStars = playable.reduce((sum, s) => sum + entry(s.id).stars, 0);
  const maxAgeStars = playable.length * 3;

  const lockedClick = (id) => {
    setShakeId(id);
    setTimeout(() => setShakeId(null), 550);
  };

  const handleGameComplete = useCallback(
    (result) => {
      onComplete(ageId, selectedSub, result);
    },
    [ageId, selectedSub, onComplete]
  );

  const handleExitGame = useCallback(() => setSelectedSub(null), []);

  if (!selectedSub) {
    return (
      <div className="funtime-shell" key={`age-${ageId}`}>
        <Topbar
          onBack={onBack}
          title={age.label}
          subtitle={`${age.range} · choose a game`}
          right={<span className="chip">⭐ {totalAgeStars}/{maxAgeStars}</span>}
        />
        <div className="card-grid">
          {subCategories.map((s) => {
            const e = entry(s.id);
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
            const meta = gameMeta(s.id);
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
    );
  }

  const sub = subCategories.find((s) => s.id === selectedSub);
  const meta = gameMeta(selectedSub);
  const e = entry(selectedSub);
  const ActiveGameComponent = games[selectedSub];

  return (
    <div className="funtime-shell" key={`game-${ageId}-${selectedSub}`}>
      <Topbar
        onBack={handleExitGame}
        title={meta.title}
        subtitle={`${age.label} · ${sub.label}`}
        right={<Stars value={e.stars} className="chip-stars" />}
      />
      <div className="game-card">
        <p className="how-to">{sub.icon} {meta.how}</p>
        {ActiveGameComponent && (
          <ActiveGameComponent
            best={e.best}
            onComplete={handleGameComplete}
            onExit={handleExitGame}
          />
        )}
      </div>
    </div>
  );
}