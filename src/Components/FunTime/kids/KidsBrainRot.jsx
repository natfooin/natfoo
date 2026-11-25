import React from "react";
import "../FunTime.css";
import MemeRushEngine from "../shared/engines/MemeRushEngine";

export default function KidsBrainRot(props) {
  return <MemeRushEngine age="kids" {...props} />;
}