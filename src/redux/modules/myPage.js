import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"; //불변성 관리를 위해 사용

import { userInfoApi } from "../../api/userInfoApi";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import instance from "../../api/api";
import { history } from "../configureStore";

import axios from "axios";
import { ConstructionOutlined } from "@mui/icons-material";

const cookies = new Cookies();

//actions
const GET_USER = "myPage/GET_USER";
const GET_APPLIED = "myPage/GET_APPLIED";
const GET_RECRUIT = "myPage/GET_RECRUIT";
const GET_APPLIER = "myPage/GET_APPLIER";
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
//   }
// };
const getUser = createAction(GET_USER, (data_list) => ({ data_list }));
const getApplied = createAction(GET_APPLIED, (appliedData) => ({ appliedData }));
const getRecruit = createAction(GET_RECRUIT, (recruitData) => ({ recruitData }));
const getApplier = createAction(GET_APPLIER, (applierData) => ({ applierData }));
// const setUser = createAction(SET_USER, (user) => ({ user }));

//initialState
const initialState = {
  isLogin: false,
  user: {
    email: null,
    nickname: null,
  },
  userInfo: [],
  appliedList: [{}],
  recruitList: [{}],
  applierList: [],
};

//middleware actions
const __getUserInfo = (userId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await userInfoApi.getUserInfo(userId);
      dispatch(getUser(data));
      // const {userId, nickname, profileImg, major, intro, portfolioLink, currentImgUrl, imgs } = {...data};

      //   console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
};
const __getApplied = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const appliedData = await userInfoApi.getAppliedList();
      // console.log(appliedData.data);
      dispatch(getApplied(appliedData));
    } catch (err) {
      console.log(err);
    }
  };
};

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

const __getApplier = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const applierData = await userInfoApi.getApplierList(postId);
      console.log(applierData);
      dispatch(getApplier(applierData));
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
        draft.appliedList = action.payload?.appliedData;
      }),
    [GET_RECRUIT]: (state, action) =>
      produce(state, (draft) => {
        draft.recruitList = action.payload?.recruitData;
      }),
    [GET_APPLIER]: (state, action) =>
      produce(state, (draft) => {
        draft.applierList = action.payload?.applierData;
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  __getUserInfo,
  __getApplied,
  __getRecruit,
  __getApplier,
};

export { actionCreators };
