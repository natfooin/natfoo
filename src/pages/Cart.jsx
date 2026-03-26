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
  };

  useEffect(() => {
    // FIX 1: Ensure cartPrice is treated as at least 0 to prevent negative discount math
    const safePrice = Math.max(0, cartPrice);

    const newDiscountSlab = slabs.find((slab) => {
      return (
        safePrice >= slab.min && (slab.max === null || safePrice <= slab.max)
      );
    });

    setDiscount(
      newDiscountSlab ? (newDiscountSlab.discount * safePrice) / 100 : 0,
    );
  }, [cartPrice, slabs, setDiscount]); // Added dependencies for best practice

  useEffect(() => {
    document.title = "Natfoo | Cart";
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
              // FIX 2: Added a unique key using uid to prevent UI glitches when items are removed
              return (
                <React.Fragment key={product.uid}>
                  <CartProduct
                    setCartPrice={setCartPrice}
                    product={product}
                    setCartProducts={setCartProducts}
                    setCartQuantity={setCartQuantity}
                  />
                  <hr style={{ width: "95%", margin: "auto" }} />
                </React.Fragment>
              );
            })}
          </div>
          <div className="order-summary">
            <div className="order-summary-block">
              <h1>Order Summary</h1>
              <table>
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td className="amount-column">
                      <FaRupeeSign size={12} />
                      {/* FIX 3: Display 0 if price somehow dips negative */}
                      {Math.max(0, cartPrice)}
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
                        {/* FIX 4: Final safety check for negative Grand Total */}
                        {Math.max(0, cartPrice - discount)}
                      </b>
                    </td>
                  </tr>
                </tbody>
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