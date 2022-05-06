import React from "react";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { postApi } from "../../api/postApi";
import { actionCreators as commentActions } from "../modules/comment";

// 액션
const SET_POST = "SET_POST";
const SET_DETAIL = "SET_DETAIL";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

// 액션 크리에이터
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const setDetail = createAction(SET_DETAIL, (detail_list) => ({ detail_list }));
const addPost = createAction(ADD_POST, (post_list) => ({ post_list }));
const editPost = createAction(EDIT_POST, (post_list) => ({ post_list }));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

// 초기값
const initialState = {
  list: [],
  is_loading: false,
  detailList: [],
};

//미들웨어

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
      const data = await postApi.editPost(postId, formData);
      console.log(data);
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
      const data = await postApi.postWrite(formData);
      history.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

const __getDetail =
  (postId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await postApi.getDetail(postId);
      console.log(data.commentList.length);

      dispatch(commentActions.getComment(data.commentList));
      dispatch(setDetail(data));
    } catch (err) {
      console.log(err);
    }
  };

const __getPost =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await postApi.getPost();
      console.log(data.date);
      dispatch(setPost(data.date));
    } catch (err) {
      console.log(err);
    }
  };

// const __getPost = (postId) => {
//   return function (dispatch, getState, { history }) {
//     postApi.getDetail(postId).then((res) => {
//       console.log(res);
//     });
//   };
// };

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
    // [SET_POST]: (state, action) => produce(state, (draft) => {}),
    // [SET_POST]: (state, action) => produce(state, (draft) => {}),
    // [SET_POST]: (state, action) => produce(state, (draft) => {}),
    // [SET_POST]: (state, action) => produce(state, (draft) => {}),
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
};

export { actionCreates };
