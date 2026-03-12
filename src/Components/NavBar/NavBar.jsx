import React, { useState } from 'react';
import { ImSearch } from "react-icons/im";
import { PiShoppingCartBold } from "react-icons/pi";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import logo from "../../assets/logo.png";
import Button from './../ui/Button/Button'
import "./NavBar.css";

function NavBar({cartQuantity}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="navBar">
      <div className="logo">
        <img src={logo} alt="Millet Logo" />
      </div>
      <div className={`navElements ${isOpen ? "active" : ""}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>

      <div className="nav-actions">
        <div className="searchIcon">
          <ImSearch size={18} />
        </div>
        
        <div className="cart">
          <PiShoppingCartBold size={22} />
          <span className="cart-count" >{cartQuantity}</span>  
        </div>

        <Button cn={"button-n-one"} buttonName="shop now"  /> 
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <RxCross1 size={28} /> : <RxHamburgerMenu size={28} />}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;