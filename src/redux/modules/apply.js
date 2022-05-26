import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { applyApi } from "../../api/applyApi";

const GET_SUBSCRIBER = "GET_SUBSCRIBER";
const GET_ACCEPT = "GET_ACCEPT";
const ADD_REQUEST = "ADD_REQUEST";
const DELETE_APPLY = "DELETE_APPLY";
const REFUSE_APPLY = "REFUSE_APPLY";
const CLEAR_APPLY = "CLEAR_APPLY";

const refuseApply = createAction(REFUSE_APPLY, (userId) => ({ userId }));
const setSubscriber = createAction(GET_SUBSCRIBER, (subscriberList) => ({
  subscriberList,
}));
const setAccept = createAction(GET_ACCEPT, (acceptListList) => ({
  acceptListList,
}));
const addRequest = createAction(ADD_REQUEST, (userId) => ({ userId }));
const deleteApply = createAction(DELETE_APPLY, (userId) => ({ userId }));
const clearApply = createAction(CLEAR_APPLY, () => ({}));

const initialState = {
  subscriberList: [],
  acceptListList: [],
  is_loading: false,
  majorList: [],
};

const __deadlinePatch =
  (postId) =>
  async (dispatch, getState, { history }) => {
    try {
      await applyApi.deadlinePatch(postId);

      history.replace("/main");
    } catch (err) {}
  };

const __postReject =
  (rejectDto) =>
  async (dispatch, getState, { history }) => {
    try {
      await applyApi.postReject(rejectDto);

      dispatch(deleteApply(rejectDto.userId));
    } catch (err) {}
  };
const __postRefuse =
  (refuseDto) =>
  async (dispatch, getState, { history }) => {
    try {
      await applyApi.postReject(refuseDto);

      dispatch(refuseApply(refuseDto.userId));
    } catch (err) {}
  };

const __postRequest =
  (acceptedDto) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await applyApi.postRequest(acceptedDto);

      dispatch(addRequest(acceptedDto.userId));
    } catch (err) {}
  };

const __getSubscriber =
  (postId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await applyApi.getSubscriber(postId);

      dispatch(setSubscriber(data));
    } catch (err) {}
  };

const __getAccept =
  (postId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await applyApi.getAccept(postId);

      dispatch(setAccept(data));
    } catch (err) {}
  };

export default handleActions(
  {
    [GET_SUBSCRIBER]: (state, action) =>
      produce(state, (draft) => {
        draft.subscriberList = action.payload.subscriberList;

        const major = action.payload.subscriberList.majorList.map(
          (a) => a.majorName
        );
        const numOfPeopleSet = action.payload.subscriberList.majorList.map(
          (a) => a.numOfPeopleSet
        );
        const numOfPeopleApply = action.payload.subscriberList.majorList.map(
          (a) => a.numOfPeopleApply
        );
        draft.majorList = [major[0], numOfPeopleApply[0], numOfPeopleSet[0]];
      }),
    [GET_ACCEPT]: (state, action) =>
      produce(state, (draft) => {
        draft.acceptListList = action.payload.acceptListList;
      }),
    [ADD_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.subscriberList.applyUserLists =
          draft.subscriberList.applyUserLists.filter(
            (a, idx) => a.userId !== action.payload.userId
          );
      }),
    [DELETE_APPLY]: (state, action) =>
      produce(state, (draft) => {
        draft.subscriberList.applyUserLists =
          draft.subscriberList.applyUserLists.filter(
            (a, idx) => a.userId !== action.payload.userId
          );
      }),
    [REFUSE_APPLY]: (state, action) =>
      produce(state, (draft) => {
        draft.acceptListList.applyUserLists =
          draft.acceptListList.applyUserLists.filter(
            (a, idx) => a.userId !== action.payload.userId
          );
      }),
    [CLEAR_APPLY]: (state, action) =>
      produce(state, (draft) => {
        return initialState;
      }),
  },
  initialState
);

const actionCreates = {
  __getSubscriber,
  __getAccept,
  setAccept,
  __postRequest,
  setSubscriber,
  addRequest,
  __postReject,
  deleteApply,
  __deadlinePatch,
  refuseApply,
  __postRefuse,
  clearApply,
};

export { actionCreates };
