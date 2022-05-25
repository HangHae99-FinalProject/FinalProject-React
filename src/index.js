import React from "react";
import ReactDOM from "react-dom";
import App from "./shared/App";
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";
import reportWebVitals from "./reportWebVitals";
import ReactGA from "react-ga";

const TRACKING_ID = process.env.REACT_APP_TRACKING_ID;
console.log(TRACKING_ID);
ReactGA.initialize(TRACKING_ID);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
