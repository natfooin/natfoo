
import React from "react";
import "../FunTime.css";
import SlideEngine from "../shared/engines/SlideEngine";

export default function AdultsPuzzle(props) {
  return <SlideEngine size={4} {...props} />;
}