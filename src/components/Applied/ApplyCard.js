import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import rr from "../../assets/image 35.png";
import Grid from "../../elements/Grid";
import { actionCreates as applyActions } from "../../redux/modules/apply";

const ApplyCard = (props) => {
  const dispatch = useDispatch();
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

  return (
    <Container>
      <Profile>
        <img src={props.post.profileImg} alt="profile" />
        <div style={{ margin: "0 4%" }}>
          <p style={{ fontSize: "20px", fontWeight: "700" }}>
            {props.nickname}
          </p>
          <p>70%만족! 주니어 선장러</p>
        </div>
      </Profile>
      <MidBtnBox>
        <Grid
          _className="majorName"
          bg={
            props.applyMajor === "미술/디자인"
              ? "#2967AC"
              : props.applyMajor === "음향"
              ? "#FFEF62"
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
        <span className="chatButton">체팅</span>
        <span className="noButton" onClick={rejectHandelBtn}>
          거절
        </span>
      </BottomBtn>
    </Container>
  );
};

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
  width: 399px;
  display: inline-block;
  margin-left: 2.5%;
  border: 1px solid #c2c0c1;
  border-radius: 14px;
  margin-right: 1%;
  margin-top: 3%;
`;

export default ApplyCard;
