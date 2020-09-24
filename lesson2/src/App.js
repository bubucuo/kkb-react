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

// // console.log("f1", f1("omg")); //sy-log
// // console.log("f2", f2("omg")); //sy-log
// // console.log("f3", f3("omg")); //sy-log
// f3(f2(f1("omg")));

// let res = compose(f1)("omg");

// function compose(...funs) {
//   // 这个空数组的兼容情况
//   if (funs.length === 0) {
//     return arg => arg;
//   }
//   if (funs.length === 1) {
//     return funs[0];
//   }
//   // 这个返回值是个函数，这个函数执行的时候，f1, f2, f3会按照顺序挨个执行
//   return funs.reduce((a, b) => (...args) => a(b(...args)));
// }

// console.log("res", res); //sy-log
