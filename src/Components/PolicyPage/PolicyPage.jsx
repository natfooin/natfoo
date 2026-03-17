import React, { useState } from "react";
import "./PolicyPage.css";

const data = [
  {
    title: "Privacy Policy",
    content: "We protect your personal data and never share it with third parties."
  },
  {
    title: "Terms & Conditions",
    content: "By using our website, you agree to follow our terms and policies."
  },
  {
    title: "Shipping & Delivery",
    content: "Orders are delivered within 5–7 business days across India."
  },
  {
    title: "Refund & Cancellation",
    content: "Refunds are available within 7 days of delivery."
  }
];

const PolicyPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion-page">
      <div className="accordion-container">
        <h1>Policies</h1>

        {data.map((item, index) => (
          <div key={index} className="accordion-item">
            <div className="accordion-header" onClick={() => toggle(index)}>
              <h3>{item.title}</h3>
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>

            <div className={`accordion-body ${activeIndex === index ? "open" : ""}`}>
              <p>{item.content}</p>
              
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default PolicyPage; 