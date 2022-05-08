import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./ImageStyle.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import styled from "styled-components";

const DetailImage = (imgList) => {
  return (
    <>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {imgList.image?.map((image, idx) => {
          return (
            <SwiperSlide key={idx}>
              <Image src={image} alt="detailImage" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

const Image = styled.img``;

export default DetailImage;
