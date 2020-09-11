// import React, {Component} from "react";
// import ReactDOM from "react-dom";

import React from "./kreact/";
import ReactDOM from "./kreact/react-dom";
import Component from "./kreact/Component";
import "./index.css";

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        {this.props.name}
        <p className={this.props.color}>color omg</p>
      </div>
    );
  }
}

function FunctionComponent({name}) {
  return <div className="border">{name}</div>;
}

const jsx = (
  <div className="border">
    <p>全栈</p>
    <a href="https://www.kaikeba.com/">开课吧</a>
    <ClassComponent name="class component" />
    <FunctionComponent name="function component" />
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
