import React, { useEffect, useState } from "react";
import Grid from "../elements/Grid";
import styled from "styled-components";
import ReactModal from "react-modal";
import DetailImage from "../components/Detail/DetailImage";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreates as PostActions } from "../redux/modules/post";
import { useParams } from "react-router-dom";
import Comment from "../components/Detail/Comment";
import { imgActions } from "../redux/modules/image";
import ModalImage from "../assets/Modal.svg";
import Cookies from "universal-cookie";

const Detail = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const [ModalState, setModalState] = useState(false);
  const [is_cate, setIs_Cate] = useState("");
  const [selected, setSelected] = useState(false);
  const [is_comment, setIs_comment] = useState("");

  const id = param.postid;
  console.log(id);

  const cookies = new Cookies();
  const is_login = cookies.get("isLogin");

  const detailList = useSelector((state) => state.post.detailList);

  const created = detailList.createdAt;
  const createdAt = created?.split(" ")[0];

  const data = {
    applyMajor: is_cate,
    message: is_comment,
  };

  const applyHandelButton = () => {
    if (detailList.userStatus === "anonymous") {
      alert("로그인을 먼저 해주세요!");
      history.replace("/login");
      return;
    }
    if (detailList.userStatus === "applicant") {
      dispatch(PostActions.__deleteApply(id));
      alert("신청이 취소되었습니다!");
      return;
    }
    if (detailList.userStatus === "starter") {
      history.push(`/applied/${id}`);
    }

    setModalState(!ModalState);
  };

  const applyPostButtom = () => {
    dispatch(PostActions.__postApply(id, data));
    alert("신청 완료!");
    setModalState(!ModalState);
  };

  const applyHandelChange = (e) => {
    setIs_comment(e.target.value);
  };

  useEffect(() => {
    if (is_login) {
      dispatch(PostActions.__loginGetDetail(param.postid));
    } else {
      dispatch(PostActions.__getDetail(param.postid));
    }

    dispatch(imgActions.initPre());
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
            {detailList.userStatus === "applicant" ? (
              <Btn1 onClick={applyHandelButton}>취소하기</Btn1>
            ) : null}
            {detailList.userStatus === "anonymous" ? (
              <Btn1 onClick={applyHandelButton}>신청하기</Btn1>
            ) : null}
            {detailList.userStatus === "user" ? (
              <Btn1 onClick={applyHandelButton}>신청하기</Btn1>
            ) : null}
            {detailList.userStatus === "member" ? <Btn3>신청하기</Btn3> : null}

            {detailList.userStatus === "starter" ? (
              <Btn1 onClick={applyHandelButton}>신청목록</Btn1>
            ) : null}

            <Btn2>스크랩</Btn2>
          </HeadBtnBox>
        </HeadBox>

        <MidBox>
          <LeftBox>
            <p>{detailList.title}</p>

            <ButtonBox>
              {detailList.majorList?.map((a, idx) => {
                if (a.majorName === "디자인") {
                }
                return (
                  <div key={idx}>
                    <Grid
                      _className="mojarName"
                      bg={
                        a.majorName === "미술/디자인"
                          ? "#2967AC"
                          : a.majorName === "음향"
                          ? "#FFEF62"
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
                          : null
                      }
                    >
                      <p style={{ fontSize: "16px" }}>
                        {a.majorName} : {a.numOfPeopleSet}명
                      </p>
                    </Grid>
                  </div>
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

        {/* 신청 모달 */}
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
              backgroundImage: { ModalImage },
              borderRadius: "20px",
              top: "calc(100% - 750px)",
              height: "600px",
              width: "1200px",
              left: "calc(100% - 1560px)",
              padding: 0,

              transition: "0.3s",
            },
          }}
        >
          <ModalGrid>
            <ModalTitle>
              <p>신청 할 가테고리를 선택해주세요!</p>
            </ModalTitle>
            <Category>
              <CateBtn
                onClick={() => {
                  is_cate === "미술/디자인"
                    ? setIs_Cate("")
                    : setIs_Cate("미술/디자인");
                  setSelected(true);
                }}
              >
                <Grid
                  _className={is_cate === "미술/디자인" ? "active" : "default"}
                  bg={is_cate === "미술/디자인" ? "#2967AC" : "#f5fcff"}
                >
                  <p>미술/디자인</p>
                </Grid>
              </CateBtn>

              <CateBtn
                onClick={() => {
                  is_cate === "영상" ? setIs_Cate("") : setIs_Cate("영상");
                  setSelected(true);
                }}
              >
                <Grid
                  _className={is_cate === "영상" ? "active" : "default"}
                  bg={is_cate === "영상" ? "#6AD8F5" : "#f5fcff"}
                >
                  <p>영상</p>
                </Grid>
              </CateBtn>

              <CateBtn
                onClick={() => {
                  is_cate === "배우" ? setIs_Cate("") : setIs_Cate("배우");
                  setSelected(true);
                }}
              >
                <Grid
                  _className={is_cate === "배우" ? "active" : "default"}
                  bg={is_cate === "배우" ? "#F58467" : "#f5fcff"}
                >
                  <p>배우</p>
                </Grid>
              </CateBtn>

              <CateBtn
                onClick={() => {
                  is_cate === "사진" ? setIs_Cate("") : setIs_Cate("사진");
                  setSelected(true);
                }}
              >
                <Grid
                  _className={is_cate === "사진" ? "active" : "default"}
                  bg={is_cate === "사진" ? "#4299E9" : "#f5fcff"}
                >
                  <p>사진</p>
                </Grid>
              </CateBtn>

              <CateBtn
                onClick={() => {
                  is_cate === "프로그래밍"
                    ? setIs_Cate("")
                    : setIs_Cate("프로그래밍");
                  setSelected(true);
                }}
              >
                <Grid
                  _className={is_cate === "프로그래밍" ? "active" : "default"}
                  bg={is_cate === "프로그래밍" ? "#5BC8D2" : "#f5fcff"}
                >
                  <p>프로그래밍</p>
                </Grid>
              </CateBtn>

              <CateBtn
                onClick={() => {
                  is_cate === "모델" ? setIs_Cate("") : setIs_Cate("모델");
                  setSelected(true);
                }}
              >
                <Grid
                  _className={is_cate === "모델" ? "active" : "default"}
                  bg={is_cate === "모델" ? "#FE674C" : "#f5fcff"}
                >
                  <p>모델</p>
                </Grid>
              </CateBtn>

              <CateBtn
                onClick={() => {
                  is_cate === "성우" ? setIs_Cate("") : setIs_Cate("성우");
                  setSelected(true);
                }}
              >
                <Grid
                  _className={is_cate === "성우" ? "active" : "default"}
                  bg={is_cate === "성우" ? "#FFD082" : "#f5fcff"}
                >
                  <p>성우</p>
                </Grid>
              </CateBtn>

              <CateBtn
                onClick={() => {
                  is_cate === "음향" ? setIs_Cate("") : setIs_Cate("음향");
                  setSelected(true);
                }}
              >
                <Grid
                  _className={is_cate === "음향" ? "active" : "default"}
                  bg={is_cate === "음향" ? "#FFEF62" : "#f5fcff"}
                >
                  <p>음향</p>
                </Grid>
              </CateBtn>
            </Category>
            <ModalInput>
              <input
                placeholder="모험에 대한 각오를 적어주세요! (20자이하)"
                maxLength={20}
                onChange={applyHandelChange}
              />
            </ModalInput>
            <ModalBtn onClick={applyPostButtom}>
              <span>신청하기</span>
            </ModalBtn>
          </ModalGrid>
        </ReactModal>
      </Container>
    </>
  );
};

const Btn3 = styled.div`
  width: 120px;
  height: 40px;
  margin-left: 10px;
  background: gray;
  border: none;
  border-radius: 14px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;

const ModalBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
  height: 50px;
  background-color: #555;
  border-radius: 14px;
  :hover {
    background-color: black;
  }

  span {
    font-size: 24px;
    font-weight: 700;
    color: white;
  }
`;

const ModalInput = styled.div`
  display: flex;
  justify-content: center;
  input {
    margin-top: 2rem;
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 1px solid gray;
    font-size: 20px;
    color: gray;
    :focus {
      outline-color: gray;
    }
    ::placeholder {
      font-size: 20px;
      color: rgba(155, 151, 152, 1);
    }
  }
`;

const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const CateBtn = styled.div`
  margin: 10px 5px;
  .default {
    width: 140px;
    height: 50px;
    border-radius: 14px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background-color: #f5fcff;
    /* box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0px 4px 13px #d7f1fd;
    cursor: pointer;

    p {
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      color: #2967ac;
    }
  }
  .active {
    width: 140px;
    height: 50px;
    border-radius: 14px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0px 4px 13px rgba(0, 0, 0, 0.1);
    cursor: pointer;

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

  .inactive {
    .icon {
      color: var(--help-color);
      font-size: 32px;
    }
    p {
      font-size: 12px;

      color: white;
    }
  }
`;

const ModalTitle = styled.div`
  text-align: center;
  p {
    font-size: 32px;
    font-weight: 700;
    color: #555555;
  }
`;

const ModalGrid = styled.div`
  margin: 10.5% auto;
  height: 346px;
  width: 620px;
`;

const ImageBox = styled.div`
  margin: 3rem 0 5rem 0;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 32rem;

  .mojarName {
    margin-bottom: 10px;
    margin-right: 10px;
    min-width: 110px;
    padding: 16px;
    width: auto;
    height: 40px;

    border-radius: 20px;
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
  width: 35rem;
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

const HeadBtnBox = styled.div`
  display: flex;
`;

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
  height: 40px;
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
  height: 40px;
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
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid black;
  }
  p {
    display: flex;
    margin-left: 0.5rem;
    margin-right: 45rem;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    width: 20rem;
  }
`;

export default Detail;
