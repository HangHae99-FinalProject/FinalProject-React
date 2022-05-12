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
// const SET_USER = "user/SET_USER";

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
// const setUser = createAction(SET_USER, (user) => ({ user }));

//initialState
const initialState = {
  isLogin: false,
  user: {
    email: null,
    nickname: null,
  },
  userInfo: [],
};

const userInitial = {
  userName: "jmp",
};

//middleware actions
const __login = (userEmail, password) => {
  return async function (dispatch, getState, { history }) {
    try {
      const {
        data: { accessToken, refreshToken, accessTokenExpiresIn },
      } = await axios.post("http://3.34.135.82:8080/user/login", {
        email: userEmail,
        password,
      });
      const { sub, email, nickname, profileImg, major } = jwt_decode(accessToken);
      console.log(
        "userid:",
        sub,
        "이메일:",
        email,
        "닉네임:",
        nickname,
        "프로필:",
        profileImg,
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
      localStorage.setItem("email", email);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("profileImgUrl", profileImg);
      localStorage.setItem("major", major);
      dispatch(login());
      window.alert(`${nickname}님 반갑습니다~`);
      history.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
};

const __signup = (email, password, pwCheck, nickname, major) => {
  return async (dispatch, getState, { history }) => {
    try {
      const signup = await axios.post("http://3.34.135.82:8080/user/signup", {
        email,
        password,
        pwCheck,
        nickname,
        major,
      });
      console.log(signup);
      if (signup.data) {
        window.alert("회원가입이 완료되었습니다.");
        history.replace("/login");
      }
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
      await userApi.emailCheck(email);
      window.alert("입력하신 이메일은 사용이 가능합니다.");
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
      localStorage.removeItem("email");
      localStorage.removeItem("nickname");
      localStorage.removeItem("profileImgUrl");
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

// const __signup =
//   (email, password, pwCheck, nickname) =>
//   (dispatch, getState, { history }) => {
//     userApi
//       .signup(email, password, pwCheck, nickname)
//       .then((user) => {
//         console.log(user);
//         window.alert("회원가입이 완료되었습니다.");
//         history.replace("/login");
//       })
//       .catch((err) => {
//         if (err.errorCode === 400) {
//           window.alert("오류가 발생했습니다.");
//           console.log(err.errorCode, err.errorMessage);
//         }
//       });
//   };

// const loginCheckFB = () => {
//   return function (dispatch, getState, { history }) {
//     auth.onAuthStateChanged((user) => {
//       if (user) {
//         dispatch(
//           setUser({ user_name: user.displayName, user_profile: "", id: user.email, uid: user.uid })
//         );
//       } else {
//         dispatch(logOut());
//       }
//     });
//   };
// };

// const logoutFB = () => {
//   return function (dispatch, getState, { history }) {
//     auth.signOut().then(() => {
//       dispatch(logOut());
//       //.replace는 현재의 페이지를 소괄호안의 페이지를 교체한다는 의미.
//       //예를 들어,
//       //메인페이지 > 로그인페이지 > 게시물작성페이지 의 순서대로 history가 쌓여 있을 때,
//       //게시물작성페이지에서 로그아웃을 하게 된다면
//       //.push("/")의 경우에는
//       //메인페이지 > 로그인페이지 > 게시물작성페이지 > 메인페이지 의 history가 된다.
//       //뒤로가기 버튼을 클릭한다면 로그아웃 상태임에도 게시물작성페이지로 진입하게 되는 문제가 발생한다.
//       //.replace("/")의 경우에는
//       //메인페이지 > 로그인페이지 > 메인페이지 의 history가 된다.
//       //게시물작성페이지에서 로그아웃을 한다면 메인페이지를 history에 추가하지 않고
//       //현재 페이지인 게시물작성페이지를 메인페이지로 대체한다.
//       //이 때 뒤로가기 버튼을 클릭한다면 로그인페이지로 이동하게 되고 문제는 해결된다.
//       history.replace("/");
//     });
//   };
// };

//reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        cookies.set("isLogin", "success", { path: "/" });
        // draft.user = action.payload.user;
        draft.isLogin = true;
      }),
    // [SET_USER]: (state, action) =>
    //   produce(state, (draft) => {
    //     setCookie("is_login", "success");
    //     draft.user = action.payload.user;
    //     draft.is_login = true;
    //   }),
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
};

export { actionCreators };
