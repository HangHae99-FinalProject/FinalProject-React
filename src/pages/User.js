import React, { useEffect } from "react";
import _styled from "styled-components";
import rr from "../assets/image 35.png";
import { useDispatch, useSelector } from "react-redux";
import store, { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as userInfoActions } from "../redux/modules/myPage";
import DetailImage from "../components/Detail/DetailImage";
import TabPanel from "../components/MyPage/TabPanel";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Rowing } from "@mui/icons-material";
import { useParams } from "react-router-dom";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const lightTheme = createTheme({ palette: { mode: "light" } });

const User = (props) => {
  const param = useParams()
  const postId = param.postid;
  const dispatch = useDispatch();
  const getIntro = useSelector((state) => state.myPage.userInfo.intro);
  const getMajor = useSelector((state) => state.myPage.userInfo.major);
  const getPortfolioLink = useSelector((state) => state.myPage.userInfo.portfolioLink);
  // const getLikeCount = useSelector((state) => state.user.userInfo.likeCount);
  const getLikeCount = 51;
  const getNickname = useSelector((state) => state.myPage.userInfo.nickname);
  const getProfileImg = useSelector((state) => state.myPage.userInfo.profileImg);
  const getProjectCount = useSelector((state) => state.myPage.userInfo.projectCount);
  const getUserPortfolioImgList = useSelector(
    (state) => state.myPage.userInfo.userPortfolioImgList
  );
  const getAppliedList = useSelector((state) => state.myPage.appliedList?.data);
  const getRecruitList = useSelector((state) => state.myPage.recruitList?.data);
  const getApplierList = useSelector((state) => state.myPage.applierList)
  console.log(getRecruitList);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const getApplierBtn = ()=>{
  //   dispatch(userInfoActions.__getApplier(postId));
  // }

  useEffect(() => {
    dispatch(userInfoActions.__getUserInfo());
    dispatch(userInfoActions.__getApplied());
    dispatch(userInfoActions.__getRecruit());
    return;
  }, []);

  return (
    <Grid sx={{ width: "1920px" }}>
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
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <Grid>
                <Typography sx={{ fontWeight: "bold" }}>마이페이지</Typography>
              </Grid>
              <Grid>
                <Button
                  variant="contained"
                  sx={{ marginBottom: "14px", width: "100px", height: "40px", padding: "0" }}
                  onClick={() => {
                    history.push("/edituser/:id");
                  }}
                >
                  프로필 수정
                </Button>
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
                // minWidth: "640px",
                width: "1370px",
                // height: "350px",
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
                      <img src={getProfileImg} alt="profileImg" />
                    </div>
                  </Profile>
                  <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Typography sx={{ fontSize: "14px" }}>
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.49 0.5C4.97 0.5 0.5 4.98 0.5 10.5C0.5 16.02 4.97 20.5 10.49 20.5C16.02 20.5 20.5 16.02 20.5 10.5C20.5 4.98 16.02 0.5 10.49 0.5ZM13.72 15.89L10.5 13.95L7.28 15.89C6.9 16.12 6.43 15.78 6.53 15.35L7.38 11.69L4.55 9.24C4.22 8.95 4.4 8.4 4.84 8.36L8.58 8.04L10.04 4.59C10.21 4.18 10.79 4.18 10.96 4.59L12.42 8.03L16.16 8.35C16.6 8.39 16.78 8.94 16.44 9.23L13.61 11.68L14.46 15.35C14.56 15.78 14.1 16.12 13.72 15.89Z"
                          fill="#323232"
                        />
                      </svg>
                      또 모험해요!
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography sx={{ fontSize: "10px" }}>{}100% 만족! 프로 선장러</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Grid>
                  <Button
                    value="kkk"
                    variant="contained"
                    sx={{ borderRadius: "20px", marginLeft: "24px" }}
                  >
                    {getMajor}
                  </Button>
                </Grid>
                {/* <Grid>
                  <TextField
                    id="myMajor"
                    label="전공"
                    defaultValue="OO대학교 시각 디자인을 전공하고 있습니다."
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ marginTop: "24px", minWidth: "340px", width: "auto", maxWidth: "700px" }}
                  />
                </Grid> */}
                <Grid>
                  <TextField
                    id="myIntro"
                    multiline
                    defaultValue={getIntro}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ marginTop: "24px", minWidth: "340px", width: "auto", maxWidth: "700px" }}
                  />
                </Grid>
                <Grid>
                  <TextField
                    id="myIntro"
                    multiline
                    defaultValue={getPortfolioLink}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ marginTop: "24px", minWidth: "340px", width: "auto", maxWidth: "700px" }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ marginTop: "24px", width: "1270px", height: "450" }}>
          {/* 이미지 슬라이드 작업 할 것. */}
          <ImageBox>
            <DetailImage image={getUserPortfolioImgList} />
          </ImageBox>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "1370px", marginTop: "24px" }}
        >
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <Typography>나의 프로젝트</Typography>
          </Grid>
          <Grid sx={{ padding: "0px 20px", borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab sx={{ width: "430px" }} label="신청중" {...a11yProps(0)} />
              <Tab
                sx={{ width: "430px", marginLeft: "20px", marginRight: "20px" }}
                label="모집중"
                {...a11yProps(1)}
              />
              <Tab sx={{ width: "430px" }} label="진행완료" {...a11yProps(2)} />
            </Tabs>
          </Grid>
          <TabPanel value={value} index={0}>
            <List
              sx={{ width: "1370px", height: "90px" }}
              component="nav"
              aria-label="mailbox folders"
            >
              {getAppliedList?.map((appliedList, idx) => {
                return (
                  <ListItem
                    sx={{
                      height: "90px",
                    }}
                    button
                    key={idx}
                    divider
                  >
                    <ListItemText
                      onClick={() => {
                        history.push(`/detail/${appliedList.postId}`);
                      }}
                    >
                      {appliedList.title}
                      <ArrowForwardIosRoundedIcon style={{ verticalAlign: "middle" }} />
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <List
              sx={{ width: "1370px", height: "90px" }}
              component="nav"
              aria-label="mailbox folders"
            >
              {getRecruitList?.map((recruitList, idx) => {
                return (
                  <ListItem
                    sx={{
                      height: "90px",
                    }}
                    button
                    key={idx}
                    divider
                  >
                    <ListItemText
                      onClick={() => {
                        dispatch(userInfoActions.__getApplier(postId));
                        history.push(`/detail/${recruitList.postId}`);
                      }}
                    >
                      {recruitList.title}
                      <ArrowForwardIosRoundedIcon style={{ verticalAlign: "middle" }} />
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <List
              sx={{ width: "1370px", height: "90px" }}
              component="nav"
              aria-label="mailbox folders"
            >
              <ListItem sx={{ height: "90px" }} button>
                <ListItemText primary="진행완료1" />
              </ListItem>
              <Divider />
              <ListItem button divider>
                <ListItemText primary="진행완료2" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="진행완료3" />
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary="진행완료4" />
              </ListItem>
            </List>
          </TabPanel>
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
