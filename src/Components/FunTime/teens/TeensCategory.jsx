import React from "react";
import "../FunTime.css";
import CategoryShell from "../shared/CategoryShell";
import TeensRiddles from "./TeensRiddles";
import TeensBrainRot from "./TeensBrainRot";
import TeensPuzzle from "./TeensPuzzle";
import TeensReading from "./TeensReading";

const TEENS_GAMES = {
  riddles: TeensRiddles,
  brainrot: TeensBrainRot,
  puzzle: TeensPuzzle,
  reading: TeensReading,
};

export default function TeensCategory(props) {
  return <CategoryShell ageId="teens" games={TEENS_GAMES} {...props} />;
}
