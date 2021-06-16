// import React, {Component} from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "./kreact/react-dom";
import Component from "./kreact/Component";
import "./index.css";

function FunctionComponent({name}) {
  return (
    <div className="border">
      <p>{name}</p>
    </div>
  );
}

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        <p>{this.props.name}</p>
      </div>
    );
  }
}

const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="https://www.kaikeba.com/">kkb</a>
    <FunctionComponent name="function" />
    <ClassComponent name="class" />
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("React", React.version); //sy-log

// 原生标签
// 文本组件
// 函数组件
// 类组件
