import React from "react";
import "../FunTime.css";
import MemeRushEngine from "../shared/engines/MemeRushEngine";

export default function AdultsBrainRot(props) {
  return <MemeRushEngine age="adults" {...props} />;
}