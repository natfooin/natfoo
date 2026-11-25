import React, { useCallback, useEffect, useState } from "react";
import "../../FunTime.css";
import { riddles, RIDDLE_TIMER } from "../../funTimeData";
import { Hud, ResultCard, shuffle } from "../gameShared";

export default function RiddlesEngine({ age, best, onComplete, onExit }) {
  const timerSec = RIDDLE_TIMER[age];
  const buildDeck = useCallback(
    () => shuffle(riddles[age]).map((r) => ({ ...r, options: shuffle([r.a, ...r.w]) })),
    [age]
  );

  const [deck, setDeck] = useState(buildDeck);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [gain, setGain] = useState(0);
  const [streak, setStreak] = useState(0);
  const [log, setLog] = useState([]);
  const [hinted, setHinted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerSec);
  const [final, setFinal] = useState(null);

  const q = deck[idx];

  const resolve = useCallback(
    (choice) => {
      if (picked !== null) return;
      setPicked(choice);
      if (choice === q.a) {
        const pts = (hinted ? 50 : 100) + Math.min(streak, 4) * 10 + (timerSec ? timeLeft * 2 : 0);
        setGain(pts);
        setScore((s) => s + pts);
        setStreak((s) => s + 1);
        setLog((l) => [...l, "ok"]);
      } else {
        setGain(0);
        setStreak(0);
        setLog((l) => [...l, "no"]);
      }
    },
    [picked, q.a, hinted, streak, timerSec, timeLeft]
  );

  useEffect(() => {
    if (!timerSec || picked !== null || final) return undefined;
    if (timeLeft <= 0) {
      resolve("__timeout");
      return undefined;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, picked, final, timerSec, resolve]);

  const next = () => {
    if (idx + 1 >= deck.length) {
      const correct = log.filter((x) => x === "ok").length;
      const stars = correct >= 7 ? 3 : correct >= 5 ? 2 : 1;
      setFinal({ stars, correct });
      onComplete({ stars, score });
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
      setHinted(false);
      setTimeLeft(timerSec);
    }
  };

  const replay = () => {
    setDeck(buildDeck());
    setIdx(0);
    setPicked(null);
    setScore(0);
    setGain(0);
    setStreak(0);
    setLog([]);
    setHinted(false);
    setTimeLeft(timerSec);
    setFinal(null);
  };

  if (final) {
    return (
      <ResultCard
        stars={final.stars}
        score={score}
        best={best}
        stats={[["Correct", `${final.correct}/${deck.length}`]]}
        onReplay={replay}
        onExit={onExit}
      />
    );
  }

  const message =
    picked === null
      ? null
      : picked === q.a
      ? `🎉 Correct! +${gain} points`
      : picked === "__timeout"
      ? `⏰ Time's up! The answer was "${q.a}"`
      : `Not quite — the answer was "${q.a}"`;

  return (
    <div className="riddle">
      <Hud items={[["Question", `${idx + 1}/${deck.length}`], ["Score", score], ["Streak", `🔥 ${streak}`]]} />
      <div className="dots">
        {deck.map((_, i) => (
          <span
            key={i}
            className={`dot ${log[i] === "ok" ? "done" : log[i] === "no" ? "wrong" : i === idx ? "now" : ""}`}
          />
        ))}
      </div>
      {timerSec > 0 && (
        <div className="timebar" key={idx}>
          <i style={{ width: `${(timeLeft / timerSec) * 100}%` }} />
        </div>
      )}
      <p className="q-text" key={`q${idx}`}>{q.q}</p>
      <div className="options">
        {q.options.map((o, i) => {
          let state = "";
          if (picked !== null) state = o === q.a ? "correct" : o === picked ? "wrong" : "dim";
          return (
            <button key={o} className={`opt ${state}`} disabled={picked !== null} onClick={() => resolve(o)}>
              <span className="letter">{"ABCD"[i]}</span>
              <span className="opt-text">{o}</span>
            </button>
          );
        })}
      </div>
      <div className="feedback">
        {picked !== null ? (
          <p className={picked === q.a ? "msg good" : "msg bad"}>{message}</p>
        ) : hinted ? (
          <p className="hint-bubble">💡 {q.hint}</p>
        ) : (
          <p className="muted">Stuck? A hint costs 50 points.</p>
        )}
      </div>
      <div className="actions">
        <button className="btn btn-ghost" disabled={hinted || picked !== null} onClick={() => setHinted(true)}>
          💡 Hint
        </button>
        <button className={`btn btn-primary ${picked === null ? "invisible" : ""}`} onClick={next}>
          {idx + 1 >= deck.length ? "See Results" : "Next →"}
        </button>
      </div>
    </div>
  );
}