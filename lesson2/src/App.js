import React from "react";
import ReduxPage from "./pages/ReduxPage";

export default function App(props) {
  return (
    <div>
      <ReduxPage />
    </div>
  );
}

// const array1 = [1, 2, 3, 4];
// const reducer = (accumulator, currentValue) => accumulator + currentValue;

// // 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer));
// // expected output: 10

// // 5 + 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer, 5));
// // expected output: 15

// function f1(arg) {
//   console.log("f1", arg);
//   return arg;
// }
// function f2(arg) {
//   console.log("f2", arg);
//   return arg;
// }
// function f3(arg) {
//   console.log("f3", arg);
//   return arg;
// }

// const res = f1(f2(f3("omg")));
// console.log("res", res); //sy-log

// console.log("--------------"); //sy-log

// const res2 = compose()("omg");

// console.log("res2", res2); //sy-log

// function compose(...funcs) {
//   if (funcs.length === 0) {
//     // 返回一个函数
//     return arg => arg;
//     // return arg => {
//     //   return arg;
//     // };
//   }
//   if (funcs.length === 1) {
//     return funcs[0];
//   }
//   return funcs.reduce((a, b) => (...args) => a(b(...args)));
//   // return funcs.reduce((a, b) => {
//   //   return (...args) => a(b(...args));
//   // });
// }
