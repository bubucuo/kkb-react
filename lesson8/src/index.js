// import React, {Component, useReducer, useState} from "react";
// import ReactDOM from "react-dom";
import {useReducer} from "./kreact/react";
import ReactDOM from "./kreact/react-dom";
import "./index.css";

// fiber(memoizedState)->hook0(next)->hook1(next)->hook2(next)->null
// workInProgressHook=hook2 当前的hook
function FunctionComponent(props) {
  // const [count1, setCount1] = useState(0); //hook0
  // const [count0, setCount0] = useState(0); //hook1
  const [count2, setCount2] = useReducer((x) => x + 1, 0); //hook2
  // hook3
  return (
    <div className="border">
      <p>{props.name}</p>
      {/* <button
        onClick={() => {
          setCount1(count1 + 1);
        }}>
        {count1}
      </button> */}
      <button
        onClick={() => {
          setCount2();
        }}>
        {count2}
      </button>
    </div>
  );
}

const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="https://www.kaikeba.com/">kkb</a>
    <FunctionComponent name="function" />

    <>
      <h1>omg</h1>
      <h2>omg</h2>
    </>
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("React", React.version); //sy-log

// 原生标签
// 文本节点
// 函数组件
// 类组件
// Fragment
