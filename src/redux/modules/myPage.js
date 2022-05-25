import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"; //불변성 관리를 위해 사용

import { userInfoApi } from "../../api/userInfoApi";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import instance from "../../api/api";
import { history } from "../configureStore";

import axios from "axios";
import { ConstructionOutlined } from "@mui/icons-material";
import { create } from "@mui/material/styles/createTransitions";

const cookies = new Cookies();
const id = localStorage.getItem("userId");

//actions
const GET_USER = "myPage/GET_USER";
const GET_APPLIED = "myPage/GET_APPLIED";
const GET_RECRUIT = "myPage/GET_RECRUIT";
const GET_APPLIER = "myPage/GET_APPLIER";
const GET_RECRUIT_OVER = "myPage/GET_RECRUIT_OVER";
const GET_APPLIED_OVER = "myPage/GET_APPLIED_OVER";
const POST_EVALUATION = "myPage/POST_EVALUATION";
const PUT_USER_INFO_MOD = "myPage/PUT_USER_INFO_MOD";
const SET_USER_INFO = "myPage/SET_USER_INFO";
const GET_EMAIL = "GET_EMAIL";
const IS_SENDED_EMAIL = "myPage/IS_SENDED_EMAIL";
const UPDATE_EVALUATION_LIST_RECRUIT = "myPage/UPDATE_EVALUATION_LIST_RECRUIT";
const UPDATE_EVALUATION_LIST_POSTER = "myPage/UPDATE_EVALUATION_LIST_POSTER";

//클린업
const INIT_USER_INFO = "myPage/INIT_USER_INFO";

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
//   }
// };
const getEmail = createAction(GET_EMAIL, (data) => ({ data }));
const getUser = createAction(GET_USER, (data_list) => ({ data_list }));
const getApplied = createAction(GET_APPLIED, (appliedData) => ({
  appliedData,
}));
const getRecruit = createAction(GET_RECRUIT, (recruitData) => ({
  recruitData,
}));
const getApplier = createAction(GET_APPLIER, (applierData) => ({
  applierData,
}));
const getRecruitOver = createAction(GET_RECRUIT_OVER, (recruitOverData) => ({
  recruitOverData,
}));
const getAppliedOver = createAction(GET_APPLIED_OVER, (appliedOverData) => ({
  appliedOverData,
}));
// const setUserInfo = createAction(SET_USER_INFO, (userInfo) => ({ userInfo }));
const postEvaluation = createAction(POST_EVALUATION, (evaluationData) => ({
  evaluationData,
}));
const putUserInfoMod = createAction(PUT_USER_INFO_MOD, (userInfoModData) => ({
  userInfoModData,
}));
const isSendedEmail = createAction(IS_SENDED_EMAIL, (data) => ({ data }));
const updateEvaluationListRecruit = createAction(
  UPDATE_EVALUATION_LIST_RECRUIT,
  (receiverIdRecruit) => ({ receiverIdRecruit })
);
const updateEvaluationListPoster = createAction(
  UPDATE_EVALUATION_LIST_POSTER,
  (receiverIdPoster) => ({ receiverIdPoster })
);

//클린업
const initUserInfo = createAction(INIT_USER_INFO, () => ({}));

//initialState
const initialState = {
  isLogin: false,
  user: {
    email: null,
    nickname: null,
  },
  userInfo: [],
  appliedList: [],
  recruitList: [],
  applierList: [],
  recruitOverList: [],
  appliedOverList: [],
  evaluationInfo: {
    postId: "",
    receiverId: "",
    point: 0,
  },
  isSendedEmail: false,
  // requestDto: []
};

//middleware actions

const __getEmail = (email) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await userInfoApi.emailCheck(email);
      console.log(data);
      if (data.msg !== false) {
        dispatch(isSendedEmail());
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//유저 정보 조회
const __getUserInfo = (userId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await userInfoApi.getUserInfo(userId);

      dispatch(getUser(data));
      //   console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
};

//유저정보 "신청중" 조회
const __getApplied = (userId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const appliedData = await userInfoApi.getAppliedList(userId);
      // console.log(appliedData.data);
      dispatch(getApplied(appliedData));
    } catch (err) {
      console.log(err);
    }
  };
};

//유저정보 "모집중" 조회
const __getRecruit = (userId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const recruitData = await userInfoApi.getRecruitList(userId);
      // console.log(recruitData.data);
      dispatch(getRecruit(recruitData));
    } catch (err) {
      console.log(err);
    }
  };
};

//유저정보 "모집중-신청자 명단" 조회
const __getApplier = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const applierData = await userInfoApi.getApplierList(postId);
      // console.log(applierData);
      dispatch(getApplier(applierData));
    } catch (err) {
      console.log(err);
    }
  };
};

