import React from "react";
import styled from "styled-components";

const Landing = () => {
  return (
    <Container>
      <HeadImage>
        <TitleImg>
          <img
            src="https://velog.velcdn.com/images/tty5799/post/ca07d3ee-2bdb-4825-b3f3-cb1f3582e818/image.png"
            alt="titleImg"
          />
        </TitleImg>
      </HeadImage>
    </Container>
  );
};

const TitleImg = styled.div``;

const HeadImage = styled.div`
  background-image: url("https://velog.velcdn.com/images/tty5799/post/44b3ddb0-6532-431f-a249-933b59d8b327/image.png");
  width: 100%;
  height: 1180px;
  background-position: center;
  background-size: cover;
`;

const Container = styled.div`
  height: 6320px;
  width: 1920px;
`;

export default Landing;
