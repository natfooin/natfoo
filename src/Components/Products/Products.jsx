import "./products.css";
import React from "react";
import Button from "./../ui/Button/Button";
const Products = ({ image, name, price }) => {
  return (
    <div className="page-wrapper">
      <div className="vertical-card">
        <div className="image-container">
          <img src={image} alt="Product" className="card-img" />
        </div>

        <div className="content-container">
          <h1 className="product-title">{name}</h1>
          <div className="footer-row">
            <div className="price-block">
              <span className="amount">{price}</span>
            </div>
            <div className="button">
              <Button
                cn={"button-n-one"}
                text={"Buy now"}
                minWidth={70}
                height={30}
              />  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
