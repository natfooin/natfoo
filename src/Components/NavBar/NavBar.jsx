import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import { PiShoppingCartBold } from "react-icons/pi";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import logo from "../../assets/logo.png";
import Button from "./../ui/Button/Button";
import "./NavBar.css"; 
import { Link } from "react-router-dom";

function NavBar({ cartQuantity }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navBar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Millet Logo" />
        </Link>
      </div>

      <div className={`navElements ${isOpen ? "active" : ""}`}>
        <ul>
          <li onClick={() => setIsOpen(false)}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link to="/products">Products</Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link to="/contact">Contact</Link>
          </li>

        </ul>
        
      </div>
      

      <div className="nav-actions">
        <div className="searchIcon">
          <ImSearch size={18} />
        </div>

        <Link to="/cart" className="cart-link">
          <div className="cart">
            <PiShoppingCartBold size={22} color="white" />
            <span className="cart-count">{cartQuantity}</span>
          </div>
        </Link>

        <div className="header-right">
          <div className="header-right">
            <Link to="/products" className="hide-mobile">
              <Button cn={"button-n-one"} text="shop now" />
            </Link>
          </div>
          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <RxCross1 size={28} /> : <RxHamburgerMenu size={28} />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
