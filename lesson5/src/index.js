import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {Provider} from "react-redux";
import store from "./store/index";
import "./static/js/flexible";
import "./static/style/iconfont/iconfont.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// 1. redux 管理数据
// 2. react-redux 传递数据（context），建立了React组件与redux 数据store之间的链接（connect），
// 也可以用hook方法访问数据和dispatch方法
// 3. react-router 管理路由，强化了React中一切皆组件的思想
