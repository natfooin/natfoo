import React from "react";
import "./Footer.css";
import FooterIcon from "./FooterIcon";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import image from "./../../assets/logo.png"

function Footer() {
  return (
    <>
    
    <div className="footer">
<div className="footer-top">
        <div className="logo">
        <img src={image} alt="logo" />
      </div>

      <div className="links">
        <ul>
          <li><a href="">home</a></li>
          <li><a href="">home</a></li>
          <li><a href="">home</a></li>
          <li><a href="">home</a></li>
          <li><a href="">home</a></li>
        </ul>
      </div>
</div>



  
      <div className="footer-bottom">
        <div className="site-rights">
          <h6>Copyrights2025&copy;natfoo.All Rights Reserved  </h6>
        </div>
        <div className="iconContainer">
          <FooterIcon icon={<FaWhatsapp size={30} color="white"/>} />
          <FooterIcon icon={<CiMail size={30} color="white" />} />
          <FooterIcon icon={<CiYoutube size={30} color="white"/>} />
          <FooterIcon icon={<FaXTwitter size={30} color="white"/>} />
          <FooterIcon icon={<CiFacebook size={30}color="white" />} />
          <FooterIcon icon={<FaInstagram size={30}color="white" />} />
        </div>
      </div>
      
      </div>
      
    </>
  );
}

export default Footer;
