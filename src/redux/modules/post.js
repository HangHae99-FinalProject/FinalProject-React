import React from "react";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { postApi } from "../../api/postApi";
import { actionCreators as commentActions } from "../modules/comment";
import axios from "axios";

// 액션
const SET_POST = "SET_POST";
const SET_DETAIL = "SET_DETAIL";
const CLEAR_POST = "CLEAR_POST";

// 신청하기
const ADD_APPLY = "ADD_APPLY";
const DELETE_APPLY = "DELETE_APPLY";
const LOGIN_DETAIL = "LOGIN_DETAIL";

// 액션 크리에이터
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const setDetail = createAction(SET_DETAIL, (detail_list) => ({ detail_list }));
const setLoginDetail = createAction(SET_DETAIL, (detail_list) => ({
  detail_list,
}));
const clearPost = createAction(CLEAR_POST, () => ({}));
// 신청하기
const addApply = createAction(ADD_APPLY, (apply) => ({ apply }));
const deleteApply = createAction(DELETE_APPLY, (apply) => ({ apply }));
// const editPost = createAction(EDIT_POST, (post_list) => ({ post_list }));
// const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

// 초기값
const initialState = {
  apply: "",
  list: [],
  is_loading: false,
  detailList: [],
};

//미들웨어

// 신청하기
// const aaa = () => {
//   return postApi.deleteApply(postId);
// };

const __postApply =
  (postId, data) =>
  async (dispatch, getState, { history }) => {
    try {
      const { res } = await postApi.postApply(postId, data);
      dispatch(addApply("applicant"));
    } catch (err) {
      console.log(err);
    }
  };

const __deleteApply =
  (postId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await postApi.deleteApply(postId);
      dispatch(addApply("user"));
    } catch (err) {
      console.log(err);
    }
  };

// 메인,게시글
const __deletePost =
  (postId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await postApi.deletePost(postId);
      history.replace("/");
      alert("삭제가 완료됐습니다!");
    } catch (err) {
      console.log(err);
    }
  };

const __editPost =
  (data, postId, Files) =>
  async (dispatch, getState, { history }) => {
    const formData = new FormData();

    formData.append(
      "data",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      })
    );
    Files.map((e) => {
      return formData.append("img", e);
    });
    try {
      await postApi.editPost(postId, formData);

      history.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

const __addPost =
  (data) =>
  async (dispatch, getState, { history }) => {
    const formData = new FormData();
    const images = getState().image.files;

    formData.append(
      "data",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      })
    );

    images.map((e) => {
      return formData.append("img", e);
    });

    try {
      await postApi.postWrite(formData);
      history.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

const __loginGetDetail =
  (postId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await postApi.loginGetDetail(postId);

      dispatch(commentActions.getComment(data.data.commentList));
      dispatch(setDetail(data.data));
    } catch (err) {
      console.log(err);
    }
  };

const __getDetail =
  (postId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await postApi.getDetail(postId);
      console.log(data.data);

      dispatch(commentActions.getComment(data.data.commentList));
      dispatch(setDetail(data.data));
    } catch (err) {
      console.log(err);
    }
  };

const __getPost =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await postApi.getPost();
      dispatch(setPost(data));
    } catch (err) {
      console.log(err);
    }
  };

// 리덕스
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
        draft.is_loading = false;
      }),
    [SET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detailList = action.payload.detail_list;
      }),
    [LOGIN_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detailList = action.payload.detail_list;
      }),
    [ADD_APPLY]: (state, action) =>
      produce(state, (draft) => {
        draft.detailList.userStatus = action.payload.apply;
      }),
    [CLEAR_POST]: (state, action) =>
      produce(state, (draft) => {
        return initialState;
      }),
  },
  initialState
);

const actionCreates = {
  __addPost,
  __getPost,
  setPost,
  __getDetail,
  setDetail,
  __editPost,
  __deletePost,
  __loginGetDetail,
  setLoginDetail,
  addApply,
  __postApply,
  __deleteApply,
  deleteApply,
  clearPost,
};

export { actionCreates };
