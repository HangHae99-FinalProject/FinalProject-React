import React, { useEffect, useState } from "react";
import amateurCap from "../assets/amateurCap.png";
import juniorCap from "../assets/JuniorCap.png";
import proCap from "../assets/proCap.png";
import ReactModal from "react-modal";
import _styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { history } from "../redux/configureStore";
import TabPanel from "../components/MyPage/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import DetailImage from "../components/Detail/DetailImage";
import { actionCreators as userInfoActions } from "../redux/modules/myPage";
import Pagination from "../components/MyPage/Pagination";
import ModalWindow from "../elements/ModalWindow";
import Footer from "../elements/Footer";
import Link from "../components/Link";
import UserSkeleton from "../components/MyPage/UserSkeleton";
import ImageSkeleton from "../components/MyPage/ImageSkeleton";
import Spinner from "../components/Spinner";

import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ListItemText from "@mui/material/ListItemText";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import PanToolRoundedIcon from "@mui/icons-material/PanToolRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "250px",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const User = (props) => {
  const arr = [];
  const params = useParams();
  const id = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [is_open, setIs_open] = useState(false);
  const [ModalState, setModalState] = useState(false);
  const [postId, setPostId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [limit, setLimit] = useState(3); //페이지당 표시할 게시물 수
  const [page, setPage] = useState(1); //페이지 번호
  const offset = (page - 1) * limit; //페이징 처리
  const [is_email, setIs_email] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(true);

  const modalHandelBtn = () => {
    setModalState(!ModalState);
  };

  const getUserInfo = useSelector((state) => state.myPage.userInfo);
  const getAppliedList = useSelector((state) => state.myPage.appliedList?.data); //신청중 리스트
  const getRecruitList = useSelector((state) => state.myPage.recruitList?.data); //모집중 리스트
  const getRecruitOverList = useSelector((state) => state.myPage.recruitOverList.data); //모집완료 리스트
  const getAppliedOverList = useSelector((state) => state.myPage.appliedOverList.data);
  const getAppliedOverList_postUser = useSelector(
    (state) => state.myPage.appliedOverList.data?.postUser
  );
  const getAppliedOverList_reqruit = useSelector(
    (state) => state.myPage.getAppliedOverList_reqruit
  );
  const isSendedEmail = useSelector((state) => state.myPage.isSendedEmail);

  const evaluationList = useSelector((state) => state.myPage.evaluationList);
  const isLoading = useSelector((state) => state.myPage.isLoading);

  var posterKeys = JSON.stringify(getAppliedOverList_postUser);

  const pathName = useLocation();
  const userId = pathName.pathname.split("/")[2];

  var likeRatio = (getUserInfo.likeCount / 100) * (100 / getUserInfo.userRateTotal) * 100;
  if (isNaN(likeRatio)) {
    likeRatio = 0;
  }
  //총 평점을 준 사람 수

  var evaluationRatio = null;

  if (likeRatio <= 40) {
    evaluationRatio = `${Math.ceil(likeRatio)}% 만족!`;
  } else if (41 <= likeRatio <= 70) {
    evaluationRatio = `${Math.ceil(likeRatio)}% 만족!`;
  } else if (71 <= likeRatio <= 100) {
    evaluationRatio = `${Math.ceil(likeRatio)}% 만족!`;
  }

  var evaluationLevel = null;

  if (likeRatio <= 40) {
    evaluationLevel = "아마추어 선장러";
  } else if (71 <= likeRatio) {
    evaluationLevel = "프로 선장러";
  } else {
    evaluationLevel = "주니어 선장러";
  }

  const [value, setValue] = React.useState(0);

  const emailHandleChange = (e) => {
    setIs_email(e.target.value);
  };
  const emailCheckBtn = () => {
    dispatch(userInfoActions.__getEmail(is_email));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(userInfoActions.initList());
  }, [ModalState]);

  useEffect(() => {
    dispatch(userInfoActions.__getUserInfo(userId));
    dispatch(userInfoActions.__getApplied(userId));
    dispatch(userInfoActions.__getRecruit(userId));
    dispatch(userInfoActions.__getRecruitOver(userId));
    return () => {
      dispatch(userInfoActions.initUserInfo());
    };
  }, [dispatch, userId, pathName]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid sx={{ margin: "72px auto auto auto", width: "1370px" }}>
        {/* 알림받기 모달창 */}
        <ModalWindow
          handleOpen={handleOpen}
          open={open}
          handleClose={handleClose}
          width="1200px"
          height="600px"
          borderRadius="20px"
        >
          {isSendedEmail === true ? (
            <>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: "226px" }}
              >
                <Typography
                  sx={{
                    margin: "auto",
                    color: "#2967AC",
                    fontSize: "32px",
                    fontWeight: "bold",
                  }}
                >
                  이메일을 보냈습니다!
                </Typography>
              </Grid>
              <Footer position="absolute" width="1200px" />
            </>
          ) : (
            <>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: "114px" }}
              >
                <Typography
                  sx={{
                    margin: "auto",
                    color: "#2967AC",
                    fontSize: "32px",
                    fontWeight: "bold",
                  }}
                >
                  이메일 인증하기
                </Typography>
                <Typography
                  sx={{
                    margin: "20px auto auto auto",
                    color: "#707070",
                    fontSize: "24px",
                  }}
                >
                  이메일 인증을 하고 알림을 받아보세요!
                </Typography>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    emailCheckBtn();
                  }}
                >
                  <Grid container direction="column" justifyContent="center" alignItems="center">
                    <input
                      type="text"
                      placeholder="이메일을 입력해주세요"
                      onChange={emailHandleChange}
                      style={{
                        margin: "20px auto auto auto",
                        fontSize: "16px",
                        width: "610px",
                        height: "40px",
                        borderRadius: "0",
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        margin: "20px auto auto auto",
                        width: "610px",
                        height: "50px",
                        background: "#555555",
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: "#555555",
                          boxShadow: "0px 0px 4px inset rgba(0, 0, 0, 0.25)",
                        },
                        boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      신청하기
                    </Button>
                  </Grid>
                </form>
              </Grid>
              <Footer position="absolute" width="1200px" borderRadius="0px 0px 20px 20px" />
            </>
          )}
        </ModalWindow>
        {/* 여기까지 알림받기 모달창 */}
        {/* 평점 모달창 */}
        <ReactModal
          state={ModalState}
          isOpen={ModalState}
          ariaHideApp={false}
          onRequestClose={() => setModalState(false)}
          closeTimeoutMS={200}
          style={{
            overlay: {
              zIndex: 99,
              backgroundColor: "rgba(0,0,0,0.5)",
            },
            content: {
              top: "50%",
              left: "50%",
              borderRadius: "20px",
              height: "600px",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "1200px",
              padding: 0,
              transition: "0.3s",
            },
          }}
        >
          <Grid>
            <BgDiv>
              <Grid>
                <Grid>
                  {isLoading === false ? (
                    <Spinner />
                  ) : (evaluationList?.length === 0 && getAppliedOverList_reqruit?.length === 0) ||
                    (evaluationList[0] === null && getAppliedOverList_reqruit?.length === 0) ? (
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                      <Typography
                        sx={{
                          marginTop: "150px",
                          fontSize: "32px",
                          fontWeight: "bold",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        리뷰를 남길 선장이 없어요.
                      </Typography>
                      <img
                        style={{ marginTop: "20px" }}
                        src="https://velog.velcdn.com/images/tty5799/post/5004946d-e4ad-4c5d-8855-67107d89ce05/image.png"
                        alt="noChatImg"
                      />
                    </Grid>
                  ) : (
                    <Typography
                      sx={{
                        marginTop: "100px",
                        marginBottom: "40px",
                        fontSize: "32px",
                        fontWeight: "bold",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      함께 모험한 선장들의 리뷰를 남겨주세요.
                    </Typography>
                  )}
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ margin: "0 0 16px 0", padding: "0" }}
                >
                  {/* 모집글 작성자 */}
                  {getAppliedOverList_postUser === null ? (
                    <>
                      {getAppliedOverList_reqruit?.map((appliedOverList, idx) => {
                        return (
                          <Card
                            key={idx}
                            sx={{
                              width: "248px",
                              height: "248px",
                              marginLeft: "15px",
                              marginRight: "15px",
                              marginBottom: "30px",
                              borderRadius: "14px",
                            }}
                          >
                            <CardContent sx={{ padding: "34px 20px 16px 20px" }}>
                              <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <img
                                  src={appliedOverList?.profileImg}
                                  alt="profileImg"
                                  style={{
                                    width: "77px",
                                    height: "77px",
                                    border: "1px solid #818181",
                                    borderRadius: "50%",
                                    marginRight: "5px",
                                  }}
                                />
                                <Typography
                                  sx={{
                                    width: "88px",
                                    height: "23px",
                                    marginLeft: "5px",
                                    fontSize: "16px",
                                  }}
                                >
                                  {appliedOverList?.nickname}
                                </Typography>
                              </Grid>
                            </CardContent>
                            <CardActions>
                              <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Button
                                  sx={{
                                    width: "188px",
                                    height: "40px",
                                    background: "#4299E9",
                                    borderRadius: "14px",
                                    marginBottom: "5px",
                                    "&:hover": {
                                      backgroundColor: "#4299E9",
                                      boxShadow: "0px 0px 4px inset rgba(0, 0, 0, 0.25)",
                                    },
                                    boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                                  }}
                                  variant="contained"
                                  onClick={() => {
                                    setReceiverId(appliedOverList.userId);
                                    dispatch(
                                      userInfoActions.__postEvaluations({
                                        postId: postId,
                                        receiverId: appliedOverList.userId,
                                        point: 1,
                                      })
                                    );
                                  }}
                                >
                                  <FavoriteRoundedIcon sx={{ marginRight: "12px" }} />또 모험
                                  같이해요!
                                </Button>
                                <Button
                                  sx={{
                                    width: "188px",
                                    height: "40px",
                                    background: "#FE5953",
                                    borderRadius: "14px",
                                    marginTop: "5px",
                                    "&:hover": {
                                      backgroundColor: "#FE5953",
                                      boxShadow: "0px 0px 4px inset rgba(0, 0, 0, 0.25)",
                                    },
                                    boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                                  }}
                                  variant="contained"
                                  onClick={() => {
                                    setReceiverId(appliedOverList.userId);
                                    dispatch(
                                      userInfoActions.__postEvaluations({
                                        postId: postId,
                                        receiverId: appliedOverList.userId,
                                        point: 0,
                                      })
                                    );
                                  }}
                                >
                                  <PanToolRoundedIcon sx={{ marginRight: "12px" }} />
                                  모험은 여기까지..
                                </Button>
                              </Grid>
                            </CardActions>
                          </Card>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {evaluationList?.map((appliedOverList, idx) => {
                        return (
                          <Card
                            key={idx}
                            sx={{
                              width: "248px",
                              height: "248px",
                              marginLeft: "15px",
                              marginRight: "15px",
                              marginBottom: "30px",
                              borderRadius: "14px",
                            }}
                          >
                            <CardContent sx={{ padding: "34px 20px 16px 20px" }}>
                              <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <img
                                  src={appliedOverList?.profileImg}
                                  alt="profileImg"
                                  style={{
                                    width: "77px",
                                    height: "77px",
                                    border: "1px solid #818181",
                                    borderRadius: "50%",
                                    marginRight: "5px",
                                  }}
                                />
                                <Typography
                                  sx={{
                                    width: "88px",
                                    height: "23px",
                                    marginLeft: "5px",
                                    fontSize: "16px",
                                  }}
                                >
                                  {appliedOverList?.nickname}
                                </Typography>
                              </Grid>
                            </CardContent>
                            <CardActions>
                              <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Button
                                  sx={{
                                    width: "188px",
                                    height: "40px",
                                    background: "#4299E9",
                                    borderRadius: "14px",
                                    marginBottom: "5px",
                                    "&:hover": {
                                      backgroundColor: "#4299E9",
                                      boxShadow: "0px 0px 4px inset rgba(0, 0, 0, 0.25)",
                                    },
                                    boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                                  }}
                                  variant="contained"
                                  onClick={() => {
                                    setReceiverId(appliedOverList.userId);
                                    dispatch(
                                      userInfoActions.__postEvaluation({
                                        postId: postId,
                                        receiverId: appliedOverList.userId,
                                        point: 1,
                                      })
                                    );
                                  }}
                                >
                                  <FavoriteRoundedIcon sx={{ marginRight: "12px" }} />또 모험
                                  같이해요!
                                </Button>
                                <Button
                                  sx={{
                                    width: "188px",
                                    height: "40px",
                                    background: "#FE5953",
                                    borderRadius: "14px",
                                    marginTop: "5px",
                                    "&:hover": {
                                      backgroundColor: "#FE5953",
                                      boxShadow: "0px 0px 4px inset rgba(0, 0, 0, 0.25)",
                                    },
                                    boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                                  }}
                                  variant="contained"
                                  onClick={() => {
                                    setReceiverId(appliedOverList.userId);
                                    dispatch(
                                      userInfoActions.__postEvaluation({
                                        postId: postId,
                                        receiverId: appliedOverList.userId,
                                        point: 0,
                                      })
                                    );
                                  }}
                                >
                                  <PanToolRoundedIcon sx={{ marginRight: "12px" }} />
                                  모험은 여기까지..
                                </Button>
                              </Grid>
                            </CardActions>
                          </Card>
                        );
                      })}
                    </>
                  )}

                  {/* 지원자 리스트 */}
                </Grid>
              </Grid>
            </BgDiv>
          </Grid>
        </ReactModal>
        {/* 여기까지 평점 모달창 */}
        {/* 본문  */}
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: "20px", flexGrow: 1, width: "100%" }}
        >
          <Grid
            sx={{
              "& .MuiTextField-root": {
                marginLeft: "24px",
                width: "1370px",
              },
            }}
          >
            <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
              <Grid>
                <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
                  {getUserInfo.nickname}
                  님의 마이페이지
                </Typography>
              </Grid>
              <Grid>
                {userId === id ? (
                  <>
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography>
                            {getUserInfo.email === null ? (
                              <Grid
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                              >
                                <Typography>알림받는 이메일이 없습니다.</Typography>
                              </Grid>
                            ) : (
                              <Grid
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                              >
                                <Typography>알림받는 이메일: test@test.com</Typography>
                              </Grid>
                            )}
                          </Typography>
                        </React.Fragment>
                      }
                      followCursor
                    >
                      <Button
                        variant="contained"
                        sx={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          marginRight: "14px",
                          width: "120px",
                          height: "40px",
                          padding: "0",
                          background: "#FE5953",
                          border: "0",
                          borderRadius: "14px",
                          "&:hover": {
                            backgroundColor: "#FE5953",
                            boxShadow: "0",
                          },
                          boxShadow: "0",
                        }}
                        onClick={handleOpen}
                      >
                        알림받기
                      </Button>
                    </HtmlTooltip>
                    <Button
                      variant="contained"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        width: "120px",
                        height: "40px",
                        padding: "0",
                        background: "#FFD082",
                        border: "0",
                        borderRadius: "14px",
                        "&:hover": {
                          backgroundColor: "#FFD082",
                          boxShadow: "0",
                        },
                        boxShadow: "0",
                      }}
                      onClick={() => {
                        history.push(`/edituser/${id}`);
                      }}
                    >
                      프로필 수정
                    </Button>
                  </>
                ) : (
                  <Grid></Grid>
                )}
              </Grid>
            </Grid>
            {/* 프로필 이미지, 전공버튼, 자기소개, 포트폴리오링크 */}
            {getUserInfo.length === 0 ? (
              <UserSkeleton />
            ) : (
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                  marginTop: "14px",
                  width: "1370px",
                  height: "270px",
                  border: "1px solid #c6c6c6",
                  borderRadius: "10px",
                  padding: "14px",
                }}
              >
                <Grid sx={{ marginLeft: "100px" }}>
                  <Grid container direction="column" justifyContent="center" alignItems="center">
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography 
                            sx={{
                              width:"250px", 
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            현재까지 협업횟수는&nbsp;
                            <span style={{ fontWeight: "bold" }}>{getUserInfo.projectCount}회</span>
                            입니다.
                          </Typography>
                        </React.Fragment>
                      }
                      followCursor
                    >
                      <Profile>
                        <img src={getUserInfo.profileImg} alt="profileImg" />
                      </Profile>
                    </HtmlTooltip>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                      {likeRatio <= 40 ? (
                        <img src={amateurCap} alt="amateurCap" />
                      ) : 71 <= likeRatio ? (
                        <img src={proCap} alt="proCap" />
                      ) : (
                        <img src={juniorCap} alt="juniorCap" />
                      )}
                      &nbsp;&nbsp;
                      <Typography sx={{ fontSize: "20px" }}>{evaluationRatio}</Typography>
                    </Grid>
                    <Grid sx={{ marginTop: "4px" }}>
                      <Typography sx={{ fontSize: "16px", color: "#818181" }}>
                        {evaluationLevel}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid sx={{ marginLeft: "140px" }}>
                    <Grid>
                      <Button
                        disableRipple
                        value="major"
                        variant="contained"
                        sx={{
                          fontSize: "20px",
                          height: "50px",
                          width: "140px",
                          borderRadius: "14px",
                          marginLeft: "24px",
                          backgroundColor: "#2967AC",
                          "&:hover": {
                            backgroundColor: "#2967AC",
                            boxShadow: "0",
                            cursor: "default",
                          },
                          boxShadow: "0",
                        }}
                      >
                        {getUserInfo.major}
                      </Button>
                    </Grid>
                    {/* 자기소개 */}
                    <Grid sx={{ backgroundColor: "none", width: "900px" }}>
                      <Typography
                        id="myIntro"
                        sx={{
                          marginTop: "20px",
                          marginLeft: "24px",
                          width: "900px",
                          backgroundColor: "none",
                        }}
                      >
                        {getUserInfo.intro === null
                          ? "프로필을 수정해 자기소개를 입력해 주세요."
                          : getUserInfo.intro}
                      </Typography>
                    </Grid>
                    {/* 여기까지 자기소개 */}
                    {/* 포트폴리오링크 */}
                    <Grid>
                      <Typography
                        id="myPortfolioLink"
                        sx={{
                          marginTop: "14px",
                          marginLeft: "24px",
                          width: "900px",
                        }}
                      >
                        {getUserInfo.portfolioLink === null
                          ? "프로필을 수정해 링크할 포트폴리오를 입력해 주세요."
                          : getUserInfo.portfolioLink}
                      </Typography>
                    </Grid>
                    {/* 여기까지 포트폴리오링크 */}
                  </Grid>
                </Grid>
              </Grid>
            )}
            {/* 여기까지 프로필 이미지, 전공버튼, 자기소개, 포트폴리오링크 */}
          </Grid>
          {/* 포트폴리오 이미지, 탭 */}
          {getUserInfo.length === 0 ? (
            <ImageSkeleton />
          ) : (
            <>
              <Grid sx={{ marginTop: "24px", width: "1270px", height: "450" }}>
                <ImageBox>
                  <DetailImage image={getUserInfo.userPortfolioImgList} />
                </ImageBox>
              </Grid>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ width: "1370px", marginTop: "24px" }}
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                    나의 프로젝트
                  </Typography>
                  {/* 페이지네이션 게시물 수 셀렉터 */}
                  <label style={{ fontSize: "14px" }}>
                    볼 수 있는 게시물 수 : &nbsp;
                    <select
                      type="number"
                      value={limit}
                      onChange={({ target: { value } }) => setLimit(Number(value))}
                    >
                      <option value="3">3</option>
                      <option value="6">6</option>
                      <option value="9">9</option>
                    </select>
                  </label>
                  {/* 여기까지 페이지네이션 게시물 수 셀렉터 */}
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: "1370px",
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  {/* 탭 속성 */}
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                      sx={{ width: "456px", fontSize: "20px", fontWeight: "bold" }}
                      label={userId === id ? "신청중" : "진행중"}
                      {...a11yProps(0)}
                    />
                    <Tab
                      sx={{ width: "456px", fontSize: "20px", fontWeight: "bold" }}
                      label="모집중"
                      {...a11yProps(1)}
                    />
                    <Tab
                      sx={{ width: "456px", fontSize: "20px", fontWeight: "bold" }}
                      label="모집/진행 완료"
                      {...a11yProps(2)}
                    />
                  </Tabs>
                  {/* 여기까지 탭 속성 */}
                </Grid>
                {/* 신청중 탭 */}
                <TabPanel value={value} index={0}>
                  <List
                    sx={{
                      padding: "0px 16px",
                      width: "1370px",
                    }}
                    component="nav"
                    aria-label="mailbox folders"
                  >
                    {getAppliedList?.length === 0 ? (
                      <Typography
                        sx={{
                          marginTop: "40px",
                          marginBottom: "40px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "20px",
                          color: "#818181",
                        }}
                      >
                        선장모집에 신청해보세요!
                      </Typography>
                    ) : (
                      getAppliedList?.slice(offset, offset + limit).map((appliedList, idx) => {
                        return (
                          <ListItem
                            sx={{
                              padding: "0px 16px",
                            }}
                            button
                            key={idx}
                            divider
                          >
                            <Grid
                              sx={{
                                margin: "10px 0px",
                                height: "90px",
                              }}
                              container
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <ListItemText
                                onClick={() => {
                                  history.push(`/detail/${appliedList.postId}`);
                                }}
                              >
                                {appliedList.title}
                                <ArrowForwardIosRoundedIcon style={{ verticalAlign: "middle" }} />
                              </ListItemText>
                            </Grid>
                          </ListItem>
                        );
                      })
                    )}
                    <footer>
                      <Pagination
                        total={getAppliedList?.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                      />
                    </footer>
                  </List>
                </TabPanel>
                {/* 여기까지 신청중 탭 */}
                {/* 모집중 탭 */}
                <TabPanel value={value} index={1}>
                  <List
                    sx={{
                      padding: "0px 16px",
                      width: "1370px",
                    }}
                    component="nav"
                    aria-label="mailbox folders"
                  >
                    {getRecruitList?.length === 0 ? (
                      <Typography
                        sx={{
                          marginTop: "40px",
                          marginBottom: "40px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "20px",
                          color: "#818181",
                        }}
                      >
                        프로젝트를 시작해보세요!
                      </Typography>
                    ) : (
                      getRecruitList?.slice(offset, offset + limit).map((recruitList, idx) => {
                        return (
                          <ListItem
                            sx={{
                              padding: "0px 16px",
                            }}
                            button
                            key={idx}
                            divider
                          >
                            <Grid
                              sx={{
                                margin: "10px 0px",
                                height: "90px",
                              }}
                              container
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <ListItemText
                                onClick={() => {
                                  history.push(`/detail/${recruitList.postId}`);
                                }}
                              >
                                {recruitList.title}
                                <ArrowForwardIosRoundedIcon style={{ verticalAlign: "middle" }} />
                              </ListItemText>
                              {/* 로그인한 userId와 현재 보고있는 마이페이지 주인의 userId를 비교하여 다르면 버튼을 숨겨준다. */}
                              {userId !== id ? (
                                <Grid></Grid>
                              ) : (
                                <Grid>
                                  <button
                                    style={{
                                      color: "#FE5953",
                                      border: "1px solid #FE5953",
                                      background: "white",
                                      marginBotton: "5px",
                                      width: "190px",
                                      height: "40px",
                                      borderRadius: "14px",
                                    }}
                                    variant="outlined"
                                  >
                                    {recruitList.userApplyList.length}명의 선장이 신청했어요!
                                  </button>

                                  <Grid>
                                    <Button
                                      sx={{
                                        marginTop: "5px",
                                        width: "190px",
                                        height: "40px",
                                        borderRadius: "14px",
                                        background: "#4299E9",
                                        "&:hover": {
                                          backgroundColor: "#4299E9",
                                          boxShadow: "0",
                                        },
                                        boxShadow: "0",
                                      }}
                                      variant="contained"
                                      onClick={() => {
                                        history.push(`/applied/${recruitList.postId}`);
                                      }}
                                    >
                                      선장명단 보러가기
                                    </Button>
                                  </Grid>
                                </Grid>
                              )}
                            </Grid>
                          </ListItem>
                        );
                      })
                    )}
                    <footer>
                      <Pagination
                        total={getRecruitList?.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                      />
                    </footer>
                  </List>
                </TabPanel>
                {/* 여기까지 모집중 탭 */}
                {/* 모집완료 탭 */}
                <TabPanel value={value} index={2}>
                  <List
                    sx={{
                      padding: "0px 16px",
                      width: "1370px",
                    }}
                    component="nav"
                    aria-label="mailbox folders"
                  >
                    {getRecruitOverList?.length === 0 ? (
                      <Typography
                        sx={{
                          marginTop: "40px",
                          marginBottom: "40px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "20px",
                          color: "#818181",
                        }}
                      >
                        아직 모험중!
                      </Typography>
                    ) : (
                      getRecruitOverList
                        ?.slice(offset, offset + limit)
                        .map((recruitOverList, idx) => {
                          return (
                            <ListItem
                              sx={{
                                padding: "0px 16px",
                              }}
                              button
                              key={idx}
                              divider
                            >
                              <Grid
                                sx={{
                                  margin: "10px 0px",
                                  height: "90px",
                                }}
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <ListItemText
                                  onClick={() => {
                                    history.push(`/detail/${recruitOverList.postId}`);
                                  }}
                                >
                                  {recruitOverList.title}
                                  <ArrowForwardIosRoundedIcon style={{ verticalAlign: "middle" }} />
                                </ListItemText>
                                {/* 로그인한 userId와 현재 보고있는 마이페이지 주인의 userId를 비교하여 다르면 버튼을 숨겨준다. */}
                                {userId !== id ? (
                                  <Grid></Grid>
                                ) : (
                                  <Grid>
                                    <Button
                                      sx={{
                                        marginTop: "5px",
                                        width: "190px",
                                        height: "40px",
                                        border: "0",
                                        borderRadius: "14px",
                                        background: "#4299E9",
                                        "&:hover": {
                                          backgroundColor: "#4299E9",
                                          boxShadow: "0",
                                        },
                                        boxShadow: "0",
                                      }}
                                      variant="contained"
                                      onClick={() => {
                                        setPostId(recruitOverList.postId);
                                        modalHandelBtn();
                                        dispatch(
                                          userInfoActions.__getAppliedOver(recruitOverList.postId)
                                        );
                                      }}
                                    >
                                      선장리뷰
                                    </Button>
                                  </Grid>
                                )}
                              </Grid>
                            </ListItem>
                          );
                        })
                    )}
                    <footer>
                      <Pagination
                        total={getRecruitOverList?.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                      />
                    </footer>
                  </List>
                </TabPanel>
                {/* 여기까지 모집완료 탭 */}
              </Grid>
            </>
          )}
          {/* 여기까지 포트폴리오 이미지, 탭 */}
        </Grid>
        <Link />
      </Grid>
      <Footer />
    </>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const BgDiv = _styled.div`
  z-index: 0;
  width: 1200px;
  background-image: url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbYEcBU%2FbtrCOrN5WxE%2FQnu7EdZ4UTkHkZxDliB1x0%2Fimg.png");
  background-repeat: no-repeat;
  height: 600px;
  background-size: corver;
  position: absolute;
`;

const Profile = _styled.div`
  margin-bottom: 19.5px;
  float: left;
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    max-width: 120px;
    min-width: 120px;
    /* width: 20vw; */
    height: auto;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid black;
  }
`;

const ImageBox = _styled.div`
  margin: 3rem auto 5rem auto;
  width: 1100px;
  height: 500px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
`;

export default User;
