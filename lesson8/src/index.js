// import React, {Component, useState, useReducer} from "react";
// import ReactDOM from "react-dom";
import {useReducer} from "./kreact/";
import ReactDOM from "./kreact/react-dom";
// import Component from "./kreact/Component";
import "./index.css";

function FunctionComponent(props) {
  // *
  // old fiber.memoizedState（hook0）-> next(hook1) -> next(hook2)->hook3(workInProgressHook)
  // workInProgressHook 全局变量
  //hook3
  // new fiber
  //*
  // const [count, setCount] = useState(0); // 0
  const [count2, setCount2] = useReducer((x) => x + 1, 0); //2

  return (
    <div className="border">
      <p>{props.name}</p>
      {/* <p>{count}</p> */}
      {/* <button
        onClick={() => {
          setCount(count + 1);
        }}>
        click
      </button> */}

      <p>{count2}</p>
      <button
        onClick={() => {
          setCount2(count2 + 1);
        }}>
        click
      </button>
    </div>
  );
}

const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="https://www.kaikeba.com/">kkb</a>
    <FunctionComponent name="嘉恒" />
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

//原生标签
// 文本
// 函数组件
