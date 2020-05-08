// import React, {Component} from "react";
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
    {/* <FunctionComponent name="函数组件" /> */}
    {/* <ClassComponent name="class组件" /> */}

    {/* <>
      <h1>文本1</h1>
      <h2>文本2</h2>
    </> */}
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
