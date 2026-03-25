import React, { useEffect } from "react";
import "./SuccessModal.css";
import { useNavigate } from "react-router-dom";
const SuccessModal = ({
  isOpen,
  onClose,
  title = "Success!",
  message = "Your order was placed successfully.",
  autoClose = true,
  setCartPrice,
  setDiscount,
  setCartProducts,
  setCartQuantity,
}) => {
  const navi = useNavigate();

  const clearer = () => {
    setCartPrice(0.0);
    setDiscount(0.0);
    setCartProducts([]);
    setCartQuantity(0);
    navi("/");
  };

  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
        clearer();
      }, 4000); // auto close after 4s as of now

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* Success Icon */}
        <div className="success-icon">✓</div>

        {/* Title */}
        <h2 className="modal-title">{title}</h2>

        {/* Message */}
        <p className="modal-message">{message}</p>

        {/* Button */}
        <button
          className="modal-btn"
          onClick={() => {
            onClose();
            clearer();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
