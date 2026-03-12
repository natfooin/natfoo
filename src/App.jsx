import React, { useState } from "react";
import Button from "./Components/ui/Button/Button";
import Heading from "./Components/ui/Heading/Heading";
import Badge from "./Components/ui/Badge/Badge";
import NavBar from "./Components/NavBar/NavBar";
import "./index.css";
import AllProducts from "./pages/AllProducts/AllProducts";
import Hero from "./Components/Hero/Hero";
import OpeningScreen from "./Components/OpeningScreen/OpeningScreen";
import { Router, Routes, Route } from "react-router-dom";
import SingleProduct from "./pages/SingleProduct";
import Products from "./Components/Products/Products";
import { FaSearch } from "react-icons/fa";
const App = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartProdcuts, setCartProducts] = useState([]);
  return (
    <>
    <AllProducts />
    
      {/* <OpeningScreen /> */}
      {/* <NavBar cartQuantity={cartQuantity} /> */}
      {console.log(cartProdcuts)}
      {/* <Hero /> */}
  
      <Routes>
        <Route
          path="/product/:id"
          element={
            <SingleProduct
              setCartQuantity={setCartQuantity}
              setCartProducts={setCartProducts}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
