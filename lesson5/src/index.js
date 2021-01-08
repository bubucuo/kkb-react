import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import store from "./store/";
import {Provider} from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// ajax1
// ajax2
// 1. function关键字与函数名之间有一个*;
// 2. 函数体内部使用yield表达式，定义不同的内部状态。
// 3. yield表达式只能在 Generator 函数里使用，在其他地方会报错。
// function* helloWorldGenerator() {
//   yield "hello";
//   yield "world";
//   return "ending";
// }

// var hw = helloWorldGenerator();

// // //执行
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());

// var a = 0;

// function* fun() {
//   let aa = yield (a = 1 + 1);
//   return aa;
// }

// console.log("fun0", a);

// let b = fun();

// console.log("fun0-1", b.next()); //注释下这句试试，比较下前后a的值
// console.log("fun0-2", b.next()); //注释下这句试试，比较下前后a的值
// console.log("fun0-3", b.next()); //注释下这句试试，比较下前后a的值

// console.log("fun1", b, a);
