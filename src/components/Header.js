import * as React from "react";
import { useHistory } from "react-router-dom";
import { history } from "../redux/configureStore";

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
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import GroupAddIcon from "@mui/icons-material/GroupAdd";


//미사용 임포트
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

function Header() {
  const menuId = "primary-search-account-menu";
  const goHome = () => {
    history.push("/");
  };
  const goChat = () => {
    history.push("/chatlist/:id");
  };
  const goLogin = () => {
    history.push("/login");
  };
  const goUserPage = () => {
    history.push("/signup");
  };

  return (
    <Box sx={{ flexGrow: 1, minWidth:"640px" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "block", sm: "block", cursor:"pointer"} }}
            onClick={goHome}
          >
            <b style={{ fontSize: "30px" }}>모</b>두의 경<b style={{ fontSize: "30px" }}>험</b>
            <b style={{ fontSize: "30px" }}>:모험</b>{" "}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <IconButton size="large" aria-label="go to home" color="inherit" onClick={goHome}>
              <HomeIcon />
            </IconButton>
            <IconButton size="large" aria-label="show 4 new chats" color="inherit" onClick={goChat}>
              <Badge badgeContent={4} color="error">
                <ChatIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="do login" color="inherit" onClick={goLogin}>
              <LoginIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={goUserPage}
              color="inherit"
            >
              <GroupAddIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {/* {renderMenu} */}
    </Box>
  );
}

export default Header;
