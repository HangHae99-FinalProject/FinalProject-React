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
const SET_CATE = "SET_CATE";
const GET_SEARCH = "GET_SEARCH";
const GET_LANDING = "GET_LANDING";
// 신청하기
const ADD_APPLY = "ADD_APPLY";
const DELETE_APPLY = "DELETE_APPLY";
const LOGIN_DETAIL = "LOGIN_DETAIL";

// 액션 크리에이터
const getLanding = createAction(GET_LANDING, (post_list) => ({ post_list }));
const setSearch = createAction(GET_SEARCH, (searchList) => ({ searchList }));
const setCate = createAction(SET_CATE, (post_list, page) => ({
  post_list,
  page,
}));
const setPost = createAction(SET_POST, (post_list) => ({
  post_list,
}));
const setDetail = createAction(SET_DETAIL, (detail_list) => ({ detail_list }));
const setLoginDetail = createAction(SET_DETAIL, (detail_list) => ({
  detail_list,
}));
const clearPost = createAction(CLEAR_POST, () => ({}));
// 신청하기
const addApply = createAction(ADD_APPLY, (apply) => ({ apply }));
const deleteApply = createAction(DELETE_APPLY, (apply) => ({ apply }));

// 초기값
const initialState = {
  apply: "",
  list: [],
  is_loading: false,
  detailList: [],
  page: 0,
  post_next: false,
  search: [],
  landingList: [],
};

//미들웨어

const __getLanding =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await postApi.getLanding();
      dispatch(getLanding(data.data));
    } catch (err) {
      console.log(err);
    }
  };

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
      history.replace("/main");
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

      history.replace("/main");
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
      history.replace("/main");
    } catch (err) {
      console.log(err.errorMessage);
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

      dispatch(commentActions.getComment(data.data.commentList));
      dispatch(setDetail(data.data));
    } catch (err) {
      console.log(err);
    }
  };

const __getPost =
  (count, region, major, is_search, is_searchValue, is_select) =>
  async (dispatch, getState, { history }) => {
    if (is_select) {
      count = 0;
    }
    try {
      const { data } = await postApi.getPost(
        count,
        region,
        major,
        is_search,
        is_searchValue
      );

      dispatch(setSearch({ is_search, is_searchValue }));
      let is_next = null;
      if (data.data.length < 8) {
        is_next = false;
      } else {
        is_next = true;
      }

      if (is_select || count === 0) {
        let post_list = {
          posts: data.data,
          page: count + 1,
        };

        dispatch(setCate(post_list));
      } else if (count === 0 && data.data.length < 9) {
        let post_list = {
          posts: data.data,
          page: count + 1,
        };
        dispatch(setCate(post_list));
      } else {
        let post_list = {
          posts: data.data,
          page: count + 1,
        };
        dispatch(setPost(post_list));
      }
    } catch {}
  };

// 리덕스
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list.posts);
        if (action.payload.page) {
          draft.page = action.payload.page;
        }
        draft.is_loading = false;
      }),
    [SET_CATE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [...action.payload.post_list.posts];

        if (action.payload.post_list.page) {
          draft.page = action.payload.post_list.page;
        }
      }),
    [GET_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.search = action.payload.searchList;
      }),
    [SET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detailList = action.payload.detail_list;
        draft.is_loading = true;
      }),
    [LOGIN_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detailList = action.payload.detail_list;
        draft.is_loading = true;
      }),
    [ADD_APPLY]: (state, action) =>
      produce(state, (draft) => {
        draft.detailList.userStatus = action.payload.apply;
      }),
    [CLEAR_POST]: (state, action) =>
      produce(state, (draft) => {
        return initialState;
      }),
    [GET_LANDING]: (state, action) =>
      produce(state, (draft) => {
        draft.landingList = action.payload.post_list;
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
  setCate,
  setSearch,
  getLanding,
  __getLanding,
};

export { actionCreates };
