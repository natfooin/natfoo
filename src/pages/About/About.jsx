import React from 'react'
import './About.css'
import img1 from "../../assets/product-images/Natfoo-Tuty-Fruity-Cookies-Pouch-Mockup-01.jpg"
import img2 from "../../assets/product-images/Crunchy-Cardamom.jpg"
import img3 from "../../assets/product-images/Foxtail-Millet-Noodles.png"
import img4 from "../../assets/product-images/Tango-Fruity.jpg"
import img5 from "../../assets/product-images/Barnyard-Millet-Noodles.png"
import img6 from "../../assets/product-images/Ajwain-Mellow.jpg"
const About = () => {
  return (
    <div className="about-section">
  <div className="about-header">
    <h2>About Us</h2>
    <p className="about-slogan">Nourishing Life with Natural Goodness</p>
  </div>

  <div className="about-container">

    <div className="about-gallery">
      <img src={img1} className="g1 big"/>
      <img src={img2} className="g2"/>
      <img src={img3} className="g3"/>
      <img src={img4} className="g4"/>
      <img src={img5} className="g5"/>
      <img src={img6} className="g6"/>
      {/* <img src={img1} className="g7"/>
      <img src={img1} className="g8"/>
      <img src={img1} className="g9"/> */}
    </div>

    <div className="about-text">
      <p>
        Healthy living begins with the food you choose every day. True wellness starts with what’s on your plate. We believe in simple, our natural food products are crafted with balanced nutrition & vitality helps you for a healthier way of living. We bring you wholesome foods that nourish the body and support a balanced lifestyle.
      </p>
    </div>

  </div>
</div>
  )
}

export default About