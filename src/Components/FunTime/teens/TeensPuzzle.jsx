import React, { useEffect, useState } from "react";
import "../FunTime.css";
import { Hud, ResultCard, fmt, shuffle, useStopwatch } from "../shared/gameShared";

const LN = 5;
const PAR = 8;

const toggleAt = (b, i) => {
  const n = [...b];
  const r = Math.floor(i / LN);
  const c = i % LN;
  [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dr, dc]) => {
    const rr = r + dr;
    const cc = c + dc;
    if (rr >= 0 && rr < LN && cc >= 0 && cc < LN) n[rr * LN + cc] = !n[rr * LN + cc];
  });
  return n;
};

const makeLights = () => {
  let b;
  do {
    b = Array(LN * LN).fill(false);
    shuffle([...Array(LN * LN).keys()])
      .slice(0, PAR)
      .forEach((i) => {
        b = toggleAt(b, i);
      });
  } while (!b.some(Boolean));
  return b;
};

export default function TeensPuzzle({ best, onComplete, onExit }) {
  const [board, setBoard] = useState(makeLights);
  const [moves, setMoves] = useState(0);
  const [final, setFinal] = useState(null);
  const [secs, setSecs] = useStopwatch(!final);

  const press = (i) => {
    if (final) return;
    setBoard((b) => toggleAt(b, i));
    setMoves((m) => m + 1);
  };

  useEffect(() => {
    if (!final && moves > 0 && !board.some(Boolean)) {
      const stars = moves <= PAR + 4 ? 3 : moves <= PAR + 12 ? 2 : 1;
      const score = Math.max(100, 1000 - moves * 25 - secs * 2);
      setFinal({ stars, score });
      onComplete({ stars, score });
    }
  }, [board, final, moves, secs, onComplete]);

  const replay = () => {
    setBoard(makeLights());
    setMoves(0);
    setSecs(0);
    setFinal(null);
  };

  if (final) {
    return (
      <ResultCard
        stars={final.stars}
        score={final.score}
        best={best}
        stats={[["Moves", moves], ["Time", fmt(secs)]]}
        onReplay={replay}
        onExit={onExit}
      />
    );
  }

  return (
    <div className="lights">
      <Hud items={[["Moves", moves], ["Lights on", board.filter(Boolean).length], ["Time", fmt(secs)]]} />
      <div className="lights-grid">
        {board.map((on, i) => (
          <button
            key={i}
            type="button"
            className={`light ${on ? "on" : ""}`}
            onClick={() => press(i)}
            aria-label={on ? "Light on" : "Light off"}
          />
        ))}
      </div>
      <div className="actions center">
        <button className="btn btn-ghost" onClick={replay}>🔀 New Board</button>
      </div>
    </div>
  );
}