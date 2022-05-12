import * as React from "react";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import dd from "../../assets/image 35.png";
import styled from "styled-components";
import Grid from "../../elements/Grid";
import { history } from "../../redux/configureStore";

const MainCard = (item) => {
  const postId = item.item.postId;

  const majorName = item.item.majorList;
  const major = majorName.map((a) => a.majorName);
  const majorCnt = major.length;

  const created = item.item.createdAt;
  const setCreatedAt = created.split(" ");
  const createdAt = setCreatedAt[0];

  return (
    <Container
      onClick={() => {
        history.push(`/detail/${postId}`);
      }}
    >
      {item.item.imgUrl.length !== 0 ? (
        <MainImage src={item.item.imgUrl[0].imgUrl} alt="mainImage" />
      ) : (
        <MainImage src={dd} alt="defaultImg" />
      )}

      <TitleBox>
        <span>{item.item.title}</span>
      </TitleBox>
      <MidBox>
        <DateBox>
          <span>
            {item.item.region} ㅣ {item.item.deadline} 예상
          </span>
        </DateBox>
      </MidBox>
      <CreateAtBox>
        <span>
          {createdAt} ㅣ {item.item.nickname}
        </span>
        <div>
          <ButtonBox>
            <Grid
              _className={"majorName"}
              bg={
                major[0] === "미술/디자인"
                  ? "#2967AC"
                  : major[0] === "음향"
                  ? "#FFEF62"
                  : major[0] === "영상"
                  ? "#6AD8F5"
                  : major[0] === "배우"
                  ? "#F58467"
                  : major[0] === "프로그래밍"
                  ? "#5BC8D2"
                  : major[0] === "모델"
                  ? "#FE674C"
                  : major[0] === "사진"
                  ? "#4299E9"
                  : major[0] === "성우"
                  ? "#FFD082"
                  : "#f5fcff"
              }
            >
              <p style={{ fontSize: "14px" }}>{major[0]}</p>
            </Grid>
            <Grid _className={"PeopleCnt"}>
              <p style={{ fontSize: "14px" }}>+{majorCnt}</p>
            </Grid>
          </ButtonBox>
        </div>
      </CreateAtBox>
    </Container>
  );
};
const ButtonBox = styled.div`
  margin-top: -5px;
  margin-left: 22px;
  display: flex;

  flex-direction: row;
  justify-content: center;
  align-items: center;
  .majorName {
    margin-right: 5px;
    min-width: 80px;
    width: auto;
    height: 34px;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .PeopleCnt {
    width: 45px;
    height: 34px;
    background-color: #b9daf6;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
`;

const CreateAtBox = styled.div`
  margin-left: 20px;
  display: flex;

  span {
    margin-top: 10px;
    margin-right: 5px;
    font-size: 14px;
    color: #2967ac;
    font-weight: 500;
  }
`;

const MidBox = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 20px;
`;

const DateBox = styled.div`
  span {
    font-size: 16px;
    font-weight: 500;
    color: #2967ac;
  }
`;

const TitleBox = styled.div`
  display: flex;
  margin: 20px 0 0 15px;
  span {
    font-weight: 700;
    font-size: 22px;
  }
`;

const Container = styled.div`
  height: 430px;
  width: 292px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 35px 30px 10px 20px;

  float: left;
  overflow: scroll;
  overflow-x: hidden;
  cursor: pointer;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-thumb {
    height: 100%;
    background: black;
    border-radius: 50px;
  }

  :hover {
  }
  animation: 0.6s ease-in-out loadEffect3;
  .icon {
    color: #fff;
    font-size: 32px;
  }
  p {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    color: #f5fcff;
  }
  @keyframes loadEffect3 {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    65% {
      opacity: 0.65;
      transform: scale(1.01);
    }
    85% {
      opacity: 0.85;
      transform: scale(0.97);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const MainImage = styled.img`
  height: 260px;
  width: 304px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default MainCard;
