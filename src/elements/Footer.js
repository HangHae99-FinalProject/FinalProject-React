import React from "react";
import styled from "styled-components";
import footerImage from "../assets/Footer.svg";

const Footer = () => {
  return (
    <Footers>
      <Image src={footerImage} alt="footer" />
    </Footers>
  );
};
const Image = styled.img``;

const Footers = styled.footer`
  z-index: 9999;
  bottom: 0px;
  left: 0;
  width: 100%;
`;

export default Footer;
