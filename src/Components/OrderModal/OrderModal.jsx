import React, { useEffect, useState } from "react";
import "./OrderModal.css";
import logo from "../../assets/logo.png";
import sendOrderToWhatsApp from "./whatsApp.js";
import sendOrderEmail from "./email.js";

const buttonNotReadyStyles = {
  backgroundColor: "var(--button-red)",
  color: "white",
  cursor: "not-allowed",
};
const buttonReadyStyles = {
  backgroundColor: "#04AA6D",
  color: "white",
  cursor: "pointer",
};
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
    console.log(formFilled);
    console.log(nameData);
    console.log(emailData);
    console.log(contactData);
    console.log(addressData);
    console.log(pincodeData);
    console.log(isChecked);
    if (
      nameData &&
      emailData &&
      contactData &&
      addressData &&
      pincodeData &&
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
    console.log(buyData);
    closeModal();

    setShowSuccessModal(true);
    {
      /* Send to manufacturer whatsapp  */
    }
    // sendOrderToWhatsApp(buyData);

    {
      /* Send to manufacturer email  */
    }
    sendOrderEmail(buyData);

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
              <input
                type="text"
                placeholder="Full Name"
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
                onChange={(e) => handleContactChange(e)}
                required
              />

              <textarea
                placeholder="Address"
                rows="2"
                name="address"
                onChange={(e) => handleAddressChange(e)}
                required
              ></textarea>

              <input
                type="text"
                placeholder="Pincode"
                name="pincode"
                onChange={(e) => handlePincodeChange(e)}
                required
              />

              <label className="checkbox">
                <input
                  type="checkbox"
                  onChange={() => setIsChecked(!isChecked)}
                  id="checkForTC"
                  required
                />
                I agree to the Terms & Conditions
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
