import React, { useState, useEffect } from "react";
import "./Contact.css";
import { BsBuildingsFill } from "react-icons/bs";

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
import { IoSend } from "react-icons/io5";
import { CiYoutube, CiMail } from "react-icons/ci";
import Button from "../../Components/ui/Button/Button";
import FooterIcon from "./../Footer/FooterIcon";
import { RxFontStyle } from "react-icons/rx";

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
      Your inquiry has been placed, our team will contact you soon. <br />Thank you !
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

  useEffect(() => {
    document.title = "Natfoo | Contact";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const phoneRegex = /^[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !formData.name ||
    !formData.email ||
    !formData.number ||
    !formData.message
  ) {
    alert("Please fill all fields");
    return;
  }

  if (!phoneRegex.test(formData.number)) {
    alert("Phone number must be exactly 10 digits");
    return;
  }

  if (!emailRegex.test(formData.email)) {
    alert("Enter a valid email address");
    return;
  }

  setView("loading");

  setTimeout(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbwnadt4j0uRJ9YpmqLarVn2dVp7vwbGJ7-NJKmke-ODQqeEvhkQ7fZUOPWO8Rueu-y3/exec",
      {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.number,
          message: formData.message,
        }),
      }
    );

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
            <h1 className="royal-title" style={{color:"var(--gold)", fontFamily:"inherit"}}>
              Get In Touch
            </h1>
             <div className="ledger-entry" style={{ gap: "5px" }}>
                <BsBuildingsFill className="ledger-icon" />
                <span >NATFOO</span>
              </div>
               <div
                className="ledger-entry"
                style={{ alignItems: "flex-start", gap: "3px" }}
              >
                <div style={{ paddingTop: "2px" }}>
                  <FaMapMarkerAlt color="gold" />
                </div>
                <span>
                  Varietas Green Energy Pvt Ltd Registered Office: K 804, AWHO,
                  Nerul, Navi Mumbai - 400706. Maharashtra. India.
                </span>
              </div>
              <div
                className="ledger-entry"
                style={{ alignItems: "flex-start", gap: "3px" }}
              >
                <div style={{ paddingTop: "2px" }}>
                  <FaMapMarkerAlt color="gold" />
                </div>
                <span>
                  Corporate Office: 54, 2nd Street, Sriramapuram, Srirangam,
                  Trichy - 620006. Tamilnadu. India.
                </span>
              </div>
            </div>
              <div className="ledger-entry" style={{ gap: "5px" }}>
                <FaEnvelope className="ledger-icon" />
                <span>natfooin@gmail.com</span>
              </div>
            <div className="contact-ledger" style={{ gap: "2px" }}>
              <div className="ledger-entry" style={{ gap: "5px" }}>
                <FaPhoneAlt className="ledger-icon" />
                <span>+91 98765 43210</span>
              </div>
             

            <div className="iconContainer" style={{paddingTop:"1rem"}}>
              <FooterIcon
                icon={<FaWhatsapp size={25} color="white" />}
                link={"https://wa.me/919042649000"}
              />
              <FooterIcon
                icon={<CiMail size={25} color="white" />}
                link={"mailto:natfooin@gmail.com"}
              />
              <FooterIcon
                icon={<CiYoutube size={25} color="white" />}
                link={
                  "https://youtube.com/@natfookitchen95?si=4hSvWVSIKXkATsdg"
                }
              />
              <FooterIcon
                icon={<FaFacebook size={35} color="white" />}
                link={"https://www.facebook.com/share/1FYPUa9BeU/"}
              />
              <FooterIcon
                icon={<FaInstagram size={25} color="white" />}
                link={
                  "https://www.instagram.com/natfoo_naturalfoods?igsh=MWxoam1oY2pkZTF2NQ=="
                }
              />
            </div>
          </div>
        </div>

        <div className="form-panel">
          <div className="form-inner">

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
                    placeholder=" "
                    maxLength={10}
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
                  text={`Submit `}
                  className="royal-submit-btn"
                  styles={{fontSize:"1.5rem", padding:"0.75rem"}}
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
