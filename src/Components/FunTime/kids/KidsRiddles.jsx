import React from "react";
import "../FunTime.css";
import RiddlesEngine from "../shared/engines/RiddlesEngine";

export default function KidsRiddles(props) {
  return <RiddlesEngine age="kids" {...props} />;
}
