import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Footer from "./Footer";

const ModalWindow = (props) => {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

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
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
  // border: "2px solid #000",
  borderRadius: null,
  // boxShadow: 24,
  p: 4,
  padding: 0,
};

export default ModalWindow;
