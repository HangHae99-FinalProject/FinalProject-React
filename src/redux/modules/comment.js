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
      const profileImg = localStorage.getItem("profileImgUrl");

      dispatch(addComment({ comment, createdAt, profileImg, nickname }));
    } catch (err) {
      console.log(err);
    }
  };

// const __mentUpdata = (postId, content, commentId) => {
//   return function (dispatch, getState, { history }) {
//     apis
//       .commentUp(postId, content, commentId)
//       .then((res) => {
//         console.log(res);
//         dispatch(mentUpdata({ content, commentId }));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

// const __mentDelete = (postId, commentId) => {
//   return function (dispatch, getState, { history }) {
//     apis
//       .commentDle(postId, commentId)
//       .then((res) => {
//         console.log(res);
//         dispatch(mentDelete(commentId));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

// const __mentAdd = (Id, content) => {
//   return function (dispatch, getState, { history }) {
//     apis
//       .commentAdd(Id, content)
//       .then((res) => {
//         const nickName = localStorage.getItem("nickName");
//         const userId = localStorage.getItem("userId");
//         const _id = res.data.result;
//         dispatch(mentAdd({ content, nickName, userId, _id }));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

// 리듀서
export default handleActions(
  {
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList = action.payload.commentList;
        console.log(action.payload.commentList);
        // draft.post = action.payload.post;
        // draft.comment = action.payload.comment;
        // draft.comment_cnt = action.payload.comment_cnt;
      }),
    [EDIT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comment = state.comment.map((p) =>
          p._id === action.payload.comment.commentId
            ? { ...p, content: action.payload.comment.content }
            : p
        );
      }),

    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comment = draft.comment.filter(
          (p) => p._id !== action.payload.commentId
        );
      }),

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log(draft.commentList);
        draft.commentList.unshift(action.payload.content);
      }),
  },
  initialState
);

// export
const actionCreators = {
  // __mentAdd,
  // __mentDelete,
  // __mentUpdata,
  editComment,
  addComment,
  getComment,
  deleteComment,
  __addComment,
};

export { actionCreators };
