import React from "react";
import "./Footer.css";
import FooterIcon from "./FooterIcon";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import image from "./../../assets/logo.png";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-top">
        <div className="footer-left">
            <div className="logo">
            <img src={image} alt="logo" />
          </div>
          <div className="logo-para">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
              cum maiores mollitia quam sapiente? Repellendus doloribus fugiat
              non earum vitae facere corporis libero eligendi? Ex non fugit eum
              quaerat distinctio.
            </p>
          </div>
        </div>

        <div className="linkdiv">
            <div className="links">
            <ul>
              <li>
                <a href="">home</a>
              </li>
              <li>
                <a href="">home</a>
              </li>
              <li>
                <a href="">home</a>
              </li>
              <li>
                <a href="">home</a>
              </li>
              <li>
                <a href="">home</a>
              </li>
            </ul>
          </div>
        </div>
        </div>

        <div className="footer-bottom">
          <div className="site-rights">
            <h6>Copyrights2025&copy;natfoo.All Rights Reserved </h6>
          </div>
          <div className="iconContainer">
            <FooterIcon icon={<FaWhatsapp size={30} color="white"/>} />
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
