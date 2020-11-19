// import React, {Component, useState} from "react";
// import ReactDOM from "react-dom";
import ReactDOM, {useState} from "./kreact/react-dom";
import Component from "./kreact/Component";

import "./index.css";

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        <p>{this.props.name}</p>
      </div>
    );
  }
}

function FunctionComponent(props) {
  const [count, setCount] = useState(0);
  return (
    <div className="border">
      <button
        onClick={() => {
          console.log("count", count); //sy-log
          setCount(count + 1);
        }}>
        {count + ""}
      </button>
      {count % 2 ? <p>{props.name}</p> : <span>omg</span>}
    </div>
  );
}

const jsx = (
  <div className="border">
    <p>全栈</p>
    <a href="https://www.kaikeba.com/">开课吧</a>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="类组件" />
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// 文本标签
// 原生标签
// 函数组件
// 类组件
