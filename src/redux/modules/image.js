import { createAction, handleActions } from "redux-actions";
import produce, { Immer } from "immer";

// 액션
const SET_PRE = "SET_PRE";
const DELETE_PRE = "DELETE_PRE";
const EDIT_PRE = "EDIT_PRE";
const INIT_PRE = "INIT_PRE";
const EDIT_URL = "EDIT_URL";

// URL 주소
const SET_URL = "SET_URL";

// 액션 크리에이터

// 이미지
const setPre = createAction(SET_PRE, (data) => ({ data }));
const deletePre = createAction(DELETE_PRE, (imageId) => ({ imageId }));
const editPre = createAction(EDIT_PRE, (editImage) => ({ editImage }));

const initPre = createAction(INIT_PRE, () => ({}));
const editUrl = createAction(EDIT_URL, (Url) => ({ Url }));

// 주소 URL
const setURL = createAction(SET_URL, (Url) => ({ Url }));

const initialState = {
  preView: [],
  files: [],
  editUrl: [],
  Url: "",
};
export default handleActions(
  {
    // 서버에서 받아온 URL 새로 추가하는 URL 포함해서 files에 넣음
    [SET_PRE]: (state, action) =>
      produce(state, (draft) => {
        draft.files = [...state.files, ...action.payload.data];
      }),
    // 인덱스로 삭제를 함
    [DELETE_PRE]: (state, action) =>
      produce(state, (draft) => {
        draft.files = draft.files.filter(
          (i, idx) => idx !== action.payload.imageId
        );
      }),

    // 서버에서 받아온 URL을 넣음
    [EDIT_PRE]: (state, action) =>
      produce(state, (draft) => {
        draft.preView = action.payload.editImage;
      }),
    // 이미지 초기화
    [INIT_PRE]: (state, action) =>
      produce(state, (draft) => {
        draft.preView = [];
        draft.files = [];
        draft.editUrl = [];
      }),

    // 삭제를 눌렀을때 서버에서 받아온 URL을 따로 저장 해줌
    [EDIT_URL]: (state, action) =>
      produce(state, (draft) => {
        draft.editUrl = [...draft.editUrl, action.payload.Url];
      }),

    // URL주소
    [SET_URL]: (state, action) =>
      produce(state, (draft) => {
        draft.Url = action.payload.Url;
        console.log(draft.Url);
      }),
  },
  initialState
);

const imgActions = {
  setPre,
  deletePre,
  editPre,
  initPre,
  editUrl,
  setURL,
};

export { imgActions };
