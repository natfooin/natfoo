import React, { useEffect, useState } from "react";
import "./Cart.css";
import CartProduct from "../Components/CartProduct/CartProduct";
import Heading from "../Components/ui/Heading/Heading";
import { BiCartAlt } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import DiscountTooltip from "../Components/DiscountToolTip/DiscountToolTip";
import slabs from "../DiscountSlabs.json";
const Cart = ({
  setCartPrice,
  cartPrice,
  cartProducts,
  setCartProducts,
  setCartQuantity,
  setShowModal,
  discount,
  setDiscount,
}) => {
  const checkOutHandler = () => {
    setShowModal(true);

    // After succesfull order - cartCleaning

    {
      /* setCartProducts([]) 
    setCartQuantity(0)
    setCartPrice(0) */
    }
  };

  useEffect(() => {
    const newDiscountSlab = slabs.find((slab) => {
      return (
        cartPrice >= slab.min && (slab.max === null || cartPrice <= slab.max)
      );
    });

    setDiscount(
      newDiscountSlab ? (newDiscountSlab.discount * cartPrice) / 100 : 0,
    );
  }, [cartPrice]);
  useEffect(() => {
    document.title = "Cart";
  }, []);

  return (
    <>
      <Heading
        title="Cart"
        subTitle="Your cart products"
        styles={{ paddingTop: "2%" }}
        titleColor="var(--heading)"
        subTitleColor="var(--site-honey-badger)"
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
                    <Link to={"/#discount"}>
                      <DiscountTooltip label="Discount" slabs={slabs} />
                    </Link>
                  </td>
                  <td className="amount-column">
                    <FaRupeeSign size={12} color="#3b82f6" />
                    <Link to={"/#discount"}>
                      <DiscountTooltip label={`${discount}`} slabs={slabs} />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="grand-total">
                    <b>Total</b>
                  </td>
                  <td className="amount-column grand-total">
                    <b>
                      <FaRupeeSign size={window.innerWidth >= 1280 ? 18 : 12} />
                      {cartPrice - discount}
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
