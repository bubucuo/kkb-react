// import React, {Component, Fragment} from "react";
// import ReactDOM from "react-dom";

import React from "./kreact/";
import ReactDOM from "./kreact/react-dom";
import Component from "./kreact/Component";
import "./index.css";

class ClassComponent extends Component {
  render() {
    return <div className="border">{this.props.name}</div>;
  }
}

function FunctionComponent({name}) {
  return (
    <div className="border">
      {name}
      <button onClick={() => console.log("omg")}>click</button>
    </div>
  );
}

const jsx = (
  <div className="border">
    <p>开课吧</p>
    <a href="https://kaikeba.com/">开课吧</a>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="class组件" />

    <>
      <h1>文本1</h1>
      <h2>文本2</h2>
    </>

    {[1, 2, 3].map(item => (
      <div key={item}>文本{item}</div>
      // <React.Fragment key={item}>
      //   <h1>文本1</h1>
      //   <h2>文本2</h2>
      // </React.Fragment>
    ))}
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

console.log("version", React.version); //sy-log

// !节点类型
// 文本节点
// HTML标签节点
// function组件
// class组件
// fragment
