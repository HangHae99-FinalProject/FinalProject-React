import React from "react";
import styled from "styled-components";

const NoPost = () => {
  return (
    <Container>
      <img
        src="https://velog.velcdn.com/images/tty5799/post/4a28ba5d-ffce-40d9-a3e4-2395b9e20448/image.png"
        alt="logo"
      />
    </Container>
  );
};

const Container = styled.div`
  img {
    display: flex;
    margin: 2% auto;
    width: 90%;
  }
`;

export default NoPost;
