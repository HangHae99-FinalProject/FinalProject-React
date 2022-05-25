import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

import "./MainImage.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

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
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://velog.velcdn.com/images/tty5799/post/ddff6790-1f95-411d-b882-12f47069808d/image.png"
            alt=""
            style={{ width: "1288px", height: "342px" }}
          />
        </SwiperSlide>
        {/* <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide> */}
      </Swiper>
    </>
  );
};
export default MainImage;
