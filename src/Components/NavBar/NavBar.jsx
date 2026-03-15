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
        <img src={logo} alt="Millet Logo" />
      </div>
      <div className={`navElements ${isOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to={"/"}>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link to={"/products"}>
              <a>Products</a>
            </Link>
          </li>
          <li>
            <Link to={"/contact"}>
              <a>Contact</a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="nav-actions">
        <div className="searchIcon">
          <ImSearch size={18} />
        </div>
        <Link to={"/cart"} style={{ color: "inherit" }}>
          <div className="cart">
            <PiShoppingCartBold size={22} />
            <span className="cart-count">{cartQuantity}</span>
          </div>
        </Link>
        <Link to={"/products"}>
        <div className="header-right">
            <Button cn={"button-n-one"} text="shop now" />
          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <RxCross1 size={28} /> : <RxHamburgerMenu size={28} />}
          </div>
        </div>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
