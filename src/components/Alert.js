import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiTwotoneBell } from "react-icons/ai";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import {
  Paper,
  Badge,
  Menu,
  MenuItem,
  Snackbar,
  CircularProgress,
} from "@mui/material";

const cookies = new Cookies();

const Alertmsg = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alert = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notification, setNotification] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [notificationColor, setNotificationColor] = useState("red");
  const notificationOpen = Boolean(anchorEl);
  const isLogin = useSelector((state) => state.user.isLogin);
  // console.log(isLogin);
  // console.log(notification);
  const accessToken = cookies.get("accessToken");
  const user = localStorage.getItem("userID");

  const EventSource = EventSourcePolyfill || NativeEventSource;

  useEffect(() => {
    if (isLogin) {
      const source = new EventSource("https://everymohum.shop/subscribe", {
        headers: {
          Authorization: accessToken,
        },
      });
      // source.addEventListener("addComment", function (event) {
      //   console.log(event);
      //   console.log(event.data);
      // });
      source.onmessage = (e) => {
        console.log(e.data);
        if (e.type === "message" && e.data.startsWith("{")) {
          setNotification((prev) => [...prev, JSON.parse(e.data)]);
          setAlertOpen(true);
          console.log(notification);
          // unreadMessage();
        }
      };
      source.addEventListener(
        "message",
        function (e) {
          console.log(e.data);
        },
        false
      );

      source.addEventListener("error", function (e) {
        console.log(e);
        source.close();
        // source.addEventListener("open", function (e) {
        //   console.log(e);
        // });
      });
    }
  }, [isLogin]);

  // const handleClick = (event) => {
  //   refetch();
  //   setAnchorEl(event.currentTarget);
  //   //unreadRefetch();
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  return (
    <Container>
      {/* <AiTwotoneBell className="icon" /> */}

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleAlertClose}
      >
        <Alertmsg onClose={handleAlertClose} severity="success">
          {notification[notification.length - 1]?.content}
        </Alertmsg>
      </Snackbar>
    </Container>
  );
};

const Container = styled.div`
  /* position: fixed;
  background-color: azure;
  border: 1px solid gray;
  /* border-radius: 50%; */
  /* padding: 10px;
  top: 25%;
  left: 80%;
  .icon {
    font-size: 50px;
  } */
`;
const CategoryMiddleWrapper = styled.div``;

export default Alert;
