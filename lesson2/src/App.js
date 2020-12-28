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

// // * 让这三个函数依次全部执行
// // step1
// // f1("omg");
// // f2("omg");
// // f3("omg");

// // step2:
// // f1(f2(f3("omg")));

// // step3:
// let res = compose(f1)("omg");
// console.log("res", res); //sy-log

// // 返回一个复合函数
// function compose(...funcs) {
//   if (funcs.length === 0) {
//     // 返回一个函数
//     return (arg) => arg;
//   }
//   if (funcs.length === 1) {
//     return funcs[0];
//   }
//   return funcs.reduce((a, b) => (...args) => a(b(...args)));
// }
