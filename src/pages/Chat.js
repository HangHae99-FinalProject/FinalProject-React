import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as chatActions } from "../redux/modules/chat";

const Chat = (data) => {
  console.log(data);
  const dispatch = useDispatch();
  const client = useSelector((state) => console.log(state.chat.client));
  const nickName = localStorage.getItem("nickname");
  console.log(client);

  // useEffect(() => {
  //   client?.connect({}, () => {
  //     dispatch(chatActions.setStomp(client));
  //   });
  // }, []);
  return (
    <Container>
      <Test>asdasd</Test>
      <Test>asdasd</Test>
      <Test>asdasd</Test>
      <Test>asdasd</Test>
      <input />
      <button>테스트</button>
    </Container>
  );
};

const Test = styled.div`
  background-color: gray;
`;

const Container = styled.div`
  background-color: gray;
  width: 80%;
  margin: 0 auto;
`;

export default Chat;
