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
  const mojor = majorName.map((a) => a.majorName);
  const mojorCnt = mojor.length;

  const created = item.item.createdAt;
  const setCreatedAt = created.split(" ");
  const createdAt = setCreatedAt[0];

  return (
    <Card
      sx={{
        width: "430px",
        display: "flex",
        float: "left",
        justifyContent: "center",
        justifyItems: "center",
        flexDirection: "row",
        height: "600px",
      }}
      onClick={() => {
        history.push(`/detail/${postId}`);
      }}
    >
      <CardActionArea
        sx={{ width: "430px", height: "600px", paddingTop: "120px" }}
      >
        {/* <CardMedia component="img" height="300px" src={dd} alt="green iguana" /> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <MainImage src={item.item.imgUrl} />
        </div>

        <div>
          <TitleBox>
            <span>{item.item.title}</span>
          </TitleBox>
        </div>

        <div
          style={{
            width: "430px",
            height: "80px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "-8px",
          }}
        >
          <div>
            <DateBox>
              <span>
                {item.item.region} ㅣ {item.item.deadline} 예상
              </span>
            </DateBox>
            <CreateAtBox>
              <span>
                {createdAt} ㅣ {item.item.nickname}
              </span>
            </CreateAtBox>
          </div>
          <div>
            <ButtonBox>
              <Grid _className={"mojarName"} margin="0 0 0px 0">
                <p>{mojor[0]}</p>
              </Grid>
              <Grid _className={"PeopleCnt"}>
                <p>+{mojorCnt}</p>
              </Grid>
            </ButtonBox>
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
};

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .mojarName {
    margin-right: 10px;
    width: 80px;
    height: 40px;
    background-color: #b9daf6;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .PeopleCnt {
    margin-right: 20px;
    width: 50px;
    height: 40px;
    background-color: #b9daf6;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  p {
    font-size: 15px;
    font-weight: 700;
  }
`;

const CreateAtBox = styled.div`
  margin-left: 10px;
  span {
    font-size: 14px;
    color: #2967ac;
    font-weight: 500;
  }
`;

const DateBox = styled.div`
  margin-bottom: 20px;
  margin-left: 10px;
  span {
    font-size: 25px;
    color: #2967ac;
    font-weight: 400;
  }
`;

const TitleBox = styled.div`
  margin-bottom: 20px;
  margin-left: 10px;
  span {
    font-size: 32px;
    font-weight: 700;
    line-height: 46px;
  }
`;

const MainImage = styled.img`
  margin-top: -129px;
  /* margin-bottom: 30px; */

  height: 410px;
  width: 410px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default MainCard;
