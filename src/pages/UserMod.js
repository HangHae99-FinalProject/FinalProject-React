/* eslint-disable*/
import React, { useState } from "react";
import styled_2 from "styled-components";
import rr from "../assets/image 35.png";
import { Grid } from "../elements/Index";

import Grid_2 from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

const UserMod = () => {
  const [selected, setSelected] = useState(false);
  const [is_cate, setIs_Cate] = useState("");
  return (
    <Container sx={{ margin: "0px 0px", padding: "16px", maxWidth: "1370px" }}>
      <Grid_2
        sx={{ maxWidth: "1370px" }}
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        <Grid_2 sx={{ width: "auto", marginTop: "34px" }}>
          <Profile>
            <img src={rr} alt="profile" />
          </Profile>
        </Grid_2>
        <Grid_2
          sx={{ marginTop: "24px", minWidth: "640px", width: "auto", maxWidth: "1370px" }}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid_2 sx={{ marginTop: "24px" }}>
            <Grid_2 container direction="row" justifyContent="flex-start" alignItems="center">
              <Grid_2 sx={{ width: "74px" }}></Grid_2>
              <Grid_2 sx={{ minWidth: "480px", width: "60vw", maxWidth: "700px" }}></Grid_2>
              <Grid_2>
                <Button
                  variant="contained"
                  sx={{ marginLeft: "4px", width: "100px", height: "40px", padding: "0" }}
                >
                  수정완료
                </Button>
              </Grid_2>
            </Grid_2>
            <Grid_2
              sx={{ marginTop: "16px" }}
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid_2 sx={{ width: "74px" }}>
                <Typography>닉네임</Typography>
              </Grid_2>
              <Grid_2>
                <TextField
                  id="myMajor"
                  placeholder="닉네임을 입력해 주세요."
                  sx={{ minWidth: "480px", width: "60vw", maxWidth: "700px" }}
                />
              </Grid_2>
              <Grid_2>
                <Button
                  variant="outlined"
                  sx={{ marginLeft: "4px", width: "100px", height: "40px", padding: "0" }}
                >
                  중복확인
                </Button>
              </Grid_2>
            </Grid_2>
            {/* <Grid_2>
              <TextField
                id="myMajor"
                label="전공"
                defaultValue="시각 디자인"
                sx={{ marginTop: "24px", minWidth: "430px" }}
              />
            </Grid_2> */}
            <Grid_2
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid_2>
                <Typography sx={{ marginTop: "24px", fontSize: "14px" }}>
                  최소 하나의 분야를 선택해주세요.
                </Typography>
              </Grid_2>
              <Grid_2>
                <Category>
                  {/* <Slider>
          <Swiper
            className="CateBtn-Container"
            spaceBetween={10}
            slidesPerView={9}
            pagination={{ clickable: true }}
          > */}
                  {/* <SwiperSlide> */}
                  <CateBtn
                    onClick={() => {
                      is_cate === "미술/디자인" ? setIs_Cate("") : setIs_Cate("미술/디자인");
                      setSelected(true);
                    }}
                  >
                    <Grid _className={is_cate === "미술/디자인" ? "default active" : "default"}>
                      {/* <ImSpoonKnife className="icon" /> */}
                      <p>미술/디자인</p>
                    </Grid>
                  </CateBtn>
                  {/* </SwiperSlide> */}
                  {/* <SwiperSlide> */}
                  <CateBtn
                    onClick={() => {
                      is_cate === "영상" ? setIs_Cate("") : setIs_Cate("영상");
                      setSelected(true);
                    }}
                  >
                    <Grid _className={is_cate === "영상" ? "active" : "default"}>
                      {/* <MdMenuBook className="icon" /> */}
                      <p>영상</p>
                    </Grid>
                  </CateBtn>
                  {/* </SwiperSlide> */}
                  {/* <SwiperSlide> */}
                  <CateBtn
                    onClick={() => {
                      is_cate === "배우" ? setIs_Cate("") : setIs_Cate("배우");
                      setSelected(true);
                    }}
                  >
                    <Grid _className={is_cate === "배우" ? "active" : "default"}>
                      {/* <IoShirt className="icon" size={28} /> */}
                      <p>배우</p>
                    </Grid>
                  </CateBtn>
                  {/* </SwiperSlide> */}

                  {/* <SwiperSlide> */}
                  <CateBtn
                    onClick={() => {
                      is_cate === "사진" ? setIs_Cate("") : setIs_Cate("사진");
                      setSelected(true);
                    }}
                  >
                    <Grid _className={is_cate === "사진" ? "active" : "default"}>
                      {/* <FaCouch className="icon" /> */}
                      <p>사진</p>
                    </Grid>
                  </CateBtn>
                  {/* </SwiperSlide> */}
                  {/* <SwiperSlide> */}
                  <CateBtn
                    onClick={() => {
                      is_cate === "프로그래밍" ? setIs_Cate("") : setIs_Cate("프로그래밍");
                      setSelected(true);
                    }}
                  >
                    <Grid _className={is_cate === "프로그래밍" ? "active" : "default"}>
                      {/* <CgSmartHomeRefrigerator className="icon" /> */}
                      <p>프로그래밍</p>
                    </Grid>
                  </CateBtn>
                  {/* </SwiperSlide> */}
                  {/* <SwiperSlide> */}
                  <CateBtn
                    onClick={() => {
                      is_cate === "모델" ? setIs_Cate("") : setIs_Cate("모델");
                      setSelected(true);
                    }}
                  >
                    <Grid _className={is_cate === "모델" ? "active" : "default"}>
                      {/* <RiCupFill className="icon" /> */}
                      <p>모델</p>
                    </Grid>
                  </CateBtn>
                  {/* </SwiperSlide> */}
                  {/* <SwiperSlide> */}
                  <CateBtn
                    onClick={() => {
                      is_cate === "성우" ? setIs_Cate("") : setIs_Cate("성우");
                      setSelected(true);
                    }}
                  >
                    <Grid _className={is_cate === "성우" ? "active" : "default"}>
                      {/* <IoExtensionPuzzle className="icon" /> */}
                      <p>성우</p>
                    </Grid>
                  </CateBtn>
                  {/* </SwiperSlide> */}
                  {/* <SwiperSlide> */}
                  <CateBtn
                    onClick={() => {
                      is_cate === "음향" ? setIs_Cate("") : setIs_Cate("음향");
                      setSelected(true);
                    }}
                  >
                    <Grid _className={is_cate === "음향" ? "active" : "default"}>
                      {/* <BiSmile className="icon" /> */}
                      <p>음향</p>
                    </Grid>
                  </CateBtn>
                  {/* </SwiperSlide> */}
                  {/* <SwiperSlide> */}
                  <CateBtn
                    onClick={() => {
                      is_cate === "기타" ? setIs_Cate("") : setIs_Cate("기타");
                      setSelected(true);
                    }}
                  >
                    <Grid _className={is_cate === "기타" ? "active" : "default"}>
                      {/* <BsThreeDots className="icon" /> */}
                      <p>기타</p>
                    </Grid>
                  </CateBtn>
                  {/* </SwiperSlide> */}
                  {/* </Swiper> */}
                  {/* </Slider> */}
                </Category>
              </Grid_2>
            </Grid_2>
            <Grid_2>
              <Grid_2 container direction="row" justifyContent="flex-start" alignItems="center">
                <Grid_2 sx={{ width: "74px" }}>
                  <Typography>자기소개</Typography>
                </Grid_2>
                <Grid_2>
                  <TextField
                    sx={{ minWidth: "480px", width: "60vw", maxWidth: "700px" }}
                    id="myMajor"
                    placeholder="한 줄 자기소개를 부탁해요."
                  />
                </Grid_2>
              </Grid_2>
              <Grid_2
                sx={{ marginTop: "24px" }}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid_2 sx={{ width: "74px" }}>
                  <Typography></Typography>
                </Grid_2>
                <Grid_2>
                  <TextField
                    id="myIntro"
                    multiline
                    placeholder="주특기를 설명해 주세요."
                    sx={{ minWidth: "480px", width: "60vw", maxWidth: "700px" }}
                  />
                </Grid_2>
              </Grid_2>
              <Grid_2
                sx={{ marginTop: "24px" }}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid_2 sx={{ width: "74px" }}>
                  <Typography>포트폴리오</Typography>
                </Grid_2>
                <Grid_2>
                  <TextField
                    id="myIntro"
                    multiline
                    placeholder="동영상 URL을 입력해 주세요."
                    sx={{ minWidth: "480px", width: "60vw", maxWidth: "700px" }}
                  />
                </Grid_2>
              </Grid_2>
            </Grid_2>
          </Grid_2>
          <Grid_2 container direction="column" justifyContent="flex-start" alignItems="flex-start">
            <Grid_2>
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </Grid_2>
            <Grid_2>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  "& > :not(style)": {
                    m: 1,
                    width: 128,
                    height: 128,
                  },
                }}
              >
                <Paper elevation={3} />
                <Paper elevation={3} />
                <Paper elevation={3} />
                <Paper elevation={3} />
                <Paper elevation={3} />
              </Box>
            </Grid_2>
          </Grid_2>
        </Grid_2>
      </Grid_2>
    </Container>
  );
};

