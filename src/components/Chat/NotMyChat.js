import React from "react";
import styled from "styled-components";

const NotMyChat = (props) => {
  return (
    <>
      <NotMineBox>
        <div className="imgBox">
          <img
            src={props.sender.profileImg}
            className="profileImg"
            alt="profileImg"
          ></img>
        </div>
        <p className="messages">{props.data.message}</p>
        <span className="createdAt">{props.data.createdAt}</span>
      </NotMineBox>
    </>
  );
};

const NotMineBox = styled.div`
  display: flex;
  justify-content: start;
  margin: 12px 0px;
  .imgBox {
    display: flex;
    justify-content: center;
    align-items: center;
    .profileImg {
      border-radius: 50%;
      width: 60px;
      height: 60px;
    }
  }

  .messages {
    display: inline-block;
    margin-left: 13px;
    padding: 8px 12px;
    font-size: 20px;
    text-align: left;
    line-height: 24px;
    background-color: #fff;
    border: 1px solid #555555;
    border-radius: 10px;
    border: 1px solid #818181;
    font-size: 20px;
    color: black;
    max-width: 278px;
    word-break: break-all;
  }
  .createdAt {
    font-size: 16px;
    display: flex;
    align-items: flex-end;
    margin-left: 6px;
    color: black;
  }
`;
export default NotMyChat;
