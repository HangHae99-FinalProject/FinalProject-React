import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { applyApi } from "../../api/applyApi";

const GET_SUBSCRIBER = "GET_SUBSCRIBER";
const GET_ACCEPT = "GET_ACCEPT";
const ADD_REQUEST = "ADD_REQUEST";
const DELETE_APPLY = "DELETE_APPLY";

const setSubscriber = createAction(GET_SUBSCRIBER, (subscriberList) => ({
  subscriberList,
}));
const setAccept = createAction(GET_ACCEPT, (acceptListList) => ({
  acceptListList,
}));
const addRequest = createAction(ADD_REQUEST, (userId) => ({ userId }));
const deleteApply = createAction(DELETE_APPLY, (userId) => ({ userId }));

const initialState = {
  subscriberList: [],
  acceptListList: [],
  is_loading: false,
};

const __deadlinePatch =
  (postId) =>
  async (dispatch, getState, { history }) => {
    try {
      await applyApi.deadlinePatch(postId);

      history.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

const __postReject =
  (rejectDto) =>
  async (dispatch, getState, { history }) => {
    try {
      await applyApi.postReject(rejectDto);

      dispatch(deleteApply(rejectDto.userId));
    } catch (err) {
      console.log(err);
    }
  };

const __postRequest =
  (acceptedDto) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await applyApi.postRequest(acceptedDto);

      dispatch(addRequest(acceptedDto.userId));
    } catch (err) {
      console.log(err);
    }
  };

const __getSubscriber =
  (postId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await applyApi.getSubscriber(postId);
      dispatch(setSubscriber(data));
    } catch (err) {
      console.log(err);
    }
  };

const __getAccept =
  (postId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await applyApi.getAccept(postId);

      dispatch(setAccept(data));
    } catch (err) {
      console.log(err);
    }
  };

export default handleActions(
  {
    [GET_SUBSCRIBER]: (state, action) =>
      produce(state, (draft) => {
        draft.subscriberList = action.payload.subscriberList;
      }),
    [GET_ACCEPT]: (state, action) =>
      produce(state, (draft) => {
        draft.acceptListList = action.payload.acceptListList;
      }),
    [ADD_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.majorIdx);
        draft.subscriberList = draft.subscriberList.filter(
          (a, idx) => a.userId !== action.payload.userId
        );
      }),
    [DELETE_APPLY]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.userId);
        draft.subscriberList = draft.subscriberList.filter(
          (a, idx) => a.userId !== action.payload.userId
        );
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
};

export { actionCreates };
