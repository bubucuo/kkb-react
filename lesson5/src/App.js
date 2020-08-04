import React from "react";
import Routes from "./routes";

export default function App(props) {
  return <Routes />;
}

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

// var a = 0;
// function* fun() {
//   let aa = yield (a = 1 + 1);
//   return aa;
// }

// console.log("fun0", a);
// let b = fun();
// console.log("fun", b.next()); //注释下这句试试，比较下前后a的值
// console.log("fun1", a);
