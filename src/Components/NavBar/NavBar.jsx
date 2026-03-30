import React, { useState, useRef, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import { PiShoppingCartBold } from "react-icons/pi";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import logo from "/logo.png";
import Button from "./../ui/Button/Button";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar({ cartQuantity }) {
  const [isOpen, setIsOpen] = useState(false);
 const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false); 
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navBar" ref={navRef}>
      
      <div className={`navElements ${isOpen ? "active" : ""}`}>
        <ul>
          <li onClick={() => setIsOpen(false)}>
            <Link to="/" className="LinkTags">Home</Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link to="/about" className="LinkTags">About</Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link to="/products" className="LinkTags">Products</Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link to="/contact" className="LinkTags">Contact</Link>
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
            <PiShoppingCartBold size={22} color="" />
            {cartQuantity !== 0 && (
              <span className="cart-count">{cartQuantity}</span>
            )}
          </div>
        </Link>

        <div className="header-right">
          <Link to="/products" className="hide-mobile">
            <Button cn={"button-n-one"} text="Shop now" />
          </Link>
        </div>
      </div>

      <div
        className="hamburger"
        onClick={(e) => {
          e.stopPropagation(); 
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <RxCross1 size={28} /> : <RxHamburgerMenu size={28} />}
      </div>

    </nav>
  );
}

export default NavBar;