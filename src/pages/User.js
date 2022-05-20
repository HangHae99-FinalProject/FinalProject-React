import React, { useEffect, useState } from "react";
import amateurCap from "../assets/ama.svg";
import juniorCap from "../assets/jr.svg";
import proCap from "../assets/pro.svg";
import ReactModal from "react-modal";
import _styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { history } from "../redux/configureStore";
import TabPanel from "../components/MyPage/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import DetailImage from "../components/Detail/DetailImage";
import { actionCreators as userInfoActions } from "../redux/modules/myPage";
import Pagination from "../components/MyPage/Pagination";
import ImageNotFound from "../assets/imageNotFound.png";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ListItemText from "@mui/material/ListItemText";
import PanToolRoundedIcon from "@mui/icons-material/PanToolRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const User = (props) => {
  // const param = useParams();
  // const postId = param.postid;
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

  const modalHandelBtn = () => {
    setModalState(!ModalState);
    console.log(ModalState);
  };
  const getUserInfo = useSelector((state) => state.myPage.userInfo);
  const getAppliedList = useSelector((state) => state.myPage.appliedList?.data); //신청중 리스트
  const getRecruitList = useSelector((state) => state.myPage.recruitList?.data); //모집중 리스트
  const getRecruitOverList = useSelector((state) => state.myPage.recruitOverList.data); //모집완료 리스트
  const getAppliedOverList = useSelector((state) => state.myPage.appliedOverList.data);
  console.log("자기소개", getUserInfo.intro);
  console.log("포트폴리오링크", getUserInfo.portfolioLink);
  console.log("포트폴리오사진", getUserInfo.userPortfolioImgList?.length);
  console.log("신청중리스트", getAppliedList);
  console.log("모집중리스트", getRecruitList);
  console.log("모집완료리스트", getRecruitOverList);
  const getAppliedOverList_postUser = useSelector(
    (state) => state.myPage.appliedOverList.data?.postUser
  );
  const getAppliedOverList_reqruit = useSelector(
    (state) => state.myPage.appliedOverList.data?.recruitUserList
  );

  const pathName = useLocation();
  console.log(pathName);
  const userId = pathName.pathname.split("/")[2];

  var likeRatio = (getUserInfo.likeCount / 100) * (100 / getUserInfo.projectCount) * 100;
  if (isNaN(likeRatio)) {
    likeRatio = 0;
  }

  var evaluationGrade = null;

  if (likeRatio <= 40) {
    evaluationGrade = `${likeRatio}% 만족! 아마추어 선장러`;
  } else if (41 <= likeRatio <= 70) {
    evaluationGrade = `${likeRatio}% 만족! 주니어 선장러`;
  } else if (71 <= likeRatio <= 100) {
    evaluationGrade = `${likeRatio}% 만족! 프로 선장러`;
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
  console.log(userId);

  useEffect(() => {
    dispatch(userInfoActions.initUserInfo());
    dispatch(userInfoActions.__getUserInfo(userId));
    dispatch(userInfoActions.__getApplied(userId));
    dispatch(userInfoActions.__getRecruit(userId));
    dispatch(userInfoActions.__getRecruitOver(userId));
  }, [userId]);

  return (
    <Grid sx={{ width: "1920px" }}>
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            borderRadius: "20px",
            minHeight: "600px",
            height: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "1200px",
            padding: 0,
            transition: "0.3s",
          },
        }}
      >
        <Grid>
          <Grid>
            <Grid>
              <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
                함께 모험한 선장들의 리뷰를 남겨주세요.
              </Typography>
            </Grid>
            <Grid container direction="row" justifyContent="center" alignItems="center">
              {/* 모집글 작성자 */}
              {getAppliedOverList_postUser !== null ? (
                <Card
                  sx={{
                    width: "248px",
                    height: "248px",
                    margin: "auto",
                    borderRadius: "14px",
                  }}
                >
                  <CardContent sx={{ padding: "34px 20px 16px 20px" }}>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                      <img
                        src={getAppliedOverList_postUser?.profileImg}
                        alt="profileImg"
                        style={{
                          width: "80px",
                          height: "80px",
                          border: "1px solid #818181",
                          borderRadius: "50%",
                          marginRight: "5px",
                        }}
                      />
                      <Typography
                        sx={{
                          width: "85px",
                          height: "23px",
                          marginLeft: "5px",
                          fontSize: "16px",
                        }}
                      >
                        {getAppliedOverList_postUser?.nickname}
                      </Typography>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                      <Button
                        sx={{
                          width: "180px",
                          height: "40px",
                          background: "#4299E9",
                          borderRadius: "14px",
                          marginBottom: "5px",
                        }}
                        variant="contained"
                        onClick={() => {
                          setReceiverId(getAppliedOverList_postUser.userId);

                          dispatch(
                            userInfoActions.__postEvaluation({
                              postId: postId,
                              receiverId: getAppliedOverList_postUser.userId,
                              point: 1,
                            })
                          );
                        }}
                      >
                        <FavoriteRoundedIcon sx={{ marginRight: "12px" }} />또 모험 같이해요!
                      </Button>
                      <Button
                        sx={{
                          width: "180px",
                          height: "40px",
                          background: "#FE5953",
                          borderRadius: "14px",
                          marginTop: "5px",
                        }}
                        variant="contained"
                        onClick={() => {
                          setReceiverId(getAppliedOverList_postUser.userId);

                          dispatch(
                            userInfoActions.__postEvaluation({
                              postId: postId,
                              receiverId: getAppliedOverList_postUser.userId,
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
              ) : null}

              {/* 지원자 리스트 */}
              {getAppliedOverList_reqruit?.map((appliedOverList, idx) => {
                return (
                  <Card
                    key={idx}
                    sx={{
                      width: "248px",
                      height: "248px",
                      margin: "auto",
                      borderRadius: "14px",
                    }}
                  >
                    <CardContent sx={{ padding: "34px 20px 16px 20px" }}>
                      <Grid container direction="row" justifyContent="center" alignItems="center">
                        <img
                          src={appliedOverList.profileImg}
                          alt="profileImg"
                          style={{
                            width: "80px",
                            height: "80px",
                            border: "1px solid #818181",
                            borderRadius: "50%",
                            marginRight: "5px",
                          }}
                        />
                        <Typography
                          sx={{
                            width: "85px",
                            height: "23px",
                            marginLeft: "5px",
                            fontSize: "16px",
                          }}
                        >
                          {appliedOverList.nickname}
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
                            width: "180px",
                            height: "40px",
                            background: "#4299E9",
                            borderRadius: "14px",
                            marginBottom: "5px",
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
                          <FavoriteRoundedIcon sx={{ marginRight: "12px" }} />또 모험 같이해요!
                        </Button>
                        <Button
                          sx={{
                            width: "180px",
                            height: "40px",
                            background: "#FE5953",
                            borderRadius: "14px",
                            marginTop: "5px",
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
            </Grid>
          </Grid>
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
            "& .MuiTextField-root": { marginLeft: "24px", width: "1370px" },
          }}
        >
          <Grid>
            <input onChange={emailHandleChange} />
            <button onClick={emailCheckBtn}>인증</button>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <Grid>
                <Typography sx={{ fontWeight: "bold" }}>
                  "{getUserInfo.nickname}" 님의 마이페이지
                </Typography>
              </Grid>
              <Grid>
                {userId === id ? (
                  <Button
                    variant="contained"
                    sx={{
                      marginBottom: "14px",
                      width: "100px",
                      height: "40px",
                      padding: "0",
                    }}
                    onClick={() => {
                      history.push(`/edituser/${id}`);
                    }}
                  >
                    프로필 수정
                  </Button>
                ) : null}
              </Grid>
            </Grid>
            <Grid
              height="auto"
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                position: "relative",
                width: "1370px",
                border: "1px solid #c6c6c6",
                borderRadius: "10px",
                padding: "14px",
              }}
            >
              <Grid>
                <Grid
                  sx={{ position: "relative" }}
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Profile>
                    <div style={{ margin: "auto", width: "auto", height: "auto" }}>
                      <img src={getUserInfo.profileImg} alt="profileImg" />
                    </div>
                  </Profile>
                  <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Typography sx={{ fontSize: "14px" }}>
                      {likeRatio <= 40 ? (
                        <img src={amateurCap} alt="amateurCap" />
                      ) : 41 <= likeRatio <= 70 ? (
                        <img src={juniorCap} alt="juniorCap" />
                      ) : (
                        <img src={proCap} alt="proCap" />
                      )}
                      또 모험해요!
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography sx={{ fontSize: "10px" }}>{evaluationGrade}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Grid>
                  <Button
                    value="major"
                    variant="contained"
                    sx={{ borderRadius: "20px", marginLeft: "24px" }}
                  >
                    {getUserInfo.major}
                  </Button>
                </Grid>
                {/* 자기소개 */}
                <Grid>
                  <Typography
                    id="myIntro"
                    value="1212"
                    sx={{
                      marginTop: "20px",
                      marginLeft: "24px",
                      width: "900px",
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
        </Grid>
        <Grid sx={{ marginTop: "24px", width: "1270px", height: "450" }}>
          <ImageBox>
            <DetailImage
              image={
                getUserInfo.userPortfolioImgList
              }
            />
          </ImageBox>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "1370px", marginTop: "24px" }}
        >
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
            <Typography>나의 프로젝트</Typography>
            {/* 페이지네이션 게시물 수 셀렉터 */}
            <label>
              페이지당 표시할 게시물 수:&nbsp;
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
            sx={{
              padding: "0px 20px",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            {/* 탭 속성 */}
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab
                sx={{ width: "430px" }}
                label="신청중"
                {...a11yProps(0)}
                // onClick={() => {
                //   dispatch(userInfoActions.__getApplied(userId));
                // }}
              />
              <Tab
                sx={{ width: "430px", marginLeft: "20px", marginRight: "20px" }}
                label="모집중"
                {...a11yProps(1)}
                // onClick={() => {
                //   dispatch(userInfoActions.__getRecruit(userId));
                // }}
              />
              <Tab
                sx={{ width: "430px" }}
                label="모집/진행 완료"
                {...a11yProps(2)}
                // onClick={() => {
                //   dispatch(userInfoActions.__getRecruitOver(userId));
                // }}
              />
            </Tabs>
            {/* 여기까지 탭 속성 */}
          </Grid>
          {/* 신청중 탭 */}
          <TabPanel value={value} index={0}>
            <List
              sx={{ padding: "0px 16px", width: "1370px", height: "110px" }}
              component="nav"
              aria-label="mailbox folders"
            >
              {getAppliedList?.length === 0 ? (
                <Typography>조회할 신청중 리스트가 없습니다.</Typography>
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
                          margin: "5px 0px",
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
              sx={{ padding: "0px 16px", width: "1370px", height: "110px" }}
              component="nav"
              aria-label="mailbox folders"
            >
              {getRecruitList?.length === 0 ? (
                <Typography>조회할 모집중 리스트가 없습니다.</Typography>
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
                          margin: "5px 0px",
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

                        <Grid>
                          <Grid>
                            <Button
                              sx={{
                                color: "#FE5953",
                                border: "1px solid #FE5953",
                                marginBotton: "5px",
                                width: "190px",
                                height: "40px",
                              }}
                              variant="outlined"
                            >
                              {recruitList.userApplyList.length}명의 선장이 신청했어요!
                            </Button>
                          </Grid>
                          <Grid>
                            <Button
                              sx={{
                                marginTop: "5px",
                                width: "190px",
                                height: "40px",
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
              sx={{ padding: "0px 16px", width: "1370px", height: "110px" }}
              component="nav"
              aria-label="mailbox folders"
            >
              {getRecruitOverList?.length === 0 ? (
                <Typography>조회할 모집/진행완료 리스트가 없습니다.</Typography>
              ) : (
                getRecruitOverList?.slice(offset, offset + limit).map((recruitOverList, idx) => {
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
                          margin: "5px 0px",
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

                        <Grid>
                          <Grid>
                            <Button
                              sx={{
                                marginTop: "5px",
                                width: "190px",
                                height: "40px",
                              }}
                              variant="contained"
                              onClick={() => {
                                setPostId(recruitOverList.postId);
                                modalHandelBtn();
                                dispatch(userInfoActions.__getAppliedOver(recruitOverList.postId));
                              }}
                            >
                              선장리뷰
                            </Button>
                          </Grid>
                        </Grid>
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
      </Grid>
    </Grid>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// const style = {
//   height: "90px",
//   width: "1370px",
//   bgcolor: "background.paper",
// };

const Profile = _styled.div`
  /* margin-top: 5%; */
  float: left;
  height: auto;
  width: auto;
  display: flex;
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
`;

const ImageBox = _styled.div`
  margin: 3rem auto 5rem auto;
  width: 1100px;
  height: 500px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
`;

export default User;
