import React, { useEffect, useState } from "react";
import "./OrderModal.css";
import logo from "/logo.png";
import sendOrderToWhatsApp from "./whatsApp.js";
import sendOrderEmail from "./email.js";
import { Link } from "react-router-dom";
const buttonNotReadyStyles = {
  backgroundColor: "var(--button-red)",
  color: "white",
  cursor: "not-allowed",
};
const buttonReadyStyles = {
  backgroundColor: "#25D366",
  color: "white",
  cursor: "pointer",
};

const phoneRegex = /^[0-9]{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pincodeRegex = /^[0-9]{6}$/;

function OrderModal({
  showModal,
  setShowModal,
  cartProducts,
  discount,
  cartPrice,
  setShowSuccessModal,
}) {
  const closeModal = () => {
    setShowModal(false);
  };

  const [nameData, setNameData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [contactData, setContactData] = useState("");
  const [addressData, setAddressData] = useState("");
  const [pincodeData, setPincodeData] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [formFilled, setFormFilled] = useState(false);

  useEffect(() => {
  if (
    nameData &&
    emailRegex.test(emailData) &&
    phoneRegex.test(contactData) &&
    addressData &&
    pincodeRegex.test(pincodeData) &&
    isChecked
  ) {
    setFormFilled(true);
  } else {
    setFormFilled(false);
  }
}, [nameData, emailData, contactData, addressData, pincodeData, isChecked]);
  const handleNameChange = (e) => {
    setNameData(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmailData(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddressData(e.target.value);
  };
  const handleContactChange = (e) => {
    setContactData(e.target.value);
  };
  const handlePincodeChange = (e) => {
    setPincodeData(e.target.value);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!phoneRegex.test(contactData)) {
    alert("Phone number must be exactly 10 digits");
    return;
  }

  if (!emailRegex.test(emailData)) {
    alert("Enter a valid email address");
    return;
  }

  if (!pincodeRegex.test(pincodeData)) {
    alert("Pincode must be exactly 6 digits");
    return;
  }

  alert("Form Submitted Successfully");

  const buyData = {};
  const formData = new FormData(e.target);

  buyData.name = formData.get("name");
  buyData.email = formData.get("email");
  buyData.contact = formData.get("phone");
  buyData.address = formData.get("address");
  buyData.pincode = formData.get("pincode");
  buyData.products = cartProducts;
  buyData.subtotal = cartPrice;
  buyData.discountAmount = discount;
  buyData.total = cartPrice - discount;

  setAddressData("");
  setPincodeData("");
  setNameData("");
  setEmailData("");
  setContactData("");
  setIsChecked(false);

  closeModal();
  setShowSuccessModal(true);

  sendOrderEmail(buyData);
};

  return (
    showModal && (
      <div className="container">
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              ✖
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={logo}
                width={"15%"}
                height={"10%"}
                alt="logo"
                loading="lazy"
              />
              <h2>Delivery Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="form">
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={(e) => handleNameChange(e)}
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                name="email"
                onChange={(e) => handleEmailChange(e)}
                required
              />

              <input
  type="tel"
  placeholder="Phone Number"
  name="phone"
  maxLength={10}
  onChange={(e) => handleContactChange(e)}
  onKeyDown={(e) => {
    if (
      !/[0-9]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  }}
  onPaste={(e) => {
    const paste = e.clipboardData.getData("text");
    if (!/^[0-9]{10}$/.test(paste)) {
      e.preventDefault();
    }
  }}
  required
/>

              <textarea
                placeholder="Delivery Address"
                rows="2"
                name="address"
                onChange={(e) => handleAddressChange(e)}
                required
              ></textarea>

              <input
  type="text"
  placeholder="Pincode"
  name="pincode"
  maxLength={6}
  onChange={(e) => handlePincodeChange(e)}
  onKeyDown={(e) => {
    if (
      !/[0-9]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  }}
  required
/>

              <label className="checkbox">
                <input
                  type="checkbox"
                  onChange={() => setIsChecked(!isChecked)}
                  id="checkForTC"
                  required
                />
                I agree to the <Link to={"/terms-and-condition"} style={{textDecoration:"none"}} onClick={()=> setShowModal(false)}>Terms & Conditions</Link>
              </label>

              <button
                type="submit"
                className="submit-btn"
                style={formFilled ? buttonReadyStyles : buttonNotReadyStyles}
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

export default OrderModal;
