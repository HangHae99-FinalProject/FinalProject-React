import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import Grid from "../../elements/Grid";
const LandingCard = (item) => {
  const postId = item.postId;

  const majorName = item.majorList;
  const major = majorName.map((a) => a.majorName);
  const majorCnt = major.length;

  const created = item.createdAt;

  return (
    <Container
      onClick={() => {
        history.push(`/detail/${postId}`);
      }}
    >
      {item.imgUrl.length !== 0 ? (
        <MainImage src={item.imgUrl[0].imgUrl} alt="mainImage" />
      ) : (
        <MainImage
          src="https://velog.velcdn.com/images/tty5799/post/3fa2c200-7be0-4b39-bba3-bd9bf3d37f64/image.png"
          alt="defaultImg"
        />
      )}

      <TitleBox>
        <span>{item.title}</span>
      </TitleBox>
      <div>
        <ButtonBox>
          <Grid
            _className={"majorName"}
            bg={
              major[0] === "미술/디자인"
                ? "#2967AC"
                : major[0] === "음향"
                ? "#FFB673"
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

          {majorCnt === 1 ? null : majorCnt === 2 ? (
            <Grid _className={"PeopleCnt"}>
              <p style={{ fontSize: "14px" }}>+{majorCnt - 1}</p>
            </Grid>
          ) : (
            <Grid _className={"PeopleCnt"}>
              <p style={{ fontSize: "14px" }}>+{majorCnt}</p>
            </Grid>
          )}
        </ButtonBox>

        <MidBox>
          <DateBox>
            <span>
              {item.region} ㅣ {item.deadline} 예상
            </span>
          </DateBox>
        </MidBox>
        <CreateAtBox>
          <span>
            {created} ㅣ {item.nickname}
          </span>
        </CreateAtBox>
      </div>
    </Container>
  );
};
const ButtonBox = styled.div`
  display: flex;
  margin: 10px 0 0px 15px;
  .close {
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
    background-color: gray;
  }
  .complete {
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
    background-color: gray;
  }
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
    margin-right: 50px;
    width: 55px;
    height: 34px;
    background-color: #2967ac;
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
  margin-top: 10px;
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
  /* display: flex; */
  margin: 20px 0 0 15px;
  width: 244px;
  height: 55px;
  span {
    font-weight: 700;
    font-size: 22px;
  }
`;

const Container = styled.div`
  height: 380px;
  width: 292px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 35px 10px 10px 20px;

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
  height: 190px;
  width: 292px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default LandingCard;
