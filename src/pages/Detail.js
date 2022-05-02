import React from "react";
import Grid from "../elements/Grid";
import styled from "styled-components";
import rr from "../assets/image 35.png";

import DetailImage from "../components/Detail/DetailImage";
import Input from "../elements/Input";

const Detail = () => {
  return (
    <>
      <Profile>
        <div style={{ margin: "auto", width: "130px", height: "130px" }}>
          <img src={rr} alt="profile" />
        </div>
        <p>안녕하세영</p>
      </Profile>

      <Grid margin="5% 0 0 -5%">
        <TitleBox>
          <span>이곳은 아마 제목이 될겁니다</span>
          <Grid width="20%" is_flex>
            <BtnTest>신청하기</BtnTest>
            <BtnTest>스크랩</BtnTest>
          </Grid>
        </TitleBox>

        <DateBox>
          <h5>2022.04.30 ~ 2022.05.05(6이일간)</h5>
        </DateBox>
        <ContentBox>
          <span>
            여기부터는 내용이 들어갈겁니다 이게 내여ㅛㅇㅇ이
            걘ㅇ라넝라ㅣㅜㄴ어뤄누러ㅏ눔러ㅏㅜㄴ머ㅏㅇ뤄ㅏㄴ우러ㅏㅁ누러ㅏㅜ너ㅏ루너ㅏㅣ무러ㅏ눔ㅇ러ㅏㅜ너ㅏ룸너ㅏㅣ뤄ㅏㅁ누라누마룬어ㅏ루ㅏㅁ눠ㅏ룬아루머ㅏㅇ뤄ㅏㄴ우러ㅏㅣ누마뤄ㅏㅁㄴ
          </span>
        </ContentBox>
        <DetailImage />
        <Comment>
          <span>댓글 2</span>
        </Comment>

        <CommentBox>
          <img src={rr} alt="profile" />
          <p className="name">유저이름</p>
          <p className="comment">나는 여기다 댓글을 달겁니다</p>
        </CommentBox>
        <CommentBox>
          <img src={rr} alt="profile" />
          <p className="name">유저이름</p>
          <p className="comment">나는 여기다 댓글을 달겁니다</p>
        </CommentBox>
        <BtnBox>
          <BtnTest>마감</BtnTest>
          <BtnTest style={{ marginRight: "4.5%" }}>몰루?</BtnTest>

          <InputBox placeholder="댓글을 입력하세요!" />
        </BtnBox>
      </Grid>
    </>
  );
};

const BtnBox = styled.div`
  margin-top: 3%;
  display: flex;
  width: 90%;
  margin-left: 10%;
`;

const InputBox = styled.input`
  border: 1px solid #c4c4c4;
  border-radius: 15px;
  margin-bottom: 5%;
  padding: 5px 16px 5px 16px;

  width: 80%;
  height: 40px;
  font-size: 16px;
`;

const CommentBox = styled.div`
  height: 45px;
  margin-top: 2%;
  display: flex;
  padding-bottom: 15px;
  border-bottom: 1px solid #c4c4c4;

  img {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid black;
  }
  .name {
    margin: 0 0 0 15px;
    font-size: 13px;
  }
  .comment {
    margin-left: -45px;
    font-size: 18px;
  }
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2%;
  padding-bottom: 15px;
  border-bottom: 1px solid #c4c4c4;

  span {
    font-size: 14px;
  }
`;
const ContentBox = styled.div`
  margin-bottom: 5%;
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5%;
  h5 {
    margin-top: 6px;
    color: gray;
  }
  /* margin-left: 30%; */
`;

const TitleBox = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;

  border-bottom: 1px solid #c4c4c4;
  span {
    font-size: 20px;
  }
`;

const BtnTest = styled.button`
  cursor: pointer;
  width: 100px;
  height: 35px;
  margin-left: 10px;
  background: #cecece;
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`;

const Profile = styled.div`
  margin-top: 5%;
  float: left;
  height: 100vh;
  width: 25%;
  img {
    width: 130px;
    height: 130px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid black;
  }
  p {
    font-size: 20px;
    text-align: center;
  }
`;

export default Detail;
