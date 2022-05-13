import React from "react";
import styled from "styled-components";

const MyChat = (props) => {
  return (
    <React.Fragment>
      <MyChatBox>
        {/* <div className="imgBox">
          <img
            src={props.sender.profileImg}
            className="profileImg"
            alt="profileImg"
          ></img>
        </div> */}
        <div></div>
        <div className="chat-box">
          <span className="createdAt">{props.data.createdAt}</span>
          <p className="messages">{props.data.message}</p>
        </div>
      </MyChatBox>
    </React.Fragment>
  );
};

const MyChatBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 0px;
  .imgBox {
    width: 43px;
    height: 43px;
    border-radius: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff1f1;
    .profileImg {
      width: 35px;
      height: 35px;
    }
  }
  .chat-box {
    display: flex;
  }
  .messages {
    display: inline-block;
    padding: 8px 12px;
    text-align: left;
    line-height: 24px;
    background-color: #fff;
    border: 1px solid #818181;
    border-radius: 10px;
    font-size: 20px;
    color: black;
    max-width: 278px;
    word-break: break-all;
  }
  .createdAt {
    font-size: 16px;
    display: flex;
    align-items: flex-end;
    margin-right: 6px;
    color: black;
  }
`;
export default MyChat;
