import React, { useState } from "react";
import styled from "styled-components";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import { history } from "../../redux/configureStore";

const Comment = (userId) => {
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment);
  const isLogin = useSelector((state) => state.user.isLogin);
  const param = useParams();

  const commentCnt = commentList.commentList?.length;

  const [is_comment, setIs_comment] = useState("");

  const addComment = () => {
    if (!isLogin) {
      alert("로그인을 먼저 해주세요!");
      history.push("/login");
      return;
    }
    if (is_comment === "") {
      alert("공란 입니다!");
      return;
    }
    dispatch(commentActions.__addComment(param.postid, is_comment));

    setIs_comment("");
  };

  const handleEvent = (e) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key !== "Enter") {
      return;
    }
    addComment();
  };

  const handleComment = (e) => {
    setIs_comment(e.target.value);
  };

  return (
    <>
      <CommentBox>
        <div className="commentHead">
          <TextsmsOutlinedIcon />
          <p style={{ marginRight: "78rem" }}>댓글 {commentCnt}</p>
        </div>
        <div className="line" />
        <CommentListBox>
          <CommentScroll>
            {commentList.commentList.map((a, idx) => {
              return <CommentList {...a} key={idx} />;
            })}
          </CommentScroll>
        </CommentListBox>

        <div className="commentInput">
          <input
            type="text"
            placeholder="댓글을 남겨보세요!"
            value={is_comment || ""}
            onChange={handleComment}
            onKeyDown={handleEvent}
            maxLength={80}
          />
          <div className="commentAddBtn" onClick={addComment}>
            <span>등록</span>
          </div>
        </div>
      </CommentBox>
    </>
  );
};

const CommentListBox = styled.div`
  height: 330px;
`;

const CommentScroll = styled.div`
  height: 315px;

  overflow: auto;

  -ms-overflow-style: {
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2967ac;
    width: 10px;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-track {
    width: 10px;
  }

  &::-webkit-scrollbar {
    border-radius: 20px;
    background-color: #b9daf6;
    width: 10px;
  }
`;

const CommentBox = styled.div`
  .commentHead {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    p {
      margin-left: 0.5rem;
      font-size: 15px;
    }
  }
  .line {
    border-bottom: 1px solid #c4c4c4;
    margin-bottom: 1rem;
  }
  .comment {
    margin-left: 1rem;
    margin-top: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid gray;
  }
  .comments {
    margin-top: 5px;
    margin-bottom: 20px;
    margin-left: 3rem;
    font-size: 16px;
    font-weight: 400;

    justify-content: center;
  }

  .commentInput {
    display: flex;
    .commentAddBtn {
      margin-left: 10px;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 80px;
      height: 72px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background-color: #2967ac;
      span {
        font-size: 16px;
        color: #fff;
      }
    }
    input {
      display: flex;
      width: 1270px;
      height: 72px;
      border: 1px solid #9b9798;
      border-radius: 10px;
      padding: 0px 0px 0px 15px;
      font-size: 16px;
      margin-bottom: 4rem;
      background: #f5fcff;
      :focus {
        outline-color: gray;
      }
      ::placeholder {
        color: #c2c0c1;
        font-size: 16px;
      }
    }
  }
`;
export default Comment;
