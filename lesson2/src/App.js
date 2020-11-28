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
// // prevState + newValue

// // 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer));
// // expected output: 10

// // 5 + 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer, 5));

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
// 想要顺序执行f1\f2\f3，参数一样、返回参数
// step1:
// console.log(f1("omg")); //sy-log
// console.log(f2("omg")); //sy-log
// console.log(f3("omg")); //sy-log

// step2:
// let res = f3(f2(f1("omg")));
// let res = f1(f2(f3("omg")));
// console.log("res", res); //sy-log

// step3:
// let res = compose(f1, f2, f3)("omg");
// console.log("res", res); //sy-log

// // redux中的compose
// function compose(...funcs) {
//   if (funcs.length === 0) {
//     // 返回一个函数
//     return arg => arg;
//   }

//   if (funcs.length === 1) {
//     return funcs[0];
//   }

//   // 返回了一个聚合函数
//   return funcs.reduce((a, b) => (...args) => a(b(...args)));
// }
