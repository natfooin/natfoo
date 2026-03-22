import React, { useState, useEffect } from "react";
import "./Contact.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaChevronRight,
} from "react-icons/fa";
import Button from "../../Components/ui/Button/Button";
import FooterIcon from "./../Footer/FooterIcon";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
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
    message: "",
    number: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setView("loading");
    setTimeout(() => {
      setView("success");
      setFormData({ name: "", email: "", message: "", number: "" });
    }, 2000);
  };

  return (
    <div className="royal-wrapper">
      <div className="royal-viewport">
        <div className="heritage-panel">
          <div className="heritage-content">
            <span className="gold-tag">ESTD 2026</span>
            <h1 className="royal-title">
              Get In <br />
              <span>Touch</span>
            </h1>

            <div className="contact-ledger">
              <div className="ledger-entry">
                <FaPhoneAlt className="ledger-icon" />
                <span>+91 98765 43210</span>
              </div>
              <div className="ledger-entry">
                <FaEnvelope className="ledger-icon" />
                <span>concierge@natfoo.com</span>
              </div>
              <div className="ledger-entry">
                <FaMapMarkerAlt className="ledger-icon" />
                <span>Trichy, Tamil Nadu</span>
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
                <h3 className="form-subtitle" style={{ textAlign: "center" ,top:'30PX',position:"absolute",textDecoration:"1px underline",textDecorationColor:"var(--gold)"}}>
                  Contact Us
                </h3>
            {view === "form" && (
              <form className="royal-form" onSubmit={handleSubmit}>

                <div className="royal-input-group">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder=" "
                  />
                  <label>Full Name</label>
                </div>

                <div className="royal-input-group">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder=" "
                  />
                  <label>Email Address</label>
                </div>

                <div className="royal-input-group">
                  <input
                    type="tel"
                    required
                    value={formData.number}
                    onChange={(e) =>
                      setFormData({ ...formData, number: e.target.value })
                    }
                    placeholder=" "
                  />
                  <label>Phone Number</label>
                </div>

                <div className="royal-input-group">
                  <textarea
                    rows="5"
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder=" "
                  ></textarea>
                  <label>Your Inquiry</label>
                </div>

                <Button name="submit" className="royal-submit-btn">
                  SEND MESSAGE <FaChevronRight size={12} />
                </Button>
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
