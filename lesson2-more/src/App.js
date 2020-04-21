import React, {useState} from "react";
import ReduxPage from "./pages/ReduxPage";

export default function App(props) {
  const [state, setState] = useState(1);
  return (
    <div>
      <button onClick={() => setState(state + 1)}>{state}</button>
      {state % 2 && <ReduxPage />}
    </div>
  );
}

// const array1 = [1, 2, 3, 4];
// const reducer = (accumulator, currentValue) => accumulator + currentValue;

// console.log("aaaa", array1.reduce(reducer)); //sy-log

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

// function compose(...funcs) {
//   if (funcs.length === 0) {
//     return arg => arg;
//   }
//   if (funcs.length === 1) {
//     return funcs[0];
//   }
//   return funcs.reduce((a, b) => (...args) => {
//     return a(b(...args));
//   });
// }

// let dispatch = compose(f1, f2, f3);

// let res = dispatch("omg");

// console.log("结果：", res); //sy-log
