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

  const isLogin = useSelector((state) => state.user.isLogin);
  console.log(isLogin);

  const loginHandelBtn = () => {
    history.push("/login");
  };
  const signUpHandelBtn = () => {
    history.push("/signup");
  };
  const mainHandelBtn = () => {
    history.push("/main");
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    dispatch(postActions.__getLanding());
  }, [pathName]);

  return (
    <Container>
      <HeadImage>
        <div>
          <BackImage>
            <img
              src="https://velog.velcdn.com/images/tty5799/post/44b3ddb0-6532-431f-a249-933b59d8b327/image.png"
              alt="backImg"
            />
          </BackImage>
        </div>
        <div>
          <TitleImg>
            <img
              src="https://velog.velcdn.com/images/tty5799/post/ca07d3ee-2bdb-4825-b3f3-cb1f3582e818/image.png"
              alt="titleImg"
            />
            <LoginBox>
              {isLogin ? (
                <span className="login" onClick={mainHandelBtn}>
                  GO HOME
                </span>
              ) : (
                <span className="login" onClick={loginHandelBtn}>
                  LOG IN
                </span>
              )}

              <span className="signup" onClick={signUpHandelBtn}>
                SIGN UP
              </span>
            </LoginBox>
          </TitleImg>
        </div>
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
        <Scrollbar>
          <ImageScroll>
            <img
              src="https://velog.velcdn.com/images/tty5799/post/39a8d144-f810-4b4e-a8f3-1c59cdca54fa/image.png"
              alt="bestImg"
            />
            <img
              src="https://velog.velcdn.com/images/tty5799/post/a207d900-8227-4fb1-854a-4781287b50b4/image.png"
              alt="bestImg"
            />
            <img
              src="https://velog.velcdn.com/images/tty5799/post/d47aab59-55b1-4155-bfac-ec69bba32c2c/image.png"
              alt="bestImg"
            />
            <img
              src="https://velog.velcdn.com/images/tty5799/post/9542c9c7-a7bb-4c2c-ae8f-52ca409fca52/image.png"
              alt="bestImg"
            />
            <img
              src="https://velog.velcdn.com/images/tty5799/post/519fb1b4-29e8-4c80-927b-cf219a2cdeb1/image.png"
              alt="bestImg"
            />
            <img
              src="https://velog.velcdn.com/images/tty5799/post/806c1bce-d170-475d-8b51-e799b87e2947/image.png"
              alt="bestImg"
            />
            <img
              src="https://velog.velcdn.com/images/tty5799/post/a44a32e9-8723-4c4c-95ac-9165b333530e/image.png"
              alt="bestImg"
            />
          </ImageScroll>
        </Scrollbar>
      </MidBox>

      <LastImage>
        <img
          src="https://velog.velcdn.com/images/tty5799/post/e586c4aa-8716-40cc-8fb0-9e44b511dd2e/image.png"
          alt="lastImg"
        />
      </LastImage>
    </Container>
  );
};

const LastImage = styled.div`
  img {
    width: 100%;
  }
`;

const ImageScroll = styled.div`
  img {
    display: flex;
    width: 1260px;
    height: 310px;
    margin-bottom: 100px;
  }
`;

const Scrollbar = styled.div`
  width: 98%;
  overflow: auto;
  height: 852px;
  display: flex;
  justify-content: center;

  -ms-overflow-style: {
    height: 70%;
  }
  /* margin-right: 20px; */

  &::-webkit-scrollbar-thumb {
    background-color: #03517d;
    width: 10px;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff;
    border-radius: 20px;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }
`;

const MidBox = styled.div`
  width: 100%;
  height: 1006px;
  background-color: #b9daf6;
  margin: 10% auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
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
  height: 100%;
`;

export default Landing;
