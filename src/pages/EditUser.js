/* eslint-disable*/
import React, { useEffect, useState } from "react";
import _styled from "styled-components";
import {
  pro1,
  pro2,
  pro3,
  pro4,
  pro5,
  pro6,
  pro7,
  pro8,
  pro9,
} from "../assets/profileImage/ProfileImgs";
import { Grid } from "../elements/Index";
import Uploads from "../elements/Upload";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/userInfo";
import { actionCreators as userInfoActions } from "../redux/modules/myPage";
import EditImage from "../elements/EditImage";
import { history } from "../redux/configureStore";

import Grid_2 from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ImageListItem from "@mui/material/ImageListItem";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { get } from "react-hook-form";
import { useParams } from "react-router-dom";

const EditUser = () => {
  console.log(
    "https://velog.velcdn.com/images/tty5799/post/4c81b900-5ebd-491e-8f9c-4dbb464c277f/image.png"
  );
  const param = useParams();
  const dispatch = useDispatch();
  const getUserInfo = useSelector((state) => state.myPage?.userInfo);
  // const setUserInfo = useSelector((state) => state.myPage.requestDto);
  // console.log(getUserInfo);

  const [selected, setSelected] = useState(false);
  // const [profileImgUrl, setProfileImgUrl] = useState("");
  const [nickname, setNickname] = useState(getUserInfo?.nickname);
  const [major, setMajor] = useState(getUserInfo?.major);
  const [intro, setIntro] = useState(getUserInfo?.intro);
  const [portfolioLink, setPortfolioLink] = useState(
    getUserInfo?.portfolioLink
  );
  const [currentImgUrl, setCurrentImgUrl] = useState(
    getUserInfo?.userPortfolioImgList
  );
  const [profileImgUrl, setProfileImgUrl] = useState(getUserInfo?.profileImg);
  // console.log(nickname);

  // const onProfileImgUrlHandler = (e) => {
  //   setProfileImgUrl(e.target.value);
  // };
  const onNicknameHandler = (e) => {
    setNickname(e.target.value);
  };
  const onIntroHandler = (e) => {
    setIntro(e.target.value);
  };
  const onPortfolioHandler = (e) => {
    setPortfolioLink(e.target.value);
  };
  const onCurrentImgUrlHandler = (e) => {
    setCurrentImgUrl(e.target.value);
  };

  const Files = useSelector((state) => state.image.files);
  // 파일만 넣을 빈 배열
  let newFiles = [];
  // URL을 분리할 배열

  for (let i = 0; i < Files.length; i++) {
    // 조건을 걸어 파일안에 name이 있으면 파일을 넣음
    if (Files[i].name) {
      newFiles.push(Files[i]);
    }
  }

  const imgUrl = useSelector((state) => state.image.editUrl);

  const requestDto = {
    profileImg: profileImgUrl,
    nickname: nickname,
    intro: intro,
    major: major,
    portfolioLink: portfolioLink,
    currentImgUrl: currentImgUrl,
  };
  // console.log(requestDto)

  const userId = param.id;

  //프로필이미지 POPOVER
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // 다중이미지 첨부 기능 작업할 것!!!!!
  const goEdit = () => {
    if (requestDto.profileImgUrl === "") {
      alert("프로필 이미지를 선택해 주세요.");
      return;
    }
    if (requestDto.nickname === "") {
      alert("닉네임을 입력해 주세요.");
      return;
    }
    if (requestDto.intro === "") {
      alert("자기소개를 입력해 주세요.");
      return;
    }
    if (requestDto.major === "") {
      alert("전공을 선택해 주세요.");
      return;
    }
    if (requestDto.portfolioLink === "") {
      alert("포트폴리오 링크를 입력해 주세요.");
      return;
    }
    dispatch(userInfoActions.__putUserInfoMod(userId, requestDto, newFiles));
    // history.replace(`/user/${id}`)
    // console.log(
    //   "프로필:",
    //   profileImgUrl,
    //   "닉네임:",
    //   nickname,
    //   "전공:",
    //   major,
    //   "자기소개:",
    //   intro,
    //   "포트폴리오:",
    //   portfolioLink,
    //   "현재첨부이미지",
    //   currentImgUrl,
    //   "신규이미지",
    //   newFiles,
    // );
  };

  useEffect(() => {
    dispatch(userInfoActions.__getUserInfo());
    // dispatch(userInfoActions.setUserInfo(requestDto));
    return;
  }, []);

  return (
    <Container sx={{ margin: "0px 0px", padding: "16px", maxWidth: "1370px" }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          goEdit();
        }}
      >
        <Grid_2
          sx={{ maxWidth: "1370px" }}
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          <Grid_2 sx={{ width: "auto", marginTop: "34px" }}>
            <Profile>
              <img
                src={
                  profileImgUrl == getUserInfo.profileImg
                    ? getUserInfo.profileImg
                    : profileImgUrl
                }
                alt="profile"
              />
            </Profile>
            <Badge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              onClick={handleClick}
            >
              <AddCircleRoundedIcon
                fontSize="large"
                sx={{ color: "#2967AC" }}
              />
            </Badge>
            <Grid_2>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Grid>
                  <ImageList
                    sx={{
                      padding: "28.5px 24px",
                      margin: "0",
                      borderRadius: "5px",
                    }}
                    cols={3}
                    rowHeight={120}
                  >
                    {itemData.map((item) => (
                      <ImageListItem
                        key={item.img}
                        sx={{
                          margin: "10.5px 12px",
                          cursor: "pointer",
                          width: "120px",
                          height: "120px",
                          display: "corver",
                        }}
                      >
                        <img
                          src={item.img}
                          srcSet={item.img}
                          alt={item.title}
                          loading="lazy"
                          onClick={() => {
                            setProfileImgUrl(item.img);
                          }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Grid>
              </Popover>
            </Grid_2>
          </Grid_2>
          <Grid_2
            sx={{
              marginTop: "24px",
              minWidth: "640px",
              width: "auto",
              maxWidth: "1370px",
            }}
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid_2 sx={{ marginTop: "24px" }}>
              <Grid_2
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid_2 sx={{ width: "74px" }}></Grid_2>
                <Grid_2
                  sx={{ minWidth: "480px", width: "60vw", maxWidth: "700px" }}
                ></Grid_2>
                <Grid_2>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      marginLeft: "4px",
                      width: "100px",
                      height: "40px",
                      padding: "0",
                    }}
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
                    sx={{ minWidth: "480px", width: "60vw", maxWidth: "700px" }}
                    id="myNickname"
                    multiline
                    defaultValue={nickname}
                    placeholder="닉네임을 작성해 주세요."
                    onChange={onNicknameHandler}
                  />
                </Grid_2>
                <Grid_2>
                  <Button
                    variant="outlined"
                    sx={{
                      marginLeft: "4px",
                      width: "100px",
                      height: "40px",
                      padding: "0",
                    }}
                  >
                    중복확인
                  </Button>
                </Grid_2>
              </Grid_2>
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
                    <CateBtn
                      onClick={() => {
                        major === "미술/디자인"
                          ? setMajor("")
                          : setMajor("미술/디자인");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={
                          major === "미술/디자인" ? "default active" : "default"
                        }
                      >
                        <p>미술/디자인</p>
                      </Grid>
                    </CateBtn>
                    <CateBtn
                      onClick={() => {
                        major === "영상" ? setMajor("") : setMajor("영상");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={major === "영상" ? "active" : "default"}
                      >
                        <p>영상</p>
                      </Grid>
                    </CateBtn>
                    <CateBtn
                      onClick={() => {
                        major === "배우" ? setMajor("") : setMajor("배우");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={major === "배우" ? "active" : "default"}
                      >
                        <p>배우</p>
                      </Grid>
                    </CateBtn>
                    <CateBtn
                      onClick={() => {
                        major === "사진" ? setMajor("") : setMajor("사진");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={major === "사진" ? "active" : "default"}
                      >
                        <p>사진</p>
                      </Grid>
                    </CateBtn>
                    <CateBtn
                      onClick={() => {
                        major === "프로그래밍"
                          ? setMajor("")
                          : setMajor("프로그래밍");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={
                          major === "프로그래밍" ? "active" : "default"
                        }
                      >
                        <p>프로그래밍</p>
                      </Grid>
                    </CateBtn>
                    <CateBtn
                      onClick={() => {
                        major === "모델" ? setMajor("") : setMajor("모델");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={major === "모델" ? "active" : "default"}
                      >
                        <p>모델</p>
                      </Grid>
                    </CateBtn>
                    <CateBtn
                      onClick={() => {
                        major === "성우" ? setMajor("") : setMajor("성우");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={major === "성우" ? "active" : "default"}
                      >
                        <p>성우</p>
                      </Grid>
                    </CateBtn>
                    <CateBtn
                      onClick={() => {
                        major === "음향" ? setMajor("") : setMajor("음향");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={major === "음향" ? "active" : "default"}
                      >
                        <p>음향</p>
                      </Grid>
                    </CateBtn>
                    <CateBtn
                      onClick={() => {
                        major === "기타" ? setMajor("") : setMajor("기타");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={major === "기타" ? "active" : "default"}
                      >
                        <p>기타</p>
                      </Grid>
                    </CateBtn>
                  </Category>
                </Grid_2>
              </Grid_2>
              <Grid_2>
                <Grid_2
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid_2 sx={{ width: "74px" }}>
                    <Typography>자기소개</Typography>
                  </Grid_2>
                  <Grid_2>
                    <TextField
                      sx={{
                        minWidth: "480px",
                        width: "60vw",
                        maxWidth: "700px",
                      }}
                      id="myIntro"
                      multiline
                      defaultValue={intro}
                      placeholder="자기소개를 부탁해요."
                      onChange={onIntroHandler}
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
                      defaultValue={portfolioLink}
                      placeholder="동영상 URL을 입력해 주세요."
                      sx={{
                        minWidth: "480px",
                        width: "60vw",
                        maxWidth: "700px",
                      }}
                      onChange={onPortfolioHandler}
                    />
                  </Grid_2>
                </Grid_2>
              </Grid_2>
            </Grid_2>
            <Grid_2
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid_2>
                <EditImage />
              </Grid_2>
            </Grid_2>
          </Grid_2>
        </Grid_2>
      </form>
    </Container>
  );
};

const itemData = [
  {
    img: require(`../assets/profileImage/1.png`),
    title: "1",
  },
  {
    img: require(`../assets/profileImage/2.png`),
    title: "2",
  },
  {
    img: require(`../assets/profileImage/3.png`),
    title: "3",
  },
  {
    img: require(`../assets/profileImage/4.png`),
    title: "4",
  },
  {
    img: require(`../assets/profileImage/5.png`),
    title: "5",
  },
  {
    img: require(`../assets/profileImage/6.png`),
    title: "6",
  },
  {
    img: require(`../assets/profileImage/7.png`),
    title: "7",
  },
  {
    img: require(`../assets/profileImage/8.png`),
    title: "8",
  },
  {
    img: require(`../assets/profileImage/9.png`),
    title: "9",
  },
];

const Profile = _styled.div`
  height: auto;
  width: auto;
  display: inline;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid black;
  }
  p {
    font-size: 16px;
    text-align: center;
  }
`;

const Category = _styled.div`
  /* margin-left: 3%; */
  /* margin-right: 3%; */
  display: flex;
  /* margin-top: 2%; */
  margin-bottom: 3%;
  justify-content: space-between;
`;
const CateBtn = _styled.div`
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

export default EditUser;
