// import React, {useReducer, useEffect, useLayoutEffect} from "react";
// import ReactDOM from "react-dom";
import {useReducer, useEffect, useLayoutEffect} from "./kreact/";
import ReactDOM from "./kreact/react-dom";
import "./index.css";

function FunctionComponent(props) {
  // *
  // old fiber.memoizedState（hook0）-> next(hook1) -> next(hook2)->hook3(workInProgressHook)
  // workInProgressHook 全局变量
  //hook3
  // new fiber
  //*

  const [count1, setCount1] = useReducer((x) => x + 2, 0); // hook0
  const [count2, setCount2] = useReducer((x) => x + 1, 0); //hook1

  useEffect(() => {
    console.log("omg useEffect", count2); //sy-log
  }, [count2]);

  useLayoutEffect(() => {
    console.log("omg useLayoutEffect", count2); //sy-log
  }, [count2]);

  return (
    <div className="border">
      <p>{props.name}</p>
      <p>{count1}</p>
      <button
        onClick={() => {
          setCount1();
        }}>
        click
      </button>
      <p>{count2}</p>
      <button
        onClick={() => {
          setCount2();
        }}>
        click
      </button>

      {/* {count2 % 2 ? <div>123</div> : <span>456</span>} */}

      <ul>
        <li key="0">0</li>
        <li key="1">1</li>
        {count2 % 2 ? <li key="2">2</li> : null}
        <li key="3">3</li>
        <li key="4">4</li>
      </ul>
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
