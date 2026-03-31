import React from "react";
import "./ShippingPage.css";
import { useEffect } from "react";
import { 
  FaTruck, 
  FaBoxOpen, 
  FaMapMarkedAlt, 
  FaClock, 
  FaExclamationCircle,
  FaGlobeAmericas
} from "react-icons/fa";
import { MdOutlineLocalShipping } from "react-icons/md";

function ShippingPage() {
  useEffect(() => {
        document.title = "Natfoo | Shipping and Delivery Policy";
      }, []);
  return (
    <div className="shipping-wrapper">
      <div className="shipping-card">
        <header className="shipping-header">
          
          <h1 className="main-title">SHIPPING & DELIVERY POLICY</h1>
          <p className="effective-date" style={{fontSize:'1.4rem',fontWeight:'600'}}>Effective Date: 01.04.2026</p>
        </header>

        <div className="shipping-body">
          {/* 1. Dispatch Condition */}
          <section className="shipping-item">
            <div className="item-header">
              <FaBoxOpen className="section-icon" />
              <h2 className="item-title">1. Product Condition:</h2>
            </div>
            <p>
              Company shall ensure that all products are dispatched in good condition.
            </p>
          </section>

          {/* 2. Legal Responsibility */}
          <section className="shipping-item">
            <div className="item-header">
              <FaExclamationCircle className="section-icon" />
              <h2 className="item-title">2. Transfer of Responsibility:</h2>
            </div>
            <p>
              The Company’s legal responsibility with respect to the goods shall cease upon successful handover of the shipment to the designated logistics or delivery partner.
            </p>
          </section>

          {/* 3. Service Areas */}
          <section className="shipping-item">
            <div className="item-header">
              <FaMapMarkedAlt className="section-icon" />
              <h2 className="item-title">3. Shipping Areas:</h2>
            </div>
            <ul className="shipping-bullets">
              <li>Shipping charges collected are applicable for deliveries within India only.</li>
              <li>
                For international orders, shipment may be arranged subject to prior confirmation and approval by the team, and additional charges may apply.
              </li>
            </ul>
          </section>

          {/* 4. Alternative Logistics */}
          <section className="shipping-item">
            <div className="item-header">
              <FaGlobeAmericas className="section-icon" />
              <h2 className="item-title">4. Non-Serviceable Locations:</h2>
            </div>
            <p>
              In the event that the customer’s delivery address falls outside the serviceable area of delivery partners, the Company reserves the right to:
            </p>
            <ul className="shipping-bullets">
              <li >a) Arrange delivery through alternative logistics providers; or</li>
              <li >b) Cancel the order and initiate a refund to the customer.</li>
            </ul>
          </section>

          {/* 5. Timelines */}
          <section className="shipping-item">
            <div className="item-header">
              <FaClock className="section-icon" />
              <h2 className="item-title">5. Delivery Timelines:</h2>
            </div>
            <p>
              Estimated delivery timelines for orders within India are between <>2 to 15 business days</> from the date of dispatch.
            </p>
            <p className="disclaimer-note">
              Such timelines are indicative and may vary due to factors beyond the Company’s control, including but not limited to logistics delays, weather conditions, or unforeseen circumstances.
            </p>
          </section>

          {/* 6. Liability Disclaimer */}
          <section className="shipping-item">
            <div className="item-header">
              <MdOutlineLocalShipping className="section-icon" />
              <h2 className="item-title">6. Delay Liability:</h2>
            </div>
            <p>
              Company shall not be held liable for delays in delivery once the shipment has been dispatched.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ShippingPage;