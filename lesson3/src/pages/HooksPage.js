import React, {useReducer, useEffect, useLayoutEffect} from "react";
import {countReducer} from "../store";

// 修改初始值 可选参数
const init = initArg => initArg - 0;

export default function HooksPage(props) {
  const [state, dispatch] = useReducer(countReducer, "0", init);

  useEffect(() => {
    //
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
