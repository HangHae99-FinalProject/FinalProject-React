import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { chatApi } from "../api/chatApi";
import ChattingItem from "../components/Chat/ChattingItem";
import { actionCreators as chatActios } from "../redux/modules/chat";

const Chatting = () => {
  const dispatch = useDispatch();
  const client = useSelector((state) => state.chat.client);

  const [rooms, setRooms] = useState([]);
  const [stomp, setStomp] = useState();
  console.log(client);

  useEffect(() => {
    // dispatch(chatActios.__roadRoom());
    chatApi
      .roadRoom()
      .then((res) => {
        console.log(res.data);
        setRooms(res.data);
        // let
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Container>
      <div>
        {rooms.map((p, idx) => {
          return (
            <ChattingItem
              roomData={p}
              client={client}
              key={idx}
              stomp={stomp}
            />
          );
        })}
      </div>
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

export default Chatting;
