import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "../elements/Index";

import MainList from "../components/Main/MainList";
import mainImage from "../assets/Group 36.png";
import PlaceIcon from "@mui/icons-material/Place";

import { actionCreates as postActions } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import MainSearch from "../components/Main/MainSearch";
import { history } from "../redux/configureStore";

const Main = () => {
  const [is_location, setLocation] = useState("위치 설정");
  const [is_open, setIs_open] = useState(false);
  const [selected, setSelected] = useState(false);
  const [is_cate, setIs_Cate] = useState("");

  const dispatch = useDispatch();

  //지역 옵션
  const locations = [
    { id: 1, locationName: "전체" },
    { id: 2, locationName: "동대문구" },
    { id: 3, locationName: "마포구" },
    { id: 4, locationName: "서대문구" },
    { id: 5, locationName: "성북구" },
  ];

  useEffect(() => {
    dispatch(postActions.__getPost());
  }, []);

  return (
    <>
      <Container>
        <MainImage>
          <img src={mainImage} alt="MainImage" />
        </MainImage>
        <Category>
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
              <p>미술/디자인</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "영상" ? setIs_Cate("") : setIs_Cate("영상");
              setSelected(true);
            }}
          >
            <Grid _className={is_cate === "영상" ? "active" : "default"}>
              <p>영상</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "배우" ? setIs_Cate("") : setIs_Cate("배우");
              setSelected(true);
            }}
          >
            <Grid _className={is_cate === "배우" ? "active" : "default"}>
              <p>배우</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "사진" ? setIs_Cate("") : setIs_Cate("사진");
              setSelected(true);
            }}
          >
            <Grid _className={is_cate === "사진" ? "active" : "default"}>
              <p>사진</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "프로그래밍"
                ? setIs_Cate("")
                : setIs_Cate("프로그래밍");
              setSelected(true);
            }}
          >
            <Grid _className={is_cate === "프로그래밍" ? "active" : "default"}>
              <p>프로그래밍</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "모델" ? setIs_Cate("") : setIs_Cate("모델");
              setSelected(true);
            }}
          >
            <Grid _className={is_cate === "모델" ? "active" : "default"}>
              <p>모델</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "성우" ? setIs_Cate("") : setIs_Cate("성우");
              setSelected(true);
            }}
          >
            <Grid _className={is_cate === "성우" ? "active" : "default"}>
              <p>성우</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "음향" ? setIs_Cate("") : setIs_Cate("음향");
              setSelected(true);
            }}
          >
            <Grid _className={is_cate === "음향" ? "active" : "default"}>
              <p>음향</p>
            </Grid>
          </CateBtn>
        </Category>

        {/* 위치설정 */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LocationBox>
            <Grid
              _onClick={() => setIs_open(!is_open)}
              _className={
                is_location === "위치 설정하기" ? "default" : "active"
              }
            >
              <div
                style={{
                  width: "190px",
                  height: "63px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PlaceIcon className="icon" fontSize="large" />
                <p>{is_location}</p>
              </div>
            </Grid>

            <Grid _className="location-option">
              {is_open ? (
                <>
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
                </>
              ) : null}
            </Grid>
          </LocationBox>
          <MainSearch />
          <BtnTest
            onClick={() => {
              history.push("/write");
            }}
          >
            글쓰기
          </BtnTest>
        </div>

        {/* 메인카드 */}
        <MainList />
      </Container>
    </>
  );
};

const MainImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 1370px;
  margin: 3% auto;
`;

const BtnTest = styled.button`
  cursor: pointer;
  width: 150px;
  height: 63px;

  background: #ffd082;
  border: none;
  box-sizing: border-box;
  box-shadow: inset 0px 4px 13px #d7f1fd;
  border-radius: 14px;
  font-size: 25px;
  font-weight: 700;
  color: white;
`;

const LocationBox = styled.div`
  justify-content: center;

  flex-direction: column;
  display: flex;

  width: 198px;
  height: 63px;
  margin-right: 1rem;
  border-radius: 14px;
  position: relative;
  background-color: #2967ac;
  font-size: 24px;
  font-weight: 700;
  color: #f5fcff;
  box-shadow: inset 0px 4px 13px #d7f1fd;
  /* box-shadow: inset 0px 4px 13px #d7f1fd; */
  cursor: pointer;
  .icon {
    margin-right: 5px;
  }
  .active {
    color: #f5fcff;
    animation: 0.6s ease-in-out loadEffect3;
  }
  p {
    text-align: center;
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
    margin: 28rem 0 0 -7%;

    position: absolute;
    color: black;
    background-color: rgba(255, 208, 130, 1);
    box-shadow: inset 0px 4px 13px #d7f1fd;

    border-radius: 6px;
    z-index: 15;
    cursor: pointer;
    p {
      padding: 10px 10px;
      &:hover {
        background-color: yellowgreen;
      }
    }
  }
`;

const Category = styled.div`
  margin-top: 5%;
  margin-bottom: 2%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CateBtn = styled.div`
  margin: 0 5px;
  .default {
    width: 140px;
    height: 50px;
    border-radius: 14px;

    background-color: #f5fcff;
    /* box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0px 4px 13px #d7f1fd;
    cursor: pointer;

    p {
      text-align: center;
      font-size: 15px;

      color: rgba(41, 103, 172, 1);
    }
  }
  .active {
    width: 140px;
    height: 50px;
    border-radius: 14px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0px 4px 13px #d7f1fd;
    cursor: pointer;

    background-color: gray;
    animation: 0.6s ease-in-out loadEffect3;
    .icon {
      color: #fff;
      font-size: 32px;
    }
    p {
      font-size: 15px;

      text-align: center;
      color: rgba(41, 103, 172, 1);
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
