import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import LandingCard from "../components/Landing/LandingCard";
import { actionCreates as postActions } from "../redux/modules/post";
import { FiChevronRight } from "react-icons/fi";
import { history } from "../redux/configureStore";
import { useLocation } from "react-router-dom";

const Landing = () => {
  const dispatch = useDispatch();
  const landingList = useSelector((state) => state.post.landingList);
  const pathName = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(postActions.__getLanding());
  }, [dispatch, pathName]);

  const loginHandelBtn = () => {
    history.push("/login");
  };
  const signUpHandelBtn = () => {
    history.push("/signup");
  };
  const mainHandelBtn = () => {
    history.push("/main");
  };

  return (
    <Container>
      <HeadImage>
        <BackImage>
          <img
            src="https://velog.velcdn.com/images/tty5799/post/44b3ddb0-6532-431f-a249-933b59d8b327/image.png"
            alt="backImg"
          />
        </BackImage>
        <TitleImg>
          <img
            src="https://velog.velcdn.com/images/tty5799/post/ca07d3ee-2bdb-4825-b3f3-cb1f3582e818/image.png"
            alt="titleImg"
          />
          <LoginBox>
            <span className="login" onClick={loginHandelBtn}>
              LOG IN
            </span>
            <span className="signup" onClick={signUpHandelBtn}>
              SIGN UP
            </span>
          </LoginBox>
        </TitleImg>
      </HeadImage>
      <PreviewBox>
        <PreviewCard>
          {landingList?.map((a, idx) => {
            return <LandingCard {...a} key={idx} />;
          })}
        </PreviewCard>
        <PreviewBtn onClick={mainHandelBtn}>
          <span>VIEW MORE</span>
          <FiChevronRight className="rightArrow" />
        </PreviewBtn>
      </PreviewBox>
      <MidBox>
        <img
          src="https://velog.velcdn.com/images/tty5799/post/7efc282f-c3d9-4d60-9f85-cad81f0bea14/image.png"
          alt="bestImg"
        />
      </MidBox>
      <DetailImg>
        <img
          src="https://velog.velcdn.com/images/tty5799/post/00498018-3c04-455c-b377-86ed00743d4d/image.png"
          alt="detailImg"
        />
      </DetailImg>
      <LastImage>
        <img
          src="https://velog.velcdn.com/images/tty5799/post/2f077193-a88f-4273-808a-a87514975425/image.png"
          alt="lastImg"
        />
      </LastImage>
    </Container>
  );
};

const LastImage = styled.div`
  img {
    margin-top: 5%;
    width: 100%;
  }
`;

const DetailImg = styled.div`
  img {
    width: 100%;

    margin-top: 10%;
  }
`;

const MidBox = styled.div`
  display: flex;
  img {
    margin: 10% auto 0 auto;
    width: 70%;
  }
`;

const PreviewBox = styled.div`
  width: 68%;
  margin: 5% auto 0 auto;
  flex-direction: column;
`;

const PreviewBtn = styled.div`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  margin: 65% auto 0 auto;
  display: flex;
  width: 315px;
  height: 80px;
  background: #d7f1fd;
  box-shadow: 2px 3px 11px #8eb4d7;
  border-radius: 14px;
  span {
    font-size: 36px;
    color: #fff;
    font-weight: 700;
  }
  .rightArrow {
    font-size: 60px;
    margin-top: -5px;
    color: #fff;
  }
`;
const PreviewCard = styled.div`
  @media screen and (max-height: 1000px) {
    height: 500px;
  }
  @media screen and (max-height: 650px) {
    height: 200px;
  }
`;

const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  span {
    font-size: 24px;
    color: #b9daf7;
  }
  .login {
    cursor: pointer;
    margin-right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 164px;
    height: 45px;
    border-radius: 20px;
    background: #ffffff;
    border: 2px solid #b9daf7;
    border-radius: 14px;
    :hover {
      background-color: #b9daf7;
      color: #fff;
    }
  }
  .signup {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 164px;
    height: 45px;
    border-radius: 20px;
    background: #ffffff;
    border: 2px solid #b9daf7;
    border-radius: 14px;
    :hover {
      background-color: #b9daf7;
      color: #fff;
    }
  }
`;

const BackImage = styled.div`
  img {
    width: 93%;
    margin-top: 5%;
  }
`;

const TitleImg = styled.div`
  margin-left: 70%;
  position: absolute;
  margin-top: -50%;
`;

const HeadImage = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
`;

export default Landing;
