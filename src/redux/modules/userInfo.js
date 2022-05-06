import { createAction, handleActions } from "redux-actions";
import { produce } from "immer"; //불변성 관리를 위해 사용

import { userInfoApi } from "../../api/userInfoApi";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { history } from "../configureStore";

import axios from "axios";

const cookies = new Cookies();

//actions
const EDIT_USER = "userInfo/EDIT_USER";
const SET_USER = "userInfo/SET_USER"

//actionCreators
const editUser = createAction(EDIT_USER, (userInfo) => ({ userInfo }));

//initialState

//middleware
// const __editUser = (
//   profileImgUrl,
//   nickname,
//   is_cate,
//   intro,
//   portfolioLink,
//   currentImgUrl,
//   { imgs }
// ) => {
//   return async function (dispatch, getState, { history }) {
//     try {
//       const Temp = await userInfoApi.userInfoApi(
//         profileImgUrl,
//         nickname,
//         is_cate,
//         intro,
//         portfolioLink,
//         currentImgUrl,
//         { imgs }
//       );

//       history.replace("/user/:id");
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

//reducer

//action creator export
const actionCreators = {
//   __editUser,
};

export { actionCreators };
