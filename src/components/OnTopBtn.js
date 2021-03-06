import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const OnTopBtn = () => {
  const [is_ScrollY, setIs_ScrollY] = useState(0);
  const [onBtnStatus, setOnBtnStatus] = useState(false);

  const handelFollow = () => {
    setIs_ScrollY(window.scrollY);
    if (is_ScrollY > 100) {
      setOnBtnStatus(true);
    } else {
      setOnBtnStatus(false);
    }
  };
  const handelTopBtn = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handelFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handelFollow);
    };
  });

  return (
    <>
      {onBtnStatus === false ? null : (
        <OnBtn onClick={handelTopBtn}>
          <img
            src="https://velog.velcdn.com/images/tty5799/post/fe4c26c9-85e4-49df-9190-950297df48ab/image.svg"
            alt=""
          />
        </OnBtn>
      )}
    </>
  );
};

const OnBtn = styled.div`
  position: fixed;
  top: 80%;
  right: 7%;
  cursor: pointer;
`;

export default OnTopBtn;
