import React, { useState } from "react";
import Button from "./Components/ui/Button/Button";
import Heading from "./Components/ui/Heading/Heading";
import Badge from './Components/ui/Badge/Badge';
import NavBar from './Components/NavBar/NavBar'
import "./index.css";
import Hero from "./Components/Hero/Hero";
import OpeningScreen from "./Components/OpeningScreen/OpeningScreen";
import { Router, Routes, Route } from "react-router-dom";
import SingleProduct from "./pages/SingleProduct";
import Products from "./Components/Products/Products";
import { FaSearch } from "react-icons/fa";
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
