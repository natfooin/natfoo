import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import "./FunTime.css";
import { ageCategories, subCategories, gameInfo } from "./funTimeData";
import AppShell from "./shared/AppShell";
import { Dashboard, ProgressPage } from "./shared/Pages";

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

function FunTime() {
  const [view, setView] = useState("dashboard"); // dashboard | games | progress
  const [age, setAge] = useState("kids");
  const [sub, setSub] = useState(null); // selected game inside an age group
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
  const entry = useCallback((a, s) => progress[`${a}:${s}`] || { stars: 0, best: 0 }, [progress]);

  const totals = useMemo(() => {
    let stars = 0;
    let best = 0;
    ageCategories.forEach((a) =>
      playable.forEach((s) => {
        const e = entry(a.id, s.id);
        stars += e.stars;
        best += e.best;
      })
    );
    return { stars, best, max: playable.length * 3 * ageCategories.length };
  }, [entry, playable]);

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

  /* ----- navigation ----- */
  const goDashboard = () => {
    setView("dashboard");
    setSub(null);
  };
  const goAge = (id) => {
    setAge(id);
    setView("games");
    setSub(null);
  };
  const goGame = (id, s) => {
    setAge(id);
    setView("games");
    setSub(s);
  };
  const navigate = (id) => {
    if (id === "dashboard") goDashboard();
    else if (id === "games") goAge(age);
    else {
      setView("progress");
      setSub(null);
    }
  };
  const reset = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm("Reset all stars and best scores?")) setProgress({});
  };

  /* ----- breadcrumb ----- */
  const ageInfo = ageCategories.find((a) => a.id === age);
  const gameTitle = sub ? (sub === "puzzle" ? gameInfo.puzzle[age].title : gameInfo[sub].title) : null;
  const crumbs = [{ label: "Fun Time", onClick: view === "dashboard" ? undefined : goDashboard }];
  if (view === "progress") crumbs.push({ label: "Progress" });
  if (view === "games") {
    crumbs.push({ label: ageInfo.label, onClick: sub ? () => goAge(age) : undefined });
    if (sub) crumbs.push({ label: gameTitle });
  }

  const ActiveAge = AGE_COMPONENTS[age];

  return (
    <div className="funtime-container">
      <div className="backdrop" aria-hidden="true" />
      <AppShell
        view={view}
        age={age}
        crumbs={crumbs}
        totalStars={totals.stars}
        maxStars={totals.max}
        gamesLive={playable.length}
        onNavigate={navigate}
        onPickAge={goAge}
        onReset={reset}
      >
        {view === "dashboard" && <Dashboard progress={progress} totals={totals} onOpenAge={goAge} />}
        {view === "progress" && <ProgressPage progress={progress} totals={totals} onOpenGame={goGame} />}
        {view === "games" && (
          <Suspense fallback={<p className="empty">Loading…</p>}>
            <ActiveAge
              progress={progress}
              onComplete={handleComplete}
              sub={sub}
              onSelectSub={setSub}
              onExitGame={() => setSub(null)}
              onSwitchAge={goAge}
            />
          </Suspense>
        )}
      </AppShell>
    </div>
  );
}

export default FunTime;
