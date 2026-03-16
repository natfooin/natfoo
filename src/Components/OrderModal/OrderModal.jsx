import React, { useEffect, useState } from "react";
import "./OrderModal.css";
import logo from "../../assets/logo.png";
import sendOrderToWhatsApp from "./whatsApp.js";
import sendOrderEmail from "./email.js";
function OrderModal({ showModal, setShowModal, cartProducts }) {
  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
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
    {/* Send to manufacturer whatsapp  */}
    // sendOrderToWhatsApp(buyData);
    
    {/* Send to manufacturer email  */}
    sendOrderEmail(buyData)
    

    // const orderHTML = sendOrderEmail(buyData);
    // const emailData = new FormData();
    // emailData.append("access_key", "578ab598-4c33-4680-b3e2-937ddc9c7a3b");
    // emailData.append("subject", "New Order Received - Natfoo");
    // emailData.append("from_name", "Natfoo Orders");
    // emailData.append("replyto", buyData.email);

    // // IMPORTANT
    // emailData.append("message", orderHTML);
    // const response = await fetch("https://api.web3forms.com/submit", {
    //   method: "POST",
    //   body: emailData,
    // });

    // if (response.ok) {
    //   alert("Order submitted successfully");
    //   setShowModal(false);
    // } else {
    //   alert("Failed to submit order");
    // }
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
