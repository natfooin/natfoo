import React from "react";
import "../FunTime.css";
import CategoryShell from "../shared/CategoryShell";
import EldersRiddles from "./EldersRiddles";
import EldersBrainRot from "./EldersBrainRot";
import EldersPuzzle from "./EldersPuzzle";
import EldersReading from "./EldersReading";

const ELDERS_GAMES = {
  riddles: EldersRiddles,
  brainrot: EldersBrainRot,
  puzzle: EldersPuzzle,
  reading: EldersReading,
};

export default function EldersCategory({ progress, onComplete, onBack }) {
  return (
    <CategoryShell
      ageId="elders"
      games={ELDERS_GAMES}
      progress={progress}
      onComplete={onComplete}
      onBack={onBack}
    />
  );
}