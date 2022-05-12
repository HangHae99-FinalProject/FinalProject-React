import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { chatApi } from "../api/chatApi";
import ChattingItem from "../components/Chat/ChattingItem";
import { actionCreators as chatActios } from "../redux/modules/chat";

const Chatting = () => {
  const client = useSelector((state) => state.chat.client);

  const [rooms, setRooms] = useState([]);
  const [stomp, setStomp] = useState();
  const [test, setTest] = useState(true);
  const [newMsgData, setNewMsgData] = useState("");
  const myUserId = localStorage.getItem("userId");

  const testOne = () => {
    setTest(false);
  };

  useEffect(() => {
    chatApi
      .roadRoom()
      .then((res) => {
        console.log(res.data);
        setRooms(res.data);
      })
      .catch((err) => console.log(err));
    client.subscribe(`/sub/${myUserId}`, (data) => {
      const onMessage = JSON.parse(data.body);
      setNewMsgData(onMessage);
    });
  }, []);
  return (
    <Backimage>
      <Container>
        <HeadBox>
          <span>채팅</span>
        </HeadBox>
        <div>
          {rooms.map((p, idx) => {
            return (
              <ChattingItem
                testOne={testOne}
                roomData={p}
                client={client}
                key={idx}
                stomp={stomp}
              />
            );
          })}
        </div>
      </Container>
    </Backimage>
  );
};

const HeadBox = styled.div`
  height: 60px;
  justify-items: center;
  align-items: center;
  display: flex;
  justify-content: center;
  background: #f5fcff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  span {
    font-size: 24px;
    font-weight: 500;
  }
`;

const Container = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 782px;
  height: 777px;
  margin: 1% auto;
`;

const Backimage = styled.div`
  background-image: url("https://velog.velcdn.com/images/tty5799/post/1e685506-98e9-4c90-b688-43cb86e933a8/image.png");
  width: 1920px;
  height: 1080px;
  background-position: center;
  background-size: cover;
`;

export default Chatting;
