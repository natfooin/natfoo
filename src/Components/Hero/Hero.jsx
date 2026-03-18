import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Hero.css";

import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

import { Link } from "react-router-dom";
import Badge from "../../Components/ui/Badge/Badge";
import Heading from "../ui/Heading/Heading";
import productData from "./Sliderprodcuts.json";
import Button from "../ui/Button/Button";
import { BiCookie } from "react-icons/bi";
import {
  FaChevronCircleRight,
  FaChevronCircleLeft,
  FaRupeeSign,
} from "react-icons/fa";
import { useEffect } from "react";
function Hero() {
  useEffect(() => {
    document.title = "Natfoo";
  }, []);
  return (
    <div className="hero-container">
      <Heading
        title="Traditional Grains, Modern Taste"
        subTitle="Nutritious cookies made from ancient grains for a healthier everyday snack."
      />
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          reverseDirection: true,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="swiper_container"
      >
        {productData?.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="slide-card">
              <img src={product.image} alt={product.name} />

              <div className="slide-overlay">
                <h3 className="product-name">
                  {product.name}{" "}
                  {/* <span>
                    <FaRupeeSign
                      size={innerWidth >= 1280 ? 18 : 10}
                      color="white"
                    />
                    {product.price}
                    10%
                  </span> */}
                </h3>

                <Link to={`/product/${product.id}`}>
                  <Button
                    cn={"button-n-one"}
                    text={"Buy now"}
                    minWidth={70}
                    height={30}
                  />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <FaChevronCircleLeft name="arrow-back-outline" color="#926F52" />
          </div>
          <div className="swiper-button-next slider-arrow">
            <FaChevronCircleRight
              name="arrow-forward-outline"
              color="#926F52"
            />
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default Hero;
