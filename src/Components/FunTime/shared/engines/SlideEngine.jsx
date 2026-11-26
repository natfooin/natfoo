import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../../FunTime.css";
import { Hud, ResultCard, fmt, pick, useStopwatch } from "../gameShared";

const neighbours = (i, n) => {
  const r = Math.floor(i / n);
  const c = i % n;
  const out = [];
  if (r > 0) out.push(i - n);
  if (r < n - 1) out.push(i + n);
  if (c > 0) out.push(i - 1);
  if (c < n - 1) out.push(i + 1);
  return out;
};

export default function SlideEngine({ size, best, onComplete, onExit }) {
  const total = size * size;
  const solved = useMemo(() => [...Array(total - 1).keys()].map((k) => k + 1).concat(0), [total]);
  const isSolved = useCallback((b) => b.every((v, i) => v === solved[i]), [solved]);

  const makeBoard = useCallback(() => {
    let b = [...solved];
    let blank = total - 1;
    let prev = -1;
    const steps = size === 3 ? 90 : 160;
    for (let s = 0; s < steps; s++) {
      const options = neighbours(blank, size).filter((x) => x !== prev);
      const n = pick(options);
      [b[blank], b[n]] = [b[n], b[blank]];
      prev = blank;
      blank = n;
    }
    return isSolved(b) ? makeBoard() : b;
  }, [solved, total, size, isSolved]);

  const [board, setBoard] = useState(makeBoard);
  const [moves, setMoves] = useState(0);
  const [final, setFinal] = useState(null);
  const [secs, setSecs] = useStopwatch(!final);

  const move = useCallback(
    (i) => {
      if (final) return;
      const blank = board.indexOf(0);
      if (!neighbours(blank, size).includes(i)) return;
      const b = [...board];
      [b[blank], b[i]] = [b[i], b[blank]];
      setBoard(b);
      setMoves((m) => m + 1);
    },
    [board, final, size]
  );

  useEffect(() => {
    const onKey = (e) => {
      const blank = board.indexOf(0);
      const r = Math.floor(blank / size);
      const c = blank % size;
      let target = null;
      if (e.key === "ArrowUp" && r < size - 1) target = blank + size;
      if (e.key === "ArrowDown" && r > 0) target = blank - size;
      if (e.key === "ArrowLeft" && c < size - 1) target = blank + 1;
      if (e.key === "ArrowRight" && c > 0) target = blank - 1;
      if (target !== null) {
        e.preventDefault();
        move(target);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [board, size, move]);

  useEffect(() => {
    if (!final && moves > 0 && isSolved(board)) {
      const [s3, s2] = size === 3 ? [45, 80] : [120, 200];
      const stars = moves <= s3 ? 3 : moves <= s2 ? 2 : 1;
      const score = Math.max(100, 1500 - moves * 8 - secs * 3);
      setFinal({ stars, score });
      onComplete({ stars, score });
    }
  }, [board, final, isSolved, moves, secs, size, onComplete]);

  const replay = () => {
    setBoard(makeBoard());
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
    <div className="slide">
      <Hud items={[["Moves", moves], ["In place", `${board.filter((v, i) => v !== 0 && v === solved[i]).length}/${total - 1}`], ["Time", fmt(secs)]]} />
      <div className="slide-board">
        <div className="slide-inner">
          {board.map((v, i) =>
            v === 0 ? null : (
              <div
                key={v}
                className="tile"
                style={{
                  "--n": size,
                  "--r": Math.floor(i / size),
                  "--c": i % size,
                  "--hue": Math.round((v * 360) / total),
                }}
              >
                <button type="button" onClick={() => move(i)}>{v}</button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}