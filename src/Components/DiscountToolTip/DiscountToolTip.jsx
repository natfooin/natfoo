import React, { useState } from "react";
import "./DiscountTooltip.css";

const DiscountTooltip = ({ label = "View Offers", slabs = [] }) => {
  const [show, setShow] = useState(false);

  const toggleTooltip = () => {
    setShow(!show);
  };

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* TEXT */}
      <span className="offer-text" onClick={toggleTooltip}>
        {label}
      </span>

      {/* TOOLTIP */}
      <div className={`tooltip-box ${show ? "show" : ""}`}>
        <table>
          <thead>
            <tr>
              <th>Order Value</th>
              <th>Discount</th>
            </tr>
          </thead>

          <tbody>
            {slabs.map((slab, index) => (
              <tr key={index}>
                <td>
                  ₹{slab.min} -{" "}
                  {slab.max ? `₹${slab.max}` : "Above"}
                </td>
                <td>{slab.discount}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiscountTooltip;