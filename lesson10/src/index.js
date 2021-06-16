// import React, {Component, useState} from "react";
// import ReactDOM from "react-dom";
import ReactDOM, {useState} from "./kreact/react-dom";
import Component from "./kreact/Component";
import "./index.css";

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        <p>{this.props.name}</p>
      </div>
    );
  }
}

function FunctionComponent(props) {
  const [count, setCount] = useState(0);
  return (
    <div className="border">
      <p>{props.name}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
        {count}
      </button>
      {count % 2 ? <div>omg</div> : <span>哈哈哈</span>}
    </div>
  );
}

// // key值标记节点在当前层级下的唯一性
// function FragmentComponent() {
//   return [1, 2, 3].map((item) => (
//     <React.Fragment key={item}>
//       <li>哈哈哈</li>
//       <li>哈哈哈</li>
//     </React.Fragment>
//   ));
// }

const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="https://www.kaikeba.com/">kkb</a>
    <FunctionComponent name="function" />
    <ClassComponent name="class" />

    <>
      <h1>哈哈哈</h1>
      <h2>呵呵呵</h2>
    </>
    {/* <ul>
      <FragmentComponent />
    </ul> */}
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("React", React.version); //sy-log

// ! 初次渲染
// 原生标签节点
// 文本节点
// 函数组件
// 类组件
// fragment
