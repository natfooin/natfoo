import React, { useState, useRef, useEffect } from "react";
import "./DiscountToolTip.css";

const DiscountTooltip = ({ label = "View Offers", slabs = [], styles=null }) => {
  const [show, setShow] = useState(false);
  const [style, setStyle] = useState({});
  const [position, setPosition] = useState("top");
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  useEffect(() => {
    if (!show) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let left = wrapperRect.width / 2 - tooltipRect.width / 2;
    let top;

    const isMobile = window.innerWidth <= 600;

    if (isMobile) {
      top = -tooltipRect.height - 10;
      setPosition("top");

      if (wrapperRect.top - tooltipRect.height < 10) {
        top = wrapperRect.height + 10;
        setPosition("bottom");
      }
    } else {
      top = wrapperRect.height + 10;
      setPosition("bottom"); // 🔥 ALWAYS bottom on PC
    }

    // LEFT overflow
    if (wrapperRect.left + left < 10) {
      left = 10 - wrapperRect.left;
    }

    // RIGHT overflow
    if (wrapperRect.left + left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - wrapperRect.left - tooltipRect.width - 10;
    }

    setStyle({
      left: `${left}px`,
      top: `${top}px`,
    });
  }, [show]);

  return (
    <div
      className="tooltip-wrapper"
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="offer-text" style={styles}>{label}</span>

      <div
        ref={tooltipRef}
        className={`tooltip-box ${show ? "show" : ""} ${position}`}
        style={style}
      >
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
                  ₹{slab.min} - {slab.max ? `₹${slab.max}` : "Above"}
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
