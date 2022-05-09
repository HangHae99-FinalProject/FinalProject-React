import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import dd from "../../assets/image 35.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./ImageStyle.css";

// import required modules
import { Mousewheel, Pagination } from "swiper";
import styled from "styled-components";

const DetailImage = (imgList) => {
  console.log(imgList);
  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
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
