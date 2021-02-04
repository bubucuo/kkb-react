import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import {Provider} from "react-redux";
import store from "./store/";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// // function与函数之间有个*
// // yield 只能用在generator内部
// function* helloWorldGenerator() {
//   // return "ending-0";
//   yield "hello";
//   yield "world";
//   return "ending";
// }

// const hw = helloWorldGenerator();

// console.log("hw", hw); //sy-log
// console.log("hw-0", hw.next()); //sy-log
// console.log("hw-1", hw.next()); //sy-log
// console.log("hw-2", hw.next()); //sy-log

// var a = 0;
// function* fun() {
//   let aa = yield (a = 1 + 1);
//   return aa;
// }

// console.log("fun0", a);
// let b = fun();
// console.log("fun", b.next()); //注释下这句试试，比较下前后a的值
// console.log("fun1", a);
