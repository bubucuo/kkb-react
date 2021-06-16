import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

// const arr = [1, 2, 3, 4];
// // 求和
// const reducer = (prevSum, current) => prevSum + current;

// console.log("sum", arr.reduce(reducer, 5)); //sy-log

// function f1(arg) {
//   console.log("f1", arg); //sy-log
//   return arg;
// }

// function f2(arg) {
//   console.log("f2", arg); //sy-log
//   return arg;
// }

// function f3(arg) {
//   console.log("f3", arg); //sy-log
//   return arg;
// }

// // 方法1
// f1("omg");
// f2("omg");
// f3("omg");

// let res = f1(f2(f3("omg")));
// console.log("res", res); //sy-log

// let res = compose(f1)("omg");
// console.log("res", res); //sy-log

// function compose(...funcs) {
//   if (funcs.length === 0) {
//     return (arg) => arg;
//   }
//   if (funcs.length === 1) {
//     return funcs[0];
//   }
//   return funcs.reduce((a, b) => (...args) => a(b(...args)));
// }
