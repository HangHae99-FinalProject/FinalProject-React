import { minHeight } from "@mui/system";
import React from "react";
import styled from "styled-components";
import footerImage from "../assets/Footer.svg";
import footer from "../assets/Footer2.svg";

const Footer = (props) => {
  const { position, width, bottom, borderRadius } = props;
  const styles = {
    position: position,
    width: width,
    bottom: bottom,
    borderRadius: borderRadius,
  };
  // const _styles = { width: width };
  return <Image {...styles} src={footer} alt="footer" />;
};
Footer.defaultProps = {
  position: null,
  width: "100vw",
  borderRadius: null,
};

const Image = styled.img`
  width: ${(props) => props.width};
  z-index: -10;
  position: ${(props) => props.position};
  bottom: 0;
  left: 0;
  border-radius: ${(props) => props.borderRadius};
`;

// const Footers = styled.footer`
//   z-index: 9999;
//   position: ${(props) => props.position};
//   bottom: 0px;
//   left: 0;
//   width: 1920px;
// `;

export default Footer;
