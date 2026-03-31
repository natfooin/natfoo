import React, { useEffect, useState } from "react";
import Button from "./Components/ui/Button/Button";
import Heading from "./Components/ui/Heading/Heading";
import Badge from "./Components/ui/Badge/Badge";
import MainProducts from "./pages/MainProducts/MainProducts";
import NavBar from "./Components/NavBar/NavBar";
import Hero from "./Components/Hero/Hero";
import "./App.css";
import PolicyPage from "./Components/PolicyPage/PolicyPage";
import OpeningScreen from "./Components/OpeningScreen/OpeningScreen";
import { Router, Routes, Route } from "react-router-dom";
import SingleProduct from "./pages/SingleProduct";
import Products from "./Components/Products/Products";
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

import Cart from "./pages/Cart";
import CartProduct from "./Components/CartProduct/CartProduct";
import AllProducts from "./pages/AllProducts/AllProducts";
import Footer from "./Components/Footer/Footer";
import OpenModal from "./Components/OrderModal/OrderModal";
import Discount from "./Components/Discount/Discount";
import ScrollToHash from "./Components/ScrollToHash/ScrollToHash";
import About from "./pages/About/About";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MainLayout from "./Components/MainLayout/MainLayout";
import Contact from "./Components/Contact/Contact";
import TermsPage from "./../src/Components/PolicyPage/TermsPage";
import WhatsAppButton from "./Components/WhatsAppButton/WhatsAppButton";
import SuccessModal from "./Components/SuccessModal/SuccessModal";
import ShippingPage from "./Components/PolicyPage/ShippingPage";
import RefundPage from "./Components/PolicyPage/RefundPage";
const App = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [discount, setDiscount] = useState(0.0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <>
      {/* <NavBar cartQuantity={cartQuantity} /> */}
      <ScrollToHash />

      <OpeningScreen />
      <Routes>
        <Route element={<MainLayout cartQuantity={cartQuantity}></MainLayout>}>
          <Route
            path="/"
            element={
              <>
              <div class="app-ct">
                <Hero setActiveCategory={setActiveCategory} />
                <div className="app-container">
                  <AllProducts setActiveCategory={setActiveCategory} />
                
                  {/* <Discount /> */}
                </div>
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
              <div className="app-container app-ct">
                <Cart
                  setCartPrice={setCartPrice}
                  cartPrice={cartPrice}
                  cartProducts={cartProducts}
                  setCartProducts={setCartProducts}
                  cartQuantity={cartQuantity}
                  setCartQuantity={setCartQuantity}
                  setShowModal={setShowModal}
                  discount={discount}
                  setDiscount={setDiscount}
                />
              </div>
            }
          />
          <Route
            path="/products"
            element={
              <MainProducts
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            }
          />
          <Route
            path="/about"
            element={
              <div className="app-container app-ct">
                <About />
              </div>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-and-condition" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PolicyPage />} />
          <Route
            path="/shipping-and-delivery-policy"
            element={<ShippingPage />}
          />
          <Route
            path="/refund-and-cancellation-policy"
            element={<RefundPage />}
          />
          <Route
            path="/refund-and-cancellation-policy"
            element={<TermsPage />}
          />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      {/* <Footer /> */}
      <WhatsAppButton />
      <OpenModal
        showModal={showModal}
        setShowModal={setShowModal}
        cartProducts={cartProducts}
        discount={discount}
        cartPrice={cartPrice}
        setShowSuccessModal={setShowSuccessModal}
      />

      <SuccessModal
        setCartPrice={setCartPrice}
        setDiscount={setDiscount}
        setCartProducts={setCartProducts}
        setCartQuantity={setCartQuantity}
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Thank you! Your order has been placed successfully."
        message="Please complete your purchase using the secure payment link sent to your email and mobile."
      />
      <ToastContainer position="bottom-left" />
    </>
  );
};

export default App;
