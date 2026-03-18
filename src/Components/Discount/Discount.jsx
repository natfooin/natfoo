import React from "react";
import './Discount.css'
const Discount = () => {
  return (
    <div>
      <div className="discount-section" id="discount">
        <h2 className="discount-title">Special Purchase Discounts</h2>

        <div className="discount-grid">
          <div className="discount-card">
            <span>₹500 - ₹1000</span>
            <h3>10% OFF</h3>
          </div>

          <div className="discount-card">
            <span>₹1001 - ₹1500</span>
            <h3>12% OFF</h3>
          </div>

          <div className="discount-card">
            <span>₹1501 - ₹2000</span>
            <h3>15% OFF</h3>
          </div>

          <div className="discount-card">
            <span>₹2001 - ₹5000</span>
            <h3>20% OFF</h3>
          </div>

          <div className="discount-card">
            <span>₹5000 - ₹10000</span>
            <h3>25% OFF</h3>
          </div>

          <div className="discount-card highlight">
            <span>₹10000+</span>
            <h3>30% OFF</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;
