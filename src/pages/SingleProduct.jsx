import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productsData from "./../prodcutsData.json";
import Badge from "../Components/ui/Badge/Badge";
import "./SingleProduct.css";
import { TiTick } from "react-icons/ti";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import DetailCard from "../Components/DetailCard/DetailCard";

const SingleProduct = ({ setCartPrice, setCartQuantity, setCartProducts }) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState({});
  useEffect(() => {
    const product = productsData.find((product) => product.id === parseInt(id));

    setProductData(product);
    setQuantity(1);
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

  const handleAddToCart = (amount) => {
    console.log(quantity + " PRODUCTS ADDED TO CART");
    console.log("Amount:" + amount);
    setCartQuantity((prevQuantity) => prevQuantity + quantity);
    setCartProducts((prevProducts) => [
      ...prevProducts,
      { ...productData, quantity, uid: crypto.randomUUID() },
    ]);
    setQuantity(1);
    setCartPrice((prevPrice) => prevPrice + amount * quantity);
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
            <h3 className="price">
              <FaRupeeSign size={22} />
              {productData?.price}
            </h3>
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
            <Link to={"/"} style={{ textDecoration: "none" }}>
              {" "}
              {/* Redirection to /products */}
              <button
                className="add-to-cart-btn"
                onClick={(amount) => handleAddToCart(productData?.price)}
              >
                Add to Cart
              </button>
            </Link>
          </div>
        </div>
      </div>
        <h2 className="product-info-title">Product Information</h2>
      <div className="details-section">
        {" "}
        <DetailCard
          header="Why Choose NATFOO Foxtail Millet Noodles?"
          content={productData?.content?.[0] || []}
        ></DetailCard>
        <DetailCard
          header="Easy to Cook"
          content={productData?.content?.[1] || []}
        ></DetailCard>
      </div>
    </div>
  );
};

export default SingleProduct;
