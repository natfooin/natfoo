import React, { useCallback, useEffect, useState } from "react";
import "../FunTime.css";
import { MEMORY_EMOJIS } from "../funTimeData";
import { Hud, ResultCard, fmt, shuffle, useStopwatch } from "../shared/gameShared";

export default function KidsPuzzle({ best, onComplete, onExit }) {
  const emojis = MEMORY_EMOJIS.kids;
  const build = useCallback(() => shuffle([...emojis, ...emojis]).map((e, i) => ({ id: i, e })), [emojis]);

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
  }, [matched, cards.length, emojis.length, final, moves, secs, onComplete]);

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