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
import Swal from "sweetalert2";

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
  // ????????? ?????? ??? ??????
  let newFiles = [];
  // URL??? ????????? ??????

  for (let i = 0; i < Files.length; i++) {
    // ????????? ?????? ???????????? name??? ????????? ????????? ??????
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

  //?????????????????? POPOVER
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // ??????????????? -?????????, ????????????, ??????????????????, ?????????, ??????
  function NicknameFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "???. ?????? ????????????, ??????, ?????? ?????? 2~6??? ?????????.";
      } else if (getUserInfo.nickname === nickname) {
        return " ";
      } else if (!nicknameCheckRE(nickname)) {
        return "????????? ????????? ??????????????????.";
      } else if (checkNicknameError === false) {
        return "????????? ??????????????????.";
      } else if (checkNicknameError === true) {
        return "?????? ????????? ??????????????????.";
      }

      return " ";
    }, [focused]);

    return (
      <FormHelperText sx={{ margin: "0", height: "20px", width: "935px" }}>
        {helperText}
      </FormHelperText>
    );
  }
  // ???????????? ??????????????? -?????????, ????????????, ??????????????????, ?????????, ??????

  //????????? ???????????? ??????
  const nicknameCheckBtn = async () => {
    try {
      const checkNickname = await axios.post(
        "https://everymohum.shop/user/nicknameCheck",
        {
          nickname,
          major,
        }
      );
      checkNickname.status == 200 && setCheckNicknameError(true);
    } catch (err) {
      setCheckNicknameError(false);
    }
  };
  //???????????? ????????? ???????????? ??????

  const goEdit = () => {
    if (requestDto.profileImgUrl === "") {
      Swal.fire({
        title: "????????? ???????????? ????????? ?????????!",
        icon: "warning",
      });

      return;
    }
    if (requestDto.nickname === "") {
      Swal.fire({
        title: "???????????? ????????? ?????????!",
        icon: "warning",
      });

      return;
    }
    if (requestDto.intro === "") {
      Swal.fire({
        title: "??????????????? ????????? ?????????!",
        icon: "warning",
      });

      return;
    }
    if (requestDto.major === "") {
      Swal.fire({
        title: "????????? ????????? ?????????!",
        icon: "warning",
      });

      return;
    }
    if (requestDto.portfolioLink === "") {
      Swal.fire({
        title: "??????????????? ????????? ????????? ?????????!",
        icon: "warning",
      });

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
            {/* ??????????????? ?????? */}
            <Grid_2 sx={{ width: "183px", marginTop: "60px", zIndex: "9999" }}>
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
              {/* ????????????????????? ????????? */}
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
                      ?????????????????? ??????????????????.
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
              {/* ???????????? ????????????????????? ????????? */}
            </Grid_2>
            {/* ???????????? ??????????????? ?????? */}
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
                            boxShadow: "0",
                          },
                          fontSize: "16px",
                          fontWeight: "bold",
                          boxShadow: "0",
                        }}
                      >
                        ????????????
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
                            boxShadow: "0",
                          },
                          fontSize: "16px",
                          fontWeight: "bold",
                          boxShadow: "0",
                        }}
                      >
                        ????????????
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
                        ????????????
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
                    ?????????
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
                    placeholder="???????????? ????????? ?????????."
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
                        boxShadow: "0",
                      },
                      fontSize: "16px",
                      fontWeight: "bold",
                      boxShadow: "0",
                    }}
                    onClick={nicknameCheckBtn}
                  >
                    ????????????
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
                    ????????? ??????????????????.
                  </Typography>
                </Grid_2>
                <Grid_2 sx={{ width: "1181px" }}>
                  <Category>
                    <CateBtn
                      onClick={() => {
                        major === "?????????" ? setMajor("") : setMajor("?????????");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={major === "?????????" ? "active" : "default"}
                        bg={major === "?????????" ? "#2967AC" : "#f5fcff"}
                      >
                        <p>?????????</p>
                      </Grid>
                    </CateBtn>
                    <CateBtn
                      onClick={() => {
                        major === "??????" ? setMajor("") : setMajor("??????");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={major === "??????" ? "active" : "default"}
                        bg={major === "??????" ? "#6AD8F5" : "#f5fcff"}
                      >
                        <p>??????</p>
                      </Grid>
                    </CateBtn>
                    <CateBtn
                      onClick={() => {
                        major === "??????" ? setMajor("") : setMajor("??????");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={major === "??????" ? "active" : "default"}
                        bg={major === "??????" ? "#F58467" : "#f5fcff"}
                      >
                        <p>??????</p>
                      </Grid>
                    </CateBtn>
                    <CateBtn
                      onClick={() => {
                        major === "??????" ? setMajor("") : setMajor("??????");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={major === "??????" ? "active" : "default"}
                        bg={major === "??????" ? "#4299E9" : "#f5fcff"}
                      >
                        <p>??????</p>
                      </Grid>
                    </CateBtn>
                    <CateBtn
                      onClick={() => {
                        major === "???????????????"
                          ? setMajor("")
                          : setMajor("???????????????");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={
                          major === "???????????????" ? "active" : "default"
                        }
                        bg={major === "???????????????" ? "#5BC8D2" : "#f5fcff"}
                      >
                        <p>???????????????</p>
                      </Grid>
                    </CateBtn>
                    <CateBtn
                      onClick={() => {
                        major === "??????" ? setMajor("") : setMajor("??????");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={major === "??????" ? "active" : "default"}
                        bg={major === "??????" ? "#FE674C" : "#f5fcff"}
                      >
                        <p>??????</p>
                      </Grid>
                    </CateBtn>
                    <CateBtn
                      onClick={() => {
                        major === "??????" ? setMajor("") : setMajor("??????");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={major === "??????" ? "active" : "default"}
                        bg={major === "??????" ? "#FFD082" : "#f5fcff"}
                      >
                        <p>??????</p>
                      </Grid>
                    </CateBtn>
                    <CateBtn
                      onClick={() => {
                        major === "??????" ? setMajor("") : setMajor("??????");
                        setSelected(true);
                      }}
                    >
                      <Grid
                        _className={major === "??????" ? "active" : "default"}
                        bg={major === "??????" ? "#FFEF62" : "#f5fcff"}
                      >
                        <p>??????</p>
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
                      ????????????
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
                      placeholder="??????????????? ????????????."
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
                      ???????????????
                    </Typography>
                  </Grid_2>
                  <Grid_2>
                    <input
                      id="myIntro"
                      defaultValue={portfolioLink}
                      placeholder="????????? URL??? ????????? ?????????."
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
                      il_bg_repeat="no-repeat"
                      img_box_margin="0 5px 0 5px"
                      il_border="0"
                      img_div_margin="0"
                      img_div_width="1058px"
                      il_width="200px"
                      il_height="140px"
                      fontSize="medium"
                      padding="0"
                      marginright="0"
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
      <Footer position="absolute" bottom="0" />
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
    border: 1px solid #E0F4FE;
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
