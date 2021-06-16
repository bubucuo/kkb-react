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

// function和函数名之间有个*
// yield 只能用在generator
// yield定义不同内部状态
// function* helloWorldGenerator() {
//   yield "hello";
//   yield "world";
//   return "ending";
// }

// var hw = helloWorldGenerator();
// console.log("hw", hw); //sy-log

// //执行
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());

// let a = 0;

// function* fun() {
//   let aa = yield (a = 1 + 1);
//   console.log("aa", aa); //sy-log  -1
//   return 100;
// }

// console.log("fun0", a);
// let b = fun();
// console.log("fun0-0", b.next()); //注释下这句试试，比较下前后a的值
// console.log("fun0-1", b.next(-1));
// console.log("fun1", a);

// ajax.then(res=>{ajax.then()})
// ajax0
// ajax1
// ajax2
