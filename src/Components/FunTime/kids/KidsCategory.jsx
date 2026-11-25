import React from "react";
import "../FunTime.css";
import CategoryShell from "../shared/CategoryShell";
import KidsRiddles from "./KidsRiddles";
import KidsBrainRot from "./KidsBrainRot";
import KidsPuzzle from "./KidsPuzzle";
import KidsReading from "./KidsReading";

const KIDS_GAMES = {
  riddles: KidsRiddles,
  brainrot: KidsBrainRot,
  puzzle: KidsPuzzle,
  reading: KidsReading,
};

export default function KidsCategory({ progress, onComplete, onBack }) {
  return (
    <CategoryShell
      ageId="kids"
      games={KIDS_GAMES}
      progress={progress}
      onComplete={onComplete}
      onBack={onBack}
    />
  );
}