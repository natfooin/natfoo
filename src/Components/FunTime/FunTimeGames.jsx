import React, { useEffect, useMemo, useRef, useState } from "react";
import { riddles, RIDDLE_TIMER, rushConfig, MEMORY_EMOJIS } from "./funTimeData";

/* ---------- helpers ---------- */
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function useStopwatch(running) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    if (!running) return undefined;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);
  return [secs, setSecs];
}

/* ---------- shared UI ---------- */
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

function Confetti() {
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

function Hud({ items }) {
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

function ResultCard({ stars, score, stats = [], best, onReplay, onExit }) {
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

/* ---------- 1. RIDDLES ---------- */
export function Riddles({ age, best, onComplete, onExit }) {
  const timerSec = RIDDLE_TIMER[age];
  const build = () =>
    shuffle(riddles[age]).map((r) => ({ ...r, options: shuffle([r.a, ...r.w]) }));

  const [deck, setDeck] = useState(build);
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

  const resolve = (choice) => {
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
  };

  useEffect(() => {
    if (!timerSec || picked !== null || final) return undefined;
    if (timeLeft <= 0) {
      resolve("__timeout");
      return undefined;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, picked, final, timerSec]);

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
    setDeck(build());
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

/* ---------- 2. MEME RUSH (Brain Rot) ---------- */
export function MemeRush({ age, best, onComplete, onExit }) {
  const cfg = rushConfig[age];
  const empty = () => Array(9).fill(null);

  const [phase, setPhase] = useState("ready");
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [hits, setHits] = useState(0);
  const [timeLeft, setTimeLeft] = useState(cfg.duration);
  const [holes, setHoles] = useState(empty);
  const [target, setTarget] = useState(cfg.targets[0]);
  const [fx, setFx] = useState(null);
  const [final, setFinal] = useState(null);

  const holesRef = useRef(empty());
  const targetRef = useRef(cfg.targets[0]);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const idRef = useRef(0);

  const commit = (next) => {
    holesRef.current = next;
    setHoles(next);
  };

  const start = () => {
    scoreRef.current = 0;
    comboRef.current = 0;
    const t = pick(cfg.targets);
    targetRef.current = t;
    setTarget(t);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setHits(0);
    setFinal(null);
    setTimeLeft(cfg.duration);
    commit(empty());
    setPhase("playing");
  };

  const finish = () => {
    commit(empty());
    const s = scoreRef.current;
    const stars = s >= 150 ? 3 : s >= 80 ? 2 : 1;
    setFinal({ stars, score: s });
    setPhase("done");
    onComplete({ stars, score: s });
  };

  // countdown
  useEffect(() => {
    if (phase !== "playing") return undefined;
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  // end of game / target swap every 10s
  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) {
      finish();
      return;
    }
    if (timeLeft < cfg.duration && timeLeft % 10 === 0) {
      const nt = pick(cfg.targets.filter((t) => t !== targetRef.current));
      targetRef.current = nt;
      setTarget(nt);
      commit(empty());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);

  // spawner
  useEffect(() => {
    if (phase !== "playing") return undefined;
    const id = setInterval(() => {
      const cur = holesRef.current;
      const free = cur.map((h, i) => (h ? null : i)).filter((i) => i !== null);
      if (!free.length) return;
      const i = pick(free);
      const isTarget = Math.random() < 0.45;
      const emoji = isTarget ? targetRef.current : pick(cfg.decoys);
      const hid = ++idRef.current;
      const next = [...cur];
      next[i] = { emoji, id: hid, isTarget };
      commit(next);
      setTimeout(() => {
        const c = holesRef.current;
        if (c[i] && c[i].id === hid) {
          const n = [...c];
          n[i] = null;
          commit(n);
        }
      }, cfg.visible);
    }, cfg.spawn);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (!fx) return undefined;
    const t = setTimeout(() => setFx(null), 650);
    return () => clearTimeout(t);
  }, [fx]);

  const whack = (i) => {
    if (phase !== "playing") return;
    const h = holesRef.current[i];
    if (!h) return;
    const n = [...holesRef.current];
    n[i] = null;
    commit(n);
    if (h.isTarget) {
      comboRef.current += 1;
      const pts = 10 + Math.min(comboRef.current - 1, 10);
      scoreRef.current += pts;
      setHits((x) => x + 1);
      setFx({ i, text: `+${pts}`, good: true, k: ++idRef.current });
    } else {
      comboRef.current = 0;
      scoreRef.current = Math.max(0, scoreRef.current - 5);
      setFx({ i, text: "-5", good: false, k: ++idRef.current });
    }
    setScore(scoreRef.current);
    setCombo(comboRef.current);
    setBestCombo((b) => Math.max(b, comboRef.current));
  };

  if (phase === "done" && final) {
    return (
      <ResultCard
        stars={final.stars}
        score={final.score}
        best={best}
        stats={[["Targets hit", hits], ["Best combo", `x${bestCombo}`]]}
        onReplay={start}
        onExit={onExit}
      />
    );
  }

  if (phase === "ready") {
    return (
      <div className="start-panel">
        <div className="emoji-row">
          {cfg.targets.map((t) => (<span key={t}>{t}</span>))}
        </div>
        <h3>{cfg.duration} seconds. Tap the target. Chain combos!</h3>
        <p className="muted">The target changes every 10 seconds. Tapping a decoy costs 5 points.</p>
        <button className="btn btn-primary btn-xl" onClick={start}>▶ Start</button>
      </div>
    );
  }

  return (
    <div className="rush">
      <Hud items={[["Time", `${timeLeft}s`], ["Score", score], ["Combo", `x${combo}`]]} />
      <div className="timebar slim">
        <i style={{ width: `${(timeLeft / cfg.duration) * 100}%` }} />
      </div>
      <div className="target-banner" key={target}>
        <span>TAP</span>
        <b>{target}</b>
      </div>
      <div className="rush-board">
        {holes.map((h, i) => (
          <button key={i} type="button" className="hole" onPointerDown={() => whack(i)} aria-label="Tap">
            {h && <span key={h.id} className="mole">{h.emoji}</span>}
            {fx && fx.i === i && (
              <span key={fx.k} className={`fx ${fx.good ? "good" : "bad"}`}>{fx.text}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- 3a. MEMORY MATCH (kids puzzle) ---------- */
export function MemoryMatch({ age, best, onComplete, onExit }) {
  const emojis = MEMORY_EMOJIS[age];
  const build = () => shuffle([...emojis, ...emojis]).map((e, i) => ({ id: i, e }));

  const [cards, setCards] = useState(build);
  const [open, setOpen] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const [final, setFinal] = useState(null);
  const [secs, setSecs] = useStopwatch(!final);

  const flip = (id) => {
    if (lock || open.includes(id) || matched.includes(id)) return;
    const nextOpen = [...open, id];
    setOpen(nextOpen);
    if (nextOpen.length === 2) {
      setMoves((m) => m + 1);
      setLock(true);
      const [a, b] = nextOpen.map((i) => cards[i]);
      if (a.e === b.e) {
        setTimeout(() => {
          setMatched((m) => [...m, a.id, b.id]);
          setOpen([]);
          setLock(false);
        }, 450);
      } else {
        setTimeout(() => {
          setOpen([]);
          setLock(false);
        }, 850);
      }
    }
  };

  useEffect(() => {
    if (!final && matched.length === cards.length) {
      const pairs = emojis.length;
      const stars = moves <= pairs + 3 ? 3 : moves <= pairs * 2 ? 2 : 1;
      const score = Math.max(100, 1000 - moves * 30 - secs * 4);
      setFinal({ stars, score });
      onComplete({ stars, score });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matched]);

  const replay = () => {
    setCards(build());
    setOpen([]);
    setMatched([]);
    setMoves(0);
    setSecs(0);
    setLock(false);
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
    <div className="memory">
      <Hud items={[["Moves", moves], ["Pairs", `${matched.length / 2}/${emojis.length}`], ["Time", fmt(secs)]]} />
      <div className="mem-grid">
        {cards.map((c) => {
          const isOpen = open.includes(c.id) || matched.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              className={`mem-card ${isOpen ? "open" : ""} ${matched.includes(c.id) ? "matched" : ""}`}
              onClick={() => flip(c.id)}
              aria-label={isOpen ? c.e : "Hidden card"}
            >
              {isOpen ? c.e : "❓"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- 3b. SLIDE PUZZLE (tweens 3x3, adults 4x4) ---------- */
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

export function SlidePuzzle({ size, best, onComplete, onExit }) {
  const total = size * size;
  const solved = useMemo(() => [...Array(total - 1).keys()].map((k) => k + 1).concat(0), [total]);
  const isSolved = (b) => b.every((v, i) => v === solved[i]);

  const makeBoard = () => {
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
  };

  const [board, setBoard] = useState(makeBoard);
  const [moves, setMoves] = useState(0);
  const [final, setFinal] = useState(null);
  const [secs, setSecs] = useStopwatch(!final);

  const move = (i) => {
    if (final) return;
    const blank = board.indexOf(0);
    if (!neighbours(blank, size).includes(i)) return;
    const b = [...board];
    [b[blank], b[i]] = [b[i], b[blank]];
    setBoard(b);
    setMoves((m) => m + 1);
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, final]);

  useEffect(() => {
    if (!final && moves > 0 && isSolved(board)) {
      const [s3, s2] = size === 3 ? [45, 80] : [120, 200];
      const stars = moves <= s3 ? 3 : moves <= s2 ? 2 : 1;
      const score = Math.max(100, 1500 - moves * 8 - secs * 3);
      setFinal({ stars, score });
      onComplete({ stars, score });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

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
      <Hud items={[["Moves", moves], ["Time", fmt(secs)]]} />
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
      <div className="actions center">
        <button className="btn btn-ghost" onClick={replay}>🔀 Reshuffle</button>
      </div>
    </div>
  );
}

/* ---------- 3c. LIGHTS OUT (teens puzzle) ---------- */
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

export function LightsOut({ best, onComplete, onExit }) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

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

/* ---------- router ---------- */
export function GameRouter({ age, sub, best, onComplete, onExit }) {
  const common = { age, best, onComplete, onExit };
  switch (sub) {
    case "riddles":
      return <Riddles key={`${age}-r`} {...common} />;
    case "brainrot":
      return <MemeRush key={`${age}-b`} {...common} />;
    case "puzzle":
      if (age === "kids") return <MemoryMatch key="p-kids" {...common} />;
      if (age === "tweens") return <SlidePuzzle key="p-tweens" size={3} {...common} />;
      if (age === "teens") return <LightsOut key="p-teens" {...common} />;
      return <SlidePuzzle key="p-adults" size={4} {...common} />;
    case "reading":
      // Plug the client's reading-comprehension content in here later.
      return (
        <div className="start-panel">
          <h3>Reading Comprehension is coming soon</h3>
          <button className="btn btn-ghost" onClick={onExit}>Back</button>
        </div>
      );
    default:
      return null;
  }
}
