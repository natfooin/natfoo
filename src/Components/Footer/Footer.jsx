import React from "react";
import "./Footer.css";
import FooterIcon from "./FooterIcon";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";
import image from "./../../assets/logo.png";

function Footer() {
  return (
    <>
      <div className="footer" >
        <div className="footer-top">
          <div className="footer-left">
            <div className="logo">
              <img src={image} alt="logo" />
            </div>
            <div className="logo-para">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
                cum maiores mollitia quam sapiente? Repellendus doloribus fugiat
                non earum vitae facere corporis libero eligendi? Ex non fugit
                eum quaerat distinctio.
              </p>
            </div>
          </div>
          <div
            className="policy"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <h6
            style={{color:"var(--gold)",fontSize:"1.5rem",marginBottom:"4px"}}
            >policy information</h6>
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
                flexDirection: "column",
              }}
            >
              <li>
                <a style={{ fontSize: 10, cursor: "pointer" }}>
                  terms & conditions
                </a>
              </li>
              <li>
                <a style={{ fontSize: 10, cursor: "pointer" }}>
                  privacy & policy
                </a>
              </li>
              <li>
                <a style={{ fontSize: 10, cursor: "pointer" }}>
                  privacy & policy
                </a>
              </li>
              <li>
                <a style={{ fontSize: 10, cursor: "pointer" }}>
                  privacy & policy
                </a>
              </li>
            </ul>
          </div>
          <div className="linkdiv">
            <div className="links">
              <h6 style={{color:"var(--gold)",fontSize:"1.5rem"}}>
                quick links
              </h6>
              <ul>
                <Link style={{ textDecoration: "none" }} to="/">
                  <li>
                    <a>home</a>
                  </li>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/products">
                  <li>
                    <a>products</a>
                  </li>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/contact">
                  <li>
                    <a>contact</a>
                  </li>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/about">
                  <li>
                    <a href="">about</a>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="site-rights">
            <h6>Copyrights2025&copy;natfoo.All Rights Reserved </h6>
          </div>

          <div className="iconContainer">
            <FooterIcon icon={<FaWhatsapp size={30} color="white" />} />
            <FooterIcon icon={<CiMail size={30} color="white" />} />
            <FooterIcon icon={<CiYoutube size={30} color="white" />} />
            <FooterIcon icon={<FaXTwitter size={30} color="white" />} />
            <FooterIcon icon={<FaFacebook size={50} color="white" />} />
            <FooterIcon icon={<FaInstagram size={30} color="white" />} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
