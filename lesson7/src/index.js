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

    <ul>
      <li>1</li>
      <li>omg-2</li>
    </ul>
  </div>
);

// function GetAA() {
//   return (
//     <>
//       <li>1</li>
//       <li>omg-2</li>
//     </>
//   );
// }

ReactDOM.render(jsx, document.getElementById("root"));

/* {[1, 2].map(item => (
      <React.Fragment key={item}>
        <p>{item}</p>
        <p>omg-{item}</p>
      </React.Fragment>
    ))} */
