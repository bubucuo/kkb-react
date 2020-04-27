import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store/";
import {Provider} from "react-redux";
import "./static/js/flexible";
import "./static/style/iconfont/iconfont.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
