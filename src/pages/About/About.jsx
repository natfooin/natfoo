import React, { useEffect } from "react";
import "./About.css";
import img3 from "/product-images/Pasta-Fusili.jpg";
import img2 from "/product-images/Multi-Millet-Vermicelli.png";
import img4 from "/public/product-images/Sprouted-Heath-Mix.jpg";
import img1 from "/product-images/Kodo-Millet-Laddu.jpg";
import img5 from "/product-images/Barnyard-Millet-Noodles.png";
import img6 from "/product-images/Ajwain-Mellow.jpg";
const About = () => {
  useEffect(() => {
    document.title = "Natfoo | About";
  }, []);
  return (
    <div className="about-section">
      <div className="about-header">
        <h2>About Us</h2>
      </div>

      <div className="about-container">
        <div className="about-gallery">
          <img src={img1} className="g1 big" loading="eager"  />
          <img src={img2} className="g2" loading="eager" />
          <img src={img3} className="g3" loading="eager" />
          <img src={img4} className="g4" loading="eager" />
          <img src={img5} className="g5" loading="eager" />
          <img src={img6} className="g6" loading="eager" />
          {/* <img src={img1} className="g7" loading="eager"/>
      <img src={img1} className="g8" loading="eager"/>
      <img src={img1} className="g9" loading="eager"/> */}
        </div>

        <div className="about-text">
          <p>
            Healthy living begins with the food you choose every day. True
            wellness starts with what’s on your plate. We believe in simple, our
            natural food products are crafted with balanced nutrition & vitality
            helps you for a healthier way of living. We bring you wholesome
            foods that nourish the body and support a balanced lifestyle.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
