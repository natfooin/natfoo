import React from "react";
import "./Footer.css";
import FooterIcon from "./FooterIcon";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { CiYoutube, CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";
import logo from "/logo.png";

import {
  FaPhoneAlt} from "react-icons/fa";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Natfoo Logo" loading="eager" />
            </Link>
          </div>
          <div className="logo-para">
            <p>
              With Natfoo, you're choosing more than just food—you're choosing
              care, purity, and nourishment you can trust. Every product is
              thoughtfully prepared to support your energy, well-being, and
              everyday balance. It's a choice that aligns with a more mindful,
              healthier way of living—giving you confidence in what you bring to
              your table.
            </p>
          </div>
        </div>

        <div className="policy" >
          <h6 style={{ marginBottom: "1.2rem" }}>policy information</h6>
          <ul>
            <li>
              <Link to="/terms-and-condition">terms & conditions</Link>
            </li>
            <li>
              <Link to="/privacy-policy">privacy & policy</Link>
            </li>
            <li>
              <Link to="/refund-and-cancellation-policy">
                refund & cancellation
              </Link>
            </li>
            <li>
              <Link to="/shipping-and-delivery-policy">
                shipping and delivery policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="linkdiv">
          <div className="links">
            <h6 style={{ marginBottom: "1.2rem" }}>quick links</h6>
            <ul>
              <li>
                <Link to="/">home</Link>
              </li>
               <li>
                <Link to="/about">about</Link>
              </li>
              <li>
                <Link to="/products">products</Link>
              </li>
              <li>
                <Link to="/contact">contact</Link>
              </li>
             
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="site-rights">
          <h6 style={{ color: "white" }}>
            Copyright 2026 &copy; Varietas Green Energy Pvt Ltd. All Rights Reserved.
          </h6>
        </div>

        <div className="iconContainer">
          <FooterIcon
            icon={<FaPhoneAlt size={20} color="white" />}
            link={"tel:+91-996-219-9321"}
          />
          <FooterIcon
            icon={<CiMail size={25} color="white" />}
            link={"mailto:natfooin@gmail.com"}
          />
          <FooterIcon
            icon={<CiYoutube size={25} color="white" />}
            link={"https://youtube.com/@natfookitchen95?si=4hSvWVSIKXkATsdg"}
          />
          <FooterIcon
            icon={<FaFacebook size={35} color="white" />}
            link={"https://www.facebook.com/share/1FYPUa9BeU/"}
          />
          <FooterIcon
            icon={<FaInstagram size={25} color="white" />}
            link={
              "https://www.instagram.com/natfoo_naturalfoods?igsh=MWxoam1oY2pkZTF2NQ=="
            }
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
