import React, { useRef, useState } from "react";
import styled from "styled-components";
import tutorial_main from "../assets/tutorial/tutorial_main.jpeg";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./TutorialSwiperStyle.css";

// import required modules
import {
  Lazy,
  Autoplay,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper";

const SwiperEl = (props) => {
  const [tutorialPlay, setTutorialPlay] = useState(0);

  return (
    <>
      <Swiper
        navigation={true}
        pagination={{ clickable: true, type: "progressbar" }}
        modules={[Lazy, Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
        lazy={true}
        className="mySwiper"
      >
        {tutorialPlay === 1 || tutorialPlay === 2 ? null : (
          <SwiperSlide>
            <BgDiv>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ margin: "584px auto 0 auto", width: "533px" }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    margin: "0 15px 0 0 ",
                    width: "251px",
                    height: "69px",
                    fontSize: "37px",
                    border: "3px solid #4299E9",
                    borderRadius: "21px",
                    "&:hover": {
                      border: "3px solid #66B8FF",
                      backgroundColor: "#66B8FF",
                    },
                  }}
                  onClick={() => {
                    setTutorialPlay(1);
                  }}
                >
                  모집자
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    margin: "0 0 0 15px ",
                    width: "251px",
                    height: "69px",
                    fontSize: "37px",
                    border: "3px solid #4299E9",
                    borderRadius: "21px",
                    "&:hover": {
                      border: "3px solid #66B8FF",
                      backgroundColor: "#66B8FF",
                    },
                  }}
                  onClick={() => {
                    setTutorialPlay(2);
                  }}
                >
                  신청자
                </Button>
              </Grid>
            </BgDiv>
          </SwiperSlide>
        )}
        {tutorialPlay === 1
          ? TutorialImgList_recruiter.map((a, i) => (
              <SwiperSlide key={i}>
                <img
                  className="swiper-lazy"
                  src={a.img}
                  alt={a.title}
                  style={{ width: "1200px", height: "881px" }}
                />
                {/* <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div> */}
              </SwiperSlide>
            ))
          : tutorialPlay === 2
          ? TutorialImgList_apllier.map((a, i) => (
              <SwiperSlide key={i}>
                <img
                  className="swiper-lazy"
                  src={a.img}
                  alt={a.title}
                  style={{ width: "1200px", height: "881px" }}
                />
                {/* <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div> */}
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </>
  );
};

const TutorialImgList_apllier = [
  {
    img: require("../assets/tutorial/applier/a1.jpg"),
    title: "applierTutorial_1",
  },
  {
    img: require("../assets/tutorial/applier/a2.jpg"),
    title: "applierTutorial_2",
  },
  {
    img: require("../assets/tutorial/applier/a3.jpg"),
    title: "applierTutorial_3",
  },
  {
    img: require("../assets/tutorial/applier/a4.jpg"),
    title: "applierTutorial_4",
  },
];

const TutorialImgList_recruiter = [
  {
    img: require("../assets/tutorial/recruiter/r1.gif"),
    title: "recruiterTutorial_1",
  },
  {
    img: require("../assets/tutorial/recruiter/r2.jpg"),
    title: "recruiterTutorial_2",
  },
  {
    img: require("../assets/tutorial/recruiter/r3.jpg"),
    title: "recruiterTutorial_3",
  },
  {
    img: require("../assets/tutorial/recruiter/r4.jpg"),
    title: "recruiterTutorial_4",
  },
  {
    img: require("../assets/tutorial/recruiter/r5.gif"),
    title: "recruiterTutorial_5",
  },
  {
    img: require("../assets/tutorial/recruiter/r6.jpg"),
    title: "recruiterTutorial_6",
  },
];

const BgDiv = styled.div`
  z-index: 0;
  width: 1200px;
  background-image: url("https://velog.velcdn.com/images/tty5799/post/b286d196-657c-4c6a-a188-5d31b99b31dc/image.png");
  background-repeat: no-repeat;
  height: 881px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
`;

export default SwiperEl;
