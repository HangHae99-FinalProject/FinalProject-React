import * as React from "react";
import { useLocation } from "react-router-dom";
import { history } from "../redux/configureStore";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

//MUI 관련 임포트
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

//미사용 임포트
import styled from "styled-components";

const cookies = new Cookies();

function Header(props) {
  const dispatch = useDispatch();
  const isCookies = cookies.get("accessToken", { path: "/" }) ? true : false;
  const isLogin = useSelector((state) => state.user.isLogin);
  const id = localStorage.getItem("userId");

  const pathName = useLocation();

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
  if (pathName.pathname === "/") {
    return null;
  }
  if (pathName.pathname === "/signup") {
    return null;
  }
  if (pathName.pathname === "/login") {
    return null;
  }

  return (
    <Grid sx={{ Width: "100%" }}>
      <AppBar
        position="static"
        sx={{
          margin: "0 auto",
          background: "#03517D",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Grid
            sx={{ color: "#C2C0C1" }}
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
                    style={{ marginLeft: "260px", height: "40px" }}
                  />
                </Grid>
              </>
            )}
            <Grid sx={{ width: "31%" }}>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
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
                          marginRight: "260px",
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
                          marginRight: "300px",
                        }}
                      >
                        LOGIN
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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

export default Header;
