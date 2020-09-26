import React, {useReducer, useEffect, useLayoutEffect} from "react";
import {countReducer} from "../store";

const init = initArg => initArg - 0;

export default function HooksPage(props) {
  const [state, dispatch] = useReducer(countReducer, "0", init);

  // useEffect的第二个参数是个依赖项数组，如果数组填写了值，那么一旦这个值变化，useEffect的第一个函数参数就会执行里面的操作
  useEffect(() => {
    console.log("useEffect"); //sy-log
  }, [state]);

  useLayoutEffect(() => {
    console.log("useLayoutEffect"); //sy-log
  }, [state]);

  return (
    <div>
      <h3>HooksPage</h3>
      <p>{state}</p>
      <button onClick={() => dispatch({type: "ADD", payload: 100})}>add</button>
    </div>
  );
}