//유저정보 "모집마감" 조회
const __getRecruitOver = (userId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const recruitOverData = await userInfoApi.getRecruitOverList(userId);
      // console.log(recruitOverData);
      dispatch(getRecruitOver(recruitOverData));
    } catch (err) {
      console.log(err);
    }
  };
};

//유저정보 "모집마감탭-모집글 참가자" 조회
const __getAppliedOver = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const appliedOverData = await userInfoApi.getAppliedOverList(postId);
      console.log(appliedOverData);
      dispatch(getAppliedOver(appliedOverData));
      // const postUser = appliedOverData.data.postUser
      // const poster = [];
      // poster.push(postUser)
      // console.log(poster)
    } catch (err) {
      console.log(err);
    }
  };
};

//유저 평점 기록하기
const __postEvaluation = (reqeustUserRate) => {
  console.log(reqeustUserRate);
  return async function (dispatch, getState, { hitory }) {
    try {
      const evaluationData = await userInfoApi.postEvaluation(reqeustUserRate);
      console.log(evaluationData);
      dispatch(updateEvaluationListRecruit(reqeustUserRate.receiverId));
      dispatch(updateEvaluationListPoster(reqeustUserRate.receiverId));
    } catch (err) {
      console.log(err);
    }
  };
};

//유저 정보 수정
const __putUserInfoMod = (userId, data, files) => {
  return async function (dispatch, getState, { history }) {
    console.log(data);
    const newProfileImg = data.profileImg;
    localStorage.setItem("profileImg", newProfileImg);
    const formData = new FormData();
    formData.append(
      "requestDto",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      })
    );
    files.map((e) => {
      return formData.append("imgs", e);
    });
    console.log(formData);
    try {
      await userInfoApi.putUserInfoModData(userId, formData);
      history.replace(`/user/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
};

//reducer
export default handleActions(
  {
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload?.data_list;
      }),
    [GET_APPLIED]: (state, action) =>
      produce(state, (draft) => {
        draft.appliedList = action.payload.appliedData;
      }),
    [GET_RECRUIT]: (state, action) =>
      produce(state, (draft) => {
        draft.recruitList = action.payload.recruitData;
      }),
    [GET_APPLIER]: (state, action) =>
      produce(state, (draft) => {
        draft.applierList = action.payload.applierData;
      }),
    [GET_RECRUIT_OVER]: (state, action) =>
      produce(state, (draft) => {
        draft.recruitOverList = action.payload.recruitOverData;
      }),
    [GET_APPLIED_OVER]: (state, action) =>
      produce(state, (draft) => {
        draft.appliedOverList = action.payload.appliedOverData;
      }),
    // [SET_USER_INFO]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.requestDto = action.payload.userInfo;
    //   }),
    [POST_EVALUATION]: (state, dispatch, action) =>
      produce(
        state,
        (draft) => {
          draft.evaluationInfo = action.payload.evaluationData;
        },
        console.log(action)
      ),
    [IS_SENDED_EMAIL]: (state, action) =>
      produce(state, (draft) => {
        cookies.set("123", { path: "/" });
        draft.isSendedEmail = true;
        console.log(state);
      }),
    [UPDATE_EVALUATION_LIST_RECRUIT]: (state, action) =>
      produce(state, (draft) => {
        draft.appliedOverList.data.recruitUserList =
          draft.appliedOverList.data?.recruitUserList.filter(
            (a, idx) => a.userId !== action.payload.receiverIdRecruit
          );
      }),
    [UPDATE_EVALUATION_LIST_POSTER]: (state, action) =>
      produce(state, (draft) => {
        const postUser = state.appliedOverList.data.postUser;
        const poster = [];
        poster.push(postUser);
        console.log(poster);
        console.log(state.appliedOverList.data.postUser);
        // console.log(Object.values(draft.appliedOverList.data.postUser));
        // console.log(action.payload.receiverIdPoster);
        // draft.appliedOverList.data.postUser = poster.filter(
        //   (a, idx) => a.userId !== action.payload.receiverIdPoster
        // );
        draft.appliedOverList.data.postUser = {};
      }),
    [INIT_USER_INFO]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.userInfo = [];
      }),
  },
  initialState
);
// console.log(initialState);

//action creator export
const actionCreators = {
  __getUserInfo,
  __getApplied,
  __getRecruit,
  __getApplier,
  __getRecruitOver,
  __getAppliedOver,
  __postEvaluation,
  postEvaluation,
  // setUserInfo
  __putUserInfoMod,
  initUserInfo,
  getEmail,
  __getEmail,
};

export { actionCreators };
