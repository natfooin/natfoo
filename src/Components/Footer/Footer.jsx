import React from 'react'
import './Footer.css'
import FooterIcon from './FooterIcon'
import { FaWhatsappSquare } from "react-icons/fa";

function Footer() {
  return (
    <>
    <div className="iconContainer">
        <FooterIcon icon={<FaWhatsappSquare size={30}/>}/>
        <FooterIcon icon={<FaWhatsappSquare size={30}/>}/>
        <FooterIcon icon={<FaWhatsappSquare size={30}/>}/>
        <FooterIcon icon={<FaWhatsappSquare size={30}/>}/>
        <FooterIcon icon={<FaWhatsappSquare size={30}/>}/>
    </div>
    
    </>
  )
}

export default Footer