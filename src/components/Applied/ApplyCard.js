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
const ApplyCard = (props) => {
  const dispatch = useDispatch();

  var likeRatio = (props?.likePoint / 100) * (100 / props?.projectCount) * 100;
  if (isNaN(likeRatio)) {
    likeRatio = 0;
  }

  var evaluationGrade = null;

  if (likeRatio <= 40) {
    evaluationGrade = `${likeRatio}% 만족! 아마추어 선장러`;
  } else if (41 <= likeRatio <= 70) {
    evaluationGrade = `${likeRatio}% 만족! 주니어 선장러`;
  } else if (71 <= likeRatio <= 100) {
    evaluationGrade = `${likeRatio}% 만족! 프로 선장러`;
  }

  const addRoomData = {
    toUserId: props.userId,
    postId: props.id,
  };
  const acceptedDto = {
    userId: props.userId,
    postId: props.id,
  };

  const requestHandelBtn = () => {
    dispatch(applyActions.__postRequest(acceptedDto));
  };

  const rejectHandelBtn = () => {
    dispatch(applyActions.__postReject(acceptedDto));
  };

  const chatHandelBtn = () => {
    dispatch(chatActions.__addRoom(addRoomData));
  };

  return (
    <>
      <Container>
        <Profile>
          <img className="profile" src={props.profileImg} alt="profile" />
          <div className="cardTitle">
            <p style={{ fontSize: "23px", fontWeight: "700" }}>
              {props.nickname}
            </p>
            <div className="ratingBox">
              {likeRatio <= 40 ? (
                <RatingImg src={amateurCap} alt="amateurCap" />
              ) : 41 <= likeRatio <= 70 ? (
                <RatingImg src={juniorCap} alt="juniorCap" />
              ) : (
                <RatingImg src={proCap} alt="proCap" />
              )}
              <span className="rating">{evaluationGrade}</span>
            </div>
          </div>
        </Profile>
        <MidBtnBox>
          <Grid
            _className="majorName"
            bg={
              props.applyMajor === "미술/디자인"
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
