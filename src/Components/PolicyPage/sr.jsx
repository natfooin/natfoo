import React from "react";
import "./sr.css";
import { 
  FaTruck, 
  FaRegTimesCircle, 
  FaBoxOpen, 
  FaEnvelopeOpenText, 
  FaClock 
} from "react-icons/fa";

function Sr() {
  return (
    <div className="policy-wrapper">
      <div className="policy-card">
        <header className="policy-header">
          <div className="header-icon">
            <FaTruck size={45} />
          </div>
          <h1 className="main-title">Shipping & Refund Policy</h1>
          <p className="effective-date">Effective Date : 25.03.2026</p>
        </header>

        <div className="policy-body">
          {/* Section 1: Shipping */}
          <section className="policy-item">
            <div className="item-header">
              <FaTruck className="section-icon" />
              <h2 className="item-title">1. Shipping Policy:</h2>
            </div>
            <ul className="policy-bullets">
              <li>Company shall ensure that all products are dispatched in good condition.</li>
              <li>Orders are processed and dispatched only upon successful receipt and confirmation of payment through <strong>“CASHFREE”</strong>.</li>
              <li>Estimated delivery timelines for orders within India are between <strong>2 to 15 business days</strong> from the date of dispatch via <strong>“INDIA POST”</strong>.</li>
              <li>Company shall not be held liable for delays in delivery once the shipment has been dispatched.</li>
              <li>In the event that the customer's delivery address falls outside the serviceable area, the Company reserves the right to arrange alternative logistics or cancel the order.</li>
            </ul>
          </section>

          {/* Section 2: No Refund Policy */}
          <section className="policy-item">
            <div className="item-header">
              <FaRegTimesCircle className="section-icon" />
              <h2 className="item-title">2. Return & Refund Policy:</h2>
            </div>
            <p>
              Company maintains a <strong>strict no return and no refund policy</strong> on all products purchased through <strong>“www.natfoo.in”</strong>.
            </p>
            <p>Once an order is placed and payment is confirmed, it cannot be cancelled or refunded.</p>
          </section>

          {/* Section 3: Damaged Products */}
          <section className="policy-item">
            <div className="item-header">
              <FaBoxOpen className="section-icon" />
              <h2 className="item-title">3. Damaged or Defective Items:</h2>
            </div>
            <p>
              In the event that a product is received in damaged conditions, the company may offer a replacement subject to:
            </p>
            <ul className="policy-bullets">
              <li>The customer must notify the company within <strong>24 hours</strong> of receipt.</li>
              <li>Send an email to <strong>natfoocare@gmail.com</strong> with clear photographic evidence of the damaged product and packaging.</li>
              <li>The reported damage shall be subject to verification and validation by our team.</li>
            </ul>
          </section>

          {/* Section 4: Timeline */}
          <section className="policy-item">
            <div className="item-header">
              <FaClock className="section-icon" />
              <h2 className="item-title">4. Replacement Timeline:</h2>
            </div>
            <p>Upon successful validation of the claim, the company shall arrange for a replacement of the damaged product at no additional cost within the standard shipping window.</p>
          </section>

          {/* Section 5: Contact */}
          <section className="policy-item">
            <div className="item-header">
              <FaEnvelopeOpenText className="section-icon" />
              <h2 className="item-title">5. Contact Support:</h2>
            </div>
            <p>For any queries regarding your shipment, please reach out to:</p>
            <p>Email: <strong>natfoocare@gmail.com</strong></p>
            <p>Address: K 804, Dara Enclave, AWHO, Nerul, Navi Mumbai – 400706. Maharashtra.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Sr;