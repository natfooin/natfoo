import React, { useState, useEffect } from "react";
import "./Contact.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import Button from "../../Components/ui/Button/Button"; 
import FooterIcon from "./../Footer/FooterIcon";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
const LoadingView = () => ( 
  <div className="status-view">
    <div className="loader"></div>
    <p>Sending...</p>
  </div>
);

const SuccessView = ({ reset }) => (
  <div className="status-view success">
    <FaCheckCircle size={60} color="var(--gold)" />
    <h2>Sent!</h2>
    <p>We will contact you soon.</p>
    <Button text="New Message" onClick={reset} styles={{marginTop: "20px"}} />
  </div>
);

function Contact() {
  const [view, setView] = useState("form"); 
  const [formData, setFormData] = useState({ name: "", email: "", message: "",number:"" });

  const handleSubmit = (e) => {
    e.preventDefault();// stop the default behaviour of the browser
    setView("loading");
    setTimeout(() => {
      setView("success");
      setFormData({ name: "", email: "", message: "" ,number:""});
    }, 1500);
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        <div className="contact-side">
            <div className="side-group">
            <div className="side-item">
              <FaPhoneAlt className="side-icon" />
              <span>+91 98765 43210</span>
            </div>
            <div className="side-item">
              <FaEnvelope className="side-icon" />
              <span>support@natfoo.com</span>
            </div>
            <div className="side-item">
              <FaMapMarkerAlt className="side-icon" />
              <span>Trichy, Tamil Nadu</span>
            </div>
          </div>
            <div className="iconContainer">
            <FooterIcon icon={<FaWhatsapp size={30} color="white" />} />
            <FooterIcon icon={<CiMail size={30} color="white" />} />
            <FooterIcon icon={<CiYoutube size={30} color="white" />} />
            <FooterIcon icon={<FaXTwitter size={30} color="white" />} />
            <FooterIcon icon={<FaFacebook size={50} color="white" />} />
            <FooterIcon icon={<FaInstagram size={30} color="white" />} />
          </div>
        </div>

        <div className="contact-body">
          {view === "form" && (
           <>
            <form className="contact-ui" onSubmit={handleSubmit}>
              <h3>Message Us</h3>
              <div className="field">
                <label>Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="field">
                <label>Phone no.</label>
                <input 
                  type="number" 
                  required 
                  value={formData.number}
                  onChange={(e) => setFormData({...formData, number: e.target.value})}
                />
              </div>
              <div className="field">      
                <label>Message</label>
                <textarea 
                  rows="9" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <Button text="Submit" styles={{width: "100%", height: "48px"}} />
            </form>
            
           </>
          )}


          {view === "loading" && <LoadingView />}
          {view === "success" && <SuccessView reset={() => setView("form")} />}
         
        </div>
        <div className="contact-right">
          <h1>C</h1>
          <h1>O</h1>
          <h1>N</h1>
          <h1>T</h1>
          <h1>A</h1>
          <h1>C</h1>
          <h1>T</h1>
        </div>
      </div>
    </div>
  );
}

export default Contact;