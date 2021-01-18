// import React, {Component, useState} from "react";
// import ReactDOM from "react-dom";

import ReactDOM, {useState} from "./kreact/react-dom";
import Component from "./kreact/Component";

import "./index.css";

function FunctionComponent(props) {
  // [状态值, 修改状态值的函数]
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <div className="border">
      <p>{props.name}</p>
      <button onClick={() => setCount(count + 1)}>{count}</button>
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

// function FragmentComponent(props) {
//   return [1, 2, 3].map((item) => (
//     <React.Fragment key={item}>
//       <h1>111</h1>
//       <h1>222</h1>
//     </React.Fragment>
//   ));
// }

function FragmentComponent(props) {
  return (
    <>
      <h1>111</h1>
      <h1>222</h1>
    </>
  );
}

const jsx = (
  <div className="border">
    <h1>全栈123</h1>
    <a href="https://www.kaikeba.com/">kkb</a>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="类组件" />
    <FragmentComponent />
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("version", React.version); //sy-log

// 原生标签节点
// 文本节点
// 函数组件
// 类组件
// Fragment
