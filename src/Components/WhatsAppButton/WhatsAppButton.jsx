import React from "react";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  const phoneNumber = "919962199321"; // replace with your number

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <div className="whatsapp-sticky" onClick={handleClick}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
        alt="WhatsApp"
        className="whatsapp-icon"
        loading="eager"
        
      />
      <span className="whatsapp-text">WhatsApp</span>
    </div>
  );
};

export default WhatsAppButton;