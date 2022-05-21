import React from "react";
import styled from "styled-components";

const NoPost = () => {
  return (
    <Container>
      <img
        src="https://velog.velcdn.com/images/tty5799/post/e404ff68-760c-43bd-a75d-d31d14417621/image.png"
        alt="logo"
      />
    </Container>
  );
};

const Container = styled.div`
  img {
    display: flex;
    margin: 0 auto;
    width: 70%;
  }
`;

export default NoPost;
