import React, { useEffect } from "react";

//패키지 임포트
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";

//페이지 임포트
import Header from "../components/Header";
import Main from "../pages/Main";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Post from "../pages/Post";
import Write from "../pages/Write";
import User from "../pages/User";
import EditUser from "../pages/EditUser";
import Chat from "../pages/Chat";

//기타 임포트
import { history } from "../redux/configureStore";
import { Grid } from "@mui/material";
import Detail from "../pages/Detail";
import { actionCreators as userActions } from "../redux/modules/user";
import EditPost from "../pages/EditPost";
import Applied from "../pages/Applied";

function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(userActions.__loginCheck());
  // }, []);
  return (
    <Grid height="100%">
      <Header></Header>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/post/:id" exact component={Post} />
        <Route path="/detail/:postid" exact component={Detail} />
        <Route path="/detail" exact component={Detail} />
        <Route path="/write" exact component={Write} />
        <Route path="/editpost/:postid" exact component={EditPost} />
        <Route path="/user" exact component={User} />
        <Route path="/user/:id" exact component={User} />
        <Route path="/edituser/:id" exact component={EditUser} />
        <Route path="/chatlist/:id" exact component={Chat} />
        <Route path="/chat/:id" exact component={Chat} />
        <Route path="/applied/:postid" exact component={Applied} />
      </ConnectedRouter>
    </Grid>
  );
}

export default App;
