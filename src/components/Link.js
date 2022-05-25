import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Link = () => {
  const pathName = useLocation();

  if (pathName.pathname === "/") {
    return null;
  }
  if (pathName.pathname === "/main") {
    return null;
  }
  return (
    <LinkImage>
      <div className="help-tip">
        <p>설문조사에 참여해 주세요! </p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfwLz8IG1fdkeqcVlABNK806-R1FbkWO1PyD-Qr3OWti_K_9A/viewform?usp=sf_link">
          <img
            src="https://velog.velcdn.com/images/tty5799/post/669db19d-5a4c-49f7-ab32-aab0304cf14e/image.svg"
            alt="linkImage"
            className="shake-right"
          />
        </a>
      </div>
    </LinkImage>
  );
};

const LinkImage = styled.div`
  position: fixed;
  /* top: 80%; */
  top: 20%;
  left: 4%;
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
    background-color: #4299e9;
    padding: 20px;
    width: 200px;
    position: absolute;
    left: -45%;
    top: -110%;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.4;
  }

  .help-tip p:before {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: #4299e9;
    right: 45%;
    top: 100%;
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
  .shake-right {
    -webkit-animation: shake-right 5s ease-out 0s infinite both;
    animation: shake-right 5s ease-out 0s infinite both;
  }
  @-webkit-keyframes shake-right {
    0%,
    100% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transform-origin: 100% 50%;
      transform-origin: 100% 50%;
    }
    10% {
      -webkit-transform: rotate(2deg);
      transform: rotate(2deg);
    }
    20%,
    40%,
    60% {
      -webkit-transform: rotate(-4deg);
      transform: rotate(-4deg);
    }
    30%,
    50%,
    70% {
      -webkit-transform: rotate(4deg);
      transform: rotate(4deg);
    }
    80% {
      -webkit-transform: rotate(-2deg);
      transform: rotate(-2deg);
    }
    90% {
      -webkit-transform: rotate(2deg);
      transform: rotate(2deg);
    }
  }
  @keyframes shake-right {
    0%,
    100% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transform-origin: 100% 50%;
      transform-origin: 100% 50%;
    }
    10% {
      -webkit-transform: rotate(2deg);
      transform: rotate(2deg);
    }
    20%,
    40%,
    60% {
      -webkit-transform: rotate(-4deg);
      transform: rotate(-4deg);
    }
    30%,
    50%,
    70% {
      -webkit-transform: rotate(4deg);
      transform: rotate(4deg);
    }
    80% {
      -webkit-transform: rotate(-2deg);
      transform: rotate(-2deg);
    }
    90% {
      -webkit-transform: rotate(2deg);
      transform: rotate(2deg);
    }
  }

  img {
    cursor: pointer;
    width: 100px;
  }
`;

export default Link;
