// import React, {Component} from "react";
// import ReactDOM from "react-dom";

import React from "./kreact/";
import ReactDOM from "./kreact/react-dom";

import "./index.css";

const jsx = (
  <div className="border">
    <p>全栈</p>
    <a href="https://www.kaikeba.com/">开课吧</a>
  </div>
);

// 这里的jsx最终会被编译为createElement(),
ReactDOM.render(jsx, document.getElementById("root"));

console.log("vserion", React.version); //sy-log
