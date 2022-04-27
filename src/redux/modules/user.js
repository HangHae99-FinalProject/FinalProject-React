import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"; //불변성 관리를 위해 사용

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import { auth } from "../../shared/firebase";

import firebase from "firebase/compat/app";

import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";

//actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

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
// const logIn = createAction(LOG_IN, (user) => ({ user })); //미사용
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

//initialState
const initialState = {
  user: null,
  is_login: false,
};

const user_initial = {
  user_name: "jmp",
};

//middleware actions
const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          console.log(user);
          dispatch(setUser({ user_name: user.user.displayName, id: id, user_profile: "", uid: user.user.uid }));
          history.push("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    });
  };
};

const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        console.log(user);
        auth.currentUser
          .updateProfile({
            displayName: user_name,
          })
          .then(() => {
            dispatch(setUser({ user_name: user_name, id: id, user_profile: "", uid: user.user.uid }));
            history.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
        // Signed in
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
        // ..
      });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({ user_name: user.displayName, user_profile: "", id: user.email, uid: user.uid }));
      } else {
        dispatch(logOut());
      }
    });
  };
};

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
      //.replace는 현재의 페이지를 소괄호안의 페이지를 교체한다는 의미.
      //예를 들어,
      //메인페이지 > 로그인페이지 > 게시물작성페이지 의 순서대로 history가 쌓여 있을 때,
      //게시물작성페이지에서 로그아웃을 하게 된다면
      //.push("/")의 경우에는
      //메인페이지 > 로그인페이지 > 게시물작성페이지 > 메인페이지 의 history가 된다.
      //뒤로가기 버튼을 클릭한다면 로그아웃 상태임에도 게시물작성페이지로 진입하게 되는 문제가 발생한다.
      //.replace("/")의 경우에는
      //메인페이지 > 로그인페이지 > 메인페이지 의 history가 된다.
      //게시물작성페이지에서 로그아웃을 한다면 메인페이지를 history에 추가하지 않고
      //현재 페이지인 게시물작성페이지를 메인페이지로 대체한다.
      //이 때 뒤로가기 버튼을 클릭한다면 로그인페이지로 이동하게 되고 문제는 해결된다.
      history.replace("/");
    });
  };
};

//reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

//action creator export
const actionCreators = {
  // logIn, //미사용
  logOut,
  getUser,
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };
