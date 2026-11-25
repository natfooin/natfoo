import React from "react";
import "../FunTime.css";
import RiddlesEngine from "../shared/engines/RiddlesEngine";

export default function TeensRiddles(props) {
  return <RiddlesEngine age="teens" {...props} />;
}