// import React, {Component, useState} from "react";
// import ReactDOM from "react-dom";

import React from "./kreact/";
import ReactDOM, {useState} from "./kreact/react-dom";
import Component from "./kreact/Component";
import "./index.css";

class ClassComponent extends Component {
  render() {
    return <div className="border">{this.props.name}</div>;
  }
}

function FunctionComponent({name}) {
  const [count, setCount] = useState(0);
  return (
    <div className="border">
      {name}
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {count % 2 ? <button>omg</button> : <span>omg</span>}
    </div>
  );
}

const jsx = (
  <div className="border">
    <p>全栈</p>
    <a href="https://www.kaikeba.com/">开课吧</a>
    <ClassComponent name="class component" />
    <FunctionComponent name="function component" />
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
