import React from "react";
import "./TermsPage.css";
import { useEffect } from "react";
import { 
  FaGavel, FaUserShield, FaClipboardList, FaBoxOpen, 
  FaTag, FaFileContract, FaCreditCard, FaTruck, 
  FaHistory, FaUserSlash, FaCopyright, FaBalanceScale, 
  FaExclamationTriangle, FaCloudSun, FaEdit 
} from "react-icons/fa";
import { MdOutlinePolicy } from "react-icons/md";

function TermsPage() {
  useEffect(() => {
        document.title = "Natfoo | Terms and Conditions";
      }, []);
  return (
    <div className="terms-wrapper">
      <div className="terms-card">
        <header className="terms-header">
          <h1 className="main-title">TERMS AND CONDITIONS</h1>
          <p className="effective-date" style={{fontSize:'1.4rem',fontWeight:"600"}}>Effective Date: 01.04.2026</p>
        </header>

        <div className="terms-body">
          {/* 1. Introduction */}
          <section className="terms-item">
            <div className="item-header">
              <MdOutlinePolicy className="section-icon" />
              <h2 className="item-title">1. Introduction:</h2>
            </div>
            <p>
              These Terms and Conditions govern your use of "www.natfoo.in", owned and operated by <>"VARIETAS GREEN ENERGY PVT LTD"</> ("Company", "we", "our", "us").
            </p>
            <p>By using the Platform (Website/Mobile application), you agree to these Terms and Conditions.</p>
          </section>

          {/* 2. Eligibility */}
          <section className="terms-item">
            <div className="item-header">
              <FaUserShield className="section-icon" />
              <h2 className="item-title">2. Eligibility:</h2>
            </div>
            <p>You must be at least 18 years old or accessing under parental/guardian supervision.</p>
          </section>

          {/* 3. Account Responsibility */}
          <section className="terms-item">
            <div className="item-header">
              <FaClipboardList className="section-icon" />
              <h2 className="item-title">3. Account Responsibility:</h2>
            </div>
            <ul className="terms-bullets">
              <li>You agree to provide accurate details.</li>
              <li>You are responsible for maintaining account confidentiality.</li>
            </ul>
          </section>

          {/* 4. Products */}
          <section className="terms-item">
            <div className="item-header">
              <FaBoxOpen className="section-icon" />
              <h2 className="item-title">4. Products:</h2>
            </div>
            <ul className="terms-bullets">
              <li>"www.natfoo.in" offers Natural food products for online purchase.</li>
              <li>Orders are subject to acceptance and availability.</li>
              <li>We reserve the right to cancel orders due to errors, stock issues, or suspected fraud.</li>
            </ul>
          </section>

          {/* 5. Pricing */}
          <section className="terms-item">
            <div className="item-header">
              <FaTag className="section-icon" />
              <h2 className="item-title">5. Pricing:</h2>
            </div>
            <ul className="terms-bullets">
              <li>All prices are listed in INR.</li>
              <li>Payments accepted via <>"Cashfree Payment Gateway"</> (UPI, Debit/Credit cards, Wallets).</li>
              <li>Prices may change without prior notice.</li>
            </ul>
          </section>

          {/* 6. Order & Cancellation */}
          <section className="terms-item">
            <div className="item-header">
              <FaFileContract className="section-icon" />
              <h2 className="item-title">6. Order & Cancellation:</h2>
            </div>
            <ul className="terms-bullets" style={{fontFamily:'poppins'}}>
              <li>By placing an order on "www.natfoo.in", the customer expressly acknowledges that such action constitutes a legally binding contract between the buyer and the seller.</li>
              <li>Company reserves the absolute right, at its sole discretion, to accept, reject, or cancel any order or cancellation request without prior notice.</li>
              <li>Company may refuse or cancel any order under, but not limited to, the following circumstances:</li>
              <li  >a) Submission of incomplete, false, or invalid address details.</li>
              <li >b) Suspected fraudulent activity, misuse of the platform, or any form of malpractice.</li>
              <li >c) Any violation of applicable laws, regulations, or platform policies.</li>
            </ul>
            <p className="disclaimer-note">In such cases, the company shall not be held liable for any damages, losses, or claims arising out of such cancellation or rejection.</p>
          </section>

          {/* 7. Payment */}
          <section className="terms-item">
            <div className="item-header">
              <FaCreditCard className="section-icon" />
              <h2 className="item-title">7. Payment:</h2>
            </div>
            <ul className="terms-bullets">
              <li>Upon placement of an order on "www.natfoo.in" the customer acknowledges and agrees that a payment request link will be generated and shared by the Company for the total order value, including applicable shipping charges, through the <>"Cashfree Payment Gateway"</>.</li>
              <li>The customer is required to complete the payment within <>24 hours</> from the time of payment link is generated. Failure to complete the payment within the stipulated time may result in automatic expiration of the payment link.</li>
              <li>Orders shall be processed and dispatched only upon successful receipt and confirmation of payment.</li>
              <li>In the event that the payment link expires, a new payment link may be issued upon the customer's request, subject to availability and confirmation by the team.</li>
              <li>Company reserves the right to cancel the order if payment is not received within the specified timeframe.</li>
            </ul>
          </section>

          {/* 8. Shipping */}
          <section className="terms-item">
            <div className="item-header">
              <FaTruck className="section-icon" />
              <h2 className="item-title">8. Shipping:</h2>
            </div>
            <ul className="terms-bullets">
              <li>Company shall ensure that all products are dispatched in good condition.</li>
              <li>The Company's legal responsibility with respect to the goods shall cease upon successful handover of the shipment to the designated logistics or delivery partner.</li>
              <li>Shipping charges collected are applicable for deliveries within India only. For international orders, shipment may be arranged subject to prior confirmation and approval by the team, and additional charges may apply.</li>
              <li>In the event that the customer's delivery address falls outside the serviceable area of delivery partners, the Company reserves the right to:</li>
              <li >a) Arrange delivery through alternative logistics providers; or</li>
              <li >b) Cancel the order and initiate a refund to the customer.</li>
              <li>Estimated delivery timelines for orders within India are between <>2 to 15 business days</> from the date of dispatch. However, such timelines are indicative and may vary due to factors beyond the Company's control, including but not limited to logistics delays, weather conditions, or unforeseen circumstances.</li>
              <li>Company shall not be held liable for delays in delivery once the shipment has been dispatched.</li>
            </ul>
          </section>

          {/* 9. Return, Refund & Replacement */}
          <section className="terms-item">
            <div className="item-header">
              <FaHistory className="section-icon" />
              <h2 className="item-title">9. Return, Refund & Replacement:</h2>
            </div>
            <ul className="terms-bullets">
              <li>Company maintains a strict no return and no refund policy on all products purchased through the platform.</li>
              <li>However, in the event that a product is received in a damaged conditions, due to unforeseen circumstances during transit, the company may, at its sole discretion, offer a replacement subject to the following conditions:</li>
              <li >a) The customer must notify the damage to the company within 24 hours of receipt of the product by sending an email to natfoocare@gmail.com, along with clear photographic evidence of the damaged product and packaging.</li>
              <li>b) The reported damage shall be subject to verification and validation by the customer support team.</li>
              <li>Upon successful validation of the claim, company shall arrange for a replacement of the damaged product at no additional cost to the customer.</li>
              <li>Company reserves the right to reject any replacement request if the above conditions are not met or if the claim is found to be invalid upon inspection.</li>
            </ul>
          </section>

          {/* 10. User Conduct */}
          <section className="terms-item">
            <div className="item-header">
              <FaUserSlash className="section-icon" />
              <h2 className="item-title">10. User Conduct:</h2>
            </div>
            <p>You agree not to:</p>
            <ul className="terms-bullets">
              <li>Use the Platform for unlawful purposes.</li>
              <li>Provide false information.</li>
              <li>Interfere with platform security.</li>
            </ul>
          </section>

          {/* 11. Intellectual Property */}
          <section className="terms-item">
            <div className="item-header">
              <FaCopyright className="section-icon" />
              <h2 className="item-title">11. Intellectual Property:</h2>
            </div>
            <ul className="terms-bullets">
              <li>All content on "www.natfoo.in", including logos, text, and images, is the property of <>"VARIETAS GREEN ENERGY PVT LTD"</> and protected by law.</li>
            </ul>
          </section>

          {/* 12. Legal Notice */}
          <section className="terms-item">
            <div className="item-header">
              <FaBalanceScale className="section-icon" />
              <h2 className="item-title">12. Legal Notice:</h2>
            </div>
            <ul className="terms-bullets">
              <li>The brand <>"NATFOO"</> is a duly registered trademark under the Intellectual Property of India. All rights, title, interest in and to the mark are exclusively owned by its lawful proprietor/company.</li>
              <li>Any unauthorized use, reproduction, imitation, distribution, or misrepresentation of the <>"NATFOO"</> brand name, logo, or associated intellectual property—whether in part or in whole—shall constitute a violation of applicable trademark and intellectual property laws.</li>
              <li>Such acts of infringement, passing off, or misuse will attract strict civil and/or criminal liability. The company reserves the absolute right to initiate legal proceedings against any individual, entity, or organization found engaging in such unlawful activities, including but not limited to claims for injunctions, damages, and prosecution under relevant statutes.</li>
              <li>Any person or entity found in violation shall be subject to severe penalties as prescribed under the law, without further notice.</li>
            </ul>
          </section>

          {/* 13. Limitation of Liability */}
          <section className="terms-item">
            <div className="item-header">
              <FaExclamationTriangle className="section-icon" />
              <h2 className="item-title">13. Limitation of Liability:</h2>
            </div>
            <p>We are not liable for:</p>
            <ul className="terms-bullets">
              <li>Indirect or incidental damages.</li>
              <li>Delays caused by logistics or delivery partner.</li>
              <li>Losses due to incorrect address provided by the user.</li>
            </ul>
          </section>

          {/* 14. Force Majeure */}
          <section className="terms-item">
            <div className="item-header">
              <FaCloudSun className="section-icon" />
              <h2 className="item-title">14. Force Majeure:</h2>
            </div>
            <p>We are not responsible for delays or failures caused by events beyond our control (natural disasters, strikes, etc.).</p>
          </section>

          {/* 15. Changes to Terms & Conditions */}
          <section className="terms-item">
            <div className="item-header">
              <FaEdit className="section-icon" />
              <h2 className="item-title">15. Changes to Terms & Conditions:</h2>
            </div>
            <ul className="terms-bullets">
              <li>We may update these Terms and Conditions at any time.</li>
              <li>Continued use constitutes acceptance of revised Terms and Conditions.</li>
            </ul>
          </section>

          {/* 16. Governing Law & Jurisdiction */}
          <section className="terms-item">
            <div className="item-header">
              <FaGavel className="section-icon" />
              <h2 className="item-title">16. Governing Law & Jurisdiction:</h2>
            </div>
            <p>
              These Terms and Conditions shall be governed by the <>"Laws of India"</>. 
              All disputes shall be subject to courts in <>Navi Mumbai, Maharashtra</>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;