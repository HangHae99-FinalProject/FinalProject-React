import React from "react";
import styled from "styled-components";
import rr from "../../assets/image 35.png";
import Grid from "../../elements/Grid";

const AppliedCard = (item) => {
  const profileImage = localStorage.getItem("profileImgUrl");
  console.log(item);
  return (
    <Container>
      <Profile>
        <img src={profileImage} alt="profile" />
        <div style={{ margin: "0 4%" }}>
          <p style={{ fontSize: "20px", fontWeight: "700" }}>{item.nickname}</p>
          <p>70%만족! 주니어 선장러</p>
        </div>
      </Profile>
      <MidBtnBox>
        <Grid width="0">
          <span className="majorName">{item.applyMajor}</span>
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
    background-color: #b9daf6;
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
  img {
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
    width: 10rem;
  }
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
