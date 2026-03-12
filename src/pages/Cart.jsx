import React, { useEffect } from "react";
import "./Cart.css";
import CartProduct from "../Components/CartProduct/CartProduct";
import Heading from "../Components/ui/Heading/Heading";
import { BiCartAlt } from "react-icons/bi";
import {FaRupeeSign} from "react-icons/fa";
const Cart = ({ cartProducts, setCartProducts, setCartQuantity }) => {
  return (
    <>
      <Heading title="Cart" subTitle="Your cart products" />
      {cartProducts.length !== 0 ? (
        <div className="cart-container">
          <div className="products-list">
            {cartProducts.map((product) => {
              return (
                <>
                  <CartProduct
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
                  <td className="amount-column"><FaRupeeSign size={12}/>21412</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td className="amount-column"><FaRupeeSign size={12} />823</td>
                </tr>
                <tr>
                  <td className="grand-total">
                    <b>Total</b>
                  </td>
                  <td className="amount-column grand-total">
                    <b><FaRupeeSign size={window.innerWidth >= 1280 ? 18 : 12} />12342</b>
                  </td>
                </tr>
              </table>
              <hr />
              <button className="place-order-btn">Place Order</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-records">
          <h1>Add products in cart.</h1>
          <button>
            <BiCartAlt size={22} />
            Add Now
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
