import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as commentActions } from "../../redux/modules/comment";
import { history } from "../../redux/configureStore";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const [is_createdAt, setIS_createdAt] = useState("");

  const localNickName = localStorage.getItem("nickname");

  const [is_comment, setIs_comment] = useState("");
  const [is_open, setIs_open] = useState(false);

  const userNickName = localNickName === props.nickname ? true : false;
  const isLogin = useSelector((state) => state.user.isLogin);

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

  useEffect(() => {
    const created = props.createdAt;
    const createdTime = new Date(created);
    const today = new Date();

    const createdYear = createdTime.getFullYear();
    const createdMonth = createdTime.getMonth() + 1;
    const createdDate = createdTime.getDate();

    const createdDay = createdYear + "-" + createdMonth + "-" + createdDate;

    const createdAtTime = Math.floor(
      (today.getTime() - createdTime.getTime()) / 1000 / 60
    );

    if (createdAtTime < 1) return setIS_createdAt("방금전");

    if (createdAtTime < 60) {
      return setIS_createdAt(`${createdAtTime}분전`);
    }
    const createdAtTimeHour = Math.floor(createdAtTime / 60);

    if (createdAtTimeHour < 24) {
      return setIS_createdAt(`${createdAtTimeHour}시간전`);
    }
    const createdAtTimeDay = Math.floor(createdAtTime / 60 / 24);
    if (createdAtTimeDay < 365) {
      return setIS_createdAt(createdDay);
    }
  }, []);

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

          <p className="created">{is_createdAt}</p>
          <div className="headBtnBox">
            {userNickName ? (
              <>
                <div className="modifyBtn" onClick={editComment}>
                  수정
                </div>
                <div className="deleteBtn" onClick={deleteComment}>
                  삭제
                </div>
              </>
            ) : null}
          </div>
        </Comments>
        {is_open ? (
          <EditInput>
            <input
              value={is_comment}
              onChange={handleCommentEdit}
              onKeyDown={handleEvent}
              maxLength={70}
            />
            <div className="completeBtn">
              <span onClick={editEndButton}>완료</span>
            </div>
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
  display: flex;

  .completeBtn {
    margin-left: 5px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 2rem;
    width: 40px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: #2967ac;
    span {
      font-size: 14px;
      color: #fff;
    }
  }
  input {
    position: relative;
    margin-left: 4rem;
    margin-bottom: 20px;
    height: 2rem;
    width: 800px;
    font-size: 16px;
    font-weight: 400;
    border-radius: 10px;
    border: 1px solid #9b9798;
    padding: 5px 15px 5px 15px;
    :focus {
      outline-color: gray;
    }
  }
`;

const Comments = styled.div`
  display: flex;
  width: 100%;
  position: relative;

  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid black;
  }
  .created {
    font-size: 12px;
    display: flex;
    align-items: center;
    margin-top: 15px;
    margin-left: 10px;
  }
  .headBtnBox {
    position: absolute;
    left: 92%;
    top: 35%;
    display: flex;
  }
  .modifyBtn {
    cursor: pointer;

    background: transparent;
    border: none;
    border-radius: 14px;
    color: #9b9798;
    font-size: 16px;
    font-weight: 500;
  }
  .deleteBtn {
    cursor: pointer;
    margin-left: 20px;
    background: transparent;
    border: none;
    border-radius: 14px;
    color: #9b9798;
    font-size: 16px;
    font-weight: 500;
  }
  .name {
    font-size: 14px;

    margin-top: 1rem;
    margin-left: 10px;
  }
`;

export default CommentList;
