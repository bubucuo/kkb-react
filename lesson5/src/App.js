import React from "react";
import Routes from "./routes";

export default function App(props) {
  return <Routes />;
}

// !
/**
 * function与函数名之间有个*
 * 函数体里面使用yield表达式，定义不同的状态
 * yield表达式只能用在generator函数里，在别的地方会报错
 */

// function* helloWorldGenerator() {
//   yield "hello";
//   yield "world";
//   return "ending";
// }

// var hw = helloWorldGenerator();
// console.log("hw是遍历器 对象", hw); //sy-log
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

// console.log("a0", a); //sy-log

// let b = fun();

// b.next();

// console.log("a1", a); //sy-log
