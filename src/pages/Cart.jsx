import React, { useEffect, useState } from "react";
import "./Cart.css";
import CartProduct from "../Components/CartProduct/CartProduct";
import Heading from "../Components/ui/Heading/Heading";
import { BiCartAlt } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import DiscountTooltip from "../Components/DiscountToolTip/DiscountToolTip";

const slabs = [
  { min: 500, max: 1000, discount: 10 },
  { min: 1001, max: 1500, discount: 12 },
  { min: 1501, max: 2000, discount: 15 },
  { min: 2001, max: 5000, discount: 20 },
  { min: 5000, max: 10000, discount: 25 },
  { min: 10001, max: null, discount: 30 },
];
const Cart = ({
  setCartPrice,
  cartPrice,
  cartProducts,
  setCartProducts,
  setCartQuantity,
  setShowModal,
  discount,
  setDiscount
}) => {
  const checkOutHandler = () => {
    setShowModal(true);
    // setCartProducts([])  After succesfull order - cartCleaning
  };


  useEffect(() => {
    const newDiscountSlab = slabs.find((slab) => {
      return (
        cartPrice >= slab.min && (slab.max === null || cartPrice <= slab.max)
      );
    });


    setDiscount(newDiscountSlab ? (newDiscountSlab.discount * cartPrice)/100 : 0);
  }, [cartPrice]);

  return (
    <>
      <Heading
        title="Cart"
        subTitle="Your cart products"
        styles={{ paddingTop: "2%" }}
      />
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
            <div className="order-summary-block">
              <h1>Order Summary</h1>
              <table>
                <tr>
                  <td>Subtotal</td>
                  <td className="amount-column">
                    <FaRupeeSign size={12} />
                    {cartPrice}
                  </td>
                </tr>
                <tr>
                  <td>
                    <DiscountTooltip label="Discount" slabs={slabs} />
                  </td>
                  <td className="amount-column">
                    <FaRupeeSign size={12} color="#3b82f6" />
                    <DiscountTooltip label={`${discount}`} slabs={slabs} />
                  </td>
                </tr>
                <tr>
                  <td className="grand-total">
                    <b>Total</b>
                  </td>
                  <td className="amount-column grand-total">
                    <b>
                      <FaRupeeSign size={window.innerWidth >= 1280 ? 18 : 12} />
                      {cartPrice - (discount)}
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
          <Link to={"/products"} style={{ textDecoration: "none" }}>
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
