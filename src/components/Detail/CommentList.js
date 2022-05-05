import React from "react";
import styled from "styled-components";

const CommentList = (props) => {
  const created = props.createdAt;
  const createdAt = created?.split(" ")[0];

  return (
    <>
      <div className="comment">
        <Comments>
          <img src={props.profileImg} alt="profile" />
          <p className="name">{props.nickname}</p>

          <p
            style={{
              fontSize: "13px",
              marginTop: "1.3rem",
              marginLeft: "0.7rem",
            }}
          >
            {createdAt}
          </p>
          <HeadBtnBox>
            <Btn1>수정</Btn1>
            <Btn2>삭제</Btn2>
          </HeadBtnBox>
        </Comments>
      </div>
      <p className="comments">{props.comment}</p>
    </>
  );
};

const HeadBtnBox = styled.div`
  margin-left: 61rem;
  margin-top: 1rem;
`;
const Btn1 = styled.button`
  cursor: pointer;
  width: 50px;
  height: 40px;
  margin-left: 10px;
  background: transparent;
  border: none;
  border-radius: 14px;
  color: gray;
  font-size: 16px;
  font-weight: 700;
`;

const Btn2 = styled.button`
  cursor: pointer;
  width: 50px;
  height: 40px;
  margin-left: 10px;
  background: transparent;
  border: none;
  border-radius: 14px;
  color: gray;
  font-size: 16px;
  font-weight: 700;
`;

const Comments = styled.div`
  display: flex;
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid black;
  }
  .name {
    font-size: 18px;

    margin-top: 1rem;
    margin-left: 1rem;
  }
`;

export default CommentList;
