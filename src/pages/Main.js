import React, { useState } from "react";
import styled from "styled-components";
import { Grid } from "../elements/Index";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import MainCard from "../components/Main/MainCard";
import flex from "../themes/flex";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
// import "swiper/css";
// import "swiper/css/pagination";
import MainList from "../components/Main/MainList";

const Main = () => {
  const [is_location, setLocation] = useState("위치 설정하기");
  const [is_open, setIs_open] = useState(false);
  const [selected, setSelected] = useState(false);
  const [is_cate, setIs_Cate] = useState("");

  //지역 옵션
  const locations = [
    { id: 1, locationName: "전체" },
    { id: 2, locationName: "동대문구" },
    { id: 3, locationName: "마포구" },
    { id: 4, locationName: "서대문구" },
    { id: 5, locationName: "성북구" },
  ];
  return (
    <>
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
            is_cate === "미술/디자인"
              ? setIs_Cate("")
              : setIs_Cate("미술/디자인");
            setSelected(true);
          }}
        >
          <Grid
            _className={
              is_cate === "미술/디자인" ? "default active" : "default"
            }
          >
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
            is_cate === "프로그래밍"
              ? setIs_Cate("")
              : setIs_Cate("프로그래밍");
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

      {/* 위치설정 */}
      <div
        style={{
          width: "95%",
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <LocationBox>
          <Grid
            is_flex
            flex_align="center"
            _onClick={() => setIs_open(true)}
            _className={is_location === "위치 설정하기" ? "default" : "active"}
          >
            <FmdGoodIcon className="icon" />
            <Grid is_flex flex_align="center">
              {is_location}
            </Grid>
          </Grid>
          {is_open && (
            <>
              <Grid _className="location-option">
                {locations.map((loc, i) => {
                  return (
                    <p
                      key={loc.id}
                      onClick={() => {
                        setLocation(loc.locationName);
                        setIs_open(false);
                        setSelected(true);
                      }}
                    >
                      {loc.locationName}
                    </p>
                  );
                })}
              </Grid>
            </>
          )}
        </LocationBox>
        <BtnTest>글쓰기</BtnTest>
      </div>

      {/* 메인카드 */}
      <MainList />
    </>
  );
};

const BtnTest = styled.button`
  cursor: pointer;
  width: 100px;
  height: 30px;

  background: #cecece;
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
`;

const LocationBox = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  position: relative;
  background-color: #fff;
  color: #949494;
  padding: 5px 16px 5px 16px;
  /* box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25),
    inset 0px 4px 4px rgba(0, 0, 0, 0.25); */
  cursor: pointer;
  .icon {
    margin-right: 5px;
  }
  .active {
    color: #949494;
    animation: 0.6s ease-in-out loadEffect3;
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

  .location-option {
    width: 140px;
    position: absolute;
    top: 45px;
    left: 25px;
    color: black;
    background-color: #949494;
    border: 1px solid gray;
    border-radius: 6px;
    z-index: 15;
    cursor: pointer;
    p {
      padding: 10px 10px;
      &:hover {
        background-color: gray;
      }
    }
  }
`;

const Category = styled.div`
  margin-left: 3%;
  margin-right: 3%;
  display: flex;
  margin-top: 2%;
  margin-bottom: 3%;
  justify-content: space-between;
`;
const CateBtn = styled.div`
  width: 80px;
  height: 30px;
  border-radius: 10px;

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
      color: var(--inactive--color);
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

export default Main;
