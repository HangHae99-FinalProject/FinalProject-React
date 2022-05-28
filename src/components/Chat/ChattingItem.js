import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
// import { getCookie } from "../shared/Cookie";

const ChattingItem = (p) => {
  const stompClient = p.client;
  const myUserId = localStorage.getItem("userId");

  // 부모 컴포넌트인 Chatting.js에서 랜더링 시켜주기 위한 useEffect
  useEffect(() => {
    p.testOne();
  }, [p]);
  const roomData = p.roomData; // Chat.js에 채팅카운트 넘겨주기 위한 props

  const goChat = () => {
    stompClient.subscribe(`/sub/${myUserId}`);
    history.push({
      pathname: `/chat`,
      state: {
        roomName: p.roomData.roomName,
        sender: p.roomData.user,
        postId: p.roomData.postId,
        roomData: roomData,
      },
    });
  };
  return (
    <ChattingWrap>
      <div className="chatting-item-wrap" onClick={goChat}>
        <div className="profile-img">
          <img src={p.roomData.user.profileImg} alt="room img" />
        </div>
        <div className="chat-info">
          <div className="nickname-time-wrap">
            <h1 className="nickname">{p.roomData.user.nickname}</h1>
          </div>
          <span className="content">{p.roomData.lastMessage.content}</span>
        </div>
        <div className="chat-list">
          <span>{p.roomData.lastMessage.createdAt}</span>
          <div
            className={
              p.roomData.notReadingMessageCount ? "chatting-cnt" : "cnt-zero"
            }
          >
            {p.roomData.notReadingMessageCount !== 0
              ? p.roomData.notReadingMessageCount
              : ""}
          </div>
        </div>
      </div>
    </ChattingWrap>
  );
};

export default ChattingItem;

const ChattingWrap = styled.div`
  display: flex;
  padding: 20px;
  max-width: 1000px;
  height: 76px;
  border-bottom: 3px solid #ededed;
  cursor: pointer;
  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    font-size: 16px;
    color: #9b9798;
    margin-top: -10px;
    margin-bottom: 8px;
  }
  .chatting-item-wrap {
    display: flex;
    align-items: center;
    .profile-img {
      width: 60px;
      height: 60px;
      margin-right: 20px;
      border-radius: 50%;
      margin-left: 30px;
      background: rgba(0, 0, 0, 0.2);
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .chat-info {
      width: 90%;
      .nickname-time-wrap {
        display: flex;
        .nickname {
          position: relative;
          font-size: 16px;
          font-weight: 500;
          margin-right: 30rem;
        }
      }
      p {
        font-size: 15px;
      }
    }

    .chat-list {
      /* position: absolute;
      width: 80px;
      right: 27%; */
      width: 150px;
      margin-left: 140px;
      span {
        color: #9b9798;
      }
    }
    .chatting-cnt {
      display: flex;
      justify-content: center;
      align-items: center;

      background: #b9daf7;
      border-radius: 12px;
      width: 22px;
      height: 22px;
      color: #2967ac;
      font-size: 16px;
      font-weight: bold;
      border-radius: 50%;
      text-align: center;
      margin-left: 20px;
    }
    .cnt-zero {
      background-color: #fff;
      width: 22px;
      height: 22px;
    }
  }
`;
