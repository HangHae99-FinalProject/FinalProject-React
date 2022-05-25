import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";
import store, { history } from "../redux/configureStore";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import logo from "../assets/logo.png";

//MUI 관련 임포트
import { alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Grid from "@mui/material/Grid";

//미사용 임포트
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import styled from "styled-components";

const cookies = new Cookies();

function Header(props) {
  const dispatch = useDispatch();
  // const isCookies = cookies.get("isLogin", { path: "/" }) ? true : false;
  const isCookies = cookies.get("accessToken", { path: "/" }) ? true : false;
  const isLogin = useSelector((state) => state.user.isLogin);
  const id = localStorage.getItem("userId");

  const pathName = useLocation();

  // console.log(id);

  // React.useEffect(() => {
  //   if (isCookies) {
  //     return;
  //   }
  // });

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

  // React.useEffect(() => {
  //   dispatch(userActions.__loginCheck());
  // }, []);

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
                {/* {isLogin && isCookies === true ? (
                  <Grid
                    sx={{ marginRight: "20px", display: { cursor: "pointer" } }}
                  >
                    <Typography sx={{ color: "#2967AC", fontSize: "20px" }}>
                      등대
                    </Typography>
                  </Grid>
                ) : null} */}

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
