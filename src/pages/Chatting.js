import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import { chatApi } from "../api/chatApi";
import ChattingItem from "../components/Chat/ChattingItem";
import Spinner from "../components/Spinner";
import Footer from "../elements/Footer";
import { actionCreators as chatActios } from "../redux/modules/chat";
import Link from "../components/Link";

const Chatting = () => {
  const client = useSelector((state) => state.chat.client);

  const { pathname } = useLocation();
  const from = localStorage.getItem("from");
  const user = localStorage.getItem("userId");

  const [rooms, setRooms] = useState([]);
  const [stomp, setStomp] = useState();
  const [test, setTest] = useState(true);
  const [newMsgData, setNewMsgData] = useState("");
  const myUserId = localStorage.getItem("userId");
  const [is_loading, setIs_Loading] = useState(false);

  const testOne = () => {
    setTest(false);
  };

  useEffect(() => {
    setIs_Loading(true);
    chatApi
      .roadRoom()
      .then((res) => {
        setRooms(res.data);
        setIs_Loading(false);
      })
      .catch((err) => {});
    // client.subscribe(`/sub/${myUserId}`, (data) => {
    //   console.log(data);
    //   const onMessage = JSON.parse(data.body);
    //   console.log(onMessage);
    // setNewMsgData(onMessage);
    // const updateCountDto = {
    //   roomName: onMessage.roomName,
    //   userId: myUserId,
    // };
    // chatApi
    //   .roomCount(updateCountDto)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // });
  }, []);
  if (!user) {
    alert("로그인을 먼저 해주세요!");
    return <Redirect to={{ pathname: "/login", state: { from: pathname } }} />;
  }

  if (from) {
    localStorage.removeItem("from");
  }

  return (
    <>
      <BackImage>
        {is_loading === true && <Spinner />}
        <Container>
          <HeadBox>
            <span>채팅</span>
          </HeadBox>
          <div>
            {rooms.length === 0 && is_loading === false && (
              <NoChatImage>
                <img
                  src="https://velog.velcdn.com/images/tty5799/post/5004946d-e4ad-4c5d-8855-67107d89ce05/image.png"
                  alt="noChatImg"
                />
              </NoChatImage>
            )}

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
        <Footer />
      </BackImage>
      <Link />
    </>
  );
};

const NoChatImage = styled.div`
  display: flex;
  margin-top: 25%;

  img {
    margin: 0 auto;
  }
`;

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
  width: 1000px;
  height: 807px;
  margin: 5% auto;
`;

const BackImage = styled.div`
  background-image: url("https://velog.velcdn.com/images/tty5799/post/1e685506-98e9-4c90-b688-43cb86e933a8/image.png");
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export default Chatting;
