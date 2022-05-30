import * as React from "react";
import { useLocation } from "react-router-dom";
import { history } from "../redux/configureStore";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import tutorial_main from "../assets/tutorial/tutorial_main.png";

//MUI 관련 임포트
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ModalWindow from "../elements/ModalWindow";

import TutorialSwiper from "../elements/TutorialSwiper";

//미사용 임포트
import styled from "styled-components";

const cookies = new Cookies();

function Header(props) {
  const dispatch = useDispatch();
  const isCookies = cookies.get("accessToken", { path: "/" }) ? true : false;
  const isLogin = useSelector((state) => state.user.isLogin);
  const id = localStorage.getItem("userId");

  const pathName = useLocation();

  //모달 컨트롤
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //여기까지 모달컨트롤

  const menuId = "primary-search-account-menu";
  const goHome = () => {
    history.push("/main");
  };
  const goChat = () => {
    history.push("/chatlist");
  };
  const goLogin = () => {
    history.push("/login");
  };
  const goLogout = () => {
    dispatch(userActions.__logout());
  };
  const goUserPage = () => {
    history.push(`/user/${id}`);
    window.location.reload();
  };
  const goSignup = () => {
    history.push("/signup");
  };

  if (pathName.pathname === "/user/kakao/login") {
    return null;
  }
  // if (pathName.pathname === "/") {
  //   return null;
  // }
  if (pathName.pathname === "/signup") {
    return null;
  }
  if (pathName.pathname === "/login") {
    return null;
  }

  return (
    <Grid>
      {/* 튜토리얼 모달 */}
      <ModalWindow
      handleOpen={handleOpen}
      open={open}
      handleClose={handleClose}
      width="1200px"
      height="881px"
      borderRadius="20px"
      >
        <TutorialSwiper></TutorialSwiper>
      </ModalWindow>
      {/* 여기까지 튜토리얼 모달 */}
      <AppBar
        position="static"
        sx={{
          margin: "0 auto",
          background: "#03517D",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          {pathName.pathname === "/" ? <Grid></Grid> :<Grid
            sx={{ color: "#C2C0C1", width:"1370px", margin:"auto" }}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {pathName.pathname === "/main" ? (
              <Grid></Grid>
            ) : (
              <>
                <Grid sx={{ display: { cursor: "pointer" } }} onClick={goHome}>
                  <img
                    src="https://velog.velcdn.com/images/tty5799/post/89054416-3241-4eaa-984e-931466ff2329/image.svg"
                    alt="logo"
                    style={{ 
                      // marginLeft: "260px", 
                      height: "40px" 
                    }}
                  />
                </Grid>
              </>
            )}
            <Grid sx={{ 
              // width: "31%" 
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                {/* <Grid
                  sx={{ marginRight: "20px", display: { cursor: "pointer" } }}
                  onClick={handleOpen}
                >
                  <Typography sx={{ color: "#fff", fontSize: "18px" }}>
                    /TUTORIAL TEST BUTTON/
                  </Typography>
                </Grid> */}
                {isLogin && isCookies === true ? (
                  <Grid
                    sx={{ marginRight: "20px", display: { cursor: "pointer" } }}
                    onClick={goChat}
                  >
                    <Typography sx={{ color: "#fff", fontSize: "18px" }}>
                      CHATON
                    </Typography>
                  </Grid>
                ) : null}
                <Grid
                  sx={{ marginRight: "20px", display: { cursor: "pointer" } }}
                >
                  {isLogin && isCookies === true ? (
                    <Typography
                      sx={{ color: "#fff", fontSize: "18px" }}
                      onClick={goUserPage}
                    >
                      MYPAGE
                    </Typography>
                  ) : (
                    <Typography
                      sx={{ color: "#fff", fontSize: "18px" }}
                      onClick={goSignup}
                    >
                      SIGNUP
                    </Typography>
                  )}
                </Grid>
                <Grid sx={{ display: { cursor: "pointer" } }}>
                  {isLogin && isCookies === true ? (
                    <Grid onClick={goLogout}>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: "18px",
                          // marginRight: "260px",
                        }}
                      >
                        LOGOUT
                      </Typography>
                    </Grid>
                  ) : (
                    <Grid onClick={goLogin}>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: "18px",
                          // marginRight: "300px",
                        }}
                      >
                        LOGIN
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>}
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

const Line = styled.div`
  height: 1px;
  width: 1370px;
  background-color: #2967ac;
`;

const BgDiv = styled.div`
  z-index: -10;
  width: 1200px;
  background-image: url(${tutorial_main});
  height: 881px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  /* display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center; */
`;

export default Header;
