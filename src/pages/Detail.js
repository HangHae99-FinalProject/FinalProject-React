import React, { useEffect } from "react";
import Grid from "../elements/Grid";
import styled from "styled-components";

import DetailImage from "../components/Detail/DetailImage";

import { useDispatch, useSelector } from "react-redux";
import { actionCreates as PosrActions } from "../redux/modules/post";
import { useParams } from "react-router-dom";
import Comment from "../components/Detail/Comment";

const Detail = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const detailList = useSelector((state) => state.post.detailList);

  const created = detailList.createdAt;
  const createdAt = created?.split(" ")[0];

  useEffect(() => {
    dispatch(PosrActions.__getDetail(param.postid));
  }, []);

  return (
    <>
      <Container>
        <HeadBox>
          <Profile>
            <img src={detailList.pofileImg} alt="profile" />
            <p>
              {detailList.nickname} ㅣ {createdAt}
            </p>
          </Profile>
          <HeadBtnBox>
            <Btn1>신청하기</Btn1>
            <Btn2>스크랩</Btn2>
          </HeadBtnBox>
        </HeadBox>

        <MidBox>
          <LeftBox>
            <p>{detailList.title}</p>

            <ButtonBox>
              {detailList.majorList?.map((a, idx) => {
                return (
                  <Grid _className="mojarName" key={idx}>
                    <p style={{ fontSize: "22px" }}>
                      {a.majorName} : {a.numOfPeopleSet}
                    </p>
                  </Grid>
                );
              })}
            </ButtonBox>
          </LeftBox>
          <Line />
          <RightBox>
            <p style={{ fontSize: "20px", fontWeight: "700" }}>
              {detailList.region} 모집기간: {detailList.deadline}
            </p>
            <p>{detailList.content}</p>
          </RightBox>
        </MidBox>
        <ImageBox>
          <DetailImage image={detailList.imgList} />
        </ImageBox>
        <Comment />
      </Container>
    </>
  );
};

const ImageBox = styled.div`
  margin: 3rem 0 5rem 0;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 40rem;

  .mojarName {
    margin-bottom: 10px;
    margin-right: 10px;
    width: 150px;
    height: 50px;
    background-color: #2967ac;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  p {
    color: #fff;
  }
`;

const LeftBox = styled.div`
  width: 40rem;
  margin: 2.5rem 0 3rem 3rem;
  height: 10rem;
  p {
    font-size: 24px;
    font-weight: 700;
  }
`;

const RightBox = styled.div`
  margin: 2.8rem 3rem 3rem 0;
  p {
    font-size: 17px;
    font-weight: 400;
  }
`;

const Line = styled.div`
  width: 2px;
  height: 170px;
  background-color: #9b9798;
  margin: 3rem 50px 0 50px;
`;

const MidBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 1rem;
  width: 100%;
  border: 1px solid #c2c0c1;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  height: 270px;
`;

const HeadBtnBox = styled.div``;

const HeadBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 1370px;
  margin: 3% auto;
`;

const Btn1 = styled.button`
  cursor: pointer;
  width: 120px;
  height: 50px;
  margin-left: 10px;
  background: #4299e9;
  border: none;
  border-radius: 14px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;

const Btn2 = styled.button`
  cursor: pointer;
  width: 120px;
  height: 50px;
  margin-left: 10px;
  background: #ffd082;
  border: none;
  border-radius: 14px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;

const Profile = styled.div`
  float: left;
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid black;
  }
  p {
    margin-left: 0.5rem;
    margin-right: 54rem;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
  }
`;

export default Detail;
