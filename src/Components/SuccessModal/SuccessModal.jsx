import React, { useEffect } from "react";
import "./SuccessModal.css";

const SuccessModal = ({ isOpen, onClose, title = "Success!", message = "Your action was completed successfully.", autoClose = true }) => {

  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // auto close after 4s as of now

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        
        {/* Success Icon */}
        <div className="success-icon">
          ✓
        </div>

        {/* Title */}
        <h2 className="modal-title">{title}</h2>

        {/* Message */}
        <p className="modal-message">{message}</p>

        {/* Button */}
        <button className="modal-btn" onClick={onClose}>
          OK
        </button>

      </div>
    </div>
  );
};

export default SuccessModal;