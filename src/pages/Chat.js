import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { chatApi } from "../api/chatApi";
import MyChat from "../components/Chat/MyChat";
import NotMyChat from "../components/Chat/NotMyChat";
import Grid from "../elements/Grid";

import { history } from "../redux/configureStore";
import { IoPaperPlane } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";

import { actionCreators as chatActions } from "../redux/modules/chat";
import Spinner from "../components/Spinner";

const Chat = (data) => {
  console.log(data);
  const dispatch = useDispatch();
  const client = useSelector((state) => state.chat.client);
  console.log(client);
  const nickName = localStorage.getItem("nickname");
  const myUserId = localStorage.getItem("userId");

  const [optionTwo, setOptionTwo] = useState(false);
  const [optionThree, setOptionThree] = useState(false);
  const [is_open, setIs_open] = useState(false);

  const [currentMes, setCurrentMes] = useState("");
  const [active, setActive] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [is_exit, setIs_exit] = useState(false); // 상대방 나갔는지 판단
  const [is_loading, setIs_Loading] = useState(false); // 스피너
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
  useEffect(() => {
    // stompConnect();
    chatApi
      .roadMessage(roadMessageBox)
      .then((res) => {
        console.log(res);
        setMessageList(res.data.message);
        setIs_Loading(true);
        // client.unsubscribe(`/sub/${myUserId}`);
      })
      .catch((err) => {
        console.log(err);
      });
    client.send("/pub/join", {}, JSON.stringify(`${roomName}`));
    client.subscribe(`/sub/${roomName}`, (data) => {
      const onMessage = JSON.parse(data.body);
      setMessageList((messageList) => messageList.concat(onMessage));

      if (onMessage.type === "EXIT") {
        setActive(true);
        setIs_exit(true);
      }
    });
    return () => {
      client.unsubscribe(`/sub/${roomName}`);
    };
  }, []);

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

  const sendMessage = () => {
    const messageDto = {
      type: "TALK",
      message: currentMes,
      roomName: roomName,
      senderId: myUserId,
      receiverId: receiverId,
    };
    if (currentMes === "") {
      return;
    } else if (active === true) {
      return;
    }
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

  const OptionTwoControl = () => {
    setOptionThree(false);
    if (optionTwo) {
      setOptionTwo(false);
    } else {
      setOptionTwo(true);
    }
  };

  const OptionThreeControl = () => {
    setOptionTwo(false);
    if (optionThree) {
      setOptionThree(false);
    } else {
      setOptionThree(true);
    }
  };

  const ModalControl = () => {
    if (is_open) {
      setIs_open(false);
      document.body.style.cssText = `
      position: none; 
      overflow-y: none;
      width: 100%;
      `;
    } else {
      setIs_open(true);
      document.body.style.cssText = `
      position: fixed; 
      overflow-y: scroll;
      width: 100%;
      `;
    }
  };

  return (
    <BackImage>
      <Container>
        <Grid is_container _className="border-background">
          {is_loading === false && <Spinner />}
          <div className="chatting-wrap">
            <div className="chatting-header">
              <div className="chatting-header-wrap">
                <div className="arrow-back">
                  <IoIosArrowBack
                    fontSize="xx-large"
                    style={{
                      marginLeft: "6px",
                    }}
                    onClick={() => {
                      history.goBack();
                    }}
                  />
                </div>
                <p className="header-title">
                  {data.location.state.sender.nickname}님과 대화
                </p>
                {/* <Grid _className="ct-wrap"> */}
                <BiDotsVerticalRounded
                  onClick={ModalControl}
                  style={{
                    width: "25px",
                    height: "25px",
                    marginRight: "12px",
                  }}
                  className="point-icon"
                />
                {/* </Grid> */}
              </div>
              {is_open && (
                <>
                  <div className="modal-back"></div>
                  <Grid _className="drop-chat">
                    <p className="unactive" onClick={roomOut}>
                      채팅방 나가기
                    </p>

                    <p
                      className="unactive"
                      onClick={() => {
                        ModalControl();
                        OptionTwoControl();
                      }}
                    >
                      신고하기
                    </p>

                    <p
                      className="unactive"
                      onClick={() => {
                        ModalControl();
                        OptionThreeControl();
                      }}
                    >
                      차단하기
                    </p>
                  </Grid>
                </>
              )}
            </div>
          </div>
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
        </Grid>
      </Container>
    </BackImage>
  );
};

const Container = styled.div`
  margin: 0 auto;
  width: 1000px;
  height: 807px;

  .border-background {
    background-color: #2967ac;
  }
  .chatting-wrap {
    .chatting-header {
      width: 100%;
      max-width: 1000px;
      height: 64px;
      background-color: white;
      box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
      /* position: fixed; */
      top: 0;
      z-index: 10;

      .chatting-header-wrap {
        height: 50px;
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .header-title {
          font-size: 24px;
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

      .drop-chat {
        height: 179px;
        width: 158px;
        /* border-radius: 12px; */
        background-color: white;
        position: absolute;
        top: -8%;
        left: 71.9%;
        transform: translate(-50%, 110%);
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: space-evenly;
        align-items: center;
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
        cursor: pointer;
        .unactive {
          /* padding: 8px 8px; */
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
  }
`;

const ChatBox = styled.div`
  padding: 0 16px;
  height: 670px;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  .inner-chat-box {
    margin-bottom: 52px;
  }
  .enter-chat-box {
    display: flex;
    justify-content: center;
    margin-top: 12px;
    .enter-chat {
      font-size: 18px;
      color: black;
    }
  }
  .exit-chat-box {
    display: flex;
    justify-content: center;
    margin-top: 5vh;
    .exit-chat {
      font-size: 18px;
      color: black;
    }
  }
  .message {
    margin: 15px 0;
  }
`;

const ChatInput = styled.div`
  width: 972px;
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
    height: 60px;

    input {
      font-size: 20px;
      width: 100%;
      height: 60px;
      border: none;
      border-radius: 4px;
      padding: 0px 10px;
      :focus {
        outline: none;
        outline-color: none;
      }
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
      /* margin: 0 0 4px 8px; */
      color: black;
      cursor: pointer;
    }
  }
`;

const BackImage = styled.div`
  background-image: url("https://velog.velcdn.com/images/tty5799/post/1e685506-98e9-4c90-b688-43cb86e933a8/image.png");
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export default Chat;
