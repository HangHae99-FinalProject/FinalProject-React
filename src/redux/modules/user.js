import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"; //불변성 관리를 위해 사용

import { userApi } from "../../api/userApi";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import instance from "../../api/api";
import { history } from "../configureStore";

import axios from "axios";

const cookies = new Cookies();

//actions
const LOG_IN = "user/LOG_IN";
const LOG_OUT = "user/LOG_OUT";
const CHECK_EMAIL_DUP = "user/CHECK_EMAIL_DUP";
const INIT_CHECK_EMAIL_DUP = "user/INIT_CHECK_EMAIL_DUP";

//action creators
// //redux-actions를 사용하지 않을때의 방법 예시
// const logIn = (user) => {
//   return { type: LOG_IN, user };
// };
// //redux-actions를 사용하지 않을때의 방법 예시
// const reducer = (state = {}, action = {}) => {
//   switch (action.type) {
//     case "LOG_IN": {
//       state.user = action.user;
//     }
//   }
// };
const login = createAction(LOG_IN, (user) => ({ user }));
const logout = createAction(LOG_OUT, (user) => ({ user }));
const checkEmailDup = createAction(CHECK_EMAIL_DUP, (checkEmailAlert) => ({ checkEmailAlert }));
const initCheckEmailDup = createAction(INIT_CHECK_EMAIL_DUP, () => ({}));

//initialState
const initialState = {
  isLogin: false,
  user: {
    email: null,
    nickname: null,
  },
  userInfo: [],
  checkEmailDup: {},
  checkNicknameDup: {},
  initInput: "",
};

const userInitial = {
  userName: "jmp",
};

//middleware actions
const __login = (_memberId, password) => {
  return async function (dispatch, getState, { history }) {
    try {
      const loginData = await axios.post("http://3.34.135.82:8080/user/login", {
        memberId:_memberId,
        password,
      });
      const {accessToken, refreshToken, accessTokenExpiresIn } = loginData.data.data.token
      // console.log(accessToken)
      // console.log(refreshToken)
      // console.log(accessTokenExpiresIn)
      const { sub, memberId, nickname, major } = jwt_decode(accessToken);
      console.log(
        "userid:",
        sub,
        "memberId:",
        memberId,
        "닉네임:",
        nickname,
        "전공:",
        major
      );
      cookies.set("accessToken", accessToken, {
        path: "/",
        maxAge: 3600, // 60분
      });
      cookies.set("refreshToken", refreshToken, {
        path: "/",
        maxAge: 604800, // 7일
      });
      localStorage.setItem("userId", sub);
      localStorage.setItem("memberId", memberId);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("major", major);
      dispatch(login());
      window.alert(`${nickname}님 반갑습니다~`);
      history.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
};

const __signup = (memberId, password, pwCheck) => {
  return async (dispatch, getState, { history }) => {
    try {
      const signup = await axios.post("http://3.34.135.82:8080/user/signup", {
        memberId,
        password,
        pwCheck,
      });
      console.log(signup);
      // if (signup.data) {
      //   window.alert("회원가입이 완료되었습니다.");
      //   history.replace("/login");
      // }
    } catch (err) {
      console.log(err);
      if (err.errorCode === 400) {
        window.alert("오류가 발생했습니다.");
        console.log(err.errorCode, err.errorMessage);
      }
    }
  };
};

const __emailCheck =
  (email) =>
  async (dispatch, getState, { hisory }) => {
    try {
      const checkEmailAlert = await axios.post("http://3.34.135.82:8080/user/emailCheck", {
        email,
      });
      console.log(checkEmailAlert);
      // dispatch(checkEmailDup(checkEmailAlert));
      if (checkEmailAlert.data.errorCode === "200") {
        window.alert("입력하신 이메일은 사용이 가능합니다.");
      } else if (checkEmailAlert.data.errorCode !== "200") {
        dispatch(checkEmailDup(checkEmailAlert));
        window.alert("다른 이메일을 사용해주세요.");
        return;
      }
    } catch (err) {
      console.log(err);
      window.alert("입력하신 이메일은 사용이 불가능합니다.");
    }
  };

const __nicknameCheck =
  (nickname) =>
  async (dispatch, getState, { hisory }) => {
    try {
      await userApi.nicknameCheck(nickname);
      window.alert("입력하신 닉네임은 사용이 가능합니다.");
    } catch (err) {
      console.log(err);
      window.alert("입력하신 닉네임은 사용이 불가능합니다.");
    }
  };

const __logout = () => {
  return async function (dispatch, getState) {
    try {
      localStorage.removeItem("major");
      localStorage.removeItem("memberId");
      localStorage.removeItem("nickname");
      localStorage.removeItem("userId");
      cookies.remove("isLogin", { path: "/" });
      cookies.remove("accessToken", { path: "/" });
      cookies.remove("refreshToken", { path: "/" });

      await dispatch(logout());
      window.alert("로그아웃되었습니다.");
      history.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
};

const __loginCheck = () => {
  return function (dispatch, getState, { history }) {
    const tokenCheck = cookies.get("accessToken");
    if (tokenCheck) {
      dispatch(login());
      return;
    } else {
      dispatch(logout());
      console.log("로그인을 다시 해주세요");
      history.replace("/");
    }
  };
};

//reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        cookies.set("isLogin", "success", { path: "/" });
        // draft.user = action.payload.user;
        draft.isLogin = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem("major");
        localStorage.removeItem("email");
        localStorage.removeItem("nickname");
        localStorage.removeItem("profileImgUrl");
        localStorage.removeItem("userId");
        cookies.remove("isLogin", { path: "/" });
        cookies.remove("accessToken", { path: "/" });
        cookies.remove("refreshToken", { path: "/" });
        draft.user = null;
        draft.isLogin = false;
      }),
    [CHECK_EMAIL_DUP]: (state, action) =>
      produce(state, (draft) => {
        draft.checkEmailDup = action.payload?.checkEmailAlert;
      }),
    [INIT_CHECK_EMAIL_DUP]: (state, action) =>
      produce(state, (draft) => {
        draft.checkEmailDup = {};
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  __login,
  __emailCheck,
  __nicknameCheck,
  __signup,
  __logout,
  __loginCheck,
  login,
  initCheckEmailDup,
};

export { actionCreators };
