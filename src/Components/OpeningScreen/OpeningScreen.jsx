import { useEffect, useState } from "react";
import "./OpeningScreen.css";
import logo from "/logo.png"; // your logo

function OpeningScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 2500); // duration before site appears
  }, []);

  if (!show) return null;

  return (
    <div className="opening-screen">
      <img src={logo} alt="logo" className="opening-logo" loading="lazy"/>
    </div>
  );
}

export default OpeningScreen;