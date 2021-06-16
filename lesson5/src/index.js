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

// function* helloWorldGenerator() {
//   yield "hello";
//   yield "world";
//   return "ending";
//   yield "0";
// }

// var hw = helloWorldGenerator();

// console.log("hw", hw); //sy-log
// // 执行
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
// // console.log("fun", b.next()); //注释下这句试试，比较下前后a的值
// console.log("fun1", a);
