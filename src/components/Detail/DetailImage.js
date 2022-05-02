import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import dd from "../../assets/image 35.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./ImageStyle.css";

// import required modules
import { Navigation } from "swiper";

const DetailImage = () => {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <img src={dd} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={dd} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={dd} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={dd} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={dd} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={dd} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={dd} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default DetailImage;
