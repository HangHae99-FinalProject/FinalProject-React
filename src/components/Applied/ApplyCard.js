import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import rr from "../../assets/image 35.png";
import Grid from "../../elements/Grid";
import { actionCreates as applyActions } from "../../redux/modules/apply";
import { actionCreators as chatActions } from "../../redux/modules/chat";

import amateurCap from "../../assets/ama.svg";
import juniorCap from "../../assets/jr.svg";
import proCap from "../../assets/pro.svg";
import { history } from "../../redux/configureStore";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const ApplyCard = (props) => {
  const dispatch = useDispatch();

  var likeRatio = (props.likeCount / 100) * (100 / props.projectCount) * 100;
  if (isNaN(likeRatio)) {
    likeRatio = 0;
  }

  var evaluationRatio = null;

  if (likeRatio <= 40) {
    evaluationRatio = `${Math.ceil(likeRatio)}% 만족!`;
  } else if (41 <= likeRatio <= 70) {
    evaluationRatio = `${Math.ceil(likeRatio)}% 만족!`;
  } else if (71 <= likeRatio <= 100) {
    evaluationRatio = `${Math.ceil(likeRatio)}% 만족!`;
  }

  var evaluationLevel = null;

  if (likeRatio <= 40) {
    evaluationLevel = "아마추어 선장러";
  } else if (71 <= likeRatio) {
    evaluationLevel = "프로 선장러";
  } else {
    evaluationLevel = "주니어 선장러";
  }

  const addRoomData = {
    toUserId: props.userId,
    postId: props.id,
  };
  const acceptedDto = {
    userId: props.userId,
    postId: props.id,
  };

  const handleUserPage = () => {
    history.push(`/user/${props.userId}`);
  };

  const requestHandelBtn = () => {
    if (window.confirm("신청하신 선장님과 충분한 대화를 나누셨나요?")) {
      alert("수락하셨습니다!");
    } else {
      alert("취소하셨습니다!");
      return;
    }
    dispatch(applyActions.__postRequest(acceptedDto));
  };

  const rejectHandelBtn = () => {
    if (window.confirm("거절 하시겠습니까?")) {
      alert("거절하셨습니다!");
    } else {
      alert("취소되었습니다!");
      return;
    }
    dispatch(applyActions.__postReject(acceptedDto));
  };

  const chatHandelBtn = () => {
    for (let i = 0; i < props.roomUserId.length; i++) {
      console.log(props.roomUserId[i]);
      if (props.userId === props.roomUserId[i]) {
        console.log(i);
        alert("이미 채팅방이 존재 합니다!");
        return;
      }
    }
    dispatch(chatActions.__addRoom(addRoomData));
  };

  return (
    <>
      <Container>
        <Profile>
          <img
            className="profile"
            src={props.profileImg}
            alt="profile"
            onClick={handleUserPage}
          />
          <div className="cardTitle">
            <p style={{ fontSize: "23px", fontWeight: "700" }}>
              {props.nickname}
            </p>

            <div className="ratingBox">
              <div className="help-tip">
                <p>현재까지 협업횟수는 {props.projectCount}입니다.</p>
                {likeRatio <= 40 ? (
                  <img src={amateurCap} alt="amateurCap" />
                ) : 71 <= likeRatio ? (
                  <img src={proCap} alt="proCap" />
                ) : (
                  <img src={juniorCap} alt="juniorCap" />
                )}
              </div>
              &nbsp;&nbsp;
              <span className="rating">{evaluationRatio}</span>
              &nbsp;
              <span className="rating">{evaluationLevel}</span>
            </div>
          </div>
        </Profile>
        <MidBtnBox>
          <Grid
            _className="majorName"
            bg={
              props.applyMajor === "디자인"
                ? "#2967AC"
                : props.applyMajor === "음향"
                ? "#FFB673"
                : props.applyMajor === "영상"
                ? "#6AD8F5"
                : props.applyMajor === "배우"
                ? "#F58467"
                : props.applyMajor === "프로그래밍"
                ? "#5BC8D2"
                : props.applyMajor === "모델"
                ? "#FE674C"
                : props.applyMajor === "사진"
                ? "#4299E9"
                : props.applyMajor === "성우"
                ? "#FFD082"
                : null
            }
          >
            <p>{props.applyMajor}</p>
          </Grid>
        </MidBtnBox>
        <CommentBox>
          <span>{props.message}</span>
        </CommentBox>
        <BottomBtn>
          <span className="okButton" onClick={requestHandelBtn}>
            수락
          </span>
          <span className="chatButton" onClick={chatHandelBtn}>
            체팅
          </span>
          <span className="noButton" onClick={rejectHandelBtn}>
            거절
          </span>
        </BottomBtn>
      </Container>
    </>
  );
};

const RatingImg = styled.img`
  width: 22px;
  margin-right: 2%;
`;

const BottomBtn = styled.div`
  display: flex;
  margin-top: 7%;
  align-items: center;
  margin-right: 2%;
  margin-bottom: 3%;
  .okButton {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 40px;
    margin-left: 10px;
    background: #4299e9;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 14px;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
  }
  .chatButton {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 40px;
    margin-left: 10px;
    background: #ffd082;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 14px;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
  }
  .noButton {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 40px;
    margin-left: 10px;
    background: #fe5953;
    border: none;
    border-radius: 14px;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
  }
`;

const CommentBox = styled.div`
  width: 379px;
  height: 149px;
  margin: 8% auto 0 auto;
  background: #f5fcff;
  border: 1px solid #c2c0c1;
  border-radius: 14px;
  justify-content: center;
  align-items: center;

  display: flex;
  span {
    font-size: 20px;
  }
`;

const MidBtnBox = styled.div`
  margin-top: 40%;

  .majorName {
    margin-left: 1rem;
    font-size: 20px;
    font-weight: 700;
    width: 140px;
    height: 50px;

    border-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border: none;
  }
`;

const Profile = styled.div`
  float: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 3% 4%;
  .ratingBox {
    display: flex;
    flex-direction: row;
    width: 270px;
    align-items: center;
    margin-top: -4%;
    .help-tip {
    }

    .help-tip:hover p {
      display: block;

      transform-origin: 100% 0%;

      -webkit-animation: fadeIn 0.3s ease-in-out;

      animation: fadeIn 0.3s ease-in-out;
    }

    .help-tip p {
      display: none;
      text-align: center;
      background-color: #f5f5f9;
      padding: 10px;
      max-width: 220px;
      position: absolute;
      left: 20%;
      top: 58%;
      color: rgba(0, 0, 0, 0.87);
      font-size: 12px;
      font-weight: bold;
      line-height: 1.4;
    }

    @-webkit-keyframes fadeIn {
      0% {
        opacity: 0;

        transform: scale(0.6);
      }

      100% {
        opacity: 100%;

        transform: scale(1);
      }
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 100%;
      }
    }
  }
  .cardTitle {
    display: flex;
    flex-direction: column;
    margin: 0 4%;
  }
  .rating {
    display: flex;
  }
  .profile {
    cursor: pointer;
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    border: 0.5px solid #818181;
  }
  p {
    display: flex;
    margin-left: 0.5rem;
    font-size: 16px;
    text-align: center;
    margin-top: 0px;
    width: 10rem;
  }
`;

const Container = styled.div`
  width: 399px;
  display: inline-block;
  margin-left: 2.5%;
  border: 1px solid #c2c0c1;
  border-radius: 14px;
  margin-right: 1%;
  margin-top: 3%;
`;

export default ApplyCard;
