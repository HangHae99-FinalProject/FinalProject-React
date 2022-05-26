import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { chatApi } from "../../api/chatApi";

const sockjs = new SockJS("https://everymohum.shop/webSocket");
const client = Stomp.over(sockjs);

client.debug = null;

const SET_STOMP = "SET_STOMP";
const ADD_ROOM = "ADD_ROOM";
const ROAD_ROOM = "ROAD_ROOM";

const setStomp = createAction(SET_STOMP, (data) => ({ data }));
const addRoom = createAction(ADD_ROOM, (data) => ({ data }));
const roadRoom = createAction(ROAD_ROOM, (roomUserId) => ({ roomUserId }));

const initialState = {
  client: client,
  roomUserId: [],
};

const __addRoom =
  (data) =>
  async (dispatch, getState, { history }) => {
    try {
      const res = await chatApi.addRoom(data);

      history.push({
        pathname: `/chat`,
        state: {
          roomName: res.data.roomName,
          sender: res.data.user,
          postId: data.postId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

const __getRoom =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await chatApi.roadRoom();
      const roomUserId = data.map((a) => a.user.userId);

      dispatch(roadRoom(roomUserId));
    } catch (err) {
      console.log(err);
    }
  };

export default handleActions(
  {
    [SET_STOMP]: (state, action) =>
      produce(state, (draft) => {
        draft.client = action.payload.data;
      }),
    [ROAD_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomUserId = action.payload.roomUserId;
      }),
  },
  initialState
);

const actionCreators = {
  setStomp,
  __addRoom,
  addRoom,
  roadRoom,
  __getRoom,
};

export { actionCreators };
