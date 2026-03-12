import React, { useEffect } from "react";
import "./Cart.css";
import CartProduct from "../Components/CartProduct/CartProduct";
const Cart = ({ cartProducts, setCartProducts, setCartQuantity }) => {
  return (
    <div className="cart-container">
      <div className="products-list">
        {cartProducts.map((product) => {
          return (
            <CartProduct
              product={product}
              setCartProducts={setCartProducts}
              setCartQuantity={setCartQuantity}
            />
          );
        })}
      </div>
      <div className="order-summary">
        <div className="orer-summary-block">
          <h1>Order Summary</h1>
          <table>
            <tr>
              <td>Subtotal</td>
              <td>21412</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>823</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>19823</td>
            </tr>
          </table>
          <button>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
