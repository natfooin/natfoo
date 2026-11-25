import React from "react";
import "../FunTime.css";
import RiddlesEngine from "../shared/engines/RiddlesEngine";

export default function AdultsRiddles(props) {
  return <RiddlesEngine age="adults" {...props} />;
}