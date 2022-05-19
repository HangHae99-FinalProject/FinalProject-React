import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { commentApi } from "../../api/commentApi";

// 액션
const EDIT_COMMENT = " EDIT_COMMENT ";
const DELETE_COMMENT = "DELETE_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const GET_COMMENT = "GET_COMMENT";

// 액션 크리에이터
const editComment = createAction(EDIT_COMMENT, (comment, commentId) => ({
  comment,
  commentId,
}));
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
  commentId,
}));
const addComment = createAction(ADD_COMMENT, (content) => ({
  content,
}));
const getComment = createAction(GET_COMMENT, (commentList) => ({
  commentList,
}));

// 초기값

const initialState = {
  commentList: [],
};

// 미들웨어

const __addComment =
  (postId, comment) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await commentApi.postComment(postId, comment);

      const today = new Date();
      let year = today.getFullYear();
      let month = ("0" + (today.getMonth() + 1)).slice(-2);
      let date = ("0" + today.getDate()).slice(-2);
      const createdAt = year + "-" + month + "-" + date;

      const nickname = localStorage.getItem("nickname");
      const profileImg = localStorage.getItem("profileImg");
      const commentId = data.data.commentId;

      dispatch(
        addComment({ comment, createdAt, profileImg, nickname, commentId })
      );
    } catch (err) {
      console.log(err);
    }
  };

const __deleteComment =
  (commentId) =>
  async (dispatch, getState, { history }) => {
    try {
      await commentApi.deleteComment(commentId);

      dispatch(deleteComment(commentId));
    } catch (err) {
      console.log(err);
    }
  };

const __editComment =
  (commentId, comment) =>
  async (dispatch, getState, { history }) => {
    try {
      await commentApi.editComment(commentId, comment);

      dispatch(editComment(comment, commentId));
    } catch (err) {
      console.log(err);
    }
  };

// 리듀서
export default handleActions(
  {
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList = action.payload.commentList;
      }),
    [EDIT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList = state.commentList.map((p) =>
          p.commentId === action.payload.commentId
            ? { ...p, comment: action.payload.comment }
            : p
        );
      }),

    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList = draft.commentList.filter(
          (p, id) => p.commentId !== action.payload.commentId
        );
      }),

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList.push(action.payload.content);
      }),
  },
  initialState
);

// export
const actionCreators = {
  editComment,
  addComment,
  getComment,
  deleteComment,
  __addComment,
  __deleteComment,
  __editComment,
};

export { actionCreators };
