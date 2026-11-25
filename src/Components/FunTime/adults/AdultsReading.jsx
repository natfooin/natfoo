import React from "react";
import "../FunTime.css";

export default function AdultsReading({ onExit }) {
  return (
    <div className="start-panel">
      <h3>Adults Reading Comprehension is coming soon</h3>
      <button className="btn btn-ghost" onClick={onExit}>Back</button>
    </div>
  );
}