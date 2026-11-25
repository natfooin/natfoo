import React from "react";
import "../FunTime.css";
import CategoryShell from "../shared/CategoryShell";
import AdultsRiddles from "./AdultsRiddles";
import AdultsBrainRot from "./AdultsBrainRot";
import AdultsPuzzle from "./AdultsPuzzle";
import AdultsReading from "./AdultsReading";

const ADULTS_GAMES = {
  riddles: AdultsRiddles,
  brainrot: AdultsBrainRot,
  puzzle: AdultsPuzzle,
  reading: AdultsReading,
};

export default function AdultsCategory({ progress, onComplete, onBack }) {
  return (
    <CategoryShell
      ageId="adults"
      games={ADULTS_GAMES}
      progress={progress}
      onComplete={onComplete}
      onBack={onBack}
    />
  );
}