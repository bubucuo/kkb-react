import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {Provider} from "react-redux";
import store from "./store/";
import "./static/js/flexible";
import "./static/style/iconfont/iconfont.css";

// 跨层级传递store
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// todo
// redux 管理状态 存储store state
// react-redux 传递store state，背后原理Context、hoc（connect）
// react-router-dom 管理路由，背后原理也是Context、也有hoc(withRouter)
// ------

//  Generator函数与普通函数不同

// 1. function与函数名之间有个*
// 2. 函数体内部使用yiled表达式，定义不同状态
// 3. yield表达式只能用在Generator函数里，不能用在外面
// let a = 0;
// function* helloWorldGenerator() {
//   a = 1;
//   yield "hello";
//   a = 2;
//   yield "world";
//   return "ending";
//   // yield "omg";
// }

// // 4. Generator函数执行有惰性， 这里的执行只是返回一个遍历器对象
// var hw = helloWorldGenerator();
// console.log("a-0", a); //sy-log

// //执行
// console.log(hw.next());
// console.log("a-1", a); //sy-log
// console.log(hw.next());
// console.log("a-2", a); //sy-log
// console.log(hw.next());
// console.log(hw.next());
