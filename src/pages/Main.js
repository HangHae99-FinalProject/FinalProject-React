import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "../elements/Index";

import MainList from "../components/Main/MainList";
import mainImage from "../assets/Group 36.png";
import PlaceIcon from "@mui/icons-material/Place";

import { actionCreates as postActions } from "../redux/modules/post";
import { actionCreates as recruitActions } from "../redux/modules/recruit";

import { useDispatch, useSelector } from "react-redux";
import MainSearch from "../components/Main/MainSearch";
import { history } from "../redux/configureStore";
import { Redirect, useLocation } from "react-router-dom";

const Main = () => {
  const [is_location, setLocation] = useState("위치 설정");
  const [is_open, setIs_open] = useState(false);
  const [selected, setSelected] = useState(false);
  const [is_cate, setIs_Cate] = useState("");
  const [is_scroll, setIs_scroll] = useState(window.scrollY);

  const pathName = useLocation();

  const is_login = useSelector((state) => state.user.isLogin);

  const from = localStorage.getItem("from");

  const dispatch = useDispatch();

  const writeBtn = () => {
    if (is_login === false) {
      alert("로그인을 먼저 해주세요!");
      history.push("/login");
      return;
    }
    history.push("/write");
  };

  //지역 옵션
  const locations = [
    { id: 1, locationName: "전체" },
    { id: 2, locationName: "서울/경기" },
    { id: 3, locationName: "강원" },
    { id: 4, locationName: "전북" },
    { id: 5, locationName: "전남" },
    { id: 6, locationName: "충북" },
    { id: 7, locationName: "충남" },
    { id: 8, locationName: "경북" },
    { id: 9, locationName: "경남" },
    { id: 10, locationName: "제주" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(recruitActions.initRecruit());
      dispatch(postActions.clearPost());
    };
  }, [dispatch, pathName]);

  if (from) {
    return <Redirect to={{ pathname: from }} />;
  }

  return (
    <>
      <Container>
        <MainImage>
          <img
            className="scale-up-hor-center"
            src={mainImage}
            alt="MainImage"
            onClick={() => {
              window.location.reload();
              // history.push("/main")
            }}
          />
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
              _className={is_cate === "미술/디자인" ? "active" : "default"}
              bg={is_cate === "미술/디자인" ? "#2967AC" : "#f5fcff"}
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
            <Grid
              _className={is_cate === "영상" ? "active" : "default"}
              bg={is_cate === "영상" ? "#6AD8F5" : "#f5fcff"}
            >
              <p>영상</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "배우" ? setIs_Cate("") : setIs_Cate("배우");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "배우" ? "active" : "default"}
              bg={is_cate === "배우" ? "#F58467" : "#f5fcff"}
            >
              <p>배우</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "사진" ? setIs_Cate("") : setIs_Cate("사진");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "사진" ? "active" : "default"}
              bg={is_cate === "사진" ? "#4299E9" : "#f5fcff"}
            >
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
            <Grid
              _className={is_cate === "프로그래밍" ? "active" : "default"}
              bg={is_cate === "프로그래밍" ? "#5BC8D2" : "#f5fcff"}
            >
              <p>프로그래밍</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "모델" ? setIs_Cate("") : setIs_Cate("모델");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "모델" ? "active" : "default"}
              bg={is_cate === "모델" ? "#FE674C" : "#f5fcff"}
            >
              <p>모델</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "성우" ? setIs_Cate("") : setIs_Cate("성우");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "성우" ? "active" : "default"}
              bg={is_cate === "성우" ? "#FFD082" : "#f5fcff"}
            >
              <p>성우</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "음향" ? setIs_Cate("") : setIs_Cate("음향");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "음향" ? "active" : "default"}
              bg={is_cate === "음향" ? "#FFEF62" : "#f5fcff"}
            >
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
              _className={is_location === "위치 설정" ? "default" : "active"}
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
          <MainSearch
            location={is_location}
            category={is_cate}
            selected={selected}
          />
          <BtnTest onClick={writeBtn}>글쓰기</BtnTest>
        </div>

        {/* 메인카드 */}
        <MainList
          location={is_location}
          category={is_cate}
          selected={selected}
        />
      </Container>
      <BackImage>
        <img
          src="https://velog.velcdn.com/images/tty5799/post/132ac619-d569-4005-9052-3ff8e28d5b6d/image.png"
          alt="backImg"
        />
      </BackImage>
    </>
  );
};

const BackImage = styled.div`
  z-index: 9999;
  bottom: 0px;
  left: 0;
  width: 100%;
`;

const MainImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    cursor: pointer;
  }
`;

const Container = styled.div`
  width: 1370px;
  margin: 3% auto;
  .scale-up-hor-center {
    -webkit-animation: scale-up-hor-center 0.6s cubic-bezier(1, 0, 0, 1) both;
    animation: scale-up-hor-center 0.6s cubic-bezier(1, 0, 0, 1) both;
  }
  @-webkit-keyframes scale-up-hor-center {
    0% {
      -webkit-transform: scaleX(0.4);
      transform: scaleX(0.4);
    }
    100% {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
  @keyframes scale-up-hor-center {
    0% {
      -webkit-transform: scaleX(0.4);
      transform: scaleX(0.4);
    }
    100% {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
`;

const BtnTest = styled.button`
  cursor: pointer;
  width: 150px;
  height: 63px;
  margin-left: 30px;
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

  position: relative;
  background-color: #2967ac;
  font-size: 24px;
  font-weight: 700;
  color: #f5fcff;
  box-shadow: inset 0px 2px 13px #d7f1fd;
  border-radius: 14px;

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
    position: absolute;
    margin-top: 50.9rem;
    color: #fff;
    background-color: #2967ac;
    box-shadow: inset 0px 2px 13px #d7f1fd;
    border-radius: 14px;
    z-index: 15;
    cursor: pointer;
    p {
      padding: 10px 10px;
      &:hover {
        font-size: 27px;
        font-weight: 700;
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
  margin: 0 7px;
  .default {
    width: 140px;
    height: 50px;
    border-radius: 14px;

    background-color: #f5fcff;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0px 4px 13px #d7f1fd;
    cursor: pointer;

    p {
      text-align: center;
      font-size: 20px;
      font-weight: 700;

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

    animation: 0.6s ease-in-out loadEffect3;
    .icon {
      color: #fff;
      font-size: 32px;
    }
    p {
      text-align: center;
      font-size: 20px;
      font-weight: 700;

      color: #fff;

      text-align: center;
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
