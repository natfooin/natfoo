import React, { useCallback, useEffect, useRef, useState } from "react";
import "../../FunTime.css";
import { rushConfig } from "../../funTimeData";
import { Hud, ResultCard, pick } from "../gameShared";

const createEmptyHoles = () => Array(9).fill(null);

export default function MemeRushEngine({ age, best, onComplete, onExit }) {
  const cfg = rushConfig[age];

  const [phase, setPhase] = useState("ready");
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [hits, setHits] = useState(0);
  const [timeLeft, setTimeLeft] = useState(cfg.duration);
  const [holes, setHoles] = useState(createEmptyHoles);
  const [target, setTarget] = useState(cfg.targets[0]);
  const [fx, setFx] = useState(null);
  const [final, setFinal] = useState(null);

  const holesRef = useRef(createEmptyHoles());
  const targetRef = useRef(cfg.targets[0]);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const idRef = useRef(0);
  const timeoutsRef = useRef([]);

  const clearMoleTimers = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  useEffect(() => clearMoleTimers, [clearMoleTimers]);

  const commit = useCallback((next) => {
    holesRef.current = next;
    setHoles(next);
  }, []);

  const start = () => {
    clearMoleTimers();
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
    commit(createEmptyHoles());
    setPhase("playing");
  };

  const finish = useCallback(() => {
    clearMoleTimers();
    commit(createEmptyHoles());
    const s = scoreRef.current;
    const stars = s >= 150 ? 3 : s >= 80 ? 2 : 1;
    setFinal({ stars, score: s });
    setPhase("done");
    onComplete({ stars, score: s });
  }, [clearMoleTimers, commit, onComplete]);

  useEffect(() => {
    if (phase !== "playing") return undefined;
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

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
      commit(createEmptyHoles());
    }
  }, [timeLeft, phase, cfg.duration, cfg.targets, finish, commit]);

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

      const hideTimer = setTimeout(() => {
        const c = holesRef.current;
        if (c[i] && c[i].id === hid) {
          const n = [...c];
          n[i] = null;
          commit(n);
        }
      }, cfg.visible);
      timeoutsRef.current.push(hideTimer);
    }, cfg.spawn);
    return () => clearInterval(id);
  }, [phase, cfg.decoys, cfg.spawn, cfg.visible, commit]);

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