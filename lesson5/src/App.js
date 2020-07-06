import React from "react";
import Routes from "./routes";

export default function App(props) {
  return <Routes />;
}

// function与函数名之间有个*
// 函数体内部使用yiled表达式，定义不同内部状态
// yield只能用在generator

// function* helloWorldGenerator() {
//   yield "hello";
//   yield "world";
//   return "omg";
//   yield "ending";
// }

// var hw = helloWorldGenerator();

// //执行
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());

// var a = 0;
// function* fun() {
//   let aa = yield (a = 1 + 1);
//   return aa;
// }

// console.log("fun0", a); //sy-log

// let b = fun();

// console.log("fun1", a); //sy-log

// console.log("fun2", a, b.next()); //sy-log
