import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const OnDownBtn = () => {
  const [is_ScrollY, setIs_ScrollY] = useState(0);

  const handelFollow = () => {
    setIs_ScrollY(window.scrollY);
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

  const handelDownBtn = () => {
    window.scrollTo(2450, 2450);
  };

  return (
    <>
      {is_ScrollY > 2450 ? null : (
        <DownBtn onClick={handelDownBtn}>
          <img
            src="https://velog.velcdn.com/images/tty5799/post/e925267e-a8e3-4e9f-bcd0-7ba52580e61e/image.png"
            alt=""
          />
        </DownBtn>
      )}
    </>
  );
};

const DownBtn = styled.div`
  position: fixed;
  top: 90%;
  right: 7%;
  cursor: pointer;
`;

export default OnDownBtn;
