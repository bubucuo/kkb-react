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

// function 与函数名之间有个*
// 函数内部使用yield表达式， 定义不同状态
// yield只能用在generator函数里，在别的地方报错。
// function* helloWorldGenerator() {
//   yield "hello";
//   yield "world";
//   return "ending";
// }

// var hw = helloWorldGenerator();

// //执行
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());

// let a = 0;
// function* fun() {
//   let aa = yield (a = 1 + 1);
//   return aa;
// }

// console.log("fun0", a); //sy-log

// let b = fun();

// console.log("fun", b.next()); //sy-log

// console.log("fun1", a); //sy-log
