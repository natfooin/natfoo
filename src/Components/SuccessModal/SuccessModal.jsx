import React, { useEffect } from "react";
import "./SuccessModal.css";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
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

  const { width, height } = useWindowSize();

  // useEffect(() => {
  //   if (isOpen && autoClose) {
  //     const timer = setTimeout(() => {
  //       onClose();
  //       clearer();
  //     }, 4000); // auto close after 4s as of now

  //     return () => clearTimeout(timer);
  //   }
  // }, [isOpen, autoClose, onClose]);

  if (!isOpen) return null;
  return (
    <>
      <Confetti
        key={isOpen}
        width={width || window.innerWidth}
        height={height || window.innerHeight}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 20000,
          pointerEvents: "none",
        }}
      />

      <div className="modal-overlay">
        <div className="modal-box">
          {/* Success Icon */}
          <div className="success-icon"><img src="/package-done.gif" alt="Success" width={"55px"} style={{borderRadius:"50%"}}/></div>

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
    </>
  );
};

export default SuccessModal;
