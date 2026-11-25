import React from "react";
import "../FunTime.css";
import RiddlesEngine from "../shared/engines/RiddlesEngine";

export default function EldersRiddles(props) {
  return <RiddlesEngine age="elders" {...props} />;
}