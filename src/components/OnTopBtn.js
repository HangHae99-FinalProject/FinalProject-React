import React from "react";
import styled from "styled-components";

const OnTopBtn = () => {
  const handelTopBtn = () => {
    window.scrollTo(0, 0);
  };

  return (
    <OnBtn onClick={handelTopBtn}>
      <img
        src="https://velog.velcdn.com/images/tty5799/post/fe4c26c9-85e4-49df-9190-950297df48ab/image.svg"
        alt=""
      />
    </OnBtn>
  );
};

const OnBtn = styled.div`
  position: fixed;
  top: 80%;
  right: 7%;
  cursor: pointer;
`;

export default OnTopBtn;
