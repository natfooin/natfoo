import "./Products.css";
import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import Button from "./../ui/Button/Button";
import { Link } from "react-router-dom";
const Products = ({id, image, name, price }) => {
  return (
    <div className="page-wrapper">
      <div className="vertical-card">
        <div className="image-container">
          <img src={image} alt="Product" className="card-img" loading="lazy" decoding="async"/>
        </div>

        <div className="content-container">
          <h1 className="product-title">{name}</h1>
          <div className="footer-row">
            <div className="price-block">
             <FaRupeeSign size={14} /> <span className="amount">{price}</span>
            </div>
            <div className="button">
              <Link to={`/product/${id}`}>
                <Button
                  cn={"button-n-one"}
                  text={"Buy now"}
                  minWidth={70}
                  height={30}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
