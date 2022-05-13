import React, { useEffect } from "react";

//패키지 임포트
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";

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
import Footer from "../elements/Footer";

//기타 임포트
import { history } from "../redux/configureStore";
import { Grid } from "@mui/material";
import Detail from "../pages/Detail";
import { actionCreators as userActions } from "../redux/modules/user";
import EditPost from "../pages/EditPost";
import Applied from "../pages/Applied";
import Chatting from "../pages/Chatting";
import { actionCreators as chatActions } from "../redux/modules/chat";
import styled from "styled-components";

function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(userActions.__loginCheck());
  // }, []);
  const client = useSelector((state) => state.chat.client);

  useEffect(() => {
    client.connect({}, () => {
      dispatch(chatActions.setStomp(client));
    });
  }, []);

  return (
    <>
      <ConnectedRouter history={history}>
      <Header></Header>
        <Container>
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
          <Route path="/chatlist" exact component={Chatting} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/applied/:postid" exact component={Applied} />
        </Container>
      </ConnectedRouter>
      {/* <Footer></Footer> */}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: #fffcf2; */
  margin: 0;
`;

export default App;
