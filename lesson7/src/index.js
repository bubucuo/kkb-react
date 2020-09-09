// import React, {Component} from "react";
// import ReactDOM from "react-dom";

import React from "./kreact/";
import ReactDOM from "./kreact/react-dom";
// import Component from "./kreact/Component";
import "./index.css";

const jsx = (
  <div className="border">
    <p>全栈</p>
    <a href="https://www.kaikeba.com/">开课吧</a>
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
