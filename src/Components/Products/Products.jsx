import './products.css';
import React from 'react';
const Products = () => {
  
  return (
    <div className="page-wrapper">
      <div className="vertical-card">
        <div className="image-container">
          <img 
            src="" 
            alt="Product" 
            className="card-img"
          />
        
        </div>

        <div className="content-container">
          <h3 className="category-tag">Limited Collection</h3>
          <h1 className="product-title">djvijfjfkjejkfjf</h1>
          <p className="product-desc">
            Experience ultimate comfort with our sustainable millet-fiber lining 
            and deep-olive waterproof exterior.
          </p>

          <div className="footer-row">
            <div className="price-block">
              <span className="amount">149</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
