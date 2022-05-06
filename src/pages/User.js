import React, { useEffect } from "react";
import _styled from "styled-components";
import rr from "../assets/image 35.png";
import { useDispatch, useSelector } from "react-redux";
import store, { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import DetailImage from "../components/Detail/DetailImage";

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

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

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
  const dispatch = useDispatch();
  const getIntro = useSelector((state) => state.user.userInfo?.intro);
  const getMajor = useSelector((state) => state.user.userInfo?.major);
  const getPortfolioLink = useSelector((state) => state.user.userInfo?.portfolioLink);
  const getLikeCount = useSelector((state) => state.user.userInfo?.likeCount);
  const getNickname = useSelector((state) => state.user.userInfo?.nickname);
  const getProfileImg = useSelector((state) => state.user.userInfo?.profileImg);
  const getProjectCount = useSelector((state) => state.user.userInfo?.projectCount);
  const getUserPortfolioImgList = useSelector((state) => state.user.userInfo?.userPortfolioImgList);
  console.log(getIntro);
  // console.log(getMajor);
  // console.log(getNickname);
  // console.log(getLikeCount);
  // console.log(getProfileImg);
  // console.log(getProjectCount);
  // console.log(getUserPortfolioImgList);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(userActions.__getUserInfo());
  }, []);

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "20px", flexGrow: 1, padding: "4px", minWidth: "640px" }}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { marginLeft: "24px", width: "60vw" },
          }}
          noValidate
          autoComplete="off"
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
                minWidth: "640px",
                maxWidth: "900px",
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
                    <Typography sx={{ fontSize: "10px" }}>100% 만족! 프로 선장러</Typography>
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
        </Box>
        <Grid>
          {/* 이미지 슬라이드 작업 할 것. */}
          <DetailImage/>
        </Grid>
        {/* <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ maxWidth: "600px", marginTop: "24px" }}
        >
          <Grid>
            <Box sx={{ maxWidth: "840px", borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="신청중" {...a11yProps(0)} />
                <Tab label="모집중" {...a11yProps(1)} />
                <Tab label="진행완료" {...a11yProps(2)} />
              </Tabs>
            </Box>
          </Grid>

          <Grid container direction="row" justifyContent="center" alignItems="flex-start">
            <TabPanel value={value} index={0}>
              <Grid>
                <List sx={style} component="nav" aria-label="mailbox folders">
                  <ListItem button>
                    <ListItemText primary="신청중1" />
                  </ListItem>
                  <Divider />
                  <ListItem button divider>
                    <ListItemText primary="신청중2" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="신청중3" />
                  </ListItem>
                  <Divider light />
                  <ListItem button>
                    <ListItemText primary="신청중4" />
                  </ListItem>
                </List>
              </Grid>
            </TabPanel>
          </Grid>
          <Grid container direction="row" justifyContent="center" alignItems="flex-start">
            <TabPanel value={value} index={1}>
              <Grid>
                <List sx={style} component="nav" aria-label="mailbox folders">
                  <ListItem button>
                    <ListItemText primary="모집중1" />
                  </ListItem>
                  <Divider />
                  <ListItem button divider>
                    <ListItemText primary="모집중2" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="모집중3" />
                  </ListItem>
                  <Divider light />
                  <ListItem button>
                    <ListItemText primary="모집중4" />
                  </ListItem>
                </List>
              </Grid>
            </TabPanel>
          </Grid>
          <Grid container direction="row" justifyContent="center" alignItems="flex-start">
            <TabPanel value={value} index={2}>
              <Grid>
                <List sx={style} component="nav" aria-label="mailbox folders">
                  <ListItem button>
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
              </Grid>
            </TabPanel>
          </Grid>
        </Grid> */}
      </Grid>
    </Container>
  );
};

const itemData1 = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
];
const itemData2 = [
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
];
const itemData3 = [
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

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

export default User;
