import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Footer from "./Footer";
import footer from "../assets/Footer2.svg";

const ModalWindow = (props) => {

  const {
    position,
    top,
    left,
    transform,
    width,
    height,
    bgcolor,
    border,
    borderRadius,
    boxShadow,
    p,
    padding,
    open,
    handleClose,
    children,
  } = props;

  const style = {
    position: position,
    top: top,
    left: left,
    transform: transform,
    width: width,
    height: height,
    bgcolor: bgcolor,
    border: border,
    borderRadius: borderRadius,
    boxShadow: boxShadow,
    p: p,
    padding: padding,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};

ModalWindow.defaultProps = {
  children: null,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "480px",
  height: null,
  bgcolor: "background.paper",
  borderRadius: null,
  p: 0,
  padding: 0,
};

export default ModalWindow;
