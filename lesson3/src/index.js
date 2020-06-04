import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import {Provider} from "react-redux";
import {Provider} from "./kReactRedux";

import store from "./store/";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

export default function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null) return false;

  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

function Test() {}

let o = new Test();

// console.log("", isPlainObject(null)); //sy-log

// console.log("", isPlainObject([])); //sy-log

// console.log("", isPlainObject({})); //sy-log

// console.log("", isPlainObject(new Object())); //sy-log

console.log("", typeof o); //sy-log
