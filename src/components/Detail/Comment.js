import React, { useState } from "react";
import styled from "styled-components";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import rr from "../../assets/image 35.png";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";

const Comment = (id) => {
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment);

  const param = useParams();

  const commentCnt = commentList.commentList?.length;

  const [is_comment, setIs_comment] = useState("");

  const addComment = () => {
    // if (is_comment) {

    // } else {
    //   alert("댓글에 내용이 없습니다!");
    // }
    dispatch(commentActions.__addComment(param.postid, is_comment));
    setIs_comment("");
  };

  const handleEvent = (e) => {
    if (e.key === "Enter") {
      addComment();
    }
  };

  const handleComment = (e) => {
    setIs_comment(e.target.value);
  };

  return (
    <>
      <CommentBox>
        <div className="commentHead">
          <TextsmsOutlinedIcon />
          <p>댓글 {commentCnt}</p>
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
            onKeyUp={handleEvent}
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
    margin-right: 78rem;

    p {
      margin-left: 0.5rem;
      font-size: 15px;
      font-weight: 400;
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
    height: 23px;
  }
  .comments {
    margin-left: 5rem;
    font-size: 23px;
    font-weight: 400;
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
