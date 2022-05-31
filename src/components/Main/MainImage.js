import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./MainImage.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import styled from "styled-components";

const MainImage = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        speed={500}
      >
        <SwiperSlide>
          <img
            src="https://velog.velcdn.com/images/tty5799/post/a317a6d0-b084-4e65-9d1c-f250c804dc31/image.svg"
            alt=""
            style={{ width: "1288px", height: "342px" }}
          />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => {
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSfwLz8IG1fdkeqcVlABNK806-R1FbkWO1PyD-Qr3OWti_K_9A/viewform?usp=sf_link",
              "_blank"
            );
          }}
        >
          <img
            src="https://velog.velcdn.com/images/tty5799/post/a7f2445d-ce4f-407a-b609-552513b8fb20/image.svg"
            alt=""
            style={{ width: "1288px", height: "342px", cursor: "pointer" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://velog.velcdn.com/images/tty5799/post/f1b302d0-9d8f-4849-8b9f-d5ccc9cf1841/image.svg"
            alt=""
            style={{ width: "1288px", height: "342px" }}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

const Image = styled.img`
  width: 1288px;
  height: 342px;
`;
export default MainImage;
