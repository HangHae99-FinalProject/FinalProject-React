import * as React from "react";
import { useHistory } from "react-router-dom";
import store, { history } from "../redux/configureStore";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import logo from "../assets/logo.png";

//MUI 관련 임포트
import { styled, alpha } from "@mui/material/styles";
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

const cookies = new Cookies();

function Header(props) {
  const dispatch = useDispatch();
  const isCookies = cookies.get("isLogin", { path: "/" }) ? true : false;
  const isLogin = useSelector((state) => state.user.isLogin);
  const id = localStorage.getItem("userId");
  console.log(isLogin);
  // console.log(id);

  // React.useEffect(() => {
  //   if (isCookies) {
  //     return;
  //   }
  // });

  const menuId = "primary-search-account-menu";
  const goHome = () => {
    history.push("/");
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
  };
  const goSignup = () => {
    history.push("/signup");
  };

  // React.useEffect(() => {
  //   dispatch(userActions.__loginCheck());
  // }, []);

  if (window.location.pathname === "/") {
    return null;
  }

  return (
    <Grid sx={{ maxWidth: "1920px" }}>
      <AppBar position="static" sx={{ background: "white", boxShadow: "none" }}>
        <Toolbar>
          <Grid
            sx={{ color: "#C2C0C1" }}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid sx={{ display: { cursor: "pointer" } }} onClick={goHome}>
              <img src={logo} alt="logo" style={{ height: "40px" }} />
            </Grid>
            <Grid sx={{ width: "30%" }}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid sx={{ display: { cursor: "pointer" } }} onClick={goHome}>
                  <Typography>Home</Typography>
                </Grid>
                {isCookies === true ? (
                  <Grid
                    sx={{ display: { cursor: "pointer" } }}
                    onClick={goChat}
                  >
                    <Badge badgeContent={4} color="error">
                      <Typography>ChatOn</Typography>
                    </Badge>
                  </Grid>
                ) : null}
                <Grid sx={{ display: { cursor: "pointer" } }}>
                  {isCookies === true ? (
                    <Grid onClick={goLogout}>
                      <Typography>Logout</Typography>
                    </Grid>
                  ) : (
                    <Grid onClick={goLogin}>
                      <Typography>Login</Typography>
                    </Grid>
                  )}
                </Grid>
                <Grid sx={{ display: { cursor: "pointer" } }}>
                  {isCookies === true ? (
                    <Typography onClick={goUserPage}>MyPage</Typography>
                  ) : (
                    <Typography onClick={goSignup}>SignUp</Typography>
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

export default Header;
