import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "../elements/Index";

import MainList from "../components/Main/MainList";
import MainImage from "../components/Main/MainImage";

import { actionCreates as postActions } from "../redux/modules/post";
import { actionCreates as recruitActions } from "../redux/modules/recruit";

import { useDispatch, useSelector } from "react-redux";
import MainSearch from "../components/Main/MainSearch";
import { history } from "../redux/configureStore";
import { Redirect, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Link from "../components/Link";

import ModalWindow from "../elements/ModalWindow";
import TutorialSwiper from "../elements/TutorialSwiper";

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import dayjs from "dayjs";
import { useCookies } from 'react-cookie'; 

const Main = () => {
  const [is_location, setLocation] = useState("위치설정");
  const [is_open, setIs_open] = useState(false);
  const [selected, setSelected] = useState(false);
  const [is_cate, setIs_Cate] = useState("");
  
  const COOKIE_KEY = 'HideModal'; 	                     // 쿠키이름세팅 
  const [cookies, setCookie] = useCookies([COOKIE_KEY]); // 쿠키이름을 초기값으로 넣어 쿠키세팅

  const pathName = useLocation();

  const is_login = useSelector((state) => state.user.isLogin);

  const from = localStorage.getItem("from");

  const dispatch = useDispatch();

  const writeBtn = () => {
    if (is_login === false) {
      Swal.fire({
        title: "로그인을 해주세요!",
        text: "로그인 이후 이용 하실 수 있습니다!",
        icon: "warning",
      });
      history.push("/login");
      return;
    }
    history.push("/write");
  };

  //모달 컨트롤
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //여기까지 모달컨트롤

  //1회성 튜토리얼 모달
  const hideModal = () => {
    const date = dayjs();                     // 일단 dayjs 로 시간변수를 만들어주고
    const modalExpire = date.add(1, "day"); 	// 하루 뒤로 값을 add 해준다.
    setCookie(COOKIE_KEY, 'true', {	          // 쿠키를 셋해준다.
      path: '/',			                        // path를 지정해주고
      expires: modalExpire.toDate(),	      	// 여기서 날짜를 지정해준다
    });
    handleClose()
  };
  //여기까지 1회성 튜토리얼 모달

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
      {/* 튜토리얼 모달 */}
      {cookies[COOKIE_KEY] ? 
        null : 
        <ModalWindow
          handleOpen={handleOpen}
          open={open}
          // handleClose={handleClose}
          width="1200px"
          height="881px"
          borderRadius="20px"
        >
          <CloseBtn onClick={hideModal}>
            <CloseRoundedIcon/>
          </CloseBtn>
          <TutorialSwiper></TutorialSwiper>
        </ModalWindow>
      }
      {/* 여기까지 튜토리얼 모달 */}
      <Container>
        <MainImage />

        <Category>
          <CateBtn
            onClick={() => {
              is_cate === "디자인" ? setIs_Cate("") : setIs_Cate("디자인");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "디자인" ? "active" : "default"}
              bg={is_cate === "디자인" ? "#2967AC" : "#f5fcff"}
            >
              <p>디자인</p>
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
              _className={is_location === "위치설정" ? "default" : "active"}
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
                <img
                  src="https://velog.velcdn.com/images/tty5799/post/0f54f707-bc7a-4710-9f7a-7a82b5d3dce3/image.png"
                  alt="locationImg"
                  style={{ marginRight: "20px" }}
                />
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
          src="https://velog.velcdn.com/images/tty5799/post/a10b6974-bce2-4e6d-86a8-f6ae906c8647/image.png"
          alt="backImg"
        />
      </BackImage>
      <Link/>
    </>
  );
};

const CloseBtn = styled.div`
  z-index: 9999;
  width: 24px;
  height:24px;
  /* background-color: green; */
  margin: 20px 20px 0 1156px;
  cursor: pointer;
  position: absolute;
`;

const BackImage = styled.div`
  z-index: 9999;
  bottom: 0px;

  left: 0;
  img {
    width: 100%;
  }
`;

const Container = styled.div`
  width: 1370px;
  margin: 3% auto;
`;

const BtnTest = styled.button`
  cursor: pointer;
  width: 150px;
  height: 63px;
  margin-left: 25px;
  background: #ffd082;
  border: none;
  /* box-shadow: inset 0px 2px 8px #ffffff; */
  box-shadow: 0px 0px 0px;
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
  margin-right: 25px;

  position: relative;
  background-color: #2967ac;
  font-size: 24px;
  font-weight: 700;
  color: #f5fcff;
  /* box-shadow: inset 0px 2px 13px #d7f1fd; */
  box-shadow: 0px 0px 0px;
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
  margin-top: 50px;
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
    border: 1px solid #e0f4fe;

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
