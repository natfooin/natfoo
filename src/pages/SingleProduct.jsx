import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productsData from "./../prodcutsData.json";
import Badge from "../Components/ui/Badge/Badge";

import "./SingleProduct.css";
import { TiTick } from "react-icons/ti";
import {FaRupeeSign} from "react-icons/fa"
const SingleProduct = ({ setCartQuantity, setCartProducts }) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState({});
  useEffect(() => {
    setProductData(
      productsData.find((product, index) => product.id === parseInt(id)),
    );
    setQuantity(1)
  }, [id]);
  const subQuantity = () => {
    if (quantity < 2) {
      return;
    }
    setQuantity((prevQuantity) => prevQuantity - 1);
  };
  const addQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleAddToCart = () => {
    console.log(quantity + " PRODUCTS ADDED TO CART");
    setCartQuantity((prevQuantity) => prevQuantity + quantity);
    setCartProducts((prevProducts) => [
      ...prevProducts,
      { ...productData, quantity },
    ]);
    setQuantity(1)
  };

  return (
    <div className="single-product-page-container">
      <div className="product-wrapper">
        <div className="product-display">
          <img src={productData?.image} alt={productData?.name} />
        </div>
        <div className="product-details">
          <h1 className="product-head">{productData?.name}</h1>
          <hr />
          <p className="product-desc">{productData?.desc}</p>
          <div>
            <Badge
              text={productData?.category}
              styles={{ scale: "2", margin: "1rem" }}
            />
            <p className="product-catch">
              <TiTick color="green" size={20} /> Trusted by cutomers
            </p>
          </div>
          <span>
            <h3 className="price"><FaRupeeSign size={22}/>{productData?.price}</h3>
            <h3 className="old-price">
              {productData?.price + productData?.price * 0.1}
            </h3>
            <h3 className="discount-amount">10% Discount</h3>
          </span>
          <div>
            <div className="quatity-setter">
              <button className="sub-quantity" onClick={subQuantity}>
                -
              </button>
              <span>{quantity}</span>
              <button className="add-quantity" onClick={addQuantity}>
                +
              </button>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
