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
import { chatApi } from "../api/chatApi";
import { Link, Redirect, useLocation } from "react-router-dom";
import { history } from "../redux/configureStore";

const cookies = new Cookies();

const Alertmsg = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alert = () => {
  const [notification, setNotification] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [is_open, setIs_open] = useState(false);
  const [notificationCnt, setNotificationCnt] = useState();
  const location = useLocation();

  const isLogin = useSelector((state) => state.user.isLogin);
  // console.log(isLogin);
  // console.log(notification);
  const accessToken = cookies.get("accessToken");
  const user = localStorage.getItem("userID");

  const EventSource = EventSourcePolyfill || NativeEventSource;

  useEffect(() => {
    if (isLogin) {
      const source = new EventSource(
        "https://everymohum.shop/subscribe",

        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      source.onmessage = (e) => {
        if (e.type === "message" && e.data.startsWith("{")) {
          setAlertOpen(true);
        }
      };

      source.addEventListener("error", function (e) {
        source.close();
      });
    }
  }, [isLogin]);

  const handelOpenMessage = (id, url, status) => {
    window.location.href = url;

    setIs_open(false);

    if (status === false) {
      chatApi
        .notificationRead(id)
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handelOpenBtn = () => {
    setIs_open(!is_open);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  useEffect(() => {
    chatApi
      .notifications()
      .then((res) => {
        console.log(res.data);
        setNotification(res.data);
        console.log(notification);
      })
      .catch((err) => console.log(err));
    chatApi
      .notificationsCnt()
      .then((res) => {
        console.log(res.data.count);
        setNotificationCnt(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [alertOpen]);

  return (
    <Container>
      {is_open ? (
        <div className="listBox">
          {notification.map((a, idx) => {
            return (
              <NotificationsList
                key={idx}
                onClick={() => {
                  handelOpenMessage(a.id, a.url, a.status);
                }}
              >
                <span
                  className={
                    a.status === true ? "readMessage" : "notificationsMsg"
                  }
                >
                  {a.content}
                </span>
                <div className="line" />
              </NotificationsList>
            );
          })}
        </div>
      ) : null}
      <div className={notificationCnt ? "notifications-cnt" : "cnt-zero"}>
        {notificationCnt}
      </div>

      <img
        src="https://velog.velcdn.com/images/tty5799/post/7fd59818-7932-4120-9c52-cdbc3615228c/image.png"
        alt=""
        className="imgBox"
        onClick={handelOpenBtn}
      />

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

const NotificationsList = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  height: auto;
  .readMessage {
    font-size: 19px;
    font-weight: bold;
    line-height: 1.4;
    margin-bottom: 10px;
  }
  .notificationsMsg {
    font-size: 19px;
    font-weight: bold;
    line-height: 1.4;
    margin-bottom: 10px;
    color: red;
  }

  .line {
    width: 340px;
    height: 2px;
    background-color: gray;
  }
  :hover {
    color: #b9daf7;
  }
`;

const Container = styled.div`
  .notifications-cnt {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background: #b9daf7;
    border-radius: 12px;
    width: 22px;
    height: 22px;
    color: #2967ac;
    font-size: 16px;
    font-weight: bold;
    border-radius: 50%;
    text-align: center;
    margin-left: 20px;
    z-index: 9999%;
    right: 6.3%;
    top: 85%;
  }
  .cnt-zero {
    background-color: transparent;
  }
  .listBox {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 2px solid gray;
    /* padding: 20px; */
    width: 350px;
    height: 296px;
    position: fixed;
    right: 10%;
    top: 60%;
    overflow: auto;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  img {
    position: fixed;
    top: 86%;
    right: 7%;
    cursor: pointer;
  }
`;

export default Alert;
