import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as commentActions } from "../../redux/modules/comment";
import { history } from "../../redux/configureStore";
const CommentList = (props) => {
  const dispatch = useDispatch();
  const created = props.createdAt;
  const createdAt = created?.split(" ")[0];
  const localNickName = localStorage.getItem("nickname");

  const [is_comment, setIs_comment] = useState("");
  const [is_open, setIs_open] = useState(false);

  const userNickName = localNickName === props.nickname ? true : false;

  const handleUserPage = () => {
    if (!localNickName) {
      alert("로그인을 먼저 해주세요!");
      history.push("/login");
      return;
    }
    history.push(`/user/${props.userId}`);
  };
  const editComment = () => {
    setIs_open(!is_open);
    setIs_comment(props.comment);
  };

  const deleteComment = () => {
    dispatch(commentActions.__deleteComment(props.commentId));
  };

  const handleCommentEdit = (e) => {
    setIs_comment(e.target.value);
  };

  const editEndButton = () => {
    if (is_comment === "") {
      alert("공란 입니다!");
      return;
    }
    setIs_open(!is_open);
    dispatch(commentActions.__editComment(props.commentId, is_comment));
  };

  const handleEvent = (e) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key !== "Enter") {
      return;
    }
    editEndButton();
  };

  return (
    <>
      <div className="comment">
        <Comments>
          <img
            src={props.profileImg}
            alt="profile"
            onClick={handleUserPage}
            style={{ cursor: "pointer" }}
          />
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
            {userNickName ? (
              <>
                <Btn1 onClick={editComment}>수정</Btn1>
                <Btn2 onClick={deleteComment}>삭제</Btn2>
              </>
            ) : null}
          </HeadBtnBox>
        </Comments>
        {is_open ? (
          <EditInput>
            <input
              value={is_comment}
              onChange={handleCommentEdit}
              onKeyDown={handleEvent}
            />
            <span onClick={editEndButton}>완료</span>
          </EditInput>
        ) : (
          <>
            <p className="comments">{props.comment}</p>
          </>
        )}
      </div>
    </>
  );
};

const EditInput = styled.div`
  span {
    margin-left: -2.5rem;
    color: rgba(155, 151, 152, 1);
    cursor: pointer;
  }
  input {
    margin-left: 4rem;
    height: 2.5rem;
    width: 40rem;
    font-size: 22px;
    font-weight: 400;
    border-radius: 10px;
    border: 1px solid #9b9798;
    padding: 5px 15px 5px 15px;
    :focus {
      outline-color: gray;
    }
  }
`;

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
