import React, {Component} from "react";
import ReactDOM from "react-dom";

// import React from "./kreact/";
// import ReactDOM from "./kreact/react-dom";
// import Component from "./kreact/Component";

import "./index.css";

class ClassComponent extends Component {
  static defaultProps = {
    color: "pink"
  };
  render() {
    return (
      <div className="border">
        <h3>ClassComponent</h3>
        <p className={this.props.color}>{this.props.name}</p>
      </div>
    );
  }
}

function FunctionComponent(props) {
  return (
    <div className="border">
      FunctionComponent
      <p>{props.name}</p>
    </div>
  );
}

const jsx = (
  <div className="border">
    <p>全栈</p>
    <a href="https://www.kaikeba.com/">开课吧</a>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="类组件" color="red" />
  </div>
);

// 这里的jsx最终会被编译为createElement(),
ReactDOM.render(jsx, document.getElementById("root"));

console.log("vserion", React.version); //sy-log
// 原生标签节点
// 文本节点
//
