import React from "react";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { postApi } from "../../api/postApi";
import { useSelector } from "react-redux";
import image from "./image";

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
const __addPost =
  (data) =>
  async (dispatch, getState, { history }) => {
    const formData = new FormData();
    const images = getState().image.files;
    console.log(data);

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
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

// 리덕스
export default handleActions(
  {
    [SET_POST]: (state, action) => produce(state, (draft) => {}),
    [SET_POST]: (state, action) => produce(state, (draft) => {}),
    [SET_POST]: (state, action) => produce(state, (draft) => {}),
    [SET_POST]: (state, action) => produce(state, (draft) => {}),
    [SET_POST]: (state, action) => produce(state, (draft) => {}),
    [SET_POST]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreates = {
  __addPost,
};

export { actionCreates };
