import React from "react";

//패키지 임포트
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

//페이지 임포트
import Header from "../components/Header";
import Main from "../pages/Main";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Post from "../pages/Post";
import Write from "../pages/Write";
import User from "../pages/User";
import UserMod from "../pages/UserMod";
import Chat from "../pages/Chat";

//기타 임포트
import { history } from "../redux/configureStore";
import { Grid } from "@mui/material";
import Detail from "../pages/Detail";

function App() {
  return (
    <Grid>
      <Header></Header>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/post/:id" exact component={Post} />
        <Route path="/detail/:id" exact component={Detail} />
        <Route path="/detail" exact component={Detail} />
        <Route path="/write" exact component={Write} />
        <Route path="/write/:id" exact component={Write} />
        <Route path="/user" exact component={User} />
        <Route path="/user/:id" exact component={User} />
        <Route path="/usermod/:id" exact component={UserMod} />
        <Route path="/chatlist/:id" exact component={Chat} />
        <Route path="/chat/:id" exact component={Chat} />
      </ConnectedRouter>
    </Grid>
  );
}

export default App;
