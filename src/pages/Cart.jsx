import React, { useEffect, useState } from "react";
import "./Cart.css";
import CartProduct from "../Components/CartProduct/CartProduct";
import Heading from "../Components/ui/Heading/Heading";
import { BiCartAlt } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
const Cart = ({
  setCartPrice,
  cartPrice,
  cartProducts,
  setCartProducts,
  setCartQuantity,
  setShowModal,
}) => {
  const checkOutHandler = () => {
    setShowModal(true);
  };
  return (
    <>
      <Heading title="Cart" subTitle="Your cart products" styles={{paddingTop : "2%"}}/>
      {cartProducts.length !== 0 ? (
        <div className="cart-container">
          <div className="products-list">
            {cartProducts.map((product) => {
              return (
                <>
                  <CartProduct
                    setCartPrice={setCartPrice}
                    product={product}
                    setCartProducts={setCartProducts}
                    setCartQuantity={setCartQuantity}
                  />
                  <hr style={{ width: "95%", margin: "auto" }} />
                </>
              );
            })}
          </div>
          <div className="order-summary">
            <div className="orer-summary-block">
              <h1>Order Summary</h1>
              <table>
                <tr>
                  <td>Subtotal</td>
                  <td className="amount-column">
                    <FaRupeeSign size={12} />
                    {cartPrice + cartPrice * 0.1}
                  </td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td className="amount-column">
                    <FaRupeeSign size={12} />
                    {cartPrice * 0.1}
                  </td>
                </tr>
                <tr>
                  <td className="grand-total">
                    <b>Total</b>
                  </td>
                  <td className="amount-column grand-total">
                    <b>
                      <FaRupeeSign size={window.innerWidth >= 1280 ? 18 : 12} />
                      {cartPrice}
                    </b>
                  </td>
                </tr>
              </table>
              <hr />
              <button className="place-order-btn" onClick={checkOutHandler}>
                Proceed
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-records">
          <h1>Add products in cart.</h1>
          <Link to={"/products"} style={{textDecoration:"none"}}>
            <button>
              <BiCartAlt size={22} />
              Add Now
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
