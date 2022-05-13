import React from "react";
import styled from "styled-components";
import rr from "../../assets/image 35.png";
import Grid from "../../elements/Grid";

import amateurCap from "../../assets/ama.svg";
import juniorCap from "../../assets/jr.svg";
import proCap from "../../assets/pro.svg";

const AppliedCard = (item) => {
  var likeRatio = (item?.likePoint / 100) * (100 / item?.projectCount) * 100;
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

  return (
    <Container>
      <Profile>
        <img className="profile" src={item.profileImg} alt="profile" />
        <div className="cardTitle">
          <p style={{ fontSize: "23px", fontWeight: "700" }}>{item.nickname}</p>
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
            item.applyMajor === "미술/디자인"
              ? "#2967AC"
              : item.applyMajor === "음향"
              ? "#FFEF62"
              : item.applyMajor === "영상"
              ? "#6AD8F5"
              : item.applyMajor === "배우"
              ? "#F58467"
              : item.applyMajor === "프로그래밍"
              ? "#5BC8D2"
              : item.applyMajor === "모델"
              ? "#FE674C"
              : item.applyMajor === "사진"
              ? "#4299E9"
              : item.applyMajor === "성우"
              ? "#FFD082"
              : null
          }
        >
          <p>{item.applyMajor}</p>
        </Grid>
      </MidBtnBox>
      <CommentBox>
        <span>{item.message}</span>
      </CommentBox>
    </Container>
  );
};

const CommentBox = styled.div`
  width: 379px;
  height: 149px;
  margin: 6% auto 0 auto;
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
  margin-top: 39%;

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

const RatingImg = styled.img`
  width: 22px;
  margin-right: 2%;
`;

const Container = styled.div`
  height: 389px;
  width: 399px;
  display: inline-block;
  margin-left: 2.5%;
  border: 1px solid #c2c0c1;
  border-radius: 14px;
  margin-right: 1%;
  margin-top: 3%;
`;

export default AppliedCard;
