import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AppliedCard from "../components/Applied/AppliedCard";
import ApplyCard from "../components/Applied/ApplyCard";

import ReactModal from "react-modal";
import Grid from "../elements/Grid";
import { actionCreates as applyActions } from "../redux/modules/apply";

const Applied = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const id = param.postid;

  const subscriberList = useSelector((state) => state.apply.subscriberList);
  console.log(subscriberList);
  const acceptListList = useSelector((state) => state.apply.acceptListList);
  console.log(acceptListList);
  const subscriberCnt = subscriberList.length;
  const acceptListCnt = acceptListList.length;

  const [is_open, setIs_open] = useState(false);
  const [ModalState, setModalState] = useState(false);

  const modalHandelBtn = () => {
    setModalState(!ModalState);
    console.log(ModalState);
  };
  const openHandelBtn = () => {
    dispatch(applyActions.__getSubscriber(id));
    setIs_open(false);
  };
  const openHandelApply = () => {
    dispatch(applyActions.__getAccept(id));
    setIs_open(true);
  };

  useEffect(() => {
    if (is_open === false) {
      dispatch(applyActions.__getSubscriber(id));
      return;
    }
  }, []);

  return (
    <Container>
      <HeadBox>
        <span
          className={is_open === false ? "active" : "default"}
          onClick={openHandelBtn}
        >
          신청자 목록
        </span>
        <span style={{ fontSize: "24px", fontWeight: "700" }}> ㅣ </span>
        <span
          className={is_open === true ? "active" : "default"}
          onClick={openHandelApply}
        >
          선장 목록
        </span>
      </HeadBox>
      <MidBox>
        <span className="Recruitment">모집현황</span>
        <ButtonBox>
          <Grid _className={"majorName"}>배우:1명</Grid>
          <Grid _className={"PeopleCnt"} _onClick={modalHandelBtn}>
            +4
          </Grid>
        </ButtonBox>
        <div className="Line" />
        {is_open === false ? (
          <>
            <span>신청한 선장은</span>
            <span className="Personnel">{subscriberCnt}명</span>
            <span>이에요.</span>
            <span className="Last">마감하고 모험을 떠나볼까요?</span>
            <span className="Deadline">모잡마감하기</span>
          </>
        ) : (
          <>
            <span>참가한 선장은</span>
            <span className="Personnel">{acceptListCnt}명</span>
            <span>이에요.</span>
            <span className="Last">마감하고 모험을 떠나볼까요?</span>
            <span className="Deadline">모잡마감하기</span>
          </>
        )}
      </MidBox>
      <CardBox>
        {is_open === false ? (
          <>
            {subscriberList?.map((a, idx) => {
              return <ApplyCard {...a} id={id} key={idx} />;
            })}
          </>
        ) : (
          <>
            {acceptListList.map((a, idx) => {
              return <AppliedCard {...a} key={idx} />;
            })}
          </>
        )}
      </CardBox>
      <ReactModal
        state={ModalState}
        isOpen={ModalState}
        // ariaHideApp={false}
        onRequestClose={() => setModalState(false)}
        closeTimeoutMS={200}
        style={{
          overlay: {
            zIndex: 3,
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          content: {
            borderRadius: "20px",
            top: "calc(100% - 620px)",
            maxHeight: "343px",
            height: "auto",
            display: "flex",
            width: "200px",
            left: "calc(100% - 1540px)",
            padding: 0,
            transition: "0.3s",
          },
        }}
      >
        <ModalGrid>
          <ModalMajor>
            <Grid _className={"majorName"}>배우:1명</Grid>
            <Grid _className={"majorName"}>배우:1명</Grid>
            <Grid _className={"majorName"}>배우:1명</Grid>
            <Grid _className={"majorName"}>배우:1명</Grid>
            <Grid _className={"majorName"}>배우:1명</Grid>
            <Grid _className={"majorName"}>배우:1명</Grid>
            <Grid _className={"majorName"}>미술/디자인:1명</Grid>
          </ModalMajor>
          <span>확인</span>
        </ModalGrid>
      </ReactModal>
    </Container>
  );
};

const ModalMajor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .majorName {
    margin-top: 10%;
    min-width: 110px;
    padding: 16px;
    width: auto;
    height: 47px;
    background-color: #b9daf6;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 700;
  }
`;

const ModalGrid = styled.div`
  margin: 10.5% auto;
  min-height: 214px;
  height: auto;
  span {
  }
`;

const CardBox = styled.div`
  width: 1400px;

  margin: 3% auto;
`;

const MidBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;
  width: 100%;
  border: 1px solid #c2c0c1;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  height: 126px;
  span {
    font-size: 20px;
    color: #555555;
  }
  .Recruitment {
    font-size: 20px;
    font-weight: 700;
    color: #555555;
    margin-left: 3rem;
    margin-right: 1rem;
  }
  .Personnel {
    color: #555555;
    font-weight: 700;
    font-size: 21px;
  }
  .Last {
    margin-left: 0.8rem;
  }
  .Line {
    height: 35px;
    background-color: #555555;
    width: 2px;
    margin-right: 2rem;
    margin-left: 1rem;
  }
  .Deadline {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 14px;
    margin-left: 22rem;
    border: 1px solid #555555;
    width: 200px;
    height: 60px;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    :hover {
      background-color: #555555;
      color: white;
    }
  }
`;

const HeadBox = styled.div`
  display: flex;
  .active {
    font-size: 24px;
    font-weight: 700;
    border-bottom: 3px solid black;
    cursor: pointer;
  }

  .default {
    cursor: pointer;
    font-size: 24px;
    color: #707070;
    font-weight: 700;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .majorName {
    margin-right: 10px;
    min-width: 110px;
    padding: 16px;
    width: auto;
    height: 47px;
    background-color: #b9daf6;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 700;
  }
  .PeopleCnt {
    cursor: pointer;
    color: #fff;
    font-weight: 700;
    margin-right: 20px;
    width: 60px;
    height: 40px;
    background-color: #fe5953;
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

const Container = styled.div`
  width: 1370px;
  margin: 3% auto;

  height: 1300px;
`;

export default Applied;
