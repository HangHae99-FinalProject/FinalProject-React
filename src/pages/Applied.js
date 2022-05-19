import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AppliedCard from "../components/Applied/AppliedCard";
import ApplyCard from "../components/Applied/ApplyCard";
import Footer from "../elements/Footer";
import ReactModal from "react-modal";
import Grid from "../elements/Grid";
import { actionCreates as applyActions } from "../redux/modules/apply";

const Applied = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const id = param.postid;

  const subscriber = useSelector((state) => state.apply.subscriberList);
  const subscriberList = subscriber.applyUserLists;

  const majorList = subscriber.majorList?.map((a) => a.majorName);
  const numOfPeopleSet = subscriber.majorList?.map((a) => a.numOfPeopleSet);
  const numOfPeopleApply = subscriber.majorList?.map((a) => a.numOfPeopleApply);

  const acceptListList = useSelector(
    (state) => state.apply.acceptListList.applyUserLists
  );

  const subscriberCnt = subscriberList?.length;
  const acceptListCnt = acceptListList?.length;

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

  const deadlineHandelBtn = () => {
    dispatch(applyActions.__deadlinePatch(id));
  };

  useEffect(() => {
    if (is_open === false) {
      dispatch(applyActions.__getSubscriber(id));
      return;
    }
  }, []);

  return (
    <>
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
            {majorList && numOfPeopleApply && numOfPeopleSet ? (
              <>
                <Grid
                  _className={"majorName"}
                  bg={
                    majorList[0] === "미술/디자인"
                      ? "#2967AC"
                      : majorList[0] === "음향"
                      ? "#FFB673"
                      : majorList[0] === "영상"
                      ? "#6AD8F5"
                      : majorList[0] === "배우"
                      ? "#F58467"
                      : majorList[0] === "프로그래밍"
                      ? "#5BC8D2"
                      : majorList[0] === "모델"
                      ? "#FE674C"
                      : majorList[0] === "사진"
                      ? "#4299E9"
                      : majorList[0] === "성우"
                      ? "#FFD082"
                      : "#f5fcff"
                  }
                >
                  {majorList[0]}
                  {numOfPeopleApply[0]}/{numOfPeopleSet[0]}
                </Grid>
                {majorList.length === 1 ? null : majorList.length === 2 ? (
                  <Grid _className={"PeopleCnt"}>+{majorList.length - 1}</Grid>
                ) : (
                  <Grid _className={"PeopleCnt"} _onClick={modalHandelBtn}>
                    +{majorList.length}
                  </Grid>
                )}
              </>
            ) : null}
          </ButtonBox>

          <div className="Line" />

          {is_open === false ? (
            <div className="midContent">
              <span className="title">신청한 선장은</span>
              <span className="Personnel">{subscriberCnt}명</span>
              <span className="titleLast">이에요.</span>
              {subscriberCnt === 0 ? (
                <span className="Count">조금 기다려볼까요??</span>
              ) : (
                <span className="Last">마감하고 모험을 떠나볼까요?</span>
              )}

              <span className="Deadline" onClick={deadlineHandelBtn}>
                모집마감하기
              </span>
            </div>
          ) : (
            <div className="midContent">
              <span className="title">참가한 선장은</span>
              <span className="Personnel">{acceptListCnt}명</span>
              <span className="titleLast">이에요.</span>
              {acceptListCnt === 0 ? (
                <span className="Count">조금 기다려볼까요??</span>
              ) : (
                <span className="Last">마감하고 모험을 떠나볼까요?</span>
              )}
              <span className="Deadline" onClick={deadlineHandelBtn}>
                모집마감하기
              </span>
            </div>
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
              {acceptListList?.map((a, idx) => {
                return <AppliedCard {...a} key={idx} />;
              })}
            </>
          )}
        </CardBox>

        <ReactModal
          state={ModalState}
          isOpen={ModalState}
          ariaHideApp={false}
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
              left: "calc(100% - 1500px)",
              padding: 0,
              transition: "0.3s",
            },
          }}
        >
          <ModalGrid>
            <ModalMajor>
              {subscriber.majorList?.map((a, idx) => {
                return (
                  <Grid
                    key={idx}
                    _className="majorName"
                    bg={
                      a.majorName === "미술/디자인"
                        ? "#2967AC"
                        : a.majorName === "음향"
                        ? "#FFB673"
                        : a.majorName === "영상"
                        ? "#6AD8F5"
                        : a.majorName === "배우"
                        ? "#F58467"
                        : a.majorName === "프로그래밍"
                        ? "#5BC8D2"
                        : a.majorName === "모델"
                        ? "#FE674C"
                        : a.majorName === "사진"
                        ? "#4299E9"
                        : a.majorName === "성우"
                        ? "#FFD082"
                        : "#f5fcff"
                    }
                  >
                    <p>
                      {a.majorName}ㅣ{a.numOfPeopleApply}/{a.numOfPeopleSet}
                    </p>
                  </Grid>
                );
              })}
            </ModalMajor>
            <span
              onClick={() => {
                setModalState(false);
              }}
            >
              확인
            </span>
          </ModalGrid>
        </ReactModal>
      </Container>
      <Footer />
    </>
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
  text-align: right;
  span {
    cursor: pointer;
    font-size: 14px;
    color: #2967ac;
    font-weight: 700;
    right: 69%;
    position: fixed;
    top: 65%;
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
  width: 1370px;
  border: 1px solid #c2c0c1;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  height: 126px;
  .Count {
    font-size: 20px;
    width: 20%;
    margin-right: 78px;
  }
  .title {
    font-size: 20px;
    width: 15%;
  }
  .titleLast {
    font-size: 20px;
    width: 8%;
  }
  .midContent {
    display: flex;
    text-align: center;
    width: 67%;
    align-items: center;
  }
  .Recruitment {
    width: 6%;
    font-size: 20px;
    font-weight: 700;
    color: #555555;
    margin-left: 45px;
    margin-right: 15px;
  }
  .Personnel {
    color: #555555;
    font-weight: 700;
    font-size: 21px;
    width: 5%;
  }
  .Last {
    font-size: 20px;
    width: 30%;
    margin-left: 10px;
  }
  .Line {
    height: 35px;
    background-color: #555555;
    width: 2px;
    margin-right: 20px;
    margin-left: 20px;
  }
  .Deadline {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 14px;
    margin-left: 200px;
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
  height: 1020px;
  margin: 3% auto;
`;

export default Applied;
