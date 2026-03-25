import React, { useState } from "react";
import "./Contact.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaChevronRight,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import {IoSend} from "react-icons/io5"
import { CiYoutube, CiMail } from "react-icons/ci";
import Button from "../../Components/ui/Button/Button";
import FooterIcon from "./../Footer/FooterIcon";

const sendToWhatsApp = (data) => {
  const phoneNumber = "919042649000";

  const message = `
*NATFOO FOODS - CONTACT*

*Name*: ${data.name}
*Email*: ${data.email}
*Phone*: ${data.number}

*Message*:
${data.message}
  `;

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(url, "_blank");
};

const LoadingView = () => (
  <div className="royal-status">
    <div className="royal-spinner"></div>
    <p>Securing your connection...</p>
  </div>
);

const SuccessView = ({ reset }) => (
  <div className="royal-status success-anim">
    <div className="crown-icon">
      <FaCheckCircle size={70} color="var(--gold)" />
    </div>
    <h2>Message Received</h2>
    <p>
      Your inquiry has been placed in our royal archives. We shall respond with
      haste.
    </p>
    <Button text="Send Another" onClick={reset} />
  </div>
);

function Contact() {
  const [view, setView] = useState("form");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.number ||
      !formData.message
    ) {
      alert("Please fill all fields");
      return;
    }

    setView("loading");

    setTimeout(() => {
      sendToWhatsApp(formData);

      setView("success");
      setFormData({
        name: "",
        email: "",
        number: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="royal-wrapper">
      <div className="royal-viewport">
        <div className="heritage-panel">
          <div className="heritage-content">
            <span className="gold-tag">ESTD 2026</span>
            <h1 className="royal-title">
              Get In <br /> <span>Touch</span>
            </h1>

            <div className="contact-ledger">
              <div className="ledger-entry">
                <FaPhoneAlt className="ledger-icon" />
                <span>+91 98765 43210</span>
              </div>
              <div className="ledger-entry">
                <FaEnvelope className="ledger-icon"  />
                <span>concierge@natfoo.com</span>
              </div>
              <div className="ledger-entry">
                <FaMapMarkerAlt className="ledger-icon" style={{alignItems: "flex-end"}}/>
                <span>Varietas Green Energy Pvt Ltd 
Registered Office: K 804, AWHO, Nerul, Navi Mumbai - 400706. Maharashtra. India.
Corporate Office: 54, 2nd Street, Sriramapuram, Srirangam, Trichy - 620006. Tamilnadu. India.</span>
              </div>
            </div>

            <div className="iconContainer">
              <FooterIcon icon={<FaWhatsapp size={30} color="white" />} />
              <FooterIcon icon={<CiMail size={30} color="white" />} />
              <FooterIcon icon={<CiYoutube size={30} color="white" />} />
              <FooterIcon icon={<FaFacebook size={50} color="white" />} />
              <FooterIcon icon={<FaInstagram size={30} color="white" />} />
            </div>
          </div>
        </div>

        <div className="form-panel">
          <div className="form-inner">
            <h3 className="form-subtitle">Contact Us</h3>

            {view === "form" && (
              <form className="royal-form" onSubmit={handleSubmit}>
                <div className="royal-input-group">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                  />
                  <label>Full Name</label>
                </div>

                <div className="royal-input-group">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                  />
                  <label>Email Address</label>
                </div>

                <div className="royal-input-group">
                  <input
                    type="tel"
                    name="number"
                    required
                    value={formData.number}
                    onChange={handleChange}
                    placeholder=" "
                  />
                  <label>Phone Number</label>
                </div>

                <div className="royal-input-group">
                  <textarea
                    name="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder=" "
                  ></textarea>
                  <label>Your Inquiry</label>
                </div>

                <Button
                  text={`send `}
                  icon={<IoSend size={12} />}
                  className="royal-submit-btn"
                ></Button>
              </form>
            )}

            {view === "loading" && <LoadingView />}
            {view === "success" && (
              <SuccessView reset={() => setView("form")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
