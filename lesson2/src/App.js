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

function f1(arg) {
  console.log("f1", arg);
  return arg;
}
function f2(arg) {
  console.log("f2", arg);
  return arg;
}
function f3(arg) {
  console.log("f3", arg);
  return arg;
}

// todo  全部执行这三个函数
// 方法1
// f1("omg");
// f2("omg");
// f3("omg");

// 方法2 缺点： 啰嗦， 不利于维护
// f1(f2(f3("omg")));

// !方法3
// compose的返回值是函数
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
  // return funcs.reduce((a, b) => {
  //   return (...args) => {
  //     return a(b(...args));
  //   };
  // });
}

// 做下适配，参数值可以是0到多个
let res = compose(f1)("omg");

console.log("res", res); //sy-log
