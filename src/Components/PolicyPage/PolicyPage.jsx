import React, { useEffect } from "react";
import "./PolicyPage.css";
import { FaUserShield, FaDatabase, FaCookieBite, FaLock } from "react-icons/fa";

function PolicyPage() {


  return (
    <div className="policy-wrapper">
      <div className="policy-card">
        <header className="policy-header">
          <div className="header-icon">
            <FaUserShield size={45} />
          </div>
          <h1>Privacy Policy</h1>
          <p>Your privacy is our priority. Learn how we protect your data.</p>
        </header>

        <div className="policy-content">
          <section className="policy-section">
            <div className="section-title">
              <FaDatabase className="icon" />
              <h2>Information Collection</h2>
            </div>
            <p>
              We collect information you provide directly to us when you create an account, 
              place an order, or contact us. This includes your name, email address, 
              phone number, and shipping address in Tenkasi or elsewhere.
            </p>
          </section>

          <section className="policy-section">
            <div className="section-title">
              <FaCookieBite className="icon" />
              <h2>Cookies & Tracking</h2>
            </div>
            <p>
              Our website uses cookies to enhance your shopping experience. Cookies help us 
              remember your cart items and understand your preferences based on previous 
              site activity, allowing us to provide improved services.
            </p>
          </section>

          <section className="policy-section">
            <div className="section-title">
              <FaLock className="icon" />
              <h2>Data Security</h2>
            </div>
            <p>
              We implement a variety of security measures to maintain the safety of your 
              personal information. Your data is contained behind secured networks and is 
              only accessible by a limited number of persons who have special access rights.
            </p>
          </section>

          <section className="policy-section">
            <div className="section-title">
              <div className="indicator"></div>
              <h2>Third-Party Disclosure</h2>
            </div>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable 
              information to outside parties. This does not include trusted third parties 
              who assist us in operating our website or conducting our business.
            </p>
          </section>
        </div>

        <footer className="policy-footer">
          <p>Last Updated: March 2026</p>
          <p>Contact us at <span>privacy@natfoo.com</span> for any concerns.</p>
        </footer>
      </div>
    </div>
  );
}

export default PolicyPage;