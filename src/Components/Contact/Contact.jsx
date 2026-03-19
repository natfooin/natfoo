import React, { useState, useEffect } from "react";
import "./Contact.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import Button from "../../Components/ui/Button/Button"; 

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
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    document.title = "Contact | NatFoo";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();// stop the default behaviour of the browser
    setView("loading");
    setTimeout(() => {
      setView("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        <div className="contact-side">
          <h2 className="side-title">Connect</h2>
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
              <span>Tenkasi, Tamil Nadu</span>
            </div>
          </div>
        </div>

        <div className="contact-body">
          {view === "form" && (
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
                <label>Message</label>
                <textarea 
                  rows="4" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <Button text="Submit" styles={{width: "100%", height: "48px"}} />
            </form>
          )}

          {view === "loading" && <LoadingView />}
          {view === "success" && <SuccessView reset={() => setView("form")} />}
        </div>
      </div>
    </div>
  );
}

export default Contact;