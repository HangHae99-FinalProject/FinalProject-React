import React, { useState } from "react";
import styled from "styled-components";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import rr from "../../assets/image 35.png";
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

        <CommentScroll>
          {commentList.commentList.map((a, idx) => {
            return <CommentList {...a} key={idx} />;
          })}
        </CommentScroll>

        <div className="commentInput">
          <input
            type="text"
            placeholder="댓글을 남겨보세요!"
            value={is_comment || ""}
            onChange={handleComment}
            onKeyDown={handleEvent}
          />

          <span onClick={addComment}>입력</span>
        </div>
      </CommentBox>
    </>
  );
};

const CommentScroll = styled.div`
  height: 300px;
  overflow: auto;

  .icon {
    display: flex;
    margin-left: 68rem;
    margin-top: 1rem;
    font-size: large;

    cursor: pointer;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
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
    font-size: 18px;
    font-weight: 400;
    height: 60px;
    margin-top: 2rem;
  }
  .comments {
    margin-top: -0.5rem;
    margin-left: 4rem;
    font-size: 22px;
    font-weight: 400;

    justify-content: center;
  }
  .commentInput {
    span {
      cursor: pointer;
      margin-left: -5rem;
      font-size: 22px;
      color: rgba(155, 151, 152, 1);
    }
    input {
      width: 98%;
      height: 4rem;
      border: 1px solid #9b9798;
      border-radius: 10px;
      padding: 5px 15px 5px 15px;
      font-size: 22px;
      margin-bottom: 4rem;
      :focus {
        outline-color: gray;
      }
    }
  }
`;
export default Comment;
