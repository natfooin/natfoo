import React, { useEffect, useState } from "react";
import "./OrderModal.css";
import logo from "../../assets/logo.png";
import sendOrderToWhatsApp from "./whatsApp.js";
function OrderModal({ showModal, setShowModal, cartProducts }) {
  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted Successfully");
    const buyData = {};
    const formData = new FormData(e.target);
    buyData.name = formData.get("name");
    buyData.email = formData.get("email");
    buyData.contact = formData.get("phone");
    buyData.address = formData.get("address");
    buyData.pincode = formData.get("pincode");
    buyData.note = formData.get("note");
    buyData.products = cartProducts;
    console.log(buyData);
    closeModal();
    sendOrderToWhatsApp(buyData);
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
              <img src={logo} width={"15%"} height={"10%"} alt="logo" />
              <h2>Place your order</h2>
            </div>

            <form onSubmit={handleSubmit} className="form">
              <input type="text" placeholder="Full Name" name="name" required />

              <input
                type="email"
                placeholder="Email Address"
                name="email"
                required
              />

              <input
                type="tel"
                placeholder="Phone Number"
                name="phone"
                required
              />

              <textarea
                placeholder="Address"
                rows="2"
                name="address"
                required
              ></textarea>

              <input
                type="text"
                placeholder="Pincode"
                name="pincode"
                required
              />

              <textarea
                placeholder="Additional Note"
                name="note"
                rows="2"
              ></textarea>

              <label className="checkbox">
                <input type="checkbox" required />I agree to the Terms &
                Conditions
              </label>

              <button type="submit" className="submit-btn">
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
