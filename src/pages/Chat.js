import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { chatApi } from "../api/chatApi";
import MyChat from "../components/Chat/MyChat";
import NotMyChat from "../components/Chat/NotMyChat";
import Grid from "../elements/Grid";
import { IoPaperPlane } from "react-icons/io5";
import { history } from "../redux/configureStore";
import { actionCreators as chatActions } from "../redux/modules/chat";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
let stompClient = null;
const Chat = (data) => {
  console.log(data);
  const dispatch = useDispatch();
  const client = useSelector((state) => state.chat.client);
  console.log(client);
  const nickName = localStorage.getItem("nickname");
  const myUserId = localStorage.getItem("userId");

  const [currentMes, setCurrentMes] = useState("");
  const [active, setActive] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [is_exit, setIs_exit] = useState(false); // 상대방 나갔는지 판단
  const scrollRef = useRef();

  const receiverId = data.location.state.sender.userId;
  const roomName = data.location.state.roomName;
  const sender = data.location.state.sender;
  const nickNames = {
    senderName: data.location.state.sender.nickname,
    nickName: nickName,
  };
  const roadMessageBox = {
    roomName,
    postId: data.location.state.postId,
    toUserId: receiverId,
    userId: myUserId,
  };

  // const onConnect = () => {

  // };

  // const onError = (err) => {
  //   console.log("Error! : " + err);
  //   console.log(/Lost connection/g.test(err));
  // };
  // const stompConnect = () => {
  //   const sockjs = new SockJS("http://3.34.135.82:8080/webSocket");

  //   stompClient = Stomp.over(sockjs);
  //   console.log(stompClient);
  //   stompClient.connect({}, onConnect, onError);
  // };

  const handleEvent = (e) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key !== "Enter") {
      return;
    }
    sendMessage();
  };

  const _onChange = useCallback((e) => {
    setCurrentMes(e.target.value);
  }, []);

  useEffect(() => {
    // stompConnect();
    chatApi
      .roadMessage(roadMessageBox)
      .then((res) => {
        console.log(res);
        setMessageList(res.data.message);
        // client.unsubscribe(`/sub/${myUserId}`);
      })
      .catch((err) => {
        console.log(err);
      });
    client.send("/pub/join", {}, JSON.stringify(`${roomName}`));
    client.subscribe(`/sub/${roomName}`, (data) => {
      const onMessage = JSON.parse(data.body);
      console.log(onMessage);
      setMessageList((messageList) => messageList.concat(onMessage));
      console.log(messageList);
      if (onMessage.type === "EXIT") {
        setActive(true);
        setIs_exit(true);
      }
    });
    return () => {
      client.unsubscribe(`/sub/${roomName}`);
    };
  }, []);

  const sendMessage = () => {
    const messageDto = {
      type: "TALK",
      message: currentMes,
      roomName: roomName,
      senderId: myUserId,
      receiverId: receiverId,
    };
    // if (currentMes === "") {
    //   return;
    // } else if (active === true) {
    //   return;
    // }

    client.send("/pub/message", {}, JSON.stringify(messageDto));
    setCurrentMes("");
  };

  const roomOut = () => {
    const box = {
      type: "EXIT", //타입
      message: "", //메세지
      roomName: roomName, //채팅방넘버
      senderId: myUserId, // 내 userId
      receiverId: receiverId, // 상대방 userId
    };
    client.send("/pub/message", {}, JSON.stringify(box));
    setCurrentMes("");
    history.replace("/chatlist");
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  useEffect(() => {
    client.connect({}, () => {
      dispatch(chatActions.setStomp(client));
    });
  }, []);

  return (
    <>
      <Container>
        <Grid is_container _className="border-background">
          <div></div>
          <ChatBox ref={scrollRef}>
            <div className="inner-chat-box">
              {messageList?.length === 0 ? (
                <div className="enter-chat-box">
                  <span className="enter-chat">
                    {data.location.state.sender.nickname}님과 {nickName}님이
                    채팅을 시작하였습니다.
                  </span>
                </div>
              ) : (
                ""
              )}
              {messageList?.map((message, idx) => {
                if (parseInt(myUserId) === message.senderId) {
                  return (
                    <MyChat key={idx} nicknames={nickName} data={message} />
                  );
                } else {
                  return (
                    <NotMyChat
                      key={idx}
                      nicknames={nickNames}
                      data={message}
                      sender={sender}
                    />
                  );
                }
              })}
              {is_exit === true ? (
                <div className="exit-chat-box">
                  <span className="exit-chat">
                    {data.location.state.sender.nickname}님이 채팅방을
                    나갔습니다.
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            <ChatInput>
              <Grid _className="input-inner">
                <input
                  type="text"
                  value={currentMes}
                  placeholder="메세지를 입력하세요."
                  onChange={_onChange}
                  onKeyDown={handleEvent}
                />
                <IoPaperPlane
                  className="send-chat-icon"
                  size="30"
                  onClick={sendMessage}
                />
              </Grid>
            </ChatInput>
          </ChatBox>
          <button onClick={roomOut}>삭제</button>
        </Grid>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 0 auto;
  width: 1000px;
  height: 807px;
  .chatting-headBox {
  }
  .border-background {
    background-color: #2967ac;
  }
  /* .chatting-wrap {
    margin-top: -20px;
    .chatting-header {
      width: 100%;
      max-width: 428px;
      height: 50px;
      background-color: white;
      box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
      position: fixed;
      top: 0;
      z-index: 10;

      .chatting-header-wrap {
        height: 50px;
        max-width: 429px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .header-title {
          font-size: 20px;
          font-weight: bold;
          margin-left: 12px;
        }
        .point-icon {
          cursor: pointer;
        }
        .arrow-back {
          width: 30px;
          height: 50px;
          display: flex;
          align-items: center;
          cursor: pointer;
          margin-left: 6px;
        }
      }

      .modal-back {
        position: absolute;
        top: 50px;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.25);
      }
      .drop-chat {
        height: 165px;
        width: 260px;
        border-radius: 12px;
        background-color: white;
        position: absolute;
        top: 300%;
        left: 50%;
        transform: translate(-50%, 110%);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
        cursor: pointer;
        .unactive {
          padding: 8px 8px;
          font-size: 16px;
        }
      }
    }
    .item-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      background-color: #00000005;
      padding: 4px;
    }
  }
  .chat-item {
    margin-top: 50px;
  } */
`;

const ChatBox = styled.div`
  padding: 0 16px;
  height: 682px;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  .inner-chat-box {
    /* margin-bottom: 52px; */
  }
  .enter-chat-box {
    display: flex;
    justify-content: center;
    /* margin-top: 12px; */
    .enter-chat {
      font-size: 14px;
      color: var(--main-color);
    }
  }
  .exit-chat-box {
    display: flex;
    justify-content: center;
    margin-top: 5vh;
    .exit-chat {
      font-size: 14px;
      color: var(--main-color);
    }
  }
  .message {
    margin: 15px 0;
  }
`;

const ChatInput = styled.div`
  width: 1000px;
  position: fixed;
  bottom: 50px;
  padding: 0px 8px 0px 20px;
  margin-left: -16px;
  background-color: white;
  .input-inner {
    display: flex;
    align-items: center;
    width: 100%;
    margin-left: -20px;
    justify-content: space-between;

    input {
      width: 1000px;
      height: 60px;
      border: none;
      border-radius: 4px;
      /* padding: 5px 10px; */
      background-color: #0000000d;
      @media screen and (max-width: 415px) {
        width: 345px;
      }
      @media screen and (max-width: 405px) {
        width: 340px;
      }
      @media screen and (max-width: 390px) {
        width: 320px;
      }
      @media screen and (max-width: 375px) {
        width: 305px;
      }
      @media screen and (max-width: 320px) {
        width: 250px;
      }
    }
    .send-chat-icon {
      margin: 0 0 4px 8px;
      color: var(--main-color);
      cursor: pointer;
    }
  }
`;

export default Chat;
