import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let sockjs = new SockJS("http://54.225.34.106/webSocket");
let client = Stomp.over(sockjs);
client.debug = null;

const SET_STOMP = "SET_STOMP";

const setStomp = createAction(SET_STOMP, (data) => ({ data }));

const initialState = {
  client: client,
};

export default handleActions(
  {
    [SET_STOMP]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  setStomp,
};

export { actionCreators };
