import React from "react";
import "./RefundPage.css";
import { useEffect } from "react";
import { 
  FaHistory, 
  FaFileContract, 
  FaExclamationCircle, 
  FaCamera, 
  FaEnvelope, 
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";
import { MdOutlineAssignmentReturn } from "react-icons/md";

function RefundPage() {
  useEffect(() => {
        document.title = "Natfoo | Refund and Cancellation Policy";
      }, []);
  return (
    <div className="refund-wrapper">
      <div className="refund-card">
        <header className="refund-header">
     
          <h1 className="main-title">REFUND & CANCELLATION</h1>
          <p className="effective-date" style={{fontSize:"1.4rem",fontWeight:'600'}}>Effective Date: 01.04.2026</p>
        </header>

        <div className="refund-body">
          <section className="refund-item">
            <div className="item-header">
              <FaFileContract className="section-icon" />
              <h2 className="item-title">1. Order & Cancellation:</h2>
            </div>
            <ul className="refund-bullets">
              <li>By placing an order on “www.natfoo.in”, the customer expressly acknowledges that such action constitutes a legally binding contract between the buyer and the seller.</li>
              <li>Company reserves the absolute right, at its sole discretion, to accept, reject, or cancel any order or cancellation request without prior notice.</li>
              <li>Company may refuse or cancel any order under, but not limited to, the following circumstances:</li>
              <li >a) Submission of incomplete, false, or invalid address details.</li>
              <li >b) Suspected fraudulent activity, misuse of the platform, or any form of malpractice.</li>
              <li >c) Any violation of applicable laws, regulations, or platform policies.</li>
            </ul>
            <p className="disclaimer-note">
              In such cases, the company shall not be held liable for any damages, losses, or claims arising out of such cancellation or rejection.
            </p>
          </section>

          {/* 9. Return & Refund Policy - From Image 7a6827 */}
          <section className="refund-item">
            <div className="item-header">
              <FaTimesCircle className="section-icon" />
              <h2 className="item-title">2. Return, Refund & Replacement:</h2>
            </div>
            <p>
              Company maintains a <>strict no return and no refund policy</> on all products purchased through the platform.
            </p>
            <div className="policy-highlight">
              <div className="item-header">
                <FaExclamationCircle className="section-icon" />
                <h3 className="item-title" style={{fontSize: '1.1rem'}}>Exceptions for Transit Damage</h3>
              </div>
              <p>
                In the event that a product is received in a damaged condition due to unforeseen circumstances during transit, the company may, at its sole discretion, offer a replacement subject to the following conditions:
              </p>
              <ul className="refund-bullets">
                <li >
                  <FaEnvelope style={{marginRight: '8px', color: '#D4AF37'}} /> 
                  a) Notify damage within <>24 hours</> of receipt by emailing <>natfoocare@gmail.com</>.
                </li>
                <li>
                  <FaCamera style={{marginRight: '8px', color: '#D4AF37'}} /> 
                  b) Provide clear photographic evidence of the damaged product and packaging.
                </li>
                <li >
                  <FaCheckCircle style={{marginRight: '8px', color: '#D4AF37'}} /> 
                  c) Claims are subject to verification and validation by the customer support team.
                </li>
              </ul>
            </div>
          </section>

          {/* Validation & Replacement Clause */}
          <section className="refund-item">
            <div className="item-header">
              <MdOutlineAssignmentReturn className="section-icon" />
              <h2 className="item-title">Resolution:</h2>
            </div>
            <p>
              Upon successful validation of the claim, the company shall arrange for a replacement of the damaged product at no additional cost to the customer.
            </p>
            <p className="disclaimer-note">
              Company reserves the right to reject any replacement request if the above conditions are not met or if the claim is found to be invalid upon inspection.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default RefundPage;