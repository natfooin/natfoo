import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import { PiShoppingCartBold } from "react-icons/pi";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import logo from "../../assets/logo.png";
import Button from "./../ui/Button/Button";
import "./NavBar.css"; 
import { Link, useLocation } from "react-router-dom";

function NavBar({ cartQuantity }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`navBar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Natfoo Logo" />
          </Link>
        </div>

        <div className={`navElements ${isOpen ? "active" : ""}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="nav-actions">
          <div className="searchIcon" title="Search">
            <ImSearch size={18} />
          </div>

          <Link to="/cart" className="cart-link">
            <div className="cart">
              <PiShoppingCartBold size={24} />
              {cartQuantity > 0 && <span className="cart-count">{cartQuantity}</span>}
            </div>
          </Link>

          <div className="action-button-wrapper hide-mobile">
            <Link to="/products">
              <Button cn="button-n-one" text="Shop Now" />
            </Link>
          </div>

          <div className="hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Navigation">
            {isOpen ? <RxCross1 size={28} /> : <RxHamburgerMenu size={28} />}
          </div>
        </div>
      </div>
      
      {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)}></div>}
    </nav>
  );
}

export default NavBar;