import React, { useEffect, useState } from "react";
import Button from "./Components/ui/Button/Button";
import Heading from "./Components/ui/Heading/Heading";
import Badge from "./Components/ui/Badge/Badge";
import NavBar from "./Components/NavBar/NavBar";
import Hero from "./Components/Hero/Hero";
import "./App.css";
import OpeningScreen from "./Components/OpeningScreen/OpeningScreen";
import { Router, Routes, Route } from "react-router-dom";
import SingleProduct from "./pages/SingleProduct";
import Products from "./Components/Products/Products";
import { FaSearch } from "react-icons/fa";
import Cart from "./pages/Cart";
import CartProduct from "./Components/CartProduct/CartProduct";
import AllProducts from "./pages/AllProducts/AllProducts";
import Footer from "./Components/Footer/Footer";
import OpenModal from "./Components/OrderModal/OrderModal";
const App = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <NavBar cartQuantity={cartQuantity} />
      <OpenModal
        showModal={showModal}
        setShowModal={setShowModal}
        cartProducts={cartProducts}
      />
      <Hero />
      <div className="app-container">
        {/* <OpeningScreen /> */}
        <AllProducts />
        <Routes>
          <Route
            path="/product/:id"
            element={
              <SingleProduct
                setCartPrice={setCartPrice}
                setCartQuantity={setCartQuantity}
                setCartProducts={setCartProducts}
              />
            }
          />
        </Routes>
        <Cart
          setCartPrice={setCartPrice}
          cartPrice={cartPrice}
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
          cartQuantity={cartQuantity}
          setCartQuantity={setCartQuantity}
          setShowModal={setShowModal}
        />
      </div>
      <Footer />
    </>
  );
};

export default App;
