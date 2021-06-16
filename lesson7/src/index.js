// import React, {Component} from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "./kreact/react-dom";
// import Component from "./kreact/Component";
import "./index.css";

// class ClassComponent extends Component {
//   render() {
//     return (
//       <div className="border">
//         <p>{this.props.name}</p>
//       </div>
//     );
//   }
// }

function FunctionComponent(props) {
  return (
    <div className="border">
      <p>{props.name}</p>
      <button
        onClick={() => {
          console.log("omg"); //sy-log
        }}>
        click
      </button>
    </div>
  );
}

function FF() {
  return (
    <>
      <li>0</li>
      <li>1</li>
    </>
  );
}

const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="https://www.kaikeba.com/">kkb</a>
    <FunctionComponent name="嘉恒" />
    {/* <ClassComponent name="class" /> */}
    <ul>
      {/* <FF /> */}

      <>
        <li>0</li>
        <li>1</li>
      </>
    </ul>
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("React", React.version); //sy-log

//原生标签
// 文本
// 函数组件
