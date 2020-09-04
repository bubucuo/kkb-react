import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store/index";
import {Provider} from "react-redux";
import "./static/style/iconfont/iconfont.css";
import "./static/js/flexible";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// redux 存储store state
// react-redux 传递store state，原理是context以及hoc
// react-router  管理路由
