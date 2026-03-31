import React from "react";
import "./PolicyPage.css";
import { useEffect } from "react";
import { 
  FaUserShield, FaDatabase, FaBullseye, FaShareAlt, 
  FaCookieBite, FaHistory, FaLock, FaUserEdit, 
  FaExternalLinkAlt, FaSyncAlt, FaEnvelopeOpenText, FaGavel 
} from "react-icons/fa";

function PolicyPage() {
  useEffect(() => {
      document.title = "Natfoo | Privacy and Policy";
    }, []);
  return (
    <div className="policy-wrapper">
      <div className="policy-card">
        <header className="policy-header">
         
          <h1 className="main-title">Privacy Policy</h1>
          <p className="effective-date"  style={{fontSize:'1.4rem',fontWeight:"600"}}>Effective Date : 01.04.2026</p>
        </header>

        <div className="policy-body">
          {/* 1. Introduction */}
          <section className="policy-item">
            <div className="item-header">
              <FaUserShield className="section-icon" />
              <h2 className="item-title">1. Introduction:</h2>
            </div>
            <p>
              This Privacy Policy describes how <>“www.natfoo.in”</>, 
              operated by <>“VARIETAS GREEN ENERGY PVT LTD”</> ("Company", 
              "we", "our", "us"), collects, uses, and protects your personal information 
              when you use our website or mobile application ("Platform").
            </p>
            <p>By accessing or using the Platform, you agree to this Privacy Policy.</p>
          </section>

          {/* 2. Information We Collect */}
          <section className="policy-item">
            <div className="item-header">
              <FaDatabase className="section-icon" />
              <h2 className="item-title">2. Information We Collect:</h2>
            </div>
            <div className="policy-sub-section">
              <h3 className="sub-heading">a. Personal Information</h3>
              <ul className="policy-bullets">
                <li>Name</li>
                <li>Email</li>
                <li>Mobile</li>
                <li>Shipping Address</li>
              </ul>
            </div>
            <div className="policy-sub-section">
              <h3 className="sub-heading">b. Payment Information</h3>
              <ul className="policy-bullets">
                <li>Payment details will be processed securely through <>“CASHFREE”</>- third-party payment gateway.</li>
                <li>We do not store card or banking details.</li>
              </ul>
            </div>
            <div className="policy-sub-section">
              <h3 className="sub-heading">c. Technical Information</h3>
              <ul className="policy-bullets">
                <li>IP address.</li>
                <li>Device type and browser.</li>
                <li>Cookies and usage data.</li>
              </ul>
            </div>
          </section>

          {/* 3. Purpose of Data Collection */}
          <section className="policy-item">
            <div className="item-header">
              <FaBullseye className="section-icon" />
              <h2 className="item-title">3. Purpose of Data Collection:</h2>
            </div>
            <p>We use your data to:</p>
            <ul className="policy-bullets">
              <li>Process and dispatch orders via <>“INDIA POST”</>.</li>
              <li>Provide order updates and customer support.</li>
              <li>Improve platform functionality.</li>
              <li>Send offers and promotions (with opt-out option).</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          {/* 4. Sharing of Information */}
          <section className="policy-item">
            <div className="item-header">
              <FaShareAlt className="section-icon" />
              <h2 className="item-title">4. Sharing of Information:</h2>
            </div>
            <p>We may share your data with:</p>
            <ul className="policy-bullets">
              <li><>“INDIA POST”</> for order delivery.</li>
              <li>Payment gateway providers.</li>
              <li>IT and analytics service providers.</li>
            </ul>
            <p>We do not sell or rent personal data to third parties.</p>
          </section>

          {/* 5. Cookies Policy */}
          <section className="policy-item">
            <div className="item-header">
              <FaCookieBite className="section-icon" />
              <h2 className="item-title">5. Cookies Policy:</h2>
            </div>
            <p>We use cookies to enhance user experience, analyse traffic, and remember preferences. You may disable cookies via browser settings.</p>
          </section>

          {/* 6. Data Retention */}
          <section className="policy-item">
            <div className="item-header">
              <FaHistory className="section-icon" />
              <h2 className="item-title">6. Data Retention:</h2>
            </div>
            <p>We retain personal data only as long as necessary for:</p>
            <ul className="policy-bullets">
              <li>Order fulfilment.</li>
              <li>Legal compliance.</li>
              <li>Internal business purposes.</li>
            </ul>
          </section>

          {/* 7. Data Security */}
          <section className="policy-item">
            <div className="item-header">
              <FaLock className="section-icon" />
              <h2 className="item-title">7. Data Security:</h2>
            </div>
            <p>We implement reasonable security practices as per applicable Indian laws. However, no digital system is completely secure.</p>
          </section>

          {/* 8. User Rights */}
          <section className="policy-item">
            <div className="item-header">
              <FaUserEdit className="section-icon" />
              <h2 className="item-title">8. User Rights:</h2>
            </div>
            <p>You have the right to:</p>
            <ul className="policy-bullets">
              <li>Access your data.</li>
              <li>Correct inaccurate data.</li>
              <li>Request deletion.</li>
              <li>Opt-out of marketing communications.</li>
            </ul>
            <p>Requests can be made via the contact details below.</p>
          </section>

          {/* 9. Third-Party Links */}
          <section className="policy-item">
            <div className="item-header">
              <FaExternalLinkAlt className="section-icon" />
              <h2 className="item-title">9. Third-Party Links:</h2>
            </div>
            <p>Our Platform may contain links to external websites. We are not responsible for their privacy practices.</p>
          </section>

          {/* 10. Policy Updates */}
          <section className="policy-item">
            <div className="item-header">
              <FaSyncAlt className="section-icon" />
              <h2 className="item-title">10. Policy Updates:</h2>
            </div>
            <p>We may update this Privacy Policy periodically. Continued use of the Platform indicates acceptance of changes.</p>
          </section>

          {/* 11. Contact Details */}
          <section className="policy-item">
            <div className="item-header">
              <FaEnvelopeOpenText className="section-icon" />
              <h2 className="item-title">11. Contact Details:</h2>
            </div>
            <p>Email: <>natfoocare@gmail.com</></p>
            <p>Address: K 804, Dara Enclave, AWHO, Nerul, Navi Mumbai – 400706. Maharashtra. India.</p>
          </section>

          {/* 12. Grievance Officer */}
          <section className="policy-item">
            <div className="item-header">
              <FaGavel className="section-icon" />
              <h2 className="item-title">12. Grievance Officer (As per IT Act, 2000):</h2>
            </div>
            <p>Name: <>Ms.Varshini</></p>
            <p>Email: <>natfoocare@gmail.com</></p>
            <p>Response Time: Within 30 days</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PolicyPage;