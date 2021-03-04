// import React, {Component} from "react";
// import {Fragment} from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "./kreact/react-dom";
import Component from "./kreact/Component";

import "./index.css";

function FunctionComponent(props) {
  return (
    <div className="border">
      <p>函数数组{props.name}</p>
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
//     <Fragment key={item}>
//       <li>哈哈</li> <li>呵呵</li>
//     </Fragment>
//   ));
// }

const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="https://www.kaikeba.com/" style={{color: "red"}}>
      kkb
    </a>
    <FunctionComponent name="function" />
    {/* <ClassComponent name="class" /> */}
    {/* <ul>
      <li>asasa</li>
      <FragmentComponent />
    </ul> */}

    <>
      <h1>哈哈</h1>
      <h1>呵呵</h1>
    </>
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("React", React.version); //sy-log
// 文本节点
// 原生标签节点
// 函数组件
// 类组件
