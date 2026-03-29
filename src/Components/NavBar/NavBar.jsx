import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import { PiShoppingCartBold } from "react-icons/pi";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import logo from "/logo.png";
import Button from "./../ui/Button/Button";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar({ cartQuantity }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navBar">
     

      <div className={`navElements ${isOpen ? "active" : ""}`}>
        <ul>
          <li onClick={() => setIsOpen(false)}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link to="/about">About</Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link to="/products">Products</Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
       <div className="logo">
        <Link to="/">
          <img src={logo} alt="Millet Logo" loading="lazy" decoding="async"/>
        </Link>
      </div>

      <div className="nav-actions">
        <Link to="/products" style={{color: "inherit"}}>
          <div className="searchIcon">
            <ImSearch size={18} />
          </div>
        </Link>

        <Link
          to="/cart"
          className="cart-link"
          style={{ textDecoration: "none" }}
        >
          <div className="cart">
            <PiShoppingCartBold size={22} color="white" />
            {cartQuantity !== 0 && (
              <span className="cart-count">{cartQuantity}</span>
            )}
          </div>
        </Link>

        <div className="header-right">
          <div className="header-right">
            <Link to="/products" className="hide-mobile">
              <Button cn={"button-n-one"} text="Shop now" />
            </Link>
          </div>
        </div>
      </div>
          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <RxCross1 size={28} /> : <RxHamburgerMenu size={28} />}
          </div>
    </nav>
  );
}

export default NavBar;
