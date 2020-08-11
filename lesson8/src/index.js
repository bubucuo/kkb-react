import React from "./kreact/index";
import ReactDOM from "./kreact/react-dom";
import Component from "./kreact/Component";

// import React, {Component} from "react";
// import ReactDOM from "react-dom";
import "./index.css";

class ClassComponent extends Component {
  static defaultProps = {
    color: "pink"
  };
  render() {
    return (
      <div className="border">
        class组件-{this.props.name}
        <p className={this.props.color}>omg</p>
      </div>
    );
  }
}

function FunctionComponent(props) {
  return <div className="border">函数组件-{props.name}</div>;
}

const jsx = (
  <div className="border">
    <p>全栈</p>
    <a href="https://www.kaikeba.com/">开课吧</a>
    <ClassComponent name="class" color="red" />
    <FunctionComponent name="function" />
    {/* {[1, 2].map(item => (
      <React.Fragment key={item}>{item}</React.Fragment>
    ))} */}
    {/* <>
      <h1>aaa</h1>
      <h1>bbb</h1>
    </> */}
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
// 文本节点
// html元素节点
// 类组件
// 函数组件
// 数组
// Fragment
// 补充：<></>与Fragment的区别
