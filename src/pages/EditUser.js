/* eslint-disable*/
import React, { useEffect, useState } from "react";
import _styled from "styled-components";
import { Grid } from "../elements/Index";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userInfoActions } from "../redux/modules/myPage";
import EditImage from "../elements/EditImage";
import Footer from "../elements/Footer";
import axios from "axios";
import { history } from "../redux/configureStore";
import { imgActions } from "../redux/modules/image";
import { nicknameCheckRE } from "../shared/common";

import Grid_2 from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import Typography from "@mui/material/Typography";
import ImageListItem from "@mui/material/ImageListItem";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useLocation, useParams } from "react-router-dom";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

const EditUser = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const [checkNicknameError, setCheckNicknameError] = React.useState(null);
  const _id = localStorage.getItem("userId");

  const pathName = useLocation();
  const pathUserId = pathName.pathname.split("/")[2];

  const getUserInfo = useSelector((state) => state.myPage?.userInfo);

  const [selected, setSelected] = useState(false);
  const [nickname, setNickname] = useState("");
  const [major, setMajor] = useState("");
  const [intro, setIntro] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [profileImgUrl, setProfileImgUrl] = useState("");

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

  const currentImgUrl = useSelector((state) => state.image.editUrl);

  const requestDto = {
    profileImg: profileImgUrl,
    nickname: nickname,
    intro: intro,
    major: major,
    portfolioLink: portfolioLink,
    currentImgUrl,
  };

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
      } else if (getUserInfo.nickname === nickname) {
        return " ";
      } else if (!nicknameCheckRE(nickname)) {
        return "닉네임 형식을 확인해주세요.";
      } else if (checkNicknameError === false) {
        return "중복된 닉네임입니다.";
      } else if (checkNicknameError === true) {
        return "사용 가능한 닉네임입니다.";
      }

      return " ";
    }, [focused]);

    return (
      <FormHelperText sx={{ margin: "0", height: "20px", width: "935px" }}>
        {helperText}
      </FormHelperText>
    );
  }
  // 여기까지 헬퍼텍스트 -아이디, 패스워드, 패스워드확인, 닉네임, 전공

  //닉네임 중복확인 버튼
  const nicknameCheckBtn = async () => {
    try {
      const checkNickname = await axios.post("https://everymohum.shop/user/nicknameCheck", {
        nickname,
        major,
      });
      checkNickname.status == 200 && setCheckNicknameError(true);
    } catch (err) {
      setCheckNicknameError(false);
    }
  };
  //여기까지 닉네임 중복확인 버튼

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
    history.push(`/user/${_id}`);
  };

  useEffect(() => {
    setNickname(getUserInfo.nickname);
    setMajor(getUserInfo.major);
    setIntro(getUserInfo.intro);
    setPortfolioLink(getUserInfo.portfolioLink);
    setProfileImgUrl(getUserInfo.profileImg);
  }, [getUserInfo]);

  useEffect(() => {
    dispatch(userInfoActions.__getUserInfo(_id));
    dispatch(imgActions.initPre());
  }, []);

  return (
    <>
      <Grid_2
        sx={{
          margin: "68px auto auto auto",
          width: "1370px",
          paddingBottom: "109px",
        }}
      >
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
              <FormControl>
                <Grid_2
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  sx={{ width: "1181px" }}
                >
                  <Grid_2
                    sx={{
                      width: "110px",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    <Typography></Typography>
                  </Grid_2>
                  <Grid_2
                    sx={{
                      fontSize: "16px",
                      margin: "0",
                      padding: "0 0 0 10px",
                      width: "935px",
                      height: "40px",
                      boxSizing: "border-box",
                    }}
                  ></Grid_2>
                  <Grid_2>
                    {getUserInfo.nickname === nickname ? (
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          marginLeft: "10px",
                          width: "120px",
                          height: "40px",
                          padding: "0",
                          borderRadius: "14px",
                          backgroundColor: "#FFD082",
                          "&:hover": {
                            backgroundColor: "#FFD082",
                            boxShadow: "0px 0px 4px inset rgba(0, 0, 0, 0.25)",
                          },
                          fontSize: "16px",
                          fontWeight: "bold",
                          boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        수정완료
                      </Button>
                    ) : checkNicknameError === true ? (
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          marginLeft: "10px",
                          width: "120px",
                          height: "40px",
                          padding: "0",
                          borderRadius: "14px",
                          backgroundColor: "#FFD082",
                          "&:hover": {
                            backgroundColor: "#FFD082",
                            boxShadow: "0px 0px 4px inset rgba(0, 0, 0, 0.25)",
                          },
                          fontSize: "16px",
                          fontWeight: "bold",
                          boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        수정완료
                      </Button>
                    ) : (
                      <Button
                        disabled
                        type="submit"
                        variant="contained"
                        sx={{
                          marginLeft: "10px",
                          width: "120px",
                          height: "40px",
                          padding: "0",
                          borderRadius: "14px",
                          backgroundColor: "#FFD082",
                          "&:hover": { backgroundColor: "#FFD082" },
                          fontSize: "16px",
                          fontWeight: "bold",
                          boxShadow: "0px 4px 13px inset #EFEFEF",
                        }}
                      >
                        수정완료
                      </Button>
                    )}
                  </Grid_2>
                </Grid_2>
                <Grid_2
                  sx={{ marginTop: "15px" }}
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      width: "110px",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    닉네임
                  </Typography>
                  <input
                    style={{
                      fontSize: "16px",
                      margin: "0",
                      padding: "0 0 0 10px",
                      width: "935px",
                      height: "40px",
                      boxSizing: "border-box",
                    }}
                    id="myNickname"
                    defaultValue={nickname}
                    placeholder="닉네임을 작성해 주세요."
                    onChange={onNicknameHandler}
                    maxLength={10}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      marginLeft: "10px",
                      width: "120px",
                      height: "40px",
                      padding: "0",
                      borderRadius: "14px",
                      backgroundColor: "#707070",
                      "&:hover": {
                        backgroundColor: "#707070",
                        boxShadow: "0px 0px 4px inset rgba(0, 0, 0, 0.25)",
                      },
                      fontSize: "16px",
                      fontWeight: "bold",
                      boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                    }}
                    onClick={nicknameCheckBtn}
                  >
                    중복확인
                  </Button>
                </Grid_2>
                <Grid_2
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  sx={{ width: "1181px" }}
                >
                  <Grid_2
                    sx={{
                      width: "110px",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    <Typography></Typography>
                  </Grid_2>
                  <Grid_2>
                    <NicknameFormHelperText />
                  </Grid_2>
                </Grid_2>
              </FormControl>
              <Grid_2
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid_2>
                  <Typography sx={{ marginTop: "20px", fontSize: "14px" }}>
                    최소 하나의 분야를 선택해주세요.
                  </Typography>
                </Grid_2>
                <Grid_2 sx={{ width: "1181px" }}>
                  <Category>
                    <CateBtn
                      onClick={() => {
                        major === "디자인" ? setMajor("") : setMajor("디자인");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={major === "디자인" ? "active" : "default"}
                        bg={major === "디자인" ? "#2967AC" : "#f5fcff"}
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
                        bg={major === "영상" ? "#6AD8F5" : "#f5fcff"}
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
                        bg={major === "배우" ? "#F58467" : "#f5fcff"}
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
                        bg={major === "사진" ? "#4299E9" : "#f5fcff"}
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
                        bg={major === "프로그래밍" ? "#5BC8D2" : "#f5fcff"}
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
                        bg={major === "모델" ? "#FE674C" : "#f5fcff"}
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
                        bg={major === "성우" ? "#FFD082" : "#f5fcff"}
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
                        bg={major === "음향" ? "#FFEF62" : "#f5fcff"}
                      >
                        <p>음향</p>
                      </Grid>
                    </CateBtn>
                  </Category>
                </Grid_2>
              </Grid_2>
              <>
                <Grid_2
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  sx={{ marginTop: "40px", width: "1181px" }}
                >
                  <Grid_2>
                    <Typography
                      sx={{
                        width: "110px",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      자기소개
                    </Typography>
                  </Grid_2>
                  <Grid_2>
                    <textarea
                      style={{
                        width: "1061px",
                        fontSize: "16px",
                        padding: "10px",
                        margin: "0",
                        boxSizing: "border-box",
                      }}
                      id="myIntro"
                      rows="5"
                      defaultValue={intro}
                      placeholder="자기소개를 부탁해요."
                      onChange={onIntroHandler}
                      maxLength={200}
                    />
                  </Grid_2>
                </Grid_2>
                <Grid_2
                  sx={{ marginTop: "40px", width: "1181px" }}
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid_2>
                    <Typography
                      sx={{
                        width: "110px",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
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
                        padding: "0 0 0 10px",
                        margin: "0",
                        boxSizing: "border-box",
                      }}
                      onChange={onPortfolioHandler}
                    />
                  </Grid_2>
                </Grid_2>
                <Grid_2
                  sx={{ marginTop: "0", width: "1181px" }}
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid_2>
                    <Typography
                      sx={{
                        width: "110px",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    ></Typography>
                  </Grid_2>
                  <Grid_2 sx={{ margin: "20px auto auto 10px" }}>
                    <EditImage
                      ilIs_inline
                      ilBgRepeat="no-repeat"
                      imgBoxMargin="0 5px 0 5px"
                      ilBorder="0"
                      imgDivMargin="0"
                      imgDivWidth="1058px"
                      ilWidth="200px"
                      ilHeight="140px"
                      fontSize="medium"
                      padding="0"
                      marginRight="0"
                      display="none"
                      marginTop="0"
                      marginLeft="0"
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
    background-color: #f5fcff;
    box-shadow: inset 0px 4px 13px #d7f1fd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    border: none;
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
