// import React from "react";
// import ReactDOM from "react-dom";

import React from "./kreact/";
import ReactDOM from "./kreact/react-dom";
import Component from "./kreact/Component";
import "./index.css";

function FunctionComponent({name}) {
  return (
    <div className="border">
      {name}
      <button
        onClick={() => {
          console.log("omg"); //sy-log
        }}>
        click
      </button>
    </div>
  );
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
    <FunctionComponent name="FunctionComponent" />
    <ClassComponent name="ClassComponent" />
    {/* <>
      <h1>aa</h1>
      <h1>bb</h1>
    </> */}
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// ! vnode 虚拟dom节点
// ! node 真实dom节点
