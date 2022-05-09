import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// 모집인원/전공
const SET_RECRUIT = "SET_RECRUIT";
const DELETE_RECRUIT = "DELETE_RECRUIT";
const INIT_RECRUIT = "INIT_RECRUIT";

const serRecruit = createAction(SET_RECRUIT, (majorList) => ({
  majorList,
}));
const deleteRecruit = createAction(DELETE_RECRUIT, (majorIdx) => ({
  majorIdx,
}));
const initRecruit = createAction(INIT_RECRUIT, () => ({}));

const initialState = {
  majorList: [],
  is_loading: false,
};

export default handleActions(
  {
    [SET_RECRUIT]: (state, action) =>
      produce(state, (draft) => {
        draft.majorList = [...state.majorList, { ...action.payload.majorList }];
        console.log(draft.majorList);
      }),
    [DELETE_RECRUIT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.majorIdx);
        draft.majorList = draft.majorList.filter(
          (a, idx) => idx !== action.payload.majorIdx
        );
      }),
    [INIT_RECRUIT]: (state, action) =>
      produce(state, (draft) => {
        draft.majorList = [];
      }),
  },
  initialState
);

const actionCreates = {
  serRecruit,
  deleteRecruit,
  initRecruit,
};

export { actionCreates };