const Profile = styled_2.div`
  /* margin-top: 5%; */
  /* float: left; */
  height: auto;
  width: auto;
  display: inline;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    max-width: 80px;
    min-width: 80px;
    /* width: 20vw; */
    height: auto;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid black;
  }
  p {
    font-size: 16px;
    text-align: center;
  }
`;

const Category = styled_2.div`
  /* margin-left: 3%; */
  /* margin-right: 3%; */
  display: flex;
  /* margin-top: 2%; */
  margin-bottom: 3%;
  justify-content: space-between;
`;
const CateBtn = styled_2.div`
  width: 80px;
  height: 30px;
  border-radius: 10px;
  margin-right: 4px;

  .default {
    width: 80px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid black;
    background-color: #f2f2f2;
    /* box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .icon {
      font-size: 32px;
      color: var(--inactive-text-color);
    }
    p {
      text-align: center;
      font-size: 12px;

      color: black;
    }
  }
  .active {
    width: 80px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;

    background-color: gray;
    animation: 0.6s ease-in-out loadEffect3;
    .icon {
      color: #fff;
      font-size: 32px;
    }
    p {
      font-size: 12px;

      text-align: center;
      color: black;
    }
  }
  @keyframes loadEffect3 {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    65% {
      opacity: 0.65;
      transform: scale(1.01);
    }
    85% {
      opacity: 0.85;
      transform: scale(0.97);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .inactive {
    .icon {
      color: var(--help-color);
      font-size: 32px;
    }
    p {
      font-size: 12px;

      color: white;
    }
  }
`;

const Input = styled("input")({
  display: "none",
});

export default UserMod;
