import styled from "styled-components";
import Grid from "../../elements/Grid";

import amateurCap from "../../assets/ama.svg";
import juniorCap from "../../assets/jr.svg";
import proCap from "../../assets/pro.svg";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreates as applyActions } from "../../redux/modules/apply";
import { history } from "../../redux/configureStore";
import { actionCreators as chatActions } from "../../redux/modules/chat";
import Swal from "sweetalert2";

const AppliedCard = (item) => {
  const dispatch = useDispatch();
  const param = useParams();

  const refuseDto = {
    userId: item.userId,
    postId: param.postid,
  };

  const addRoomData = {
    toUserId: item.userId,
    postId: param.postid,
  };

  const handleUserPage = () => {
    history.push(`/user/${item.userId}`);
  };

  const refuseHandelBtn = () => {
    Swal.fire({
      title: "정말로 강퇴 하시겠습니까?",
      text: "강퇴한 선장은 다시 볼수 없습니다! ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "강퇴",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "강퇴가 완료되었습니다.",
          icon: "success",
        });
        dispatch(applyActions.__postRefuse(refuseDto));
      }
    });
  };

  var likeRatio = (item.likeCount / 100) * (100 / item.projectCount) * 100;
  if (isNaN(likeRatio)) {
    likeRatio = 0;
  }

  const chatHandelBtn = () => {
    for (let i = 0; i < item.roomUserId.length; i++) {
      if (item.userId === item.roomUserId[i]) {
        Swal.fire({
          title: "이미 채팅방이 존재 합니다!",
          icon: "error",
        });

        return;
      }
    }
    dispatch(chatActions.__addRoom(addRoomData));
  };

  var evaluationRatio = null;

  if (likeRatio <= 40) {
    evaluationRatio = `${Math.ceil(likeRatio)}% 만족!`;
  } else if (41 <= likeRatio <= 70) {
    evaluationRatio = `${Math.ceil(likeRatio)}% 만족!`;
  } else if (71 <= likeRatio <= 100) {
    evaluationRatio = `${Math.ceil(likeRatio)}% 만족!`;
  }

  var evaluationLevel = null;

  if (likeRatio <= 40) {
    evaluationLevel = "아마추어 선장러";
  } else if (71 <= likeRatio) {
    evaluationLevel = "프로 선장러";
  } else {
    evaluationLevel = "주니어 선장러";
  }

  return (
    <Container>
      <Profile>
        <img
          className="profile"
          src={item.profileImg}
          alt="profile"
          onClick={handleUserPage}
        />

        <div className="cardTitle">
          <p style={{ fontSize: "23px", fontWeight: "700" }}>{item.nickname}</p>
          <div className="ratingBox">
            <div className="help-tip">
              {likeRatio <= 40 ? (
                <img src={amateurCap} alt="amateurCap" />
              ) : 71 <= likeRatio ? (
                <img src={proCap} alt="proCap" />
              ) : (
                <img src={juniorCap} alt="juniorCap" />
              )}
              <p>현재까지 협업횟수는 {item.projectCount}입니다.</p>
            </div>
            &nbsp;&nbsp;
            <span className="rating">{evaluationRatio}</span>
            &nbsp;
            <span className="rating">{evaluationLevel}</span>
          </div>
        </div>
      </Profile>
      <MidBtnBox>
        <Grid
          _className="majorName"
          bg={
            item.applyMajor === "디자인"
              ? "#2967AC"
              : item.applyMajor === "음향"
              ? "#FFB673"
              : item.applyMajor === "영상"
              ? "#6AD8F5"
              : item.applyMajor === "배우"
              ? "#F58467"
              : item.applyMajor === "프로그래밍"
              ? "#5BC8D2"
              : item.applyMajor === "모델"
              ? "#FE674C"
              : item.applyMajor === "사진"
              ? "#4299E9"
              : item.applyMajor === "성우"
              ? "#FFD082"
              : null
          }
        >
          <p>{item.applyMajor}</p>
        </Grid>
      </MidBtnBox>
      <CommentBox>
        <span>{item.message}</span>
      </CommentBox>
      <BottomBtn>
        <span className="chatButton" onClick={chatHandelBtn}>
          채팅
        </span>
        <span className="noButton" onClick={refuseHandelBtn}>
          강퇴
        </span>
      </BottomBtn>
    </Container>
  );
};

const BottomBtn = styled.div`
  display: flex;
  align-items: center;

  margin-top: 30px;
  margin-bottom: 10px;

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
    margin-left: 139px;
    background: #fe5953;
    border: none;
    border-radius: 14px;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    border: 1px solid rgba(0, 0, 0, 0.2);
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
  margin: 4% 4%;
  .refuseBtn {
  }
  .ratingBox {
    display: flex;
    flex-direction: row;
    width: 270px;
    align-items: center;
    margin-top: -4%;
    .help-tip {
    }

    .help-tip:hover p {
      display: block;

      transform-origin: 100% 0%;

      -webkit-animation: fadeIn 0.3s ease-in-out;

      animation: fadeIn 0.3s ease-in-out;
    }

    .help-tip p {
      display: none;
      text-align: center;
      background-color: #f5f5f9;
      z-index: 20px;
      width: 150px;
      padding: 10px;
      max-width: 220px;
      position: absolute;

      color: rgba(0, 0, 0, 0.87);
      font-size: 12px;
      font-weight: bold;
      line-height: 1.4;
    }

    @-webkit-keyframes fadeIn {
      0% {
        opacity: 0;

        transform: scale(0.6);
      }

      100% {
        opacity: 100%;

        transform: scale(1);
      }
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 100%;
      }
    }
  }
  .cardTitle {
    display: flex;
    flex-direction: column;
    margin: 0 4%;
  }
  .rating {
    display: flex;
  }
  .profile {
    cursor: pointer;
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
    margin-top: 0px;
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
  background-color: #fff;
`;

export default AppliedCard;
