// import React, {Component, Fragment} from "react";
// import ReactDOM from "react-dom";

import React from "./kreact/";
import ReactDOM from "./kreact/react-dom";
import Component from "./kreact/Component";

import "./index.css";

class ClassComponent extends Component {
  static defaultProps = {
    color: "pink"
  };
  render() {
    return (
      <div className="border">
        <div className={this.props.color}>color </div>
        {this.props.name}
      </div>
    );
  }
}

function FunctionComponent({name}) {
  return (
    <div className="border">
      {name}
      <button onClick={() => console.log("omg")}>btn</button>
    </div>
  );
}

const jsx = (
  <div className="border">
    <p>全栈学习</p>
    <a href="https://zh-hans.reactjs.org/">React学习</a>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="class组件" />

    <>
      <h1>文本1</h1>
      <h2>文本2</h2>
    </>

    {[1, 2, 3].map(item => (
      <div key={item}>
        {item}
        <h6>文本{item}</h6>
      </div>
    ))}
  </div>
);

// <React.Fragment key={item}>
//   {item}
//   <h6>文本{item}</h6>
// </React.Fragment>

// vnode->node , 把node装入container
ReactDOM.render(jsx, document.getElementById("root"));

console.log("version", React.version); //sy-log

// vnode  虚拟dom节点
// node 真实dom节点
// !节点类型
// 文本节点
// HTML标签节点
// function组件
// class组件
// fragment
// 数组
