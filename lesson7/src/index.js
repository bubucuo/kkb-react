import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

const jsx = (
  <div className="border">
    <p>全栈</p>
    <a href="https://www.kaikeba.com/">开课吧</a>
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("react version ", React.version); //sy-log
