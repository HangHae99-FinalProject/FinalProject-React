import React, { useEffect, useState } from "react";
import Grid from "../elements/Grid";
import styled from "styled-components";
import ReactModal from "react-modal";
import DetailImage from "../components/Detail/DetailImage";
import Link from "../components/Link";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreates as PostActions } from "../redux/modules/post";
import { useParams, useLocation } from "react-router-dom";
import Comment from "../components/Detail/Comment";
import { imgActions } from "../redux/modules/image";
import Footer from "../elements/Footer";
import Spinner from "../components/Spinner";
import { actionCreates as postActions } from "../redux/modules/post";

const Detail = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const [ModalState, setModalState] = useState(false);
  const [is_cate, setIs_Cate] = useState("");
  const [is_comment, setIs_comment] = useState("");

  const pathName = useLocation();

  const id = param.postid;

  const localUserId = localStorage.getItem("userId");

  const is_loading = useSelector((state) => state.post.is_loading);
  const is_login = useSelector((state) => state.user.isLogin);

  const detailList = useSelector((state) => state.post.detailList);

  const majorList = detailList.majorList;

  const userId = Number(localUserId) === detailList.userId ? true : false;

  const created = detailList.createdAt;

  const createdTime = new Date(created);
  const createdYear = createdTime.getFullYear();
  const createdMonth = createdTime.getMonth() + 1;
  const createdDate = createdTime.getDate();

  const createdDay = createdYear + "-" + createdMonth + "-" + createdDate;

  const data = {
    applyMajor: is_cate,
    message: is_comment,
  };

  const postDelete = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      alert("삭제되었습니다!");
    } else {
      alert("취소되었습니다!");
      return;
    }
    dispatch(PostActions.__deletePost(id));
  };

  const handleUserPage = () => {
    if (detailList.userStatus === "anonymous") {
      alert("로그인을 먼저 해주세요!");
      history.push("/login");
      return;
    }
    history.push(`/user/${detailList.userId}`);
  };

  const handleWrite = () => {
    history.push(`/editpost/${id}`);
  };

  const applyHandelButton = () => {
    if (detailList.userStatus === "anonymous") {
      alert("로그인을 먼저 해주세요!");
      history.push("/login");
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

  const applyPostButton = () => {
    if (data.applyMajor === "") {
      alert("카테고리를 선택해 주세요!");
      return;
    }
    dispatch(PostActions.__postApply(id, data));
    alert("신청 완료!");
    setModalState(!ModalState);
  };

  const applyHandelChange = (e) => {
    setIs_comment(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (is_login) {
      dispatch(PostActions.__loginGetDetail(id));
    } else {
      dispatch(PostActions.__getDetail(id));
    }

    return () => {
      dispatch(imgActions.initPre());
      dispatch(postActions.clearPost());
    };
  }, [dispatch, pathName, is_login]);

  return (
    <>
      {is_loading === false ? (
        <Spinner />
      ) : (
        <>
          <Container>
            <HeadBox>
              <Profile>
                <img
                  src={detailList.profileImg}
                  alt="profile"
                  onClick={handleUserPage}
                  style={{ cursor: "pointer" }}
                />
                <p>
                  {detailList.nickname} ㅣ {createdDay}
                </p>
              </Profile>
              <HeadBtnBox>
                {detailList.currentStatus === "RECRUITING_COMPLETE" ? (
                  <>
                    {detailList.userStatus === "starter" ? (
                      <div className="starterBtn" onClick={applyHandelButton}>
                        선장목록
                      </div>
                    ) : (
                      <Btn3>모집완료</Btn3>
                    )}
                  </>
                ) : null}
                {detailList.currentStatus === "RECRUITING_CLOSE" ? (
                  <>
                    {detailList.userStatus === "starter" ? (
                      <div className="starterBtn" onClick={applyHandelButton}>
                        선장목록
                      </div>
                    ) : (
                      <Btn3>정원마감</Btn3>
                    )}
                  </>
                ) : null}
                {detailList.currentStatus === "ONGOING" ? (
                  <>
                    {detailList.userStatus === "applicant" ? (
                      <div className="anonymousBtn" onClick={applyHandelButton}>
                        취소하기
                      </div>
                    ) : null}
                    {detailList.userStatus === "anonymous" ? (
                      <div className="anonymousBtn" onClick={applyHandelButton}>
                        신청하기
                      </div>
                    ) : null}
                    {detailList.userStatus === "user" ? (
                      <div className="anonymousBtn" onClick={applyHandelButton}>
                        신청하기
                      </div>
                    ) : null}
                    {detailList.userStatus === "member" ? (
                      <Btn3>합류완료</Btn3>
                    ) : null}

                    {detailList.userStatus === "starter" ? (
                      <div className="starterBtn" onClick={applyHandelButton}>
                        선장목록
                      </div>
                    ) : null}
                  </>
                ) : null}

                {userId ? (
                  <>
                    <Btn2 onClick={handleWrite}>수정하기</Btn2>
                    <Btn4 onClick={postDelete}>삭제하기</Btn4>
                  </>
                ) : null}
              </HeadBtnBox>
            </HeadBox>

            <MidBox>
              <LeftBox>
                <p>{detailList.title}</p>
                <ButtonBox>
                  {detailList.majorList?.map((a, idx) => {
                    return (
                      <div key={idx}>
                        <Grid
                          _className="majorName"
                          bg={
                            a.majorName === "디자인"
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
                {detailList.link ? (
                  <p style={{ margin: "-10px 0 0px 0", fontWeight: "700" }}>
                    <a href={detailList.link}>추가 설명 링크</a>
                  </p>
                ) : null}
                <ContentScroll>
                  <p>{detailList.content}</p>
                </ContentScroll>
              </RightBox>
            </MidBox>

            {/* 이미지 컴포넌트 */}
            <ImageBox>
              <DetailImage image={detailList.imgList} />
            </ImageBox>

            {/* 댓글 컴포넌트 */}
            <Comment userId={userId} />

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
                  borderRadius: "20px",
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  transform: "translate(-50%, -50%)",
                  height: "600px",
                  width: "1200px",
                  position: "fixed",
                  padding: 0,

                  transition: "0.3s",
                },
              }}
            >
              <BackImage>
                <ModalGrid>
                  <ModalTitle>
                    <p>신청 할 가테고리를 선택해주세요!</p>
                  </ModalTitle>
                  <Category>
                    {majorList?.map((a, idx) => {
                      return (
                        <CateBtn
                          key={idx}
                          onClick={() => {
                            if (a.majorName === "디자인") {
                              setIs_Cate("디자인");
                            } else if (a.majorName === "영상") {
                              setIs_Cate("영상");
                            } else if (a.majorName === "배우") {
                              setIs_Cate("배우");
                            } else if (a.majorName === "사진") {
                              setIs_Cate("사진");
                            } else if (a.majorName === "프로그래밍") {
                              setIs_Cate("프로그래밍");
                            } else if (a.majorName === "모델") {
                              setIs_Cate("모델");
                            } else if (a.majorName === "성우") {
                              setIs_Cate("성우");
                            } else if (a.majorName === "음향") {
                              setIs_Cate("음향");
                            }
                            if (a.majorName === is_cate) {
                              setIs_Cate("");
                            }
                          }}
                        >
                          <Grid
                            _className={
                              is_cate === a.majorName ? "active" : "default"
                            }
                            bg={
                              a.majorName === "디자인"
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
                              {a.majorName}ㅣ{a.numOfPeopleApply}/
                              {a.numOfPeopleSet}
                            </p>
                          </Grid>
                        </CateBtn>
                      );
                    })}
                  </Category>
                  <ModalInput>
                    <input
                      placeholder="모험에 대한 각오를 적어주세요! (20자이하)"
                      maxLength={20}
                      onChange={applyHandelChange}
                    />
                  </ModalInput>
                  <ModalBtn onClick={applyPostButton}>
                    <span>신청하기</span>
                  </ModalBtn>
                </ModalGrid>
              </BackImage>
            </ReactModal>
          </Container>
          <Link />
          <Footer />
        </>
      )}
    </>
  );
};

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
    background-color: transparent;
    border-bottom: 1px solid gray;
    font-size: 20px;
    color: gray;
    :focus {
      outline: none;
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

  align-items: center;
`;

const CateBtn = styled.div`
  margin: 10px 5px;
  .default {
    min-width: 110px;
    padding: 16px;
    width: auto;

    height: 50px;
    border-radius: 14px;
    border: 1px solid #E0F4FE;
    background-color: #f5fcff;

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
    min-width: 110px;
    padding: 16px;
    width: auto;
    height: 50px;
    border-radius: 14px;
    border: 1px solid #E0F4FE;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0px 4px 13px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    animation: 0.6s ease-in-out loadEffect3;

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
`;

const ContentScroll = styled.div`
  height: 90px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
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
const BackImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("https://velog.velcdn.com/images/tty5799/post/7720c391-9cd1-4dca-bb62-bd044e1b4d70/image.png");
  overflow: hidden;
`;
const ModalGrid = styled.div`
  margin: 10.5% auto;
  height: 346px;
  width: 620px;
`;

const ImageBox = styled.div`
  margin: 3rem auto 5rem auto;
  width: 1100px;
  height: 500px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
`;

const ButtonBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 32rem;

  .majorName {
    margin-bottom: 10px;
    margin-right: 10px;
    min-width: 110px;
    padding: 16px;
    width: auto;
    height: 47px;
    font-size: 16px;

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
    width: 40rem;
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
  .starterBtn {
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer;
    width: 120px;
    height: 40px;
    margin-left: -90px;
    background: #4299e9;
    border: none;
    border-radius: 14px;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    :hover {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        #66b8ff;
      border: 1px solid rgba(0, 0, 0, 0.2);
      color: #fff;
    }
  }

  .anonymousBtn {
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer;
    width: 120px;
    height: 40px;
    margin-left: 170px;
    background: #4299e9;
    border: none;
    border-radius: 14px;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    :hover {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        #66b8ff;
      border: 1px solid rgba(0, 0, 0, 0.2);
      color: #fff;
    }
  }
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
  :hover {
    background: linear-gradient(0deg, #e89308, #e89308), #ffd082;
    border: 1px solid rgba(0, 0, 0, 0.15);
    color: #fff;
  }
`;

const Btn3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 120px;
  height: 40px;
  margin-left: 170px;
  background: gray;
  border: none;
  border-radius: 14px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;
const Btn4 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  width: 120px;
  height: 40px;
  margin-left: 10px;
  background: #fe5953;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 14px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  :hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      #fe5953;
    color: #fff;
  }
`;
const Profile = styled.div`
  float: left;
  display: flex;
  flex-direction: row;

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
    margin-right: 43rem;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    width: 20rem;
  }
`;

export default Detail;
