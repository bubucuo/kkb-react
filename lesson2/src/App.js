import React, {useState} from "react";
import ReduxPage from "./pages/ReduxPage";

export default function App(props) {
  const [num, setNum] = useState(1);
  return (
    <div>
      <button
        onClick={() => {
          setNum(num + 1);
        }}>
        change num: {num}
      </button>
      {num % 2 && <ReduxPage />}
    </div>
  );
}

// const array1 = [1, 2, 3, 4];

// const reducer = (accutor, currentValue) => {
//   console.log("acc", accutor, currentValue); //sy-log
//   return accutor + currentValue;
// };

// console.log("sum:", array1.reduce(reducer)); //sy-log

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
//   // return funcs.reduce((a, b) => (...args) => a(b(...args)));
//   // return funcs.reduce((a, b) => (...args) => a(b(...args)));
//   return funcs.reduce((a, b) => {
//     return (...args) => {
//       return a(b(...args));
//     };
//   });
// }

// let res = compose()("omg"); //f1(f2(f3("omg")));

// console.log("res", res); //sy-log
