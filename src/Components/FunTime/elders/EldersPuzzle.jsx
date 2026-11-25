import React from "react";
import "../FunTime.css";
import SlideEngine from "../shared/engines/SlideEngine";

export default function EldersPuzzle(props) {
  return <SlideEngine size={3} {...props} />;
}