import React, { useState } from "react";
import Button from "./Components/ui/Button/Button";
import Header from "./Components/ui/Heading/Heading";
import "./index.css";
import Hero from "./Components/Hero/Hero";
import OpeningScreen from "./Components/OpeningScreen/OpeningScreen";
import { Router, Routes, Route } from "react-router-dom";
import SingleProduct from "./pages/SingleProduct";
const App = () => {
  const [cartQuantity, setCartQuanatity] = useState(0);

  return (
    <>
      <OpeningScreen />
        <Hero />
      <Routes>
        <Route
          path="/product/:id"
          element={<SingleProduct setCartQuanatity={setCartQuanatity} />}
        />
      </Routes>
    </>
  );
};

export default App;
