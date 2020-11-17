// import React, {Component} from "react";
// import ReactDOM from "react-dom";

import React from "./kreact/";
import ReactDOM from "./kreact/react-dom";
import Component from "./kreact/Component";
import "./index.css";

function FunctionComponent(props) {
  return <div className="border">{props.name}</div>;
}

class ClassComponent extends Component {
  render() {
    return <div className="border">{this.props.name}</div>;
  }
}

const jsx = (
  <div className="border">
    <p>全栈</p>
    <a href="https://www.kaikeba.com/">开课吧</a>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="类组件" />

    <ul>
      {/* {[1, 2, 3].map(item => (
        <React.Fragment key={item}>
          <li>{item}</li>
          <li>{item}</li>
        </React.Fragment>
      ))} */}

      <>
        <li>1</li>
        <li>2</li>
      </>
    </ul>
  </div>
);

//这个jsx相当于createElement函数的执行
ReactDOM.render(jsx, document.getElementById("root"));

// 文本标签
// 原生标签节点
// 函数组件
// 类组件
// Fragment
