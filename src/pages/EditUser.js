/* eslint-disable*/
import React, { useEffect, useState } from "react";
import _styled from "styled-components";
import { Grid } from "../elements/Index";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userInfoActions } from "../redux/modules/myPage";
import EditImage from "../elements/EditImage";
import Footer from "../elements/Footer";
import axios from "axios";

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
import { useParams } from "react-router-dom";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

const EditUser = () => {
  console.log(
    "https://velog.velcdn.com/images/tty5799/post/4c81b900-5ebd-491e-8f9c-4dbb464c277f/image.png"
  );
  const param = useParams();
  const dispatch = useDispatch();
  const [checkNicknameError, setCheckNicknameError] = React.useState(null);

  const getUserInfo = useSelector((state) => state.myPage?.userInfo);
  // const post_list = useSelector((state) => state.post.detailList);
  // const setUserInfo = useSelector((state) => state.myPage.requestDto);
  console.log(getUserInfo.userPortfolioImgList);

  const [selected, setSelected] = useState(false);
  // const [profileImgUrl, setProfileImgUrl] = useState("");
  const [nickname, setNickname] = useState(getUserInfo?.nickname);
  const [major, setMajor] = useState(getUserInfo?.major);
  const [intro, setIntro] = useState(getUserInfo?.intro);
  const [portfolioLink, setPortfolioLink] = useState(getUserInfo?.portfolioLink);
  const [currentImgUrl, setCurrentImgUrl] = useState(getUserInfo?.userPortfolioImgList);
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

  // 헬퍼텍스트 -아이디, 패스워드, 패스워드확인, 닉네임, 전공
  function NicknameFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "예. 영문 대소문자, 한글, 숫자 포함 4~10자 입니다.";
      } else if (checkNicknameError === false) {
        return "중복된 닉네임입니다.";
      } else if (checkNicknameError === true) {
        return "사용 가능한 닉네임입니다.";
      }

      return " ";
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }
  // 여기까지 헬퍼텍스트 -아이디, 패스워드, 패스워드확인, 닉네임, 전공

  const nicknameCheckBtn = async () => {
    try {
      const checkNickname = await axios.post("https://everymohum.shop/user/nicknameCheck", {
        nickname,
        major,
      });
      console.log(checkNickname.status);
      checkNickname.status == 200 && setCheckNicknameError(true);
      // window.alert("사용이 가능한 아이디입니다.");
    } catch (err) {
      console.log(err);
      setCheckNicknameError(false);
      // window.alert("중복된 아이디입니다.");
    }
  };

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
    dispatch(userInfoActions.__getUserInfo(userId));
    // dispatch(userInfoActions.setUserInfo(requestDto));
    return;
  }, []);

  return (
    <>
      <Grid_2 sx={{ margin: "68px auto auto auto", width: "1370px", paddingBottom: "109px" }}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            goEdit();
          }}
        >
          <Grid_2
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            sx={{
              marginTop: "24px",
              width: "1370px",
            }}
          >
            {/* 프로필사진 변경 */}
            <Grid_2 sx={{ width: "183px", marginTop: "60px", zIndex: "9999" }}>
              <Profile>
                <img
                  src={
                    profileImgUrl == getUserInfo.profileImg ? getUserInfo.profileImg : profileImgUrl
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
                <AddCircleRoundedIcon fontSize="large" sx={{ color: "#2967AC" }} />
              </Badge>
              {/* 프로필사진변경 팝오버 */}
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
                    <Typography
                      sx={{
                        marginTop: "14px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      프로필사진을 변경해보세요.
                    </Typography>
                    <ImageList
                      sx={{
                        padding: "0px 24px 28.5px 24px",
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
              {/* 여기까지 프로필사진변경 팝오버 */}
            </Grid_2>
            {/* 여기까지 프로필사진 변경 */}
            <Grid_2>
              <Grid_2 container direction="row" justifyContent="flex-start" alignItems="center">
                <Grid_2 sx={{ width: "1045px" }}></Grid_2>
                <Grid_2>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      marginLeft: "4px",
                      width: "120px",
                      height: "40px",
                      padding: "0",
                      borderRadius: "14px",
                      backgroundColor: "#FFD082",
                      "&:hover": { backgroundColor: "#FFD082" },
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    수정완료
                  </Button>
                </Grid_2>
              </Grid_2>
              <FormControl>
                <Grid_2
                  sx={{ marginTop: "16px" }}
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Typography sx={{ width: "110px", fontSize: "18px", fontWeight: "bold" }}>
                    닉네임
                  </Typography>
                  <input
                    style={{ fontSize: "16px", padding: "0", width: "935px", height: "40px" }}
                    id="myNickname"
                    defaultValue={nickname}
                    placeholder="닉네임을 작성해 주세요."
                    onChange={onNicknameHandler}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      marginLeft: "4px",
                      width: "120px",
                      height: "40px",
                      padding: "0",
                      borderRadius: "14px",
                      backgroundColor: "#707070",
                      "&:hover": { backgroundColor: "#707070" },
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                    onClick={nicknameCheckBtn}
                  >
                    중복확인
                  </Button>
                  {/* <NicknameFormHelperText /> */}
                </Grid_2>
              </FormControl>
              <Grid_2
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid_2>
                  <Typography sx={{ marginTop: "40px", fontSize: "14px" }}>
                    최소 하나의 분야를 선택해주세요.
                  </Typography>
                </Grid_2>
                <Grid_2>
                  <Category>
                    <CateBtn
                      onClick={() => {
                        major === "미술/디자인" ? setMajor("") : setMajor("미술/디자인");
                        setSelected(true);
                      }}
                    >
                      <Grid

                        _className={major === "미술/디자인" ? "active" : "default"}
                        bg={major === "미술/디자인" ? "#2967AC" : "#fff"}
                      >
                        <p>디자인</p>
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
                        bg={major === "영상" ? "#6AD8F5" : "#fff"}
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
                        bg={major === "배우" ? "#F58467" : "#fff"}
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
                        bg={major === "사진" ? "#4299E9" : "#fff"}
                      >
                        <p>사진</p>
                      </Grid>
                    </CateBtn>
                    <CateBtn
                      onClick={() => {
                        major === "프로그래밍" ? setMajor("") : setMajor("프로그래밍");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={major === "프로그래밍" ? "active" : "default"}
                        bg={major === "프로그래밍" ? "#5BC8D2" : "#fff"}
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
                        bg={major === "모델" ? "#FE674C" : "#fff"}
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
                        bg={major === "성우" ? "#FFD082" : "#fff"}
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
                        bg={major === "음향" ? "#FFEF62" : "#fff"}
                      >
                        <p>음향</p>
                      </Grid>
                    </CateBtn>
                    {/* <CateBtn
                      onClick={() => {
                        major === "기타" ? setMajor("") : setMajor("기타");
                        setSelected(true);
                      }}
                    >
                      <Grid _className={major === "기타" ? "active" : "default"}>
                        <p>기타</p>
                      </Grid>
                    </CateBtn> */}
                  </Category>
                </Grid_2>
              </Grid_2>
              <>
                <Grid_2
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  sx={{ marginTop: "40px" }}
                >
                  <Grid_2>
                    <Typography sx={{ width: "110px", fontSize: "18px", fontWeight: "bold" }}>
                      자기소개
                    </Typography>
                  </Grid_2>
                  <Grid_2>
                    <textarea
                      style={{
                        width: "1061px",
                        fontSize: "16px",
                      }}
                      id="myIntro"
                      rows="5"
                      defaultValue={intro}
                      placeholder="자기소개를 부탁해요."
                      onChange={onIntroHandler}
                    />
                  </Grid_2>
                </Grid_2>
                <Grid_2
                  sx={{ marginTop: "40px" }}
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid_2>
                    <Typography sx={{ width: "110px", fontSize: "18px", fontWeight: "bold" }}>
                      포트폴리오
                    </Typography>
                  </Grid_2>
                  <Grid_2>
                    <input
                      id="myIntro"
                      defaultValue={portfolioLink}
                      placeholder="동영상 URL을 입력해 주세요."
                      style={{
                        width: "1061px",
                        height: "40px",
                        fontSize: "16px",
                      }}
                      onChange={onPortfolioHandler}
                    />
                  </Grid_2>
                </Grid_2>
                <Grid_2
                  sx={{ marginTop: "0" }}
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid_2>
                    <Typography
                      sx={{ width: "110px", fontSize: "18px", fontWeight: "bold" }}
                    ></Typography>
                  </Grid_2>
                  <Grid_2>
                    <EditImage
                      display="none"
                      margintop="0"
                      marginleft="0"
                      image={getUserInfo.userPortfolioImgList}
                    />
                  </Grid_2>
                </Grid_2>
              </>
            </Grid_2>
          </Grid_2>
        </form>
      </Grid_2>
      <Footer />
    </>
  );
};

const itemData = [
  {
    img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FuF6wx%2FbtrCxFSgc0N%2FHy7KcDq4WN1RUXjWTMSI1K%2Fimg.png",
    title: "1",
  },
  {
    img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb3EnyV%2FbtrCvZqIHbx%2FkZmT6e5EHOWqYuBpzACQt1%2Fimg.png",
    title: "2",
  },
  {
    img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fwuu1p%2FbtrCvKHi66H%2FDVhJJEOZfAnJX7sTpXYMWk%2Fimg.png",
    title: "3",
  },
  {
    img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FoEO5Z%2FbtrCvKgcVCe%2FnE4R2zy7k8hvtrTdd2tlpK%2Fimg.png",
    title: "4",
  },
  {
    img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FpbROz%2FbtrCyYqibEj%2FofkKW469iJItQmnsFye3m0%2Fimg.png",
    title: "5",
  },
  {
    img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FecCP89%2FbtrCumtnxPS%2FKfaGFKmwh0R4ywSvBwhCv1%2Fimg.png",
    title: "6",
  },
  {
    img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FU1aS5%2FbtrCydVwn2d%2F6Hc6p465wemrQyR4scHfZ0%2Fimg.png",
    title: "7",
  },
  {
    img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fdax6ur%2FbtrCuVh3a3B%2FkPJx86n0RczXHHeGfinTmK%2Fimg.png",
    title: "8",
  },
  {
    img: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FGf5en%2FbtrCyZQg1tT%2FzXC3QpkztZx9eUnLIeCRhk%2Fimg.png",
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
  justify-content: center;

  display: flex;
  margin-top: 10px;
  margin-bottom: 3%;
`;
const CateBtn = _styled.div`
  height: 10px;
  border-radius: 10px;
  margin-right: 8px;
  .default {
    width: 140px;
    height: 50px;
    border-radius: 14px;
    border: 1px solid black;
    background-color: #fff;
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
      font-size: 20px;
      font-weight: 700;
      color: black;
    }
  }
  .active {
    width: 140px;
    height: 50px;
    border-radius: 14px;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;

    /* background-color: gray; */
    animation: 0.6s ease-in-out loadEffect3;

    p {
      font-size: 20px;
      font-weight: 700;
      text-align: center;
      color: #fff;
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
