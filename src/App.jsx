import React, { useEffect, useState } from "react";
import Button from "./Components/ui/Button/Button";
import Heading from "./Components/ui/Heading/Heading";
import Badge from "./Components/ui/Badge/Badge";
import MainProducts from "./pages/MainProducts/MainProducts";
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
import Contact from './Components/Contact/Contact'
import PolicyPage from "./Components/PolicyPage/PolicyPage";
const App = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {/* <NavBar cartQuantity={cartQuantity} /> */}

      <OpenModal
        showModal={showModal}
        setShowModal={setShowModal}
        cartProducts={cartProducts}
      />

      <OpeningScreen />

      <ScrollToHash />
      <Routes>
        <Route element={<MainLayout cartQuantity={cartQuantity}></MainLayout>}>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <div className="app-container">
                  <AllProducts />
                  <Discount />
                </div>
              </>
            }
          />
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
          <Route
            path="/cart"
            element={
              <div className="app-container">
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
            }
          />
          <Route path="/products" element={<MainProducts />} />
          <Route
            path="/about"
            element={
              <div className="app-container">
                <About />
              </div>
            }
          />
          <Route path="/contact" />
          <Route path="/terms-and-condition" />
          <Route path="/privacy-policy" />
          <Route path="/shipping-and-delivery-policy" />
          <Route path="/return-and-cancellation-policy" />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
          <PolicyPage/>
      <Footer />
    </>
  );
};

export default App;
