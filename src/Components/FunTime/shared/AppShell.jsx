import React from "react";
import "../FunTime.css";
import { ageCategories, ageArt } from "../funTimeData";
import { Icon } from "./ui";

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning,";
  if (h < 18) return "Good afternoon,";
  return "Good evening,";
};

/**
 * Window chrome: icon rail + sidebar + top bar, like the reference dashboard.
 * Pages are rendered as children inside the scrolling main area.
 */
export default function AppShell({
  view,
  age,
  crumbs,
  totalStars,
  maxStars,
  gamesLive,
  onNavigate,
  onPickAge,
  onReset,
  children,
}) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "grid" },
    { id: "games", label: "Games", icon: "gamepad", count: gamesLive },
    { id: "progress", label: "Progress", icon: "chart" },
  ];

  return (
    <div className="app">
      {/* --- icon rail --- */}
      <nav className="rail" aria-label="Age groups">
        <button className="rail-logo" onClick={() => onNavigate("dashboard")} aria-label="Fun Time home" title="Fun Time">
          <span>FT</span>
        </button>
        <div className="rail-list">
          {ageCategories.map((a) => (
            <button
              key={a.id}
              className={`rail-btn ${view === "games" && age === a.id ? "active" : ""}`}
              style={{ "--a": ageArt[a.id].a, "--b": ageArt[a.id].b }}
              onClick={() => onPickAge(a.id)}
              aria-label={`${a.label} games`}
              title={`${a.label} · ${a.range}`}
            >
              {a.icon}
            </button>
          ))}
        </div>
      </nav>

      {/* --- sidebar --- */}
      <aside className="side">
        <div className="profile">
          <span className="avatar">🎮</span>
          <p className="hello">{greeting()}</p>
          <p className="name">Player</p>
        </div>

        <p className="side-label">Navigation</p>
        <ul className="side-nav">
          {navItems.map((n) => (
            <li key={n.id}>
              <button className={view === n.id ? "active" : ""} onClick={() => onNavigate(n.id)}>
                <Icon name={n.icon} size={15} />
                <span>{n.label}</span>
                {n.count != null && <em>{n.count}</em>}
              </button>
            </li>
          ))}
        </ul>

        <p className="side-label">Configure</p>
        <ul className="side-nav">
          <li>
            <button onClick={onReset}>
              <Icon name="reset" size={15} />
              <span>Reset progress</span>
            </button>
          </li>
        </ul>

        <div className="promo">
          <span className="promo-icon">
            <Icon name="lock" size={14} />
          </span>
          <p>
            <b>Reading Comprehension</b> is coming soon. Stories and questions to sharpen your mind.
          </p>
          <span className="promo-tag">Coming Soon</span>
        </div>
      </aside>

      {/* --- main --- */}
      <div className="main">
        <header className="topbar">
          <div className="crumbs">
            {crumbs.map((c, i) => (
              <React.Fragment key={c.label}>
                {i > 0 && <Icon name="right" size={11} className="crumb-sep" />}
                {c.onClick ? (
                  <button onClick={c.onClick}>{c.label}</button>
                ) : (
                  <span className="crumb-now">{c.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="tabs" role="tablist" aria-label="Age group">
            {ageCategories.map((a) => (
              <button
                key={a.id}
                role="tab"
                aria-selected={view === "games" && age === a.id}
                className={view === "games" && age === a.id ? "active" : ""}
                onClick={() => onPickAge(a.id)}
              >
                {a.label}
              </button>
            ))}
          </div>

          <div className="top-right">
            <span className="star-chip" title="Stars collected">
              <Icon name="star" size={13} fill="currentColor" stroke={0} /> {totalStars}/{maxStars}
            </span>
            <span className="avatar sm">🎮</span>
          </div>
        </header>

        <main className="page" key={`${view}-${age}`}>{children}</main>
      </div>

      {/* --- phone navigation --- */}
      <nav className="bottom-nav" aria-label="Sections">
        {navItems.map((n) => (
          <button key={n.id} className={view === n.id ? "active" : ""} onClick={() => onNavigate(n.id)}>
            <Icon name={n.icon} size={18} />
            <span>{n.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
